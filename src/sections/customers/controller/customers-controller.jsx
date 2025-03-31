import React, { useEffect, useMemo, useState } from 'react';
import { CustomersView } from '../view/customers-view';
import { CELL_TYPES } from 'src/constants/common-constants';
import useCustomer from 'src/hooks/useCustomer';

const CustomersController = () => {
  const tableKeys = [
    {
      header: 'Customer Name',
      value: 'customerName',
      type: CELL_TYPES.STRING,
    },
    {
      header: 'Customer Mobile',
      value: 'customerMobile',
      type: CELL_TYPES.STRING,
    },
    {
      header: 'Customer Email',
      value: 'customerEmail',
      type: CELL_TYPES.STRING,
    },
    {
      header: 'Registered Date',
      value: 'createdAt',
      type: CELL_TYPES.DATE,
    },
  ];

  const { isLoading, isLoadingAdd, fetchCustomers, registerCustomer, customers, customersCount } =
    useCustomer();

  const [selectedFilters, setSelectedFilters] = useState({
    name: '',
    mobile: '',
  });

  const memoizedSelectedFilters = useMemo(
    () => selectedFilters,
    [selectedFilters]
  );

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const [isOpenAdd, setIsOpenAdd] = useState(false);

  //------------------
  const queryParams = {page, limit, ...selectedFilters}
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

  const handleRegisterCustomer = async(data) => {
    const response = await registerCustomer(data)
    

    if(response){
      handleToggleAddDialog()
      
      await fetchCustomers(queryParams);
    }
  }

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
