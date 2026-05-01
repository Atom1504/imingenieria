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
    // Simulación de una llamada a la API
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const storedUsersStr = localStorage.getItem("imingenieria_users");
        let allUsers = [];
        if (storedUsersStr) {
          allUsers = JSON.parse(storedUsersStr);
        } else {
          allUsers = [
            { id: 1, email: 'admin@imingenieria.com', role: 'admin', status: 'Activo', password: 'admin123' },
            { id: 2, email: 'editor@imingenieria.com', role: 'user', status: 'Activo', password: 'editor123' }
          ];
        }

        const validUser = allUsers.find((u: any) => u.email === email && u.password === password);

        if (validUser) {
          if (validUser.status !== 'Activo') {
            toast.error("Usuario inactivo", { description: "Tu cuenta está desactivada." });
            reject(new Error("Usuario inactivo"));
            return;
          }

          const fakeUser = { email: validUser.email, role: validUser.role };
          setUser(fakeUser);
          setIsEditingMode(true);
          localStorage.setItem("imingenieria_user", JSON.stringify(fakeUser));
          toast.success("Sesión iniciada correctamente", { description: "Modo edición activado" });
          resolve();
        } else {
          toast.error("Credenciales incorrectas");
          reject(new Error("Credenciales incorrectas"));
        }
      }, 800);
    });
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
