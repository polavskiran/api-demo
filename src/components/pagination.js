import React from "react";

export const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
  const pageNumbers = [...Array(totalPages + 1).keys()].slice(1);

  const previousPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  const nextPage = () => {
    if (currentPage !== totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <nav>
      <ul className="pagination justify-content-center">
        <li className="page-item">
          <a onClick={() => previousPage()} className="page-link" href="#!">
            {"<"}
          </a>
        </li>
        {pageNumbers.map((pageNumber) => (
          <li
            key={pageNumber}
            className={`page-item ${
              currentPage === pageNumber ? "active" : ""
            }`}
          >
            <a
              onClick={() => setCurrentPage(pageNumber)}
              className="page-link"
              href="#!"
            >
              {pageNumber}
            </a>
          </li>
        ))}
        <li>
          <a onClick={() => nextPage()} className="page-link" href="#!">
            {">"}
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
