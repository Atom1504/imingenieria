import { useAuth } from '@/contexts/AuthContext';
import { Link } from '@tanstack/react-router';
import { Users, LogOut, Edit3, Eye } from 'lucide-react';

export function AdminToolbar() {
  const { user, isEditingMode, toggleEditingMode, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-white p-2 rounded-full shadow-2xl border border-gray-200">
      <div className="px-4 text-sm font-medium text-[var(--brand-navy-deep)] border-r border-gray-200">
        Hola, Admin
      </div>
      
      <button
        onClick={toggleEditingMode}
        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
          isEditingMode 
            ? 'bg-[var(--brand-red)] text-white hover:bg-[var(--brand-red-bright)]' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        {isEditingMode ? <Edit3 className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        {isEditingMode ? 'Modo Edición' : 'Modo Vista'}
      </button>

      {user.role === 'admin' && (
        <Link
          to="/usuarios"
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <Users className="w-4 h-4" />
          Usuarios
        </Link>
      )}

      <button
        onClick={logout}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors ml-1"
        title="Cerrar sesión"
      >
        <LogOut className="w-4 h-4" />
      </button>
    </div>
  );
}
