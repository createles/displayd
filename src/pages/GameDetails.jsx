import { useParams } from "react-router"
import useGameDetails from "../hooks/useGameDetails"
import generatePrice from "../utils/generatePrice"
import { useShoppingCart } from "../context/CartContext"
import styles from "./GameDetails.module.css"

function GameDetails() {
  const { id } = useParams();
  const { game, loading, error } = useGameDetails(id);
  const { addToCart } = useShoppingCart();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const price = generatePrice(game);
  
  const gameWithPrice = { ...game, price };

  return (
    <div className={styles.gameDetailsContainer}>
      <h1>{game.name}</h1>
      <img src={game.background_image} alt={game.name} />
      <div dangerouslySetInnerHTML={{ __html: game.description }}></div>
      <h2>${price}</h2>
      <button onClick={() => addToCart(gameWithPrice)}>
        Add to cart
      </button>
    </div>
 ) 
}

export default GameDetails