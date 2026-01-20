import { Link } from "react-router";
import { useShoppingCart } from "../../context/CartContext";
import styles from "../NavBar/NavBar.module.css";
import SearchBar from "../SearchBar/SearchBar";
import {
  IoGameControllerOutline,
  IoCartOutline,
  IoHomeOutline,
} from "react-icons/io5";
import logoImg from "../../assets/images/logo/toon-dp-outline-green.svg";

function NavBar() {
  const { cartItems, openCart } = useShoppingCart();

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.logoLink}>
        <img
          src={logoImg}
          alt="displayd logo"
          className={styles.siteLogo}
        />
      </Link>
      <Link to={"/"} className={styles.navBtn}>
        <IoHomeOutline />
      </Link>
      <Link to={"/shop"} className={styles.navBtn}>
        <IoGameControllerOutline />
      </Link>
      <button
        onClick={openCart}
        className={`${styles.navBtn} ${styles.cartBtn}`}
      >
        <IoCartOutline />
        {/* Only show badge if cart is not empty */}
        {totalItems > 0 && <span className={styles.badge}>{totalItems}</span>}
      </button>
      <SearchBar />
    </nav>
  );
}

export default NavBar;
