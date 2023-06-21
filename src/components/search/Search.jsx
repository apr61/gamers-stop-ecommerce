import "./search.css";
import { AiOutlineSearch } from "react-icons/ai";
import { useProducts } from "../../context/ProductContext";
import { useNavigate } from "react-router-dom";

function Search() {
  const { productsState, productDispatch } = useProducts();
  const navigate = useNavigate();
  const handleSearchChange = (e) => {
    const value = e.target.value;
    productDispatch({ type: "SEARCH", payload: value });
    navigate("/store");
  };
  return (
    <div className="search-box">
      <AiOutlineSearch />
      <input
        type="search"
        className="search-box__input"
        onChange={(e) => handleSearchChange(e)}
        placeholder="Search"
        value={productsState.search}
      />
    </div>
  );
}

export default Search;
