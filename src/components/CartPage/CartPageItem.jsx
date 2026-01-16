import { useState } from "react";
import { useShoppingCart } from "../../context/CartContext";
import styles from "./CartPageItem.module.css";

function CartPageItem({item}) {
  const { removeFromCart, updateQuantity } = useShoppingCart();

  const [imageError, setImageError] = useState(false);
  const [isGift, setIsGift] = useState(false);

  const [recipients, setRecipients] = useState([]);

  const addRecipient = () => {
    if (recipients.length < item.quantity) {
      setRecipients(prev => [...prev, { id: Date.now(), name: "" }]);
    }
  };

  const removeRecipient = (idToDelete) => {
    const updatedList = recipients.filter(r => r.id !== idToDelete);
    setRecipients(updatedList);

    if (updatedList.length === 0) {
      setIsGift(false);
    }
  };

  const handleGiftToggle = (e) => {
    const checked = e.target.checked;
    setIsGift(checked);

    if (checked) {
      setRecipients([{ id: Date.now(), name: ""}]);
    } else {
      setRecipients([]);
    }
  }

  return (
    <div key={item.id} className={styles.cartItem}>
      {/* img or fallback img logic */}
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

        <label htmlFor={`gifting-${item.id}`}> 
          Gift a copy? 
          <input 
          type="checkbox" 
          id={`gifting-${item.id}`} 
          checked={isGift} 
          onChange={handleGiftToggle}
          /> 
        </label>

        {isGift && 
          (
            <div className={styles.giftSection}>
              {recipients.map((recipient) => (
                <div key={recipient.id} className={styles.giftRow}>
                  <input
                    type="text" 
                    placeholder="input recipient's username..." 
                    className={styles.giftInput}
                  />

                  <button
                    type="button"
                    onClick={() => removeRecipient(recipient.id)}
                    className={styles.removeRecipientBtn}
                  > 
                    X 
                  </button>
                </div>
              ))}

              {recipients.length < item.quantity && (
                <button 
                type="button" 
                onClick={addRecipient}>
                   + add a recipient... 
                </button>
              )}
            </div>
          )}
        <p> {parseFloat(item.quantity * item.price).toFixed(2)} </p>
        <div className={styles.cartBtns}>
          <button onClick={() => updateQuantity(item.id, -1)}>-</button>
          <p>{item.quantity}</p>
          <button onClick={() => updateQuantity(item.id, 1)}>+</button>
          <button onClick={() => removeFromCart(item.id)}>x</button>
        </div>
      </div>
    </div>
  );
}

export default CartPageItem;
