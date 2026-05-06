import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

interface AuthContextType {
  user: { email: string; role: string } | null;
  isEditingMode: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  toggleEditingMode: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isEditingMode: false,
  login: async () => { },
  logout: () => { },
  toggleEditingMode: () => { },
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{ email: string; role: string } | null>(null);
  const [isEditingMode, setIsEditingMode] = useState(false);

  // Simular la carga de sesión desde localStorage (o cookies)
  useEffect(() => {
    const storedUser = localStorage.getItem("imingenieria_user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
      // Por defecto, si es admin o editor, activamos el modo edición
      setIsEditingMode(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Credenciales incorrectas");
        throw new Error(data.error || "Credenciales incorrectas");
      }

      setUser(data.user);
      setIsEditingMode(true);
      localStorage.setItem("imingenieria_user", JSON.stringify(data.user));
      toast.success(data.message, { description: "Modo edición activado" });
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setIsEditingMode(false);
    localStorage.removeItem("imingenieria_user");
    toast.info("Sesión cerrada");
  };

  const toggleEditingMode = () => {
    if (user) {
      setIsEditingMode((prev) => !prev);
      toast.info(`Modo edición ${!isEditingMode ? 'activado' : 'desactivado'}`);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isEditingMode, login, logout, toggleEditingMode }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
