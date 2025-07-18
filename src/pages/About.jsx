import { Link } from "react-router-dom";
import logo from "../images/logo.png";

function About() {
  return (
    <main className="bg-gradient-to-br from-blue-100 via-white to-pink-100 min-h-screen py-10 px-2 flex items-center justify-center">
      <div className="max-w-2xl w-full mx-auto bg-white/80 backdrop-blur rounded-2xl shadow-xl p-10 flex flex-col items-center text-center">
        <h1 className="text-4xl font-extrabold text-blue-900 mb-6 drop-shadow">About Shopmate 🛍️</h1>
        <img src={logo} alt="Logo" className="h-24 w-auto mx-auto object-contain mb-6 rounded-xl shadow" />
        <p className="text-gray-700 mb-6 text-lg">
          Shopmate is your go-to destination for everything from fashion to gadgets.<br />
          We are passionate about offering high-quality products at prices you’ll love.
        </p>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
        <p className="text-gray-600 mb-6 italic text-base">
          To make online shopping fast, reliable, and enjoyable for everyone.
        </p>
        <h2 className="text-xl font-bold text-gray-800 mb-4">What We Offer</h2>
        <ul className="list-disc list-inside text-left mx-auto text-gray-700 max-w-md mb-6">
          <li>Quality Assured Products</li>
          <li>Secure Checkout</li>
          <li>Fast Delivery</li>
          <li>Responsive Support</li>
        </ul>
        <div className="mt-4 text-sm text-gray-500 mb-6">
          Created with 💙 by Aditi Gupta | B.Tech CSE | 2025
        </div>
        <Link to="/products" className="inline-block bg-gradient-to-r from-blue-600 to-pink-500 hover:from-blue-700 hover:to-pink-600 text-white px-6 py-3 rounded-full font-bold shadow transition">Shop Now</Link>
      </div>
    </main>
  );
}

export default About;
