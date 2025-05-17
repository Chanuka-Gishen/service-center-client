import { useState } from 'react';

const usePagination = (initialLimit = 10) => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(initialLimit);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setLimit(parseInt(event.target.value, 10));
  };

  return {
    page,
    limit,
    handleChangePage,
    handleChangeRowsPerPage,
    params: { page, limit },
  };
};

export default usePagination;
