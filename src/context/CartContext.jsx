import { createContext, useState, useContext } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // for showing/hiding cart
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

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

  // test log for cart items
  console.log("Current cart:", cartItems);

  return (
    <CartContext.Provider value={{ 
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      isCartOpen,
      openCart,
      closeCart
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

