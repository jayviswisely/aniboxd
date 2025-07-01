import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation(); // Get current route

  return (
    <nav className="bg-blue-600 p-4 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold hover:text-blue-200 transition">
          AniBoxd
        </Link>

        {/* Desktop Links */}
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

        {/* Mobile Button (Placeholder) */}
        <button className="md:hidden text-2xl">☰</button>
      </div>
    </nav>
  );
}

// Helper component for active links
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