import { useShoppingCart } from "../../context/CartContext";
import { useState } from "react";
import styles from "./CartSideItem.module.css"

function CartSideItem({ item }) {
  const { removeFromCart, updateQuantity } = useShoppingCart();

  const [imageError, setImageError] = useState(false);

  return (
    <div className={styles.cartSideItem}>
      {/* img or fallback img */}
      {!item.background_image || imageError ? (
        <div className={styles.imgFallback}>
          <span>{item.name}</span>
        </div>
      ) : (
        <img
          className={styles.cardImg}
          src={item.background_image}
          alt={item.name}
          // set image error on fetch error
          onError={() => setImageError(true)}
        />
      )}

      <p>{item.name}</p>
      <div className={styles.platforms}></div>
      <p className={styles.itemPrice}>{item.price}</p>
      <div className={styles.itemFor}></div>
      <div className={styles.itemBtns}>
        <button onClick={() => updateQuantity(item.id, -1)}>-</button>
        <button onClick={() => updateQuantity(item.id, 1)}>+</button>
        <button onClick={() => removeFromCart(item.id)}>x</button>
      </div>
    </div>
  );
}

export default CartSideItem;
