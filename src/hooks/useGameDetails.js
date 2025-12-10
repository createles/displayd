import { useState, useEffect } from "react";

const apiKey = import.meta.env.VITE_RAWG_API_KEY;

function useGameDetails(gameId) {
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        setLoading(true);

        const infoUrl = `https://api.rawg.io/api/games/${gameId}?key=${apiKey}`;
        const shotsUrl = `https://api.rawg.io/api/games/${gameId}/screenshots?key=${apiKey}`;
        const moviesUrl = `https://api.rawg.io/api/games/${gameId}/movies?key=${apiKey}`;

        const [infoRes, shotsRes, moviesRes] = await Promise.all([
          fetch(infoUrl),
          fetch(shotsUrl),
          fetch(moviesUrl),
        ]);

        if (!infoRes.ok) throw new Error("Failed to fetch game");

        const infoData = await infoRes.json();
        const shotsData = await shotsRes.json();
        const moviesData = await moviesRes.json();


        setGame({
          ...infoData,
          screenshots: shotsData.results,
          movies: moviesData.results
        });

      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (gameId) {
      fetchGameData();
    }
  }, [gameId]);

  return { game, loading, error };
}

export default useGameDetails