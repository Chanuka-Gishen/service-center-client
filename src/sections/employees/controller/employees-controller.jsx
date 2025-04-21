import React, { useEffect, useMemo, useState } from 'react';
import { EmployeesView } from '../view/employees-view';
import useEmployee from 'src/hooks/useClient';

const EmployeesController = () => {
  const tableKeys = [
    'Name',
    'NIC',
    'Mobile Number',
    'Position',
    'Sallary',
    'Status',
    'Joined Date',
    'Terminated Date',
  ];

  const {
    isLoading,
    isLoadingRegister,
    employees,
    employeesCount,
    fetchAllEmployees,
    registerEmployee,
  } = useEmployee();

  const [selectedFilters, setSelectedFilters] = useState({
    name: '',
    nic: '',
  });

  const memoizedSelectedFilters = useMemo(() => selectedFilters, [selectedFilters]);

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const [isOpenRegisterDialog, setIsOpenRegisterDialog] = useState(false);

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

  const handleToggleRegisterDialog = () => {
    setIsOpenRegisterDialog(!isOpenRegisterDialog);
  };

  const handleRegisterEmployee = async (data) => {
    const isSuccess = await registerEmployee(data);

    if (isSuccess) {
      handleToggleRegisterDialog();
      fetchAllEmployees();
    }
  };

  useEffect(() => {
    fetchAllEmployees(queryParams);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memoizedSelectedFilters]);
  return (
    <EmployeesView
      tableKeys={tableKeys}
      employees={employees}
      employeesCount={employeesCount}
      limit={limit}
      page={page}
      isOpenRegisterDialog={isOpenRegisterDialog}
      isLoading={isLoading}
      isLoadingRegister={isLoadingRegister}
      handleChangeSearch={handleChangeSearch}
      handleToggleRegisterDialog={handleToggleRegisterDialog}
      handleRegisterEmployee={handleRegisterEmployee}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
};

export default EmployeesController;
