import React, { useState, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useSiteMedia } from "@/contexts/SiteMediaContext";
import { toast } from "sonner";
import { ImagePlus, X, Check, UploadCloud } from "lucide-react";

interface EditableMediaProps {
  mediaId: string;
  fallbackUrl: string;
  type?: "image" | "video";
  className?: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  onUploadComplete?: (newUrl: string) => void;
}

export function EditableMedia({ 
  mediaId, 
  fallbackUrl, 
  type = "image", 
  className = "", 
  alt = "",
  width,
  height,
  onUploadComplete
}: EditableMediaProps) {
  const { isEditingMode } = useAuth();
  const { media, updateGlobalMedia } = useSiteMedia();
  
  // Use the database URL if available, otherwise the fallback
  const dbUrl = media[mediaId];
  const activeUrl = dbUrl || fallbackUrl;

  const [currentUrl, setCurrentUrl] = useState(() => activeUrl);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ... (keep processFile, handleFileChange, etc exactly as they are until handleSave)
  const processFile = (file: File) => {
    if (type === "image" && !file.type.startsWith("image/")) {
      toast.error("Por favor selecciona una imagen válida (JPG, PNG, WebP)");
      return;
    }
    if (file.size > 50 * 1024 * 1024) {
      toast.error("El archivo no debe pesar más de 50MB");
      return;
    }
    
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (!isEditingMode || previewUrl) return;
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    if (!isEditingMode || previewUrl) return;
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    if (!isEditingMode || previewUrl) return;
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (fileInputRef.current) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        fileInputRef.current.files = dataTransfer.files;
      }
      processFile(file);
    }
  };

  const handleSave = async () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file || !previewUrl) return;

    setIsUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('mediaId', mediaId);

      const response = await fetch('/api/upload.php', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al subir");
      }

      setCurrentUrl(data.url);
      setPreviewUrl(null);
      toast.success("Recurso multimedia subido con éxito ✨");
      if (onUploadComplete) {
        onUploadComplete(data.url);
      } else {
        // If no onUploadComplete is provided, assume it's a global site media
        await updateGlobalMedia(mediaId, data.url);
      }
    } catch (error: any) {
      console.error("Error uploading:", error);
      toast.error(error.message || "Hubo un error al guardar el archivo");
    } finally {
      setIsUploading(false);
    }
  };

  // Keep in sync if dbUrl updates (e.g. on first load)
  React.useEffect(() => {
    if (dbUrl) {
      setCurrentUrl(dbUrl);
    }
  }, [dbUrl]);

  const displayUrl = previewUrl || currentUrl;

  return (
    <div 
      className={`relative group inline-block w-full h-full ${
        isEditingMode 
          ? "ring-2 ring-transparent hover:ring-[var(--brand-red)] transition-all cursor-pointer overflow-hidden rounded-[inherit]" 
          : ""
      } ${isDragging ? "ring-4 ring-[var(--brand-red)] ring-dashed scale-[0.98]" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Contenido Visual */}
      {type === "image" ? (
        <img 
          src={displayUrl} 
          alt={alt} 
          className={`w-full h-full object-cover transition-transform duration-700 ${className} ${previewUrl ? 'opacity-80 scale-105 blur-sm' : ''}`} 
          width={width}
          height={height}
        />
      ) : (
        <video 
          src={displayUrl} 
          className={`w-full h-full object-cover transition-transform duration-700 ${className} ${previewUrl ? 'opacity-80 scale-105 blur-sm' : ''}`} 
          autoPlay 
          muted 
          loop 
          playsInline
        />
      )}

      {/* Overlay Drag & Drop */}
      {isDragging && (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-[var(--brand-red)]/90 text-white backdrop-blur-sm rounded-[inherit] transition-all">
          <div className="flex flex-col items-center gap-2 animate-bounce">
            <UploadCloud className="w-12 h-12" />
            <span className="font-bold text-lg tracking-wide">Suelta la imagen aquí</span>
          </div>
        </div>
      )}

      {/* Overlay de Edición (Hover en Modo Edición) */}
      {isEditingMode && !previewUrl && !isDragging && (
        <>
          {/* Persistent Badge */}
          <div className="absolute top-4 right-4 bg-black/60 text-white p-2.5 rounded-full shadow-lg z-20 transition-transform group-hover:scale-110 group-hover:bg-[var(--brand-red)] pointer-events-none backdrop-blur-md border border-white/10">
            <ImagePlus className="w-4 h-4" />
          </div>
          
          {/* Hover Overlay */}
          <div 
            className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300 backdrop-blur-[2px] z-10"
            onClick={(e) => {
              e.preventDefault(); 
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
          >
            <div className="bg-[var(--brand-red)] text-white px-5 py-2.5 rounded-full font-bold shadow-xl flex items-center gap-2 hover:bg-[var(--brand-red-bright)] transition-colors transform hover:scale-105 border border-red-400/30">
              <UploadCloud className="w-5 h-5" />
              <span>Cambiar {type === 'image' ? 'Imagen' : 'Video'}</span>
            </div>
          </div>
        </>
      )}

      {/* Hidden file input */}
      {isEditingMode && (
        <input 
          type="file" 
          ref={fileInputRef}
          className="sr-only" 
          accept={type === 'image' ? 'image/jpeg, image/png, image/webp' : 'video/mp4, video/webm'} 
          onChange={handleFileChange} 
          onClick={(e) => e.stopPropagation()}
        />
      )}

      {/* Controles de Confirmación (Modo Previsualización) */}
      {previewUrl && (
        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-5 z-50 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="flex flex-col items-center gap-1">
            <span className="text-[var(--brand-red-bright)] font-black uppercase tracking-widest text-xs">Vista Previa</span>
            <span className="text-white text-sm">¿Guardar cambios?</span>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setPreviewUrl(null);
                if (fileInputRef.current) fileInputRef.current.value = "";
              }} 
              className="bg-white/10 hover:bg-white/20 text-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg transition-all hover:scale-110 border border-white/20 disabled:opacity-50"
              title="Cancelar"
              disabled={isUploading}
            >
              <X className="w-5 h-5" />
            </button>
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleSave();
              }} 
              className="bg-[var(--brand-red)] hover:bg-[var(--brand-red-bright)] text-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg shadow-[var(--brand-red)]/30 transition-all hover:scale-110 border border-red-400/30"
              disabled={isUploading}
            >
              {isUploading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : (
                <Check className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      )}
      
      {/* Etiqueta de ID en modo edición (Opcional) */}
      {isEditingMode && !previewUrl && !isDragging && (
        <div className="absolute bottom-3 left-3 bg-black/60 text-white/80 text-[10px] font-mono px-2 py-1 rounded backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity border border-white/10">
          ID: {mediaId}
        </div>
      )}
    </div>
  );
}
