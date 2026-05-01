import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Lock, Mail, ArrowRight } from 'lucide-react';

export const Route = createFileRoute('/login')({
  component: Login,
});

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
      // Redirect to home where they can now edit the site
      navigate({ to: '/' });
    } catch (error) {
      // Error is handled by sonner toast in context
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--brand-navy-deep)] px-4">
      <div className="absolute inset-0 pointer-events-none bg-[url('@/assets/im-hero.jpg')] bg-cover bg-center opacity-10" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[var(--brand-navy-deep)] to-transparent" />
      
      <div className="w-full max-w-md relative z-10">
        <div className="bg-white rounded-2xl shadow-[var(--shadow-card)] overflow-hidden">
          <div className="bg-[var(--brand-red)] p-6 text-center">
            <h1 className="text-2xl font-bold text-white">Acceso al Sistema</h1>
            <p className="text-white/80 text-sm mt-1">Gestor de Contenido Multimedia</p>
          </div>
          
          <div className="p-8">
            <div className="mb-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded text-sm text-blue-800">
              <p className="font-semibold">Credenciales de prueba:</p>
              <p>Email: admin@imingenieria.com</p>
              <p>Contraseña: admin123</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-[var(--brand-red)] focus:border-[var(--brand-red)] focus:outline-none sm:text-sm"
                    placeholder="admin@imingenieria.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-[var(--brand-red)] focus:border-[var(--brand-red)] focus:outline-none sm:text-sm"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[var(--brand-red)] hover:bg-[var(--brand-red-bright)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--brand-red)] disabled:opacity-70 transition-all"
              >
                {isLoading ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : (
                  <>
                    Iniciar Sesión <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
