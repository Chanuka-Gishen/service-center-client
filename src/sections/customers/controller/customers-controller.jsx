import React, { useState } from 'react';
import { CustomersView } from '../view/customers-view';
import { CELL_TYPES } from 'src/constants/common-constants';

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
      header: 'Customer NIC',
      value: 'customerNIC',
      type: CELL_TYPES.STRING,
    },
    {
      header: 'Registered Date',
      value: 'createdAt',
      type: CELL_TYPES.STRING,
    },
  ];

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [documentCount, setDocumentCount] = useState(0);

  const [customers, setCustomers] = useState([]);

  const [isOpenAdd, setIsOpenAdd] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingAdd, setIsLoadingAdd] = useState(false);

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

  const handleAddCustomer = async () => {};

  const handleFetchCustomers = async () => {};

  return (
    <CustomersView
      customers={customers}
      isLoading={isLoading}
      isLoadingAdd={isLoadingAdd}
      isOpenAdd={isOpenAdd}
      handleToggleAddDialog={handleToggleAddDialog}
      handleAddCustomer={handleAddCustomer}
      tableKeys={tableKeys}
      limit={limit}
      page={page}
      documentCount={documentCount}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
};

export default CustomersController;
