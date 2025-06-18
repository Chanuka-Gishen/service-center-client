import React, { useEffect, useState } from 'react';
import { AccountsView } from '../view/accounts-view';
import usePayment from 'src/hooks/usePayment';

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

const AccountsController = () => {
  const {
    payments,
    paymentsCount,
    isLoadingPayments,
    isLoadingCreateExp,
    isLoadingCreateInc,
    fetchPayments,
    createExpensesPayment,
    createIncomePayment,
  } = usePayment();

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenAddIncome, setIsOpenAddIncome] = useState(false);

  const [searchParams, setSearchParams] = useState({
    type: '',
    source: '',
    date: null,
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

  useEffect(() => {
    fetchPayments(queryParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit, searchParams]);

  return (
    <AccountsView
      tableTitles={tableTitles}
      searchParams={searchParams}
      payments={payments}
      paymentsCount={paymentsCount}
      isOpenAdd={isOpenAdd}
      isOpenAddIncome={isOpenAddIncome}
      isLoadingPayments={isLoadingPayments}
      isLoadingCreateExp={isLoadingCreateExp}
      isLoadingCreateInc={isLoadingCreateInc}
      limit={limit}
      page={page}
      handleChangeSearchParam={handleChangeSearchParam}
      handleChangeSearchParamDate={handleChangeSearchParamDate}
      handleDeleteSearchParam={handleDeleteSearchParam}
      handleToggleAddExpenseDialog={handleToggleAddExpenseDialog}
      handleToggleAddIncomeDialog={handleToggleAddIncomeDialog}
      handleAddExpenseRecord={handleAddExpenseRecord}
      handleAddIncomeRecord={handleAddIncomeRecord}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
};

export default AccountsController;
