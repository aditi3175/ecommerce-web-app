import { useState, useEffect } from "react";
import { useCartContext } from "../../../ecommerce-web-app/src/context/CartContext";
import { Link } from "react-router-dom";

function Products() {
  const { addToCart } = useCartContext();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };
    fetchProducts();
  }, []);

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="bg-gradient-to-br from-blue-100 via-white to-pink-100 min-h-screen py-10 px-2">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-blue-900 drop-shadow">Products</h2>
        {/* Search Input */}
        <div className="flex justify-center mb-10">
          <input
            type="text"
            placeholder="Search Item Here"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md p-4 rounded-full border border-gray-300 shadow focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80 backdrop-blur text-lg"
          />
        </div>
        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Link to={`/product/${product.id}`} key={product.id}>
                <div className="bg-white/80 rounded-2xl shadow-xl p-6 flex flex-col items-center hover:scale-105 transition group min-h-[370px]">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-32 mb-4 object-contain group-hover:scale-110 transition"
                  />
                  <h3 className="text-lg font-bold mb-2 text-center line-clamp-2">{product.title}</h3>
                  <p className="text-pink-600 font-bold mb-4 text-xl">₹{product.price}</p>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart(product);
                    }}
                    className="bg-gradient-to-r from-blue-500 to-pink-400 hover:from-blue-600 hover:to-pink-500 text-white px-6 py-2 rounded-md shadow transition font-semibold"
                  >
                    Add to Cart
                  </button>
                </div>
              </Link>
            ))
          ) : (
            searchTerm.trim() !== "" && (
              <p className="col-span-full text-center text-gray-400 italic text-lg">
                No products match your search.
              </p>
            )
          )}
        </div>
      </div>
    </main>
  );
}

export default Products;
