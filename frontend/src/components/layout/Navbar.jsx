import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../common/Button';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Don't show sidebar on landing, login, or signup pages
  if (!isAuthenticated && (location.pathname === '/' || location.pathname === '/login' || location.pathname === '/signup')) {
    return null;
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-900/95 backdrop-blur-md border-r border-purple-500/20 shadow-lg shadow-purple-500/10 z-50 flex flex-col">
      {/* Logo Section */}
      <Link to="/" className="flex items-center gap-3 p-6 border-b border-purple-500/20">
        <span className="text-4xl">✨</span>
        <span className="text-2xl font-bold gradient-text">PostCraft</span>
      </Link>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-2">
        {isAuthenticated && (
          <>
            <Link
              to="/dashboard"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                location.pathname === '/dashboard'
                  ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 text-pink-300'
                  : 'text-gray-300 hover:bg-purple-500/10 hover:text-pink-400'
              }`}
            >
              <span className="text-xl">🏠</span>
              <span className="font-medium">Dashboard</span>
            </Link>
            <Link
              to="/leads"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                location.pathname === '/leads'
                  ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 text-pink-300'
                  : 'text-gray-300 hover:bg-purple-500/10 hover:text-purple-400'
              }`}
            >
              <span className="text-xl">📝</span>
              <span className="font-medium">Posts</span>
            </Link>
          </>
        )}
      </nav>

      {/* User Section */}
      {isAuthenticated && (
        <div className="p-4 border-t border-purple-500/20">
          <div className="flex items-center gap-3 mb-3 px-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-200 truncate">{user?.name}</p>
              <p className="text-xs text-gray-400 truncate">{user?.email}</p>
            </div>
          </div>
          <Button onClick={handleLogout} variant="secondary" className="w-full py-2 text-sm">
            Logout
          </Button>
        </div>
      )}
    </aside>
  );
};

export default Navbar;

