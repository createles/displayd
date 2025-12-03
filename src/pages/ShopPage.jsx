import useFetchGames from "../hooks/useFetchGames";
import { useShoppingCart } from "../context/CartContext";

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
          // Always use unique ID as key
          <div
            key={game.id}
            style={{ border: "1px solid #ccc", padding: "10px" }}
          >
            {/* Display the image to verify API data quality */}
            <img
              src={game.background_image}
              alt={game.name}
              style={{ width: "100%", height: "150px", objectFit: "cover" }}
            />

            <h3>{game.name}</h3>

            {/* Display generated price */}
            <p style={{ fontWeight: "bold" }}>${game.price}</p>

            <button onClick={() => addToCart(game)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShopPage;
