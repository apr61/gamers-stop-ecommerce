import { useState } from "react";
import "./pagination.css";

type PaginationProps = {
  totalCount: number;
  itemsPerPage: number;
  callback: (selectPage: number) => void;
  currentPage: number
};

const Pagination = ({
  totalCount,
  itemsPerPage,
  callback,
  currentPage = 1
}: PaginationProps) => {
  const [page, setPage] = useState<number>(currentPage);
  const pagesCount = Math.ceil(totalCount / itemsPerPage);

  const handleOnClick = (selectedPageNumber: number) => {
    if (
      selectedPageNumber >= 1 &&
      selectedPageNumber <= pagesCount &&
      selectedPageNumber !== page
    ) {
      setPage(selectedPageNumber);
      callback(selectedPageNumber);
    }
  };

  if (pagesCount <= 1) {
    return;
  }

  return (
    <div className="pagination">
      <button
        className={
          page === 1
            ? "pagination__item--remove"
            : "pagination__item pagination__item--prev"
        }
        onClick={() => handleOnClick(page - 1)}
      >
        &lt;&lt;
      </button>
      {[...Array(pagesCount)].map((_, i) => (
        <button
          key={i}
          className={
            page === i + 1
              ? "pagination__item pagination__item--active"
              : "pagination__item"
          }
          onClick={() => handleOnClick(i + 1)}
        >
          {i + 1}
        </button>
      ))}
      <button
        className={
          page === pagesCount
            ? "pagination__item--remove"
            : "pagination__item pagination__item--next"
        }
        onClick={() => handleOnClick(page + 1)}
      >
        &gt;&gt;
      </button>
    </div>
  );
};

export default Pagination;
