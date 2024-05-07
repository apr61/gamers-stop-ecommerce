import "./search.css";
import SearchIcon from "@mui/icons-material/Search";
import { createSearchParams, useNavigate } from "react-router-dom";
import { ChangeEvent } from "react";
import { useFilteredProducts } from "../../../hooks/useFilteredProducts";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  closeSearchBar,
  openSearchBar,
  selectSearchBarOpen,
} from "../../theme/themeSlice";

function Search() {
  const navigate = useNavigate();
  const { search, setProductsSearchParams } = useFilteredProducts();
  const isSearchBarOpen = useAppSelector(selectSearchBarOpen);
  const dispatch = useAppDispatch();

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
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

  const handleSearchBarStatus = () => {
    if (isSearchBarOpen) {
      dispatch(closeSearchBar());
    } else {
      dispatch(openSearchBar());
    }
  };

  return (
    <div className={`search-box ${isSearchBarOpen ? "search-box--open" : ""}`}>
      <SearchIcon
        className="search-box__icon"
        onClick={handleSearchBarStatus}
      />
      <input
        type="search"
        className="search-box__input"
        onChange={handleSearchChange}
        placeholder="Search"
        value={search}
        autoFocus={isSearchBarOpen}
      />
    </div>
  );
}

export default Search;