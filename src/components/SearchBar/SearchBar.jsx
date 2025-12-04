import styles from "./SearchBar.module.css"
import { useState } from "react"
import { useNavigate } from "react-router"

function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/shop?search=${query}`);
    setQuery("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
      type="text"
      placeholder="Search games..."
      value={query}
      onChange={(e) => setQuery(e.target.value)} 
      />
    </form>
  );
}

export default SearchBar;