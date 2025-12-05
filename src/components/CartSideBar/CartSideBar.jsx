import { useShoppingCart } from "../../context/CartContext";
import { Link } from "react-router";
import styles from "./CartSideBar.module.css";
import CartSideItem from "./CartSideItem";

function CartSideBar() {
  const { cartItems, isCartOpen, closeCart } = useShoppingCart();

  const grandTotal = cartItems
    .reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0)
    .toFixed(2);

  return (
    <div className={`${styles.cart} ${isCartOpen ? styles.open : null}`}>
      <div className={styles.overlay} onClick={closeCart}></div>
      <div className={styles.sideBar}>
        <button className={styles.closeSideBar} onClick={closeCart}>
          Close
        </button>
        <h2>Your cart</h2>
        <div className={styles.sideList}>
          {cartItems.map((item) => (
            <CartSideItem key={item.id} item={item} />
          ))}

          <div className={styles.footer}>
            <p className={styles.grandTotal}>{grandTotal}</p>
            <Link to="/cart" onClick={closeCart}>
              <button className={styles.checkOutBtn}>Check out</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartSideBar;
