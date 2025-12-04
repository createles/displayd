import useFetchGames from "../hooks/useFetchGames";
import GameCard from "../components/GameCard/GameCard";
import { useSearchParams } from "react-router";

function ShopPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("search");

  const { games, error, loading } = useFetchGames(query);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading games: {error.message}</p>;

  const pageTitle = query
    ? `Search Results for "${query}`
    : "New & Trending";

  return (
    <div>
      <h1>{pageTitle}</h1>
      {games.length === 0 && query ? (
        <p>No games found for "{query}".</p>
      ) : (
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
      )
      }
    </div>
  );
}

export default ShopPage;
