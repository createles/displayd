import { createContext, useState, useContext, useRef } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // for showing/hiding cart
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  // Handle toast state
  const [toast, setToast] = useState(null);
  
  // Hold toast timer's id
  const timerRef = useRef(null);

  function addToCart(game) {
    const isItemInCart = cartItems.some((item) => item.id === game.id);

    if (isItemInCart) {
      setCartItems((prevItems) => 
        prevItems.map((item) => 
          item.id === game.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
        )
      );
    } else {
      setCartItems((prevItems) => 
        [ ...prevItems, { ...game, quantity: 1}]
      )
    }

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }


    setToast({
      id: Date.now(),
      message: `Added "${game.name}" to cart`
    });

    // automatically clear toast message after 3 seconds
    timerRef.current = setTimeout(() => {
      setToast(null);
      timerRef.current = null;
    }, 3000);
  }

  // Manually close ToastNotif
  function closeToast() {
    setToast(null);
  }

  function removeFromCart(gameId) {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== gameId)
    );
  }

  function updateQuantity(gameId, amount) {
    setCartItems((prevItems) => {
      const updatedCart = prevItems.map((item) => {
        if (item.id === gameId) {
          return { ...item, quantity: item.quantity + amount };
        }
        
        return item;
      });

      return updatedCart.filter((item) => item.quantity > 0);
    });
  }

  return (
    <CartContext.Provider value={{ 
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      isCartOpen,
      openCart,
      closeCart,
      toast,
      closeToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export function useShoppingCart() {
  return useContext(CartContext);
};

