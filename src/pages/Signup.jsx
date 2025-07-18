import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const isValidPassword = (password) => password.length >= 6;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!isValidEmail(email)) {
      errors.email = "Please enter a valid email";
    }
    if (!isValidPassword(password)) {
      errors.password = "Password must be at least 6 characters";
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Signup successful! Please login.");
      navigate("/login");
    } catch (error) {
      let message = "Signup failed";
      if (error.code === "auth/email-already-in-use") message = "Email already in use";
      if (error.code === "auth/weak-password") message = "Weak password";
      toast.error(message);
    }
  };

  return (
    <main className="bg-gradient-to-br from-blue-100 via-white to-pink-100 min-h-screen py-10 px-2 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto bg-white/80 backdrop-blur rounded-2xl shadow-xl p-10">
        <h1 className="text-4xl font-extrabold text-blue-900 mb-6 drop-shadow text-center">Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email."
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
            />
            {formErrors.email && (<p className="text-red-600 text-sm mt-1">{formErrors.email}</p>)}
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password."
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
            />
            {formErrors.password && (<p className="text-red-600 text-sm mt-1">{formErrors.password}</p>)}
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password."
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
            />
            {formErrors.confirmPassword && (<p className="text-red-600 text-sm mt-1">{formErrors.confirmPassword}</p>)}
          </div>

          <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-pink-500 hover:from-blue-700 hover:to-pink-600 text-white px-6 py-3 rounded-full font-bold shadow transition">Sign Up</button>
          <div className="mt-4 text-sm text-center">
            Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Signup;
