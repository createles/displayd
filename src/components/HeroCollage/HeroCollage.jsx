import styles from "./HeroCollage.module.css"
import useGenreImages from "../../hooks/useGenreImages"
import { Link } from "react-router"
import { useState, useEffect } from "react";

const GENRES = ["action", "role-playing-games-rpg", "adventure", "shooter", "indie", "platformer"]

function HeroCollage() {
  const { images } = useGenreImages(GENRES);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // image pre-load for optimal painting on DOM
  useEffect(() => {
    if (images.length > 0) {
      const imagePromises = images.map((src) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          // resolve regardless of load or fail
          img.onload = resolve;
          img.onerror = resolve;
        });
      });

      Promise.all(imagePromises).then(() => {
        setImagesLoaded(true);
      });
    }
  }, [images]);

  return (
    <div className={styles.heroContainer}>
      {/* image layer */}
      {/* hide grid until images are all fully loaded */}
      <div className={`${styles.imageGrid} ${imagesLoaded ? styles.visible : ''}`}>
        {images.map((imgUrl, index) => (
          <div
            key={index}
            className={styles.gridItem}
            style={{ backgroundImage: `url(${imgUrl})`}}
          />
        ))}
      </div>

      {/* gradient overlay */}
      <div className={styles.overlay}></div>

      <div className={styles.content}>
        <h1> Get those games <br /> display'd. </h1>
        <p> No more backlogs. Get your game on. </p>
        <Link to="/shop">
          <button className={styles.ctaBtn}>Shop now</button>
        </Link>
      </div>
    </div>
  )
}

export default HeroCollage;