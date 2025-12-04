import useFetchGames from "../hooks/useFetchGames";
import { useShoppingCart } from "../context/CartContext";
import GameCard from "../components/GameCard/GameCard";

function ShopPage() {
  const { games, error, loading } = useFetchGames();
  const { addToCart } = useShoppingCart();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading games: {error.message}</p>;

  return (
    <div>
      <h1>Shop Page</h1>

      {/* Temporary Grid for testing */}
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
    </div>
  );
}

export default ShopPage;
