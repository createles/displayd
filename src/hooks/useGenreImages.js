import { useState, useEffect } from "react";

const apiKey = import.meta.env.VITE_RAWG_API_KEY;

function useGenreImages(genreSlugs) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ensure we pass a valid string
  const genreKey = (genreSlugs || []).join(",");

  useEffect(() => {
    // set up ignore flag to prevent race conditions
    let ignore = false;
    const slugsToFetch = genreKey.split(",");

    async function FetchImages() {
      try {
        setLoading(true);

        // fetch genres
        const promises = slugsToFetch.map((slug) =>
          fetch(`https://api.rawg.io/api/genres/${slug}?key=${apiKey}`)
            .then((res) => {
                if (!res.ok) throw new Error(`Failed to fetch genre: ${slug}`);
                return res.json();
            })
        );

        const results = await Promise.all(promises);

        if (!ignore) {
          // take poster images from each genre
            const genrePosters = results.map((data) => data.image_background);

            // shuffle with fisher-yates algo, order of posters become random
            const shuffled = [...genrePosters];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }

            setImages(shuffled);
        }
      } catch (err) {
        if (!ignore) setError(err);
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    if (genreKey) {
        FetchImages();
    }

    return () => {
      ignore = true;
    };
  }, [genreKey]);

  return { images, loading, error };
}

export default useGenreImages;