import { Link, useLocation } from "react-router-dom";
import { useState } from 'react';
import ThemeToggle from "./ThemeToggle";

export default function Navbar({ searchQuery, setSearchQuery }) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-anime p-4 text-white shadow-md transition-colors duration-300">
      <div className="container mx-auto flex flex-col md:flex-row md:justify-between md:items-center">
        <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold hover:text-blue-200 transition">
                AniBoxd
            </Link>
            
            <div className="flex-grow ml-4 mr-1">
              <input
                type="text"
                placeholder="Search anime..."
                className="w-full p-2 rounded border border-blue-400 bg-blue-500 placeholder-blue-200 text-white focus:outline-none focus:ring-2 focus:ring-blue-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-4">
                <ThemeToggle />
                <button className="md:hidden text-2xl" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? '✕' : '☰'}
                </button>
            </div>
        </div>

        {/* Desktop Links (unchanged) */}
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

        {/* Mobile Menu (new) */}
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
          </div>
        )}
      </div>
    </nav>
  );
}

// Your original NavLink component (perfect as-is!)
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