import React, { useEffect, useMemo, useState } from 'react';
import { CustomersView } from '../view/customers-view';
import useCustomer from 'src/hooks/useCustomer';
import { NAVIGATION_ROUTES } from 'src/routes/navigation-routes';
import { useNavigate } from 'react-router-dom';

const CustomersController = () => {
  const tableKeys = ['Customer Name', 'Customer Mobile', 'Customer Vehicles', 'Registered Date'];

  const navigate = useNavigate();

  const { isLoading, isLoadingAdd, fetchCustomers, registerCustomer, customers, customersCount } =
    useCustomer();

  const [selectedFilters, setSelectedFilters] = useState({
    name: '',
    mobile: '',
    vehicleNumber: '',
  });

  const memoizedSelectedFilters = useMemo(() => selectedFilters, [selectedFilters]);

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const [isOpenAdd, setIsOpenAdd] = useState(false);

  //------------------
  const queryParams = { page, limit, ...selectedFilters };
  //------------------

  const handleChangeSearch = (e) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setLimit(parseInt(event.target.value, 10));
  };

  const handleToggleAddDialog = () => {
    setIsOpenAdd(!isOpenAdd);
  };

  const handleNavigateCustomer = (data) => {
    navigate(NAVIGATION_ROUTES.customers.Details.base, {
      state: {
        id: data._id,
      },
    });
  };

  const handleRegisterCustomer = async (data) => {
    const response = await registerCustomer(data);

    if (response) {
      handleToggleAddDialog();

      handleNavigateCustomer(response);
    }
  };

  useEffect(() => {
    fetchCustomers(queryParams);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit, memoizedSelectedFilters]);

  return (
    <CustomersView
      customers={customers}
      selectedFilters={selectedFilters}
      isLoading={isLoading}
      isLoadingAdd={isLoadingAdd}
      isOpenAdd={isOpenAdd}
      handleChangeSearch={handleChangeSearch}
      handleNavigateCustomer={handleNavigateCustomer}
      handleToggleAddDialog={handleToggleAddDialog}
      handleAddCustomer={handleRegisterCustomer}
      tableKeys={tableKeys}
      limit={limit}
      page={page}
      documentCount={customersCount}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
};

export default CustomersController;
