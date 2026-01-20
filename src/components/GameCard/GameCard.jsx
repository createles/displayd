import { useState } from "react";
import styles from "./GameCard.module.css";
import { useShoppingCart } from "../../context/CartContext";
import { Link } from "react-router";

function GameCard({ game }) {
  const { addToCart } = useShoppingCart();

  const [imageError, setImageError] = useState(false);
  
  return (
    <div className={styles.card}>
      <Link to={`/shop/${game.id}`}>
        {/* provide fallback div if missing background_image or fetching error */}
        {(!game.background_image || imageError) ? (
          <div className={styles.imgFallback}>
            <span>{game.name}</span>
          </div>
        ) : (
          <img
          className={styles.cardImg}
          src={game.background_image}
          alt={game.name}
          // set image error on fetch error
          onError={() => setImageError(true)}
          />
        )}
      </Link>
      <Link to={`/shop/${game.id}`}>
        <h3 className={styles.gameTitle}>{game.name}</h3>
      </Link>
      <div className={styles.priceBtn}>
        <p className={styles.price}>${game.price}</p>
        <button className={styles.addBtn} onClick={() => addToCart(game)}>Add to Cart</button>
      </div>
    </div>
  )
}

export default GameCard;
