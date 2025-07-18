import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCartContext } from "../context/CartContext";
import { useRef, useEffect, useState } from "react";
import { FaShoppingCart, FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function Navbar() {
  const { currentUser } = useAuth();
  const { cartItems } = useCartContext();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef();
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur shadow-md">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center text-2xl font-extrabold text-blue-700">
          Shopmate <span className="ml-1">🛍️</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink to="/" className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "text-gray-700 hover:text-blue-600 transition"}>Home</NavLink>
          <NavLink to="/products" className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "text-gray-700 hover:text-blue-600 transition"}>Products</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "text-gray-700 hover:text-blue-600 transition"}>About</NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "text-gray-700 hover:text-blue-600 transition"}>Contact</NavLink>
        </div>

        {/* Right Side: Cart & User */}
        <div className="flex items-center gap-4">
          {/* Cart Icon */}
          <Link to="/cart" className="relative text-2xl text-blue-700 hover:text-blue-900 transition">
            <FaShoppingCart />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartItems.length}
              </span>
            )}
          </Link>
          {/* User Avatar/Profile */}
          {currentUser ? (
            <div className="relative" ref={profileRef}>
              <button
                className="text-2xl text-blue-700 hover:text-blue-900 focus:outline-none"
                onClick={() => setProfileOpen((open) => !open)}
              >
                <FaUserCircle />
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg py-2 z-50">
                  <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-blue-50" onClick={() => setProfileOpen(false)}>Profile</Link>
                  <button
                    onClick={async () => {
                      await signOut(auth);
                      setProfileOpen(false);
                      navigate("/login");
                    }}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-600 transition">
              Login
            </Link>
          )}
          {/* Hamburger for mobile */}
          <button className="md:hidden text-2xl text-blue-700 ml-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/90 backdrop-blur shadow-lg px-4 py-4">
          <NavLink to="/" className="block py-2 text-lg text-gray-700 hover:text-blue-600" onClick={() => setMenuOpen(false)}>Home</NavLink>
          <NavLink to="/products" className="block py-2 text-lg text-gray-700 hover:text-blue-600" onClick={() => setMenuOpen(false)}>Products</NavLink>
          <NavLink to="/about" className="block py-2 text-lg text-gray-700 hover:text-blue-600" onClick={() => setMenuOpen(false)}>About</NavLink>
          <NavLink to="/contact" className="block py-2 text-lg text-gray-700 hover:text-blue-600" onClick={() => setMenuOpen(false)}>Contact</NavLink>
          <Link to="/cart" className="block py-2 text-lg text-gray-700 hover:text-blue-600" onClick={() => setMenuOpen(false)}>Cart</Link>
          {currentUser ? (
            <Link to="/profile" className="block py-2 text-lg text-gray-700 hover:text-blue-600" onClick={() => setMenuOpen(false)}>Profile</Link>
          ) : (
            <Link to="/login" className="block py-2 text-lg text-gray-700 hover:text-blue-600" onClick={() => setMenuOpen(false)}>Login</Link>
          )}
        </div>
      )}
    </header>
  );
}