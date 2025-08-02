import React, { useEffect, useMemo, useState } from 'react';
import { CustomersView } from '../view/customers-view';
import useCustomer from 'src/hooks/useCustomer';
import { NAVIGATION_ROUTES } from 'src/routes/navigation-routes';
import { useNavigate } from 'react-router-dom';
import usePagination from 'src/hooks/usePagination';

const CustomersController = () => {
  const tableKeys = [
    'Customer Name',
    'Customer Mobile',
    'Secondary Mobile',
    'Customer Vehicles',
    'Registered Date',
  ];

  const navigate = useNavigate();

  const {
    customers,
    customersCount,
    uniqueCustomersCount,
    repeatingCustomersCount,
    newCustomersCount,
    isLoading,
    isLoadingAdd,
    isLoadingCustomersCount,
    isLoadingRepeatingCustomersCount,
    isLoadingNewCustomersCount,
    fetchCustomers,
    registerCustomer,
    getUniqueCustomersCount,
    getRepeatingCustomersCount,
    getNewCustomersCount,
  } = useCustomer();

  const [selectedFilters, setSelectedFilters] = useState({
    name: '',
    mobile: '',
    secMobile: '',
    vehicleNumber: '',
  });

  const memoizedSelectedFilters = useMemo(() => selectedFilters, [selectedFilters]);

  const pagination = usePagination();

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const [isOpenAdd, setIsOpenAdd] = useState(false);

  //------------------
  const queryParams = { page: pagination.page, limit: pagination.limit, ...selectedFilters };
  //------------------

  const handleChangeSearch = (e) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [e.target.name]: e.target.value,
    }));
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
    getUniqueCustomersCount();
    getRepeatingCustomersCount();
    getNewCustomersCount();
  }, []);

  useEffect(() => {
    fetchCustomers(queryParams);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.page, pagination.limit, memoizedSelectedFilters]);

  return (
    <CustomersView
      customers={customers}
      customersCount={customersCount}
      selectedFilters={selectedFilters}
      uniqueCustomersCount={uniqueCustomersCount}
      repeatingCustomersCount={repeatingCustomersCount}
      newCustomersCount={newCustomersCount}
      isLoading={isLoading}
      isLoadingAdd={isLoadingAdd}
      isLoadingCustomersCount={isLoadingCustomersCount}
      isLoadingRepeatingCustomersCount={isLoadingRepeatingCustomersCount}
      isLoadingNewCustomersCount={isLoadingNewCustomersCount}
      isOpenAdd={isOpenAdd}
      handleChangeSearch={handleChangeSearch}
      handleNavigateCustomer={handleNavigateCustomer}
      handleToggleAddDialog={handleToggleAddDialog}
      handleAddCustomer={handleRegisterCustomer}
      tableKeys={tableKeys}
      pagination={pagination}
    />
  );
};

export default CustomersController;
