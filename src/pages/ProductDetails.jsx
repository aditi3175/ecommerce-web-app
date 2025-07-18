import { useEffect, useState } from "react";
import { useCartContext } from "../../../ecommerce-web-app/src/context/CartContext";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

function ProductDetails() {
  const { addToCart } = useCartContext();
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!res.ok) {
          throw new Error("Product not found");
        }
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        setError("Product not found. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (isLoading) {
    return <div className="text-center py-20 text-gray-500 text-xl">Loading product...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-500 font-semibold text-xl">{error}</div>;
  }

  return (
    <main className="bg-gradient-to-br from-blue-100 via-white to-pink-100 min-h-screen py-10 px-2 flex items-center justify-center">
      <div className="relative max-w-5xl w-full mx-auto bg-white/80 backdrop-blur rounded-2xl shadow-xl p-10">
        <Link
          to="/products"
          className="absolute top-6 left-6 z-20 text-blue-600 hover:text-blue-800 bg-white p-2 rounded-full shadow-md transition duration-200"
        >
          <FaArrowLeft size={20} />
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="flex justify-center">
            <img
              src={product.image}
              alt={product.title}
              className="w-full max-w-xs h-auto object-contain rounded-xl bg-white shadow"
            />
          </div>
          <div>
            <h3 className="text-3xl font-extrabold mb-4 text-blue-900 drop-shadow">{product.title}</h3>
            <p className="text-gray-700 mb-4 text-lg">{product.description}</p>
            <p className="text-2xl font-bold text-pink-600 mb-6">₹{product.price}</p>
            <div className="flex gap-4">
              <button
                onClick={() => addToCart(product)}
                className="bg-gradient-to-r from-blue-600 to-pink-500 hover:from-blue-700 hover:to-pink-600 text-white px-6 py-3 rounded-full font-bold shadow transition"
              >
                Add to Cart
              </button>
              <button
                onClick={() => navigate("/cart")}
                className="bg-white border border-blue-400 text-blue-700 px-6 py-3 rounded-full font-bold shadow hover:bg-blue-50 transition"
              >
                Go to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductDetails;
