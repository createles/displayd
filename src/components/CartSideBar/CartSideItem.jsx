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

      <div className={styles.itemDetails}>
        <p>{item.name}</p>  
        <div className={styles.priceBtns}>
          <p className={styles.itemPrice}>{item.price}</p>
          <div className={styles.itemBtns}>
            <button className={styles.quantityBtn} onClick={() => updateQuantity(item.id, -1)}>-</button>
            <p className={styles.quantity}>{item.quantity}</p>
            <button className={styles.quantityBtn} onClick={() => updateQuantity(item.id, 1)}>+</button>
          </div>
        </div>
        <button className={styles.delete} onClick={() => removeFromCart(item.id)}>x</button>
      </div>
    </div>
  );
}

export default CartSideItem;
