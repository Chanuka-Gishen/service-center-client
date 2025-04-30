import React, { useEffect, useState } from 'react';
import { JobsView } from '../view/jobs-view';
import { useNavigate } from 'react-router-dom';
import { NAVIGATION_ROUTES } from 'src/routes/navigation-routes';
import useWorkOrder from 'src/hooks/useWorkorder';

const JobsController = () => {
  const tableTitles = [
    'Customer Name',
    'Vehicle Number',
    'Mileage',
    'Invoice Number',
    'Payment Status',
    'Total Amount',
    'Balance Amount',
    'Created At',
  ];

  const navigate = useNavigate();
  const { jobs, jobsCount, isLoadingJobs, fetchWorkOrders } = useWorkOrder();

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const [searchParams, setSearchParams] = useState({
    name: '',
    vehicleNo: '',
    invoiceNo: '',
    paymentStatus: '',
  });

  //------------------
  const queryParams = { page, limit, ...searchParams };
  //------------------

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setLimit(parseInt(event.target.value, 10));
  };

  const handleChangeSearchParam = (event) => {
    setSearchParams({
      ...searchParams,
      [event.target.name]: event.target.value,
    });
  };

  const handleDeleteSearchParam = (filterName) => {
    setSearchParams((prevFilters) => ({
      ...prevFilters,
      [filterName]: "",
    }));
  };

  const handleOnRowClick = (data) => {
    navigate(NAVIGATION_ROUTES.jobs.details.base, {
      state: {
        id: data._id,
      },
    });
  };

  useEffect(() => {
    fetchWorkOrders(queryParams);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit, searchParams]);

  return (
    <JobsView
      tableTitles={tableTitles}
      searchParams={searchParams}
      jobs={jobs}
      jobsCount={jobsCount}
      isLoadingJobs={isLoadingJobs}
      handleOnRowClick={handleOnRowClick}
      limit={limit}
      page={page}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
      handleChangeSearchParam={handleChangeSearchParam}
      handleDeleteSearchParam={handleDeleteSearchParam}
    />
  );
};

export default JobsController;
