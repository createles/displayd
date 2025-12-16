import styles from "./SearchBar.module.css"
import { useState } from "react"
import { useNavigate } from "react-router"
import { IoSearch } from "react-icons/io5";

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
      <div className={styles.container}>
        <input 
      type="text"
      placeholder="Search games..."
      value={query}
      onChange={(e) => setQuery(e.target.value)} 
      />
      <span className={styles.searchIcon}><IoSearch/></span>
      </div>
    </form>
  );
}

export default SearchBar;