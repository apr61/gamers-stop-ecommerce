import "./search.css";
import SearchIcon from "@mui/icons-material/Search";
import { createSearchParams, useNavigate } from "react-router-dom";
import { ChangeEvent } from "react";
import { useFilteredProducts } from "../../../hooks/useFilteredProducts";

function Search() {
  const navigate = useNavigate();
  const { search, setProductsSearchParams } = useFilteredProducts();

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setProductsSearchParams(
      (prev) => {
        if (value.length > 0) {
          prev.set("search", value);
        } else {
          prev.delete("search");
        }
        return prev;
      },
      { replace: true }
    );
    navigate({
      pathname: "/store",
      search: createSearchParams({ search: value }).toString(),
    });
  };

  return (
    <div className="search-box">
      <SearchIcon className="search-box__icon"/>
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
