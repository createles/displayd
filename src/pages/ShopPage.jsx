import useFetchGames from "../hooks/useFetchGames";
import GameCard from "../components/GameCard/GameCard";
import { useSearchParams } from "react-router";
import { useEffect, useRef } from "react";

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
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget, loadMore, loading])

  if (error) return <p>Error loading games: {error.message}</p>;

  const pageTitle = query
    ? `Search Results for "${query}`
    : "New & Trending";

  return (
    <div>
      <h1>{pageTitle}</h1>
      {games.length === 0 && query && !loading ? (
        <p>No games found for "{query}".</p>
      ) : (
      <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        {games.map((game) => (
          <GameCard key={game.id} game={game}/>
        ))}
      </div>

      {loading && <p style={{textAlign: "center"}}>Loading games...</p>}
      
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
