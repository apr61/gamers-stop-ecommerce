import "./search.css";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { productSearch, selectProductSearch } from "../productSlice";

function Search() {
  const dispatch = useAppDispatch();
  const search = useAppSelector(selectProductSearch);
  const navigate = useNavigate();
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(productSearch(value));
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
        value={search}
      />
    </div>
  );
}

export default Search;
