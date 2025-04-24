import React, { useEffect, useState } from 'react';
import { UsersView } from '../view/users-view';
import useUser from 'src/hooks/useUser';

const tableHeaders = ['User Fullname', 'User Role', 'Email', 'Status'];

const usersController = () => {
  const { users, usersCount, isLoading, isLoadingAdd, fetchUsers, registerUser } = useUser();

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const [isOpenAdd, setIsOpenAdd] = useState(false);

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

  const handleRegisterUser = async (values) => {
    const isSuccess = await registerUser(values);

    if (isSuccess) {
      handleToggleAddDialog();
      fetchUsers();
    }
  };

  useEffect(() => {
    fetchUsers();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit]);

  return (
    <UsersView
      tableKeys={tableHeaders}
      data={users}
      documentCount={usersCount}
      isLoading={isLoading}
      isOpenAdd={isOpenAdd}
      isLoadingAdd={isLoadingAdd}
      handleToggleAddDialog={handleToggleAddDialog}
      handleRegisterUser={handleRegisterUser}
      page={page}
      limit={limit}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
};

export default usersController;
