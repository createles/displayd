import { NavLink } from "react-router";4
import { useShoppingCart } from "../../context/CartContext";
import styles from "../NavBar/NavBar.module.css"

function NavBar() {
  const { cartItems } = useShoppingCart();

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className={styles.nav}>
      <NavLink to={"/"}>Home</NavLink>
      <NavLink to={"/shop"}>Shop</NavLink>
      <NavLink to={"/cart"}>
        Cart
        {/* Only show badge if cart is not empty */}
        {totalItems > 0 && <span className={styles.badge}>({totalItems})</span>}
      </NavLink>
    </nav>
  )
}

export default NavBar;