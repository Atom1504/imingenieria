import React, { useState, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { ImagePlus, X, Check } from "lucide-react";

interface EditableMediaProps {
  mediaId: string;
  fallbackUrl: string;
  type?: "image" | "video";
  className?: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
}

export function EditableMedia({ 
  mediaId, 
  fallbackUrl, 
  type = "image", 
  className = "", 
  alt = "",
  width,
  height
}: EditableMediaProps) {
  const { isEditingMode } = useAuth();
  
  // En una app real, inicializaríamos currentUrl consultando a la base de datos con mediaId
  const [currentUrl, setCurrentUrl] = useState(() => {
    // Simulamos recuperar la URL guardada del localStorage para mantener el estado entre recargas
    const saved = localStorage.getItem(`media_${mediaId}`);
    return saved || fallbackUrl;
  });
  
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validaciones básicas
      if (type === "image" && !file.type.startsWith("image/")) {
        toast.error("Por favor selecciona una imagen válida");
        return;
      }
      
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  const handleSave = async () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file || !previewUrl) return;

    setIsUploading(true);
    
    // Simulación de carga al servidor (S3, Cloudinary, etc.)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulación: en producción, aquí recibiríamos la nueva URL del servidor
      // Fake saving to localStorage to persist locally for demonstration
      
      // Convert file to base64 just for local demo persistence (NOT for production)
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        localStorage.setItem(`media_${mediaId}`, base64String);
        setCurrentUrl(base64String);
        setPreviewUrl(null);
        toast.success("Recurso multimedia actualizado correctamente");
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
      
    } catch (error) {
      toast.error("Error al subir el archivo");
      setIsUploading(false);
    }
  };

  const displayUrl = previewUrl || currentUrl;

  return (
    <div 
      className={`relative group inline-block w-full h-full ${
        isEditingMode 
          ? "ring-2 ring-transparent hover:ring-[var(--brand-red-bright)] ring-dashed transition-all cursor-pointer overflow-hidden" 
          : ""
      }`}
    >
      {/* Contenido Visual */}
      {type === "image" ? (
        <img 
          src={displayUrl} 
          alt={alt} 
          className={`w-full h-full object-cover ${className}`} 
          width={width}
          height={height}
        />
      ) : (
        <video 
          src={displayUrl} 
          className={`w-full h-full object-cover ${className}`} 
          autoPlay 
          muted 
          loop 
          playsInline
        />
      )}

      {/* Overlay de Edición (Hover en Modo Edición) */}
      {isEditingMode && !previewUrl && (
        <>
          {/* Persistent Badge (Top Right) */}
          <div className="absolute top-4 right-4 bg-[var(--brand-red)] text-white p-2 rounded-full shadow-lg z-20 transition-transform group-hover:scale-110 pointer-events-none">
            <ImagePlus className="w-4 h-4" />
          </div>
          
          {/* Hover Overlay */}
          <div 
            className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity backdrop-blur-[2px] z-10 cursor-pointer"
            onClick={(e) => {
              // Evitar que un Link padre reciba el click
              e.preventDefault(); 
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
          >
            <div className="bg-[var(--brand-red)] text-white px-4 py-2 rounded-full font-medium shadow-lg flex items-center gap-2 hover:bg-[var(--brand-red-bright)] transition-colors transform hover:scale-105">
              <ImagePlus className="w-4 h-4" />
              <span>Cambiar {type === 'image' ? 'Imagen' : 'Video'}</span>
            </div>
          </div>
        </>
      )}

      {/* Hidden file input - kept mounted to preserve selected file */}
      {isEditingMode && (
        <input 
          type="file" 
          ref={fileInputRef}
          className="sr-only" 
          accept={type === 'image' ? 'image/*' : 'video/*'} 
          onChange={handleFileChange} 
          onClick={(e) => e.stopPropagation()}
        />
      )}

      {/* Controles de Confirmación (Modo Previsualización) */}
      {previewUrl && (
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-4 z-50">
          <span className="text-white font-medium bg-black/50 px-3 py-1 rounded-full text-sm">Vista Previa</span>
          <div className="flex gap-3">
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setPreviewUrl(null);
                if (fileInputRef.current) fileInputRef.current.value = "";
              }} 
              className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full shadow-lg transition-colors backdrop-blur-md"
              title="Cancelar"
            >
              <X className="w-5 h-5" />
            </button>
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleSave();
              }} 
              className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-colors flex items-center gap-2"
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
      
      {/* Etiqueta de ID en modo edición (Opcional, para que el usuario sepa qué está editando) */}
      {isEditingMode && !previewUrl && (
        <div className="absolute top-2 left-2 bg-black/60 text-white/80 text-[10px] px-2 py-0.5 rounded backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
          ID: {mediaId}
        </div>
      )}
    </div>
  );
}
