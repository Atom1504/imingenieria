import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

interface SiteMediaContextType {
  media: Record<string, string>;
  updateGlobalMedia: (mediaId: string, url: string) => Promise<void>;
  isLoading: boolean;
}

export const SiteMediaContext = createContext<SiteMediaContextType>({
  media: {},
  updateGlobalMedia: async () => {},
  isLoading: true,
});

export function SiteMediaProvider({ children }: { children: React.ReactNode }) {
  const [media, setMedia] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);

  // Cargar medios al iniciar la app
  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const res = await fetch('/api/site_media.php');
        if (res.ok) {
          const data = await res.json();
          setMedia(data);
        }
      } catch (error) {
        console.error("Error cargando site media:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMedia();
  }, []);

  const updateGlobalMedia = async (mediaId: string, url: string) => {
    // Actualización optimista en el cliente
    setMedia(prev => ({ ...prev, [mediaId]: url }));
    
    try {
      const res = await fetch('/api/site_media.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ media_id: mediaId, url: url }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Error guardando medio global");
      }
      
      // La confirmación de éxito ya fue mostrada en EditableMedia, aquí solo consolidamos.
    } catch (error: any) {
      toast.error(error.message || "No se pudo guardar el cambio global.");
    }
  };

  return (
    <SiteMediaContext.Provider value={{ media, updateGlobalMedia, isLoading }}>
      {children}
    </SiteMediaContext.Provider>
  );
}

export const useSiteMedia = () => useContext(SiteMediaContext);
