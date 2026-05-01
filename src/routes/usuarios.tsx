import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useAuth } from '@/contexts/AuthContext';
import { SiteLayout } from '@/components/site/SiteLayout';
import { Users, UserPlus, Mail, Shield, Trash2, Edit2, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/usuarios')({
  component: UsuariosPage,
});

const initialUsers = [
  { id: 1, email: 'admin@imingenieria.com', role: 'admin', status: 'Activo', lastLogin: 'Hoy, 10:30 AM', password: 'admin123' },
  { id: 2, email: 'editor@imingenieria.com', role: 'user', status: 'Activo', lastLogin: 'Ayer, 04:15 PM', password: 'editor123' },
  { id: 3, email: 'carlos.mendoza@imingenieria.com', role: 'user', status: 'Inactivo', lastLogin: 'Hace 5 días', password: 'password' },
];

function UsuariosPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("imingenieria_users");
    if (saved) return JSON.parse(saved);
    return initialUsers;
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ email: '', password: '', role: 'user', status: 'Activo' });

  useEffect(() => {
    localStorage.setItem("imingenieria_users", JSON.stringify(users));
  }, [users]);

  // Redirect if not logged in or not admin
  useEffect(() => {
    if (!user) {
      navigate({ to: '/login' });
    }
  }, [user, navigate]);

  if (!user || user.role !== 'admin') {
    return (
      <SiteLayout>
        <div className="py-24 text-center min-h-[60vh] flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold text-gray-800">Acceso Denegado</h1>
          <p className="text-gray-500 mt-2">No tienes permisos para ver esta página.</p>
        </div>
      </SiteLayout>
    );
  }

  const handleDelete = (id: number) => {
    if (confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const handleEdit = (userToEdit: typeof initialUsers[0]) => {
    setEditingUserId(userToEdit.id);
    setFormData({ email: userToEdit.email, password: '', role: userToEdit.role, status: userToEdit.status });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingUserId(null);
    setFormData({ email: '', password: '', role: 'user', status: 'Activo' });
  };

  const handleCreateOrEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email) return;

    if (editingUserId) {
      // Editar
      setUsers(users.map(u => u.id === editingUserId ? { ...u, email: formData.email, role: formData.role, status: formData.status } : u));
    } else {
      // Crear
      if (!formData.password) {
        alert("La contraseña es obligatoria para nuevos usuarios.");
        return;
      }
      setUsers([...users, { 
        id: Date.now(), 
        email: formData.email, 
        password: formData.password,
        role: formData.role, 
        status: formData.status, 
        lastLogin: 'Nunca' 
      }]);
    }
    closeModal();
  };

  return (
    <SiteLayout>
      <div className="bg-gray-50 min-h-screen py-12 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="sm:flex sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-extrabold text-[var(--brand-navy-deep)] flex items-center gap-3">
                <Users className="w-8 h-8 text-[var(--brand-red)]" />
                Gestión de Usuarios
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                Administra quién tiene acceso al sistema y al modo de edición multimedia.
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 bg-[var(--brand-red)] text-white px-4 py-2 rounded-md font-medium hover:bg-[var(--brand-red-bright)] transition-colors shadow-sm"
              >
                <UserPlus className="w-4 h-4" />
                Nuevo Usuario
              </button>
            </div>
          </div>

          <div className="bg-white shadow-[var(--shadow-card)] rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Usuario</th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Rol</th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Estado</th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Último Acceso</th>
                    <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                            <Mail className="h-5 w-5 text-gray-500" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{u.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                          u.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          <Shield className="w-3 h-3" />
                          {u.role === 'admin' ? 'Administrador' : 'Editor'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 text-xs font-semibold rounded-full ${
                          u.status === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {u.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {u.lastLogin}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          className="text-blue-600 hover:text-blue-900 mr-4" 
                          title="Editar"
                          onClick={() => handleEdit(u)}
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-900 disabled:opacity-30 disabled:cursor-not-allowed" 
                          disabled={u.id === 1}
                          onClick={() => handleDelete(u.id)}
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {users.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                        No hay usuarios registrados.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal de Creación */}
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h3 className="font-bold text-[var(--brand-navy-deep)] text-lg flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-[var(--brand-red)]" />
                  {editingUserId ? "Editar Usuario" : "Nuevo Usuario"}
                </h3>
                <button 
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleCreateOrEdit} className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                    <input 
                      type="email" 
                      required
                      autoFocus
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--brand-red)] focus:border-transparent"
                      placeholder="usuario@imingenieria.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contraseña {editingUserId && <span className="text-xs text-gray-400 font-normal">(Dejar en blanco para no cambiarla)</span>}
                    </label>
                    <input 
                      type="password" 
                      required={!editingUserId}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--brand-red)] focus:border-transparent"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rol</label>
                    <select 
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--brand-red)] focus:border-transparent"
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                    >
                      <option value="user">Editor (Modificar contenido)</option>
                      <option value="admin">Administrador (Acceso total)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                    <select 
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--brand-red)] focus:border-transparent"
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                    >
                      <option value="Activo">Activo</option>
                      <option value="Inactivo">Inactivo</option>
                    </select>
                  </div>
                </div>
                <div className="mt-8 flex gap-3 justify-end">
                  <button 
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-[var(--brand-red)] rounded-md hover:bg-[var(--brand-red-bright)] focus:outline-none"
                  >
                    {editingUserId ? "Guardar Cambios" : "Crear Usuario"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </SiteLayout>
  );
}

