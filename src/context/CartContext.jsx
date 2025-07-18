import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const CartContext = createContext();

function CartProvider({children}) {
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const [isOrdering, setIsOrdering] = useState(false);
  
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);  

  function addToCart(product) {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.id === product.id);
  
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
    toast.success("Item added to the cart");
  }

  function removeFromCart(id) {
    setCartItems((prevItems) =>
      prevItems.map(item => {
        if (item.id === id) {
          if (item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return null;
          }
        }
        return item;
      }).filter(Boolean)
    );
    toast.error("Item removed from cart");
  }  

  function clearCart() {
    setCartItems([]);
    toast("Cart cleared", { icon: "🧹" });
  }

  function placeOrder(navigate) {
    setIsOrdering(true);
    setTimeout(() => {
      setCartItems([]);
      toast.success("🎉 Your order has been placed successfully!");
      setIsOrdering(false);
      navigate("/thankyou");
    }, 1000);
  }

  function incrementQuantity(id) {
    setCartItems((prevItems) =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }
  
  function decrementQuantity(id) {
    setCartItems((prevItems) =>
      prevItems.map(item => {
        if (item.id === id) {
          if (item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          }
          else {
            return null;
          }
        }
        return item;
      }).filter(Boolean)
    );
  }
  
  const value = { cartItems, addToCart, removeFromCart, clearCart, incrementQuantity, decrementQuantity, isOrdering, placeOrder };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

function useCartContext() {
  return useContext(CartContext);
}

export { CartProvider, useCartContext };