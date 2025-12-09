import { Link } from "react-router";
import useFetchGames from "../hooks/useFetchGames";
import GameCard from "../components/GameCard/GameCard";
import styles from "./HomePage.module.css"
import HeroCollage from "../components/HeroCollage/HeroCollage";


function HomePage() {
  const { games, error, loading } = useFetchGames()

  const featuredGames = games.slice(0, 4);

  return (
    <div className={styles.homeContainer}>
      <section className={styles.hero}>
      <HeroCollage/>
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