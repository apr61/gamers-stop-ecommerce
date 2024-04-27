import "./search.css";
import SearchIcon from "@mui/icons-material/Search";
import { useProducts } from "../../../context/ProductContext";
import { useNavigate } from "react-router-dom";
import { ChangeEvent } from "react";

function Search() {
  const { productsState, productDispatch } = useProducts();
  const navigate = useNavigate();
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    productDispatch({ type: "SEARCH", payload: value });
    navigate("/store");
  };
  return (
    <div className="search-box">
      <SearchIcon />
      <input
        type="search"
        className="search-box__input"
        onChange={handleSearchChange}
        placeholder="Search"
        value={productsState.search}
      />
    </div>
  );
}

export default Search;
