import { signInWithPopup, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const isValidPassword = (password) => password.length >= 6;
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const handleGoogleLogin = async() => {
    try { 
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      toast.success(`Welcome ${user.displayName}`);
      navigate("/");
    }
    catch (error) {
      console.error("Google Login failed",error);
      toast.error("Failed to login to your google account");
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      toast.error("Please enter your email to reset password.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent! Check your inbox.");
    } catch (error) {
      let message = "Failed to send reset email";
      if (error.code === "auth/user-not-found") message = "No user found with this email";
      toast.error(message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!isValidEmail(email)) {
      errors.email = "Please enter valid email";
    }
    if (!isValidPassword(password)) {
      errors.password = "Password must contain 6 characters";
    }
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in successfully");
      setEmail("");
      setPassword("");
      setShowPassword(false);
      setFormErrors({});
      navigate("/");
    } catch (error) {
      let message = "Login failed";
      if (error.code === "auth/user-not-found") message = "User not found";
      if (error.code === "auth/wrong-password") message = "Incorrect password";
      toast.error(message);
    }
  };
  
  return (
    <main className="bg-gradient-to-br from-blue-100 via-white to-pink-100 min-h-screen py-10 px-2 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto bg-white/80 backdrop-blur rounded-2xl shadow-xl p-10">
        <h1 className="text-4xl font-extrabold text-blue-900 mb-6 drop-shadow text-center">Login to your account</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Email:</label>
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your email."
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
            />
            {formErrors.email && (<p className="text-red-600 text-sm mt-1">{formErrors.email}</p>)}
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Password:</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password."
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500 hover:text-blue-600 mt-1"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {formErrors.password && (<p className="text-red-600 text-sm mt-1">{formErrors.password}</p>)}
            <div className="text-right mt-2">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-blue-600 hover:underline text-sm"
              >
                Forgot Password?
              </button>
            </div>
          </div>

          <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-pink-500 hover:from-blue-700 hover:to-pink-600 text-white px-6 py-3 rounded-full font-bold shadow transition">Login</button>
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-full shadow hover:bg-gray-100 transition font-medium mt-2"
            aria-label="Sign in with Google"
          >
            <svg width="20" height="20" viewBox="0 0 48 48" className="inline-block">
              <g>
                <path fill="#4285F4" d="M43.6 20.5h-1.9V20H24v8h11.3c-1.6 4.3-5.7 7-11.3 7-6.6 0-12-5.4-12-12s5.4-12 12-12c2.7 0 5.2.9 7.2 2.4l6-6C34.1 5.1 29.3 3 24 3 12.9 3 4 11.9 4 23s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.3-4z"/>
                <path fill="#34A853" d="M6.3 14.7l6.6 4.8C14.5 16.1 18.9 13 24 13c2.7 0 5.2.9 7.2 2.4l6-6C34.1 5.1 29.3 3 24 3c-7.7 0-14.3 4.4-17.7 10.7z"/>
                <path fill="#FBBC05" d="M24 43c5.3 0 10.1-1.7 13.8-4.7l-6.4-5.2C29.2 34.7 26.7 35.5 24 35.5c-5.5 0-10.1-3.7-11.7-8.7l-6.6 5.1C9.7 39.6 16.3 43 24 43z"/>
                <path fill="#EA4335" d="M43.6 20.5h-1.9V20H24v8h11.3c-1.1 3-3.6 5.2-6.3 6.3l6.4 5.2C40.7 36.1 44 30.7 44 24c0-1.3-.1-2.7-.4-4z"/>
              </g>
            </svg>
            Sign in with Google
          </button>
          <div className="mt-4 text-sm text-center">
            Don't have an account? <Link to="/signup" className="text-blue-600 hover:underline">Sign up</Link>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Login;