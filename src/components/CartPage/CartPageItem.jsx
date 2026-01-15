import { useState } from "react";
import { useShoppingCart } from "../../context/CartContext";
import styles from "./CartPageItem.module.css";

function CartPageItem({item}) {
  const { removeFromCart, updateQuantity } = useShoppingCart();

  const [imageError, setImageError] = useState(false);
  const [isGift, setIsGift] = useState(false);
  const [giftCount, setGiftCount] = useState(0);

  return (
    <div key={item.id} className={styles.cartItem}>
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
      <div className={styles.itemInfo}>
        <p> {item.name} </p>

        <label for="gifting"> Gift a copy? <input type="checkbox" id="gifting" name="gifting" value={true} onChange={(e) => setIsGift(e.target.checked)}></input> 
        </label>
        {isGift && 
          // {setGiftCount(1)} continue conditional render (probably via an event handler)
          (
            <>
              <input type="text" placeholder="input recipient's username..." className={styles.giftInput}></input>
              <button type="button"> add a recipient... </button>
            </>
          )}
        <p> {parseFloat(item.quantity * item.price).toFixed(2)} </p>
        <div className={styles.cartBtns}>
          <button onClick={() => updateQuantity(item.id, -1)}>-</button>
          <button onClick={() => updateQuantity(item.id, 1)}>+</button>
          <button onClick={() => removeFromCart(item.id)}>x</button>
        </div>
      </div>
    </div>
  );
}

export default CartPageItem;
