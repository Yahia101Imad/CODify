import { Link, useLocation } from "react-router";
import { FaShoppingBag, FaUser, FaSignOutAlt, FaTachometerAlt } from "react-icons/fa";
import { useApp } from "../context/AppContext";
import { Button } from "./ui/button";

export function Navbar() {
  const { user, logout } = useApp();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <FaShoppingBag className="text-white" size={20} />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              CODify
            </span>
          </Link>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link to="/dashboard">
                  <Button
                    variant={isActive("/dashboard") ? "default" : "ghost"}
                    size="sm"
                    className={isActive("/dashboard") ? "bg-gradient-to-r from-violet-600 to-indigo-600" : ""}
                  >
                    <FaTachometerAlt size={16} className="mr-2" />
                    Dashboard
                  </Button>
                </Link>

                <Link to="/profile">
                  <Button
                    variant={isActive("/profile") ? "default" : "ghost"}
                    size="sm"
                    className={isActive("/profile") ? "bg-gradient-to-r from-violet-600 to-indigo-600" : ""}
                  >
                    <FaUser size={16} className="mr-2" />
                    Profile
                  </Button>
                </Link>

                <Button variant="ghost" size="sm" onClick={logout}>
                  <FaSignOutAlt size={16} className="mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/auth">
                <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700">
                  Get Started
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}