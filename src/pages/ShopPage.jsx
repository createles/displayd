import useFetchGames from "../hooks/useFetchGames";
import GameCard from "../components/GameCard/GameCard";
import { useSearchParams } from "react-router";
import { useEffect, useRef } from "react";
import styles from "./ShopPage.module.css";
import LoadingAnim from "../components/LoadingAnim/LoadingAnim"

function ShopPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("search");

  const { games, error, loading, loadMore } = useFetchGames(query);

  const observerTarget = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          loadMore();
        }
      }, { threshold: 0.8}
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current)
    }

    return () => {
      if (observerTarget.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget, loadMore, loading])

  if (error) return <p>Error loading games: {error.message}</p>;

  const pageTitle = query
    ? `Search Results for "${query}"`
    : "New & Trending";

  return (
    <div className={styles.shopPage}>
      <h1 className={styles.pageTitle}>{pageTitle}</h1>
      {games.length === 0 && query && !loading ? (
        <p>No games found for "{query}".</p>
      ) : (
      <>
      <div
        className={styles.results}
      >
        {games.map((game) => (
          <GameCard key={game.id} game={game}/>
        ))}
      </div>

      {loading && 
      <div className={`${styles.loadingCont} ${games.length === 0 ? styles.initialLoad : ''}`}>
        <LoadingAnim/>
        <p className={styles.loadingText}>Loading games...</p>
      </div>
      }
      
      {!loading && (
        <div ref={observerTarget} style={{ height: "20px", background: "transparent" }}></div>
      )}
      </>
      )
      }
    </div>
  );
}

export default ShopPage;
