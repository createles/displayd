import { useState, useEffect } from "react";

const apiKey = import.meta.env.VITE_RAWG_API_KEY;

function useGenreImages(genreSlugs) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const genreKey = genreSlugs.join(",");

  useEffect(() => {

    const slugsToFetch = genreKey.split(",");

    async function FetchImages() {
      try {
        setLoading(true);

        const promises = slugsToFetch.map(slug =>
          fetch(`https://api.rawg.io/api/games?key=${apiKey}&genres=${slug}&ordering=-metacritic&page_size=2`)
            .then(res => res.json())
        );

        const results = await Promise.all(promises);

        const allImages = results.flatMap(data => 
          data.results.map(game => game.background_image)
        );

        // shuffle array of genres
        const shuffled = allImages.sort(() => 0.5 - Math.random())

        setImages(shuffled);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    FetchImages();
  }, [genreKey])

  return { images, loading, error };
}

export default useGenreImages;