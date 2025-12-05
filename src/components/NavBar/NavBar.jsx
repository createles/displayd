import { Link } from "react-router";
import { useShoppingCart } from "../../context/CartContext";
import styles from "../NavBar/NavBar.module.css"
import SearchBar from "../SearchBar/SearchBar";

function NavBar() {
  const { cartItems, openCart} = useShoppingCart();

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className={styles.nav}>
      <Link to={"/"}>Home</Link>
      <Link to={"/shop"}>Shop</Link>
      <button onClick={openCart}>
        Cart
        {/* Only show badge if cart is not empty */}
        {totalItems > 0 && <span className={styles.badge}>({totalItems})</span>}
      </button>
      <SearchBar></SearchBar>
    </nav>
  )
}

export default NavBar;