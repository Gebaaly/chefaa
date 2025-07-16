export default function PaginatedItems({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  limit,
  onLimitChange,
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const sidePages = 2;

    for (let i = 1; i <= Math.min(2, totalPages); i++) {
      pages.push(i);
    }

    if (currentPage > 4) pages.push("start-ellipsis");

    for (
      let i = Math.max(3, currentPage - sidePages);
      i <= Math.min(totalPages - 2, currentPage + sidePages);
      i++
    ) {
      pages.push(i);
    }

    if (currentPage < totalPages - 3) pages.push("end-ellipsis");

    for (let i = Math.max(totalPages - 1, 3); i <= totalPages; i++) {
      if (!pages.includes(i)) {
        pages.push(i);
      }
    }

    return pages.map((page, index) =>
      typeof page === "string" ? (
        <li key={index} className="page-item disabled">
          <span className="page-link">...</span>
        </li>
      ) : (
        <li
          key={page}
          className={`page-item ${currentPage === page ? "active" : ""}`}
        >
          <button className="page-link" onClick={() => handlePageChange(page)}>
            {page}
          </button>
        </li>
      )
    );
  };

  return (
    <div className="d-flex justify-content-between align-items-center mt-4 flex-wrap gap-2">
      <nav>
        <ul className="pagination justify-content-center m-0">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </button>
          </li>
          {renderPageNumbers()}
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>

      <div className="d-flex align-items-center">
        <label htmlFor="limitSelect" className="me-2 mb-0">
          Rows per page:
        </label>
        <select
          id="limitSelect"
          className="form-select"
          style={{ width: "100px" }}
          value={limit}
          onChange={(e) => {
            onLimitChange(Number(e.target.value));
          }}
        >
          {[5, 10, 15, 20].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
