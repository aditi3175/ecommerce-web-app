import { useState } from "react";
import { toast } from "react-hot-toast";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

function Contact() {
  const [form, setForm] = useState({name: "", email: "", message: ""});
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Thanks for reaching out!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <main className="bg-gradient-to-br from-blue-100 via-white to-pink-200 min-h-screen py-0 px-2">
      <div className="max-w-4xl mx-auto px-4 pt-6 pb-10">
        <h1 className="text-4xl font-extrabold text-blue-900 mb-2 text-center drop-shadow mt-2">Contact Us</h1>
        <p className="text-gray-600 mb-8 text-center text-lg">We'd love to hear from you!</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-0">
          <form onSubmit={handleSubmit} className="space-y-6 bg-white/80 backdrop-blur rounded-2xl shadow-lg p-8">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name" required
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email" required
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
            />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your Message" required
              rows={5}
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
            />
            <button type="submit" className="bg-gradient-to-r from-pink-500 to-blue-500 text-white px-8 py-3 rounded-full hover:from-pink-600 hover:to-blue-600 transition font-bold shadow">Send Message</button>
          </form>

          <div className="flex flex-col justify-center space-y-8 bg-white/80 backdrop-blur rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-4">
              <FaEnvelope className="text-blue-600 text-2xl" />
              <span className="text-gray-700 text-lg">support@shopmate.com</span>
            </div>
            <div className="flex items-center gap-4">
              <FaPhoneAlt className="text-blue-600 text-2xl" />
              <span className="text-gray-700 text-lg">+91 9876543210</span>
            </div>
            <div className="flex items-center gap-4">
              <FaMapMarkerAlt className="text-blue-600 text-2xl" />
              <span className="text-gray-700 text-lg">123 Street New Delhi, India</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Contact;