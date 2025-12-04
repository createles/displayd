import { useState, useEffect } from "react";

const apiKey = import.meta.env.VITE_RAWG_API_KEY;

function useGameDetails(gameId) {
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://api.rawg.io/api/games/${gameId}?key=${apiKey}`
        );

        if (!response.ok) throw new Error("Failed to fetch game");
        const data = await response.json();
        setGame(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (gameId) {
      fetchGame();
    }
  }, [gameId]);

  return { game, loading, error };
}

export default useGameDetails