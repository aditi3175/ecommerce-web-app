import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const categories = [
  { id: 1, name: "Electronics", icon: "💻" },
  { id: 2, name: "Fashion", icon: "👗" },
  { id: 3, name: "Home & Living", icon: "🏠" },
  { id: 4, name: "Sports", icon: "🏀" },
];

const testimonials = [
  {
    id: 1,
    name: "Priya S.",
    text: "I love Shopmate! Fast delivery and great prices.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 2,
    name: "Rahul K.",
    text: "The customer support is amazing. Highly recommend!",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 3,
    name: "Ayesha M.",
    text: "Great selection and easy checkout process.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
];

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterMsg, setNewsletterMsg] = useState("");
  const { currentUser } = useAuth();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => setFeaturedProducts(data.slice(0, 3)))
      .catch(() => setFeaturedProducts([]));
  }, []);

  const handleNewsletter = (e) => {
    e.preventDefault();
    setNewsletterMsg("Thank you for subscribing!");
    setNewsletterEmail("");
    setTimeout(() => setNewsletterMsg(""), 3000);
  };

  // Get user name or email for welcome message
  const userName = currentUser?.displayName || currentUser?.email?.split("@")[0];

  return (
    <main className="bg-gradient-to-br from-blue-100 via-white to-pink-200 min-h-screen">
      {/* Welcome message */}
      {currentUser && currentUser.email && (
        <div className="max-w-2xl mx-auto mt-8 mb-6 px-4 animate-fade-in">
          <div className="relative bg-white/80 backdrop-blur border border-blue-200 shadow-2xl rounded-2xl flex flex-col items-center py-6 px-4">
            <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-blue-100 text-blue-600 text-4xl rounded-full shadow-lg p-3 border-4 border-white">
              👋
            </span>
            <div className="mt-6 text-3xl md:text-4xl font-extrabold text-black text-center drop-shadow">
              Welcome{userName ? `, ${userName}` : ""}!
            </div>
            <div className="text-base text-gray-500 mt-2 text-center">
              Glad to see you back on Shopmate.
            </div>
          </div>
        </div>
      )}
      {/* Hero Banner */}
      <section className="flex flex-col items-center justify-center text-center py-16 px-4">
        <h1 className="text-5xl font-extrabold text-blue-900 mb-4 drop-shadow">
          Discover the Best Deals on <span className="text-blue-600">Shopmate</span> 🛒
        </h1>
        <p className="text-lg text-gray-700 max-w-xl mb-8">
          Quality products, unbeatable prices. Shop the latest trends and gadgets now!
        </p>
        <Link
          to="/products"
          className="bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
        >
          Shop Now
        </Link>
      </section>

      {/* Unique Selling Points */}
      <section className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-8 py-10 px-4">
        <div className="flex flex-col items-center bg-white/70 backdrop-blur rounded-2xl shadow-lg p-6 w-full sm:w-1/3 transition hover:scale-105">
          <span className="text-4xl mb-2">🚚</span>
          <span className="font-bold text-lg">Free Shipping</span>
          <span className="text-gray-500 text-sm">On all orders above ₹999</span>
        </div>
        <div className="flex flex-col items-center bg-white/70 backdrop-blur rounded-2xl shadow-lg p-6 w-full sm:w-1/3 transition hover:scale-105">
          <span className="text-4xl mb-2">🔒</span>
          <span className="font-bold text-lg">Secure Checkout</span>
          <span className="text-gray-500 text-sm">100% payment protection</span>
        </div>
        <div className="flex flex-col items-center bg-white/70 backdrop-blur rounded-2xl shadow-lg p-6 w-full sm:w-1/3 transition hover:scale-105">
          <span className="text-4xl mb-2">💬</span>
          <span className="font-bold text-lg">24/7 Support</span>
          <span className="text-gray-500 text-sm">We’re here to help</span>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-extrabold text-center mb-10 text-blue-800">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {featuredProducts.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 italic">
              Loading featured products...
            </div>
          ) : (
            featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white/80 rounded-2xl shadow-xl p-8 flex flex-col items-center hover:scale-105 transition group"
                style={{ minHeight: 370 }}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-32 mb-4 object-contain group-hover:scale-110 transition"
                />
                <h3 className="text-lg font-bold mb-2 text-center line-clamp-2">{product.title}</h3>
                <p className="text-pink-600 font-bold mb-4 text-xl">₹{product.price}</p>
                <Link
                  to={`/product/${product.id}`}
                  className="bg-gradient-to-r from-blue-500 to-pink-400 hover:from-blue-600 hover:to-pink-500 text-white px-6 py-2 rounded-full shadow transition"
                >
                  View Details
                </Link>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Shop by Category */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-extrabold text-center mb-10 text-blue-800">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {categories.map((cat) => (
            <Link
              to="/products"
              key={cat.id}
              className="flex flex-col items-center bg-white/80 rounded-2xl shadow-lg p-8 hover:bg-blue-50 transition hover:scale-105"
            >
              <span className="text-5xl mb-3">{cat.icon}</span>
              <span className="font-bold text-lg">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="bg-gradient-to-r from-blue-100 to-pink-100 py-14">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-center mb-10 text-blue-800">What Our Customers Say</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="bg-white/80 rounded-2xl shadow-lg p-8 flex flex-col items-center hover:scale-105 transition"
              >
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-20 h-20 rounded-full mb-4 object-cover border-4 border-blue-200"
                />
                <p className="text-gray-700 italic mb-2 text-center">"{t.text}"</p>
                <span className="font-bold text-blue-700">{t.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-gradient-to-r from-blue-200 to-pink-200 py-14">
        <div className="max-w-xl mx-auto text-center rounded-2xl shadow-lg bg-white/80 p-10">
          <h2 className="text-2xl font-extrabold mb-2 text-blue-800">Get Exclusive Offers!</h2>
          <p className="text-gray-600 mb-4">Sign up for our newsletter and never miss a deal.</p>
          <form
            onSubmit={handleNewsletter}
            className="flex flex-col sm:flex-row gap-2 justify-center"
          >
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 flex-1"
              value={newsletterEmail}
              onChange={e => setNewsletterEmail(e.target.value)}
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-pink-500 text-white px-8 py-2 rounded-full hover:from-blue-700 hover:to-pink-600 transition font-bold"
            >
              Subscribe
            </button>
          </form>
          {newsletterMsg && (
            <div className="mt-2 text-green-600 font-semibold">{newsletterMsg}</div>
          )}
        </div>
      </section>
    </main>
  );
}
