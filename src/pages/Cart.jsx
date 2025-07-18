import { useCartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

function Cart() {
  const { cartItems, removeFromCart, clearCart, incrementQuantity, decrementQuantity, isOrdering, placeOrder } = useCartContext();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleOrder = () => {
    if (!currentUser) {
      toast.error("You must be logged in to place an order.");
      return;
    }
    placeOrder(navigate);
  };
  return (
    <main className="bg-gradient-to-br from-blue-100 via-white to-pink-100 min-h-screen py-10 px-2">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-blue-900 drop-shadow">🛍️ Your Cart</h2>
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center bg-white/80 backdrop-blur rounded-2xl shadow-lg p-10">
            <p className="text-gray-500 text-lg italic tracking-wide">
              Your cart is empty 🛒<br/>
              Add some items from the products
            </p>
          </div>
        ) : (
          <div>
            {cartItems.map((item) =>
              <div key={item.id} className="flex flex-col md:flex-row justify-between items-center border-b py-6 bg-white/80 backdrop-blur rounded-2xl shadow-lg mb-6">
                <div className="flex flex-col md:flex-row items-center gap-6 w-full">
                  <img src={item.image} alt={item.title} className="h-32 w-32 object-contain rounded-xl bg-white shadow" />
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                    <div className="flex flex-col md:flex-row items-center gap-4">
                      <p className="text-gray-500">
                        ₹{item.price} × {item.quantity} = <span className="text-pink-600 font-bold">₹{item.price * item.quantity}</span>
                      </p>
                      <div className="flex gap-2 items-center">
                        <button onClick={() => incrementQuantity(item.id)} className="bg-blue-200 px-3 py-1 rounded-full hover:bg-blue-400 transition font-bold text-lg">➕</button>
                        <button onClick={() => decrementQuantity(item.id)}
                          className={`px-3 py-1 rounded-full font-bold text-lg ${item.quantity === 1 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-blue-200 hover:bg-blue-400"}`}
                          disabled={item.quantity === 1}>
                          ➖
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white px-4 py-2 rounded-full shadow transition font-semibold mt-4 md:mt-0 mr-6">Remove</button>
              </div>
            )}
            <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-xl font-bold">
                Total: <span className="text-pink-600">₹{cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</span>
              </p>
              <button onClick={clearCart} className="bg-gradient-to-r from-pink-600 to-blue-600 hover:from-pink-700 hover:to-blue-700 text-white px-6 py-2 rounded-full shadow font-semibold transition">Clear Cart</button>
            </div>
            <div className="mt-8 flex justify-center">
              <button 
                onClick={handleOrder}
                disabled={cartItems.length === 0 || isOrdering}
                className={`bg-gradient-to-r from-blue-600 to-pink-500 hover:from-blue-700 hover:to-pink-600 text-white px-8 py-3 rounded-full font-bold shadow transition text-lg ${isOrdering ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {isOrdering ? "Placing..." : "Order Now"}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default Cart;