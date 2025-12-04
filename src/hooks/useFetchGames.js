import { useEffect, useState } from "react";
import generatePrice from "../utils/generatePrice";

const apiKey = import.meta.env.VITE_RAWG_API_KEY;

// date helpers
const getCurrentDate = () => new Date().toISOString().split('T')[0];
const getLastYearDate = () => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 1);
  return date.toISOString().split('T')[0];
};

const currentDate = getCurrentDate();
const lastYearDate = getLastYearDate();

// Accept optional argument for search queries
function useFetchGames(searchQuery = null) {
  const [games, setGames] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    setGames([]);

    const fetchGames = async () => {
      try {
        let url = "";

        if (searchQuery) {
          url = `https://api.rawg.io/api/games?key=${apiKey}&search=${searchQuery}&page_size=20`;
        } else {
          url = `https://api.rawg.io/api/games?key=${apiKey}&dates=${lastYearDate},${currentDate}&ordering=-rating&page_size=20`;
        }

        const response = await fetch(url, { signal: controller.signal });

        if (!response.ok) throw new Error("API error");
        
        const data = await response.json();

        const gamesWithPrices = data.results.map(game => ({
          ...game,
          price: generatePrice(game)
        }));

        setGames(gamesWithPrices);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    };

    // call fetch games async call
    fetchGames();
  }, [searchQuery]);

  return {games, error, loading };
}

export default useFetchGames;