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
  if (error) return <p>Error loading game.</p>;

  const price = generatePrice(game);
  
  const gameWithPrice = { ...game, price };

  return (
    <div className={styles.gameDetailsContainer}>
      
      {/* Game hero banner */}
      <div className={styles.banner} style={{ backgroundImage: `url(${game.background_image})` }}>
        <div className={styles.bannerOverlay}>
          <h1>{game.name}</h1>
          <button className={styles.addBtn} onClick={() => addToCart(gameWithPrice)}>
            Add to cart - ${price}
          </button>
        </div>
      </div>

      {/* Game details */}
      <div className={styles.content}>

        {/* Description & Media */}
        <div className={styles.mainColumn}>
          <div 
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: game.description }}
          />

          {/* Screenshots */}
          {game.screenshots && game.screenshots.length > 0 && (
            <div className={styles.gallery}>
              <h3>Screenshots</h3>
              <div className={styles.grid}>
                {game.screenshots.map(shot => (
                  <img key={shot.id} src={shot.image} alt="Screenshot" className={styles.screenshot} />
                ))}
              </div>
            </div>
          )}

          {/* Trailers / Videos */}
          {/* RAWG api has sparse video data; try using game.clip if no videos */}
          {((game.movies && game.movies.length > 0) || game.clip) && (
            <div className={styles.videoSection}>
              <h3>Trailers</h3>
              <video 
                controls 
                className={styles.video} 
                poster={game.movies?.length > 0 ? game.movies[0].preview : game.clip?.preview}>
                <source 
                src={game.movies?.length > 0 ? game.movies[0].data.max : game.clip?.clip} 
                type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
        </div>

        {/* Stats Sidebar */}
        <div className={styles.sidebar}>
          <div className={styles.statBox}>
            <p><strong>Released:</strong> {game.released} </p>
            <p><strong>Rating:</strong> ⭐ {game.rating} / 5 </p>

            <div className={styles.statItem}>
              <strong>Genres:</strong>
              <span>{game.genres?.map(genre => genre.name).join(", ")}</span>
            </div>

            <div className={styles.statItem}>
              <strong>Developers:</strong>
              <span>{game.developers?.map(dev => dev.name).join(", ")}</span>
            </div>

            <div className={styles.statItem}>
              <strong>Platforms:</strong>
               <ul>
                 {game.parent_platforms?.map(({ platform }) => (
                   <li key={platform.id}>{platform.name}</li>
                 ))}
               </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
 ) 
}

export default GameDetails