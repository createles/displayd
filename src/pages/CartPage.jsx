import { Link } from "react-router";
import { useShoppingCart } from "../context/CartContext";
import styles from "./CartPage.module.css"

function CartPage() {
  const { cartItems, removeFromCart, updateQuantity } = useShoppingCart();

  const grandTotal = cartItems.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0).toFixed(2);

  return (
    <div className={styles.cartContainer}>
      <h1>Your Cart</h1>

      {cartItems.length === 0 
        ? <div className={styles.emptyCart}>
          <p>Your cart is empty.</p>
          <Link to={"/shop"}>Go back to shop</Link>
          </div>
        : <div className={styles.cartCheckout}> 
            <div className={styles.cartList}>
              {cartItems.map((item) => 
                <div key={item.id} className={styles.cartItem}>
                  <p>{item.name}---{item.quantity}---total price: {parseFloat(item.quantity * item.price).toFixed(2)}</p>
                  <div className={styles.cartBtns}>
                    <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                    <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                    <button onClick={() => removeFromCart(item.id)}>x</button>
                  </div>
                </div>
              )}
            </div>
            <p>{grandTotal}</p>
            <button>Checkout</button>
          </div>
        }
    </div>
  )
}

export default CartPage;