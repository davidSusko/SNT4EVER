import React, { useState, useEffect } from 'react';
import { useInstagramPostsSupabase } from '../hooks/useInstagramPostsSupabase';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { HelpCircle } from 'lucide-react';
import howToInstaImg from '../assets/images/how-to-insta.png';

export const AdminInstagram: React.FC = () => {
  // Auth states
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Data states
  const { posts, loading, error, addPost, removePost } = useInstagramPostsSupabase();
  const [newUrl, setNewUrl] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    // Verificar si hay sesión activa
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setAuthLoading(false);
    });

    // Escuchar cambios de sesión
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError('');
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setLoginError('Credenciales incorrectas. Verifica tu email y contraseña.');
    }
    setIsLoggingIn(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl.trim()) return;
    
    setIsAdding(true);
    const result = await addPost(newUrl.trim());
    
    if (result.success) {
      setNewUrl('');
    } else {
      alert(result.error);
    }
    
    setIsAdding(false);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta publicación?')) {
      setDeletingId(id);
      const result = await removePost(id);
      
      if (!result.success) {
        alert(result.error);
      }
      
      setDeletingId(null);
    }
  };

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // --- VISTA DE LOGIN ---
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg border border-gray-100">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Acceso Administrador</h1>
            <p className="text-gray-500">Inicia sesión para gestionar el contenido.</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            {loginError && (
              <div className="text-red-500 text-sm font-medium bg-red-50 p-3 rounded-lg">
                {loginError}
              </div>
            )}
            
            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors flex justify-center items-center h-11"
            >
              {isLoggingIn ? (
                <span className="inline-block h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                'Iniciar Sesión'
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- VISTA PANEL ADMIN ---
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-800">Gestión de Instagram</h1>
          <button 
            onClick={handleLogout}
            className="text-sm font-medium text-gray-600 hover:text-red-600 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-red-200 transition-colors"
          >
            Cerrar Sesión ({user.email})
          </button>
        </div>

        {/* Formulario para añadir */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Añadir Nueva Publicación</h2>
            <Dialog>
              <DialogTrigger asChild>
                <button 
                  type="button" 
                  className="text-gray-400 hover:text-blue-500 transition-colors focus:outline-none flex items-center justify-center"
                  title="Ayuda sobre cómo añadir URLs"
                >
                  <HelpCircle className="w-5 h-5" />
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-xl p-6 bg-white border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Copiar url de la página de instagram</h3>
                <div className="rounded-lg overflow-hidden border border-gray-200">
                  <img src={howToInstaImg} alt="Cómo copiar URL de Instagram" className="w-full h-auto" />
                </div>
              </DialogContent>
            </Dialog>
          </div>
          
          <form onSubmit={handleAdd} className="flex flex-col sm:flex-row gap-4">
            <input
              type="url"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              placeholder="https://www.instagram.com/p/..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              disabled={isAdding}
              required
            />
            <button
              type="submit"
              disabled={isAdding || !newUrl.trim()}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-w-[120px] flex justify-center items-center"
            >
              {isAdding ? (
                <span className="inline-block h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                'Añadir'
              )}
            </button>
          </form>
          {posts.length >= 10 && (
            <p className="text-blue-600 text-sm mt-3 font-medium flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              Se ha alcanzado el límite de 10. Al añadir una nueva publicación, la más antigua se eliminará automáticamente.
            </p>
          )}
        </div>

        {/* Lista de posts actuales */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Publicaciones Actuales</h2>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
              posts.length >= 10 ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-700'
            }`}>
              {posts.length} / 10
            </span>
          </div>

          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg">
              Error: {error}
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg text-gray-500">
              No hay publicaciones añadidas todavía.
            </div>
          ) : (
            <ul className="space-y-4">
              {posts.map((post) => (
                <li key={post.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors gap-4">
                  <div className="flex-1 min-w-0">
                    <a 
                      href={post.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-blue-600 hover:text-blue-800 hover:underline truncate block font-medium mb-1"
                    >
                      {post.url}
                    </a>
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Añadido el {formatDate(post.created_at)}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDelete(post.id)}
                    disabled={deletingId === post.id}
                    className="bg-red-50 text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-red-100 transition-colors disabled:opacity-50 shrink-0 flex items-center justify-center min-w-[100px]"
                  >
                    {deletingId === post.id ? (
                      <span className="inline-block h-5 w-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></span>
                    ) : (
                      'Eliminar'
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
