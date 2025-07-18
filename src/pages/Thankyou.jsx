import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";

function Thankyou() {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(true);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/products");
    }, 50000);

    // Stop confetti after 4 seconds
    const confettiTimer = setTimeout(() => {
      setShowConfetti(false);
    }, 10000);

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      clearTimeout(confettiTimer);
      window.removeEventListener("resize", handleResize);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center px-4 bg-white">
      {showConfetti && <Confetti width={windowSize.width} height={windowSize.height} />}
      
      <img
        src="https://cdn-icons-png.flaticon.com/512/3159/3159066.png"
        alt="Success"
        className="w-28 h-28 mb-4"
      />

      <h1 className="text-4xl font-bold text-pink-600 mb-2">🎉 Thank You!</h1>
      <p className="text-lg text-gray-700 mb-4">Your order has been successfully placed!</p>
      <p className="text-sm text-gray-500 mb-6">📦 Estimated Delivery: 5–7 business days</p>
      
      <button
        onClick={() => navigate("/products")}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition shadow"
      >
        Continue Shopping
      </button>
    </div>
  );
}

export default Thankyou;
