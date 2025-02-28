import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { Menu, X, Sun, Moon } from "lucide-react"; // Icons for better UX

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <nav className="bg-blue-600 dark:bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-wide">
          🚗 Vehicle Service
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/components">Components</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </div>

        {/* Dark Mode Toggle */}
        <button onClick={toggleDarkMode} className="hidden md:block">
          {darkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>

        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="md:hidden">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-blue-700 dark:bg-gray-800 py-3 space-y-2 text-center">
          <NavLink to="/" onClick={toggleMenu}>Home</NavLink>
          <NavLink to="/services" onClick={toggleMenu}>Services</NavLink>
          <NavLink to="/components" onClick={toggleMenu}>Components</NavLink>
          <NavLink to="/contact" onClick={toggleMenu}>Contact</NavLink>
          <button onClick={toggleDarkMode} className="w-full py-2">
            {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>
      )}
    </nav>
  );
};

// Custom NavLink with hover effects
const NavLink = ({ to, children, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="block px-4 py-2 hover:bg-blue-500 dark:hover:bg-gray-700 transition rounded-md"
  >
    {children}
  </Link>
);

export default Header;
