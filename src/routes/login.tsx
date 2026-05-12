import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

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
    if (!email || !password) {
      toast.error('Por favor completa todos los campos.');
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
      toast.success('Sesión iniciada correctamente');
      navigate({ to: '/' });
    } catch (error) {
      // Error is handled by sonner toast in context or locally
      toast.error('Credenciales incorrectas o error en el servidor');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--brand-navy-deep)] px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none bg-[url('https://images.unsplash.com/photo-1541888081643-eb31f9b31175?auto=format&fit=crop&q=80&w=1920')] bg-cover bg-center opacity-20 transition-transform duration-[20s] ease-linear hover:scale-110" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-[var(--brand-navy-deep)] via-[var(--brand-navy-deep)]/90 to-transparent" />
      
      {/* Abstract geometric shapes */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--brand-red)]/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10 animate-in fade-in zoom-in duration-700 ease-out">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl overflow-hidden p-8">
          
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-[var(--brand-red)] rounded-2xl flex items-center justify-center shadow-lg shadow-[var(--brand-red)]/30 mb-6 transform -rotate-6 hover:rotate-0 transition-transform duration-300">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-extrabold text-white mb-2">Bienvenido de vuelta</h1>
            <p className="text-white/60 text-sm">Gestor de Contenido Multimedia IM Ingeniería</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-[var(--brand-red)] text-white/50">
                    <Mail className="h-5 w-5" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:bg-white/10 focus:border-[var(--brand-red)] focus:ring-1 focus:ring-[var(--brand-red)] focus:outline-none transition-all sm:text-sm"
                    placeholder="Correo electrónico"
                  />
                </div>
              </div>

              <div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-[var(--brand-red)] text-white/50">
                    <Lock className="h-5 w-5" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:bg-white/10 focus:border-[var(--brand-red)] focus:ring-1 focus:ring-[var(--brand-red)] focus:outline-none transition-all sm:text-sm"
                    placeholder="Contraseña"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center items-center gap-2 py-4 px-4 border border-transparent rounded-xl shadow-lg shadow-[var(--brand-red)]/20 text-sm font-bold text-white bg-[var(--brand-red)] hover:bg-[var(--brand-red-bright)] hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--brand-red)] disabled:opacity-70 disabled:hover:translate-y-0 transition-all overflow-hidden"
            >
              {/* Highlight effect */}
              <div className="absolute inset-0 w-1/4 h-full bg-white/20 skew-x-12 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              
              {isLoading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : (
                <>
                  Iniciar Sesión <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
