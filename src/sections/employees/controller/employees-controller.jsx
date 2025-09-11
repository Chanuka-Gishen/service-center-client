import React, { useEffect, useMemo, useState } from 'react';
import { EmployeesView } from '../view/employees-view';
import useEmployee from 'src/hooks/useEmployee';
import { useRouter } from 'src/routes/hooks';
import { NAVIGATION_ROUTES } from 'src/routes/navigation-routes';

const EmployeesController = () => {
  const tableKeys = [
    'Name',
    'Emp ID',
    'Role',
    'NIC',
    'Mobile Number',
    'Position',
    'Status',
    'Joined Date',
    'Terminated Date',
  ];

  const router = useRouter();

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

  const handleOnClickRow = (id) => {
    if (id) {
      router.push(`${NAVIGATION_ROUTES.employees.details.id}${id}`);
    }
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
      handleOnClickRow={handleOnClickRow}
      handleRegisterEmployee={handleRegisterEmployee}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
};

export default EmployeesController;
