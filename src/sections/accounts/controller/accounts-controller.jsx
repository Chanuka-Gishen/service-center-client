import React, { useEffect, useState } from 'react';
import { AccountsView } from '../view/accounts-view';
import usePayment from 'src/hooks/usePayment';
import usePagination from 'src/hooks/usePagination';

const tableTitles = [
  'Type',
  'Source',
  'Notes',
  'Amount',
  'Method',
  'Transaction ID',
  'Recorded By',
  'Created At',
];

const deletedTableTitles = [
  'Type',
  'Source',
  'Notes',
  'Amount',
  'Method',
  'Transaction ID',
  'Deleted By',
  'Deleted At',
];

const AccountsController = () => {
  const {
    payments,
    deletedPayments,
    paymentsCount,
    deletedPaymentsCount,
    isLoadingPayments,
    isLoadingDeletedPayments,
    isLoadingCreateExp,
    isLoadingCreateInc,
    isLoadingDeleteManPayment,
    fetchPayments,
    fetchDeletedPayments,
    createExpensesPayment,
    createIncomePayment,
    deleteManualPayment,
  } = usePayment();

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const deleteTbPagination = usePagination();

  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedRow, setSelectedRow] = useState(null);

  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenAddIncome, setIsOpenAddIncome] = useState(false);

  const [searchParams, setSearchParams] = useState({
    type: '',
    source: '',
    date: null,
  });

  //------------------
  const queryParams = { page, limit, ...searchParams };
  const deletedAccQueryParams = { page: deleteTbPagination.page, limit: deleteTbPagination.limit };
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

  const handleChangeSearchParamDate = (date) => {
    setSearchParams({
      ...searchParams,
      date: date,
    });
  };

  const handleDeleteSearchParam = (filterName) => {
    setSearchParams((prevFilters) => ({
      ...prevFilters,
      [filterName]: filterName === 'date' ? null : '',
    }));
  };

  const handleSelectTab = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleSelectRow = (row) => {
    setSelectedRow(row._id === selectedRow?._id ? null : row);
  };

  const handleDeselectRow = () => {
    setSelectedRow(null);
  };

  const handleToggleDeleteDialog = () => {
    if (selectedRow) {
      setIsOpenDelete(!isOpenDelete);
    }
  };

  const handleToggleAddExpenseDialog = () => {
    setIsOpenAdd(!isOpenAdd);
  };

  const handleToggleAddIncomeDialog = () => {
    setIsOpenAddIncome(!isOpenAddIncome);
  };

  const handleAddIncomeRecord = async (values) => {
    const isSuccess = await createIncomePayment(values);

    if (isSuccess) {
      handleToggleAddIncomeDialog();
      await fetchPayments(queryParams);
    }
  };

  const handleAddExpenseRecord = async (values) => {
    const isSuccess = await createExpensesPayment(values);

    if (isSuccess) {
      handleToggleAddExpenseDialog();
      await fetchPayments(queryParams);
    }
  };

  const handleDeletePayment = async () => {
    if (!selectedRow) return;

    const isSuccess = await deleteManualPayment(selectedRow._id);

    if (isSuccess) {
      handleToggleDeleteDialog();
      setSelectedRow(null);
      fetchPayments(queryParams);
    }
  };

  useEffect(() => {
    if (selectedTab === 1) {
      fetchDeletedPayments(deletedAccQueryParams);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteTbPagination.page, deleteTbPagination.limit, selectedTab]);

  useEffect(() => {
    if (selectedTab === 0) {
      fetchPayments(queryParams);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit, searchParams, selectedTab]);

  return (
    <AccountsView
      tableTitles={tableTitles}
      deletedTableTitles={deletedTableTitles}
      selectedTab={selectedTab}
      selectedRow={selectedRow}
      searchParams={searchParams}
      payments={payments}
      deletedPayments={deletedPayments}
      paymentsCount={paymentsCount}
      deletedPaymentsCount={deletedPaymentsCount}
      isOpenAdd={isOpenAdd}
      isOpenDelete={isOpenDelete}
      isOpenAddIncome={isOpenAddIncome}
      isLoadingPayments={isLoadingPayments}
      isLoadingDeletedPayments={isLoadingDeletedPayments}
      isLoadingCreateExp={isLoadingCreateExp}
      isLoadingCreateInc={isLoadingCreateInc}
      isLoadingDeleteManPayment={isLoadingDeleteManPayment}
      limit={limit}
      page={page}
      deleteTbPagination={deleteTbPagination}
      handleSelectRow={handleSelectRow}
      handleDeselectRow={handleDeselectRow}
      handleChangeSearchParam={handleChangeSearchParam}
      handleChangeSearchParamDate={handleChangeSearchParamDate}
      handleDeleteSearchParam={handleDeleteSearchParam}
      handleSelectTab={handleSelectTab}
      handleToggleDeleteDialog={handleToggleDeleteDialog}
      handleToggleAddExpenseDialog={handleToggleAddExpenseDialog}
      handleToggleAddIncomeDialog={handleToggleAddIncomeDialog}
      handleAddExpenseRecord={handleAddExpenseRecord}
      handleAddIncomeRecord={handleAddIncomeRecord}
      handleDeletePayment={handleDeletePayment}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
};

export default AccountsController;
