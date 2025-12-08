import { Link } from "react-router";
import useFetchGames from "../hooks/useFetchGames";
import GameCard from "../components/GameCard/GameCard";
import styles from "./HomePage.module.css"


function HomePage() {
  const { games, error, loading } = useFetchGames()

  const featuredGames = games.slice(0, 4);

  return (
    <div className={styles.homeContainer}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1> Get those games <br /> display'd. </h1>
          <p> No more backlogs. Get your game on. </p>
          <Link to="/shop">
            <button className={styles.ctaBtn}>Shop now</button>
          </Link>
        </div>
      </section>

      <section className={styles.featured}>
        <h2>Trending Now</h2>

        {loading && <p>Loading bestsellers...</p>}
        {error && <p>Could not load featured games.</p>}

        <div className={styles.grid}>
          {featuredGames.map(game => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default HomePage;