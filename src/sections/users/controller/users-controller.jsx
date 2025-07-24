import React, { useEffect, useState } from 'react';
import { UsersView } from '../view/users-view';
import useUser from 'src/hooks/useUser';
import usePagination from 'src/hooks/usePagination';
import useAuthStore from 'src/store/auth-store';
import { USER_ROLE } from 'src/constants/user-role';
import { useRouter } from 'src/routes/hooks';
import { NAVIGATION_ROUTES } from 'src/routes/navigation-routes';

const tableHeaders = ['User Fullname', 'User Role', 'Email', 'Status'];
const actTableHeaders = [
  'Action',
  'Status',
  'Failure Reason',
  'Device Type',
  'Device Model',
  'Timestamp',
];

const usersController = () => {
  const router = useRouter();
  const { auth, logoutUser } = useAuthStore.getState();

  const {
    users,
    usersCount,
    activities,
    activitiesCount,
    isLoading,
    isLoadingAdd,
    isLoadingUpdate,
    isLoadingActivities,
    isLoadingPwdChange,
    fetchUsers,
    registerUser,
    updateUser,
    fetchAdminActivities,
    changePasswordController,
  } = useUser();

  const pagination = usePagination();
  const actPagination = usePagination();

  const [initialValues, setInitialValues] = useState({});
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isSelectedCurrentUser, setIsSelectedCurrentUser] = useState(false);

  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);

  //--------------------------------------

  const actQuery = { page: actPagination.page, limit: actPagination.limit, id: selectedRow?._id };

  //--------------------------------------

  const handleSelectUser = (row) => {
    if (auth.user.userRole != USER_ROLE.SUPER_ADMIN) return;

    if (selectedRow?._id === row._id) {
      setSelectedRow(null);
    } else {
      setSelectedRow(row);
    }
  };

  const handleToggleAddDialog = () => {
    setIsOpenAdd(!isOpenAdd);
  };

  const handleToggleUpdateDialog = (values = null) => {
    if (isOpenUpdate) {
      setInitialValues({});
      setSelectedUser(null);
    } else {
      if (auth.user.id === values._id) {
        setIsSelectedCurrentUser(true);
      } else {
        setIsSelectedCurrentUser(false);
      }
      setInitialValues({
        userFirstName: values.userFirstName,
        userLastName: values.userLastName,
        userEmail: values.userEmail,
        userIsActive: values.userIsActive,
        isUserFirstLogin: values.isUserFirstLogin,
      });
      setSelectedUser(values);
    }

    setIsOpenUpdate(!isOpenUpdate);
  };

  const handleRegisterUser = async (values) => {
    const isSuccess = await registerUser(values);

    if (isSuccess) {
      handleToggleAddDialog();
      fetchUsers();
    }
  };

  const handleUpdateUser = async (values) => {
    const data = {
      id: selectedUser._id,
      ...values,
    };

    const isSuccess = await updateUser(data);

    if (isSuccess) {
      setSelectedUser(null);
      handleToggleUpdateDialog();
      fetchUsers();
    }
  };

  const handleFetchAdminActivities = async () => {
    if (!selectedRow) return;
    await fetchAdminActivities(actQuery);
  };

  const handlePasswordChange = async (values) => {
    const isSuccess = await changePasswordController(values);

    if (isSuccess) {
      logoutUser();
      router.push(NAVIGATION_ROUTES.login);
    }
  };

  useEffect(() => {
    const params = {
      page: pagination.page,
      limit: pagination.limit,
    };
    fetchUsers(params);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.page, pagination.limit]);

  useEffect(() => {
    if (selectedRow && auth.user.userRole === USER_ROLE.SUPER_ADMIN) {
      handleFetchAdminActivities();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actPagination.page, actPagination.limit, selectedRow]);

  return (
    <UsersView
      tableKeys={tableHeaders}
      actTableHeaders={actTableHeaders}
      data={users}
      documentCount={usersCount}
      activities={activities}
      activitiesCount={activitiesCount}
      pagination={pagination}
      actPagination={actPagination}
      initialValues={initialValues}
      selectedRow={selectedRow}
      isSelectedCurrentUser={isSelectedCurrentUser}
      isLoading={isLoading}
      isOpenAdd={isOpenAdd}
      isOpenUpdate={isOpenUpdate}
      isLoadingAdd={isLoadingAdd}
      isLoadingUpdate={isLoadingUpdate}
      isLoadingActivities={isLoadingActivities}
      isLoadingPwdChange={isLoadingPwdChange}
      handleSelectUser={handleSelectUser}
      handleToggleAddDialog={handleToggleAddDialog}
      handleToggleUpdateDialog={handleToggleUpdateDialog}
      handleRegisterUser={handleRegisterUser}
      handleUpdateUser={handleUpdateUser}
      handlePasswordChange={handlePasswordChange}
    />
  );
};

export default usersController;
