import { Link, useLocation } from "react-router-dom";
import { useState } from 'react';
import ThemeToggle from "./ThemeToggle";
import { useAuth } from '../hooks/useAuth';

export default function Navbar({ searchQuery, setSearchQuery }) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, loading, loginWithGoogle, logout } = useAuth();

  return (
    <nav className="bg-blue-anime p-4 text-white shadow-md transition-colors duration-300">
      <div className="container mx-auto flex flex-col md:flex-row md:justify-between md:items-center">
        <div className="flex justify-between items-center w-full">
          {/* Left side - Logo */}
          <Link to="/" className="text-2xl font-bold hover:text-blue-200 transition">
              AniBoxd
          </Link>
          
          {/* Middle - Search (on desktop) */}
          <div className="hidden md:block flex-grow mx-4">
            <input
              type="text"
              placeholder="Search anime..."
              className="w-full max-w-lg p-2 rounded border border-blue-400 bg-blue-500 placeholder-blue-200 text-white focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Right side - Auth + Theme + Mobile menu */}
          <div className="flex items-center gap-4">
            {/* Desktop Navigation Links */}
            <div className="hidden md:flex space-x-6">
              <NavLink to="/" currentPath={location.pathname}>
                Home
              </NavLink>
              <NavLink to="/watchlist" currentPath={location.pathname}>
                Watchlist
              </NavLink>
              <NavLink to="/profile" currentPath={location.pathname}>
                Profile
              </NavLink>
            </div>

            {/* Auth Section */}
            <div className="flex items-center gap-2">
              {user ? (
                <>
                  <img 
                    src={user.photoURL} 
                    alt={user.displayName} 
                    className="w-8 h-8 rounded-full"
                  />
                  <button 
                    onClick={logout}
                    className="hidden md:block text-sm hover:underline"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={loginWithGoogle}
                  disabled={loading}
                  className="hidden md:block bg-white text-blue-600 px-3 py-1 rounded text-sm disabled:opacity-50"
                >
                  {loading ? "Loading..." : "Login with Google"}
                </button>
              )}
            </div>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-2xl" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Search (hidden on desktop) */}
        <div className="md:hidden mt-3 w-full">
          <input
            type="text"
            placeholder="Search anime..."
            className="w-full p-2 rounded border border-blue-400 bg-blue-500 placeholder-blue-200 text-white focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Mobile Menu (hidden on desktop) */}
        {isMenuOpen && (
          <div className="md:hidden flex flex-col space-y-4 mt-4">
            <NavLink to="/" currentPath={location.pathname}>
              Home
            </NavLink>
            <NavLink to="/watchlist" currentPath={location.pathname}>
              Watchlist
            </NavLink>
            <NavLink to="/profile" currentPath={location.pathname}>
              Profile
            </NavLink>
            {user ? (
              <button 
                onClick={logout}
                className="text-left hover:underline"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={loginWithGoogle}
                disabled={loading}
                className="text-left hover:underline disabled:opacity-50"
              >
                {loading ? "Loading..." : "Login with Google"}
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

function NavLink({ to, currentPath, children }) {
  const isActive = currentPath === to;
  return (
    <Link
      to={to}
      className={`hover:text-blue-200 transition ${isActive ? "font-bold underline" : ""}`}
    >
      {children}
    </Link>
  );
}