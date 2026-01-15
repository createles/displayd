import { Link } from "react-router";
import { useState } from "react";
import { useShoppingCart } from "../context/CartContext";
import CartPageItem from "../components/CartPage/CartPageItem";
import styles from "./CartPage.module.css"

function CartPage() {
  const { cartItems } = useShoppingCart();
  
  const grandTotal = cartItems
    .reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0)
    .toFixed(2);

  return (
    <div className={styles.cartContainer}>
      <h1>Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className={styles.emptyCart}>
          <p>Your cart is empty.</p>
          <Link to={"/shop"}>Go back to shop</Link>
        </div>
      ) : (
        <div className={styles.cartCheckout}>
          <div className={styles.cartList}>
            {cartItems.map((item) => (
              <CartPageItem 
                key={item.id}
                item={item}
              />
            ))}
          </div>
          <p>{grandTotal}</p>
          <button>Checkout</button>
        </div>
      )}
    </div>
  );
}

export default CartPage;