import React from 'react';
import { Box, Button, Card, Container, Paper, Stack, Tooltip, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { CustomTable } from 'src/components/custom-table/custom-table';
import { UserRow } from '../components/user-row';
import { RegisterUserDialog } from '../components/register-user-dialog';
import { UpdateUserDialog } from '../components/update-user-dialog';
import { ActivitiesRow } from '../components/activities-row';
import useAuthStore from 'src/store/auth-store';
import { USER_ROLE } from 'src/constants/user-role';
import { ChangePasswordForm } from '../components/change-password-form';

export const UsersView = ({
  tableKeys,
  actTableHeaders,
  data,
  documentCount,
  activities,
  activitiesCount,
  pagination,
  actPagination,
  initialValues,
  selectedRow,
  isSelectedCurrentUser,
  isLoading,
  isLoadingAdd,
  isLoadingUpdate,
  isLoadingActivities,
  isLoadingPwdChange,
  isOpenAdd,
  isOpenUpdate,
  handleSelectUser,
  handleToggleAddDialog,
  handleToggleUpdateDialog,
  handleRegisterUser,
  handleUpdateUser,
  handlePasswordChange,
}) => {
  const { auth } = useAuthStore();
  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="h5">Manage Admins</Typography>
              <Tooltip title="Add User">
                <Button
                  variant="contained"
                  endIcon={<AddCircleOutlineIcon />}
                  onClick={handleToggleAddDialog}
                >
                  Add User
                </Button>
              </Tooltip>
            </Stack>

            <Card>
              <Paper>
                <CustomTable
                  keys={tableKeys}
                  dataLength={data.length}
                  isLoading={isLoading}
                  page={pagination.page}
                  limit={pagination.limit}
                  rowerPerPage={[10, 20, 30]}
                  documentCount={documentCount}
                  handleChangePage={pagination.handleChangePage}
                  handleChangeRowsPerPage={pagination.handleChangeRowsPerPage}
                  enableAction={true}
                  tableBody={
                    <UserRow
                      data={data}
                      onClick={handleSelectUser}
                      onEdit={handleToggleUpdateDialog}
                    />
                  }
                />
              </Paper>
            </Card>
          </Box>
        </Grid>
        {auth.user.userRole === USER_ROLE.SUPER_ADMIN && (
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={2}>
              <Typography variant="h5" textAlign="center">
                Admin Login Activity
                {selectedRow && ` (${selectedRow.userFirstName} ${selectedRow.userLastName})`}
              </Typography>
              {!selectedRow && (
                <Typography textAlign="center" fontStyle="italic">
                  Please select a admin to view login activities
                </Typography>
              )}
              {selectedRow && (
                <Card>
                  <Paper>
                    <CustomTable
                      keys={actTableHeaders}
                      dataLength={activities.length}
                      isLoading={isLoadingActivities}
                      page={actPagination.page}
                      limit={actPagination.limit}
                      rowerPerPage={[10, 20, 30]}
                      documentCount={activitiesCount}
                      handleChangePage={actPagination.handleChangePage}
                      handleChangeRowsPerPage={actPagination.handleChangeRowsPerPage}
                      tableBody={<ActivitiesRow data={activities} />}
                    />
                  </Paper>
                </Card>
              )}
            </Stack>
          </Grid>
        )}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Stack spacing={2}>
            <Typography variant="h5">Change Password</Typography>
            <Card sx={{ p: '10px' }}>
              <ChangePasswordForm
                isLoading={isLoadingPwdChange}
                handleConfirm={handlePasswordChange}
              />
            </Card>
          </Stack>
        </Grid>
      </Grid>
      {isOpenAdd && (
        <RegisterUserDialog
          open={isOpenAdd}
          handleOpenClose={handleToggleAddDialog}
          handleConfirm={handleRegisterUser}
          isLoading={isLoadingAdd}
        />
      )}
      {isOpenUpdate && (
        <UpdateUserDialog
          open={isOpenUpdate}
          initialValues={initialValues}
          isSelectedCurrentUser={isSelectedCurrentUser}
          handleOpenClose={handleToggleUpdateDialog}
          isLoading={isLoadingUpdate}
          handleConfirm={handleUpdateUser}
        />
      )}
    </Container>
  );
};
