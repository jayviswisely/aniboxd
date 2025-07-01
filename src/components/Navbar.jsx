import { Link, useLocation } from "react-router-dom";
import { useState } from 'react';
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-600 p-4 text-white shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row md:justify-between md:items-center">
        <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold hover:text-blue-200 transition">
                AniBoxd
            </Link>
            
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