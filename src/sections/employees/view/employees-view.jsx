import React from 'react';
import { Card, Container, IconButton, Paper, Stack, Tooltip, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { CustomTable } from 'src/components/custom-table/custom-table';
import { EmployeeRow } from '../components/employee-row';
import { RegisterEmployeeDialog } from '../components/register-employee-dialog';

export const EmployeesView = ({
  tableKeys,
  employees,
  employeesCount,
  limit,
  page,
  isOpenRegisterDialog,
  isLoading,
  isLoadingRegister,
  handleChangeSearch,
  handleToggleRegisterDialog,
  handleRegisterEmployee,
  handleChangePage,
  handleChangeRowsPerPage,
}) => {
  return (
    <Container>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h4">Manage Employees</Typography>
            <Tooltip title="Register Employee">
              <IconButton onClick={handleToggleRegisterDialog}>
                <PersonAddAlt1Icon />
              </IconButton>
            </Tooltip>
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
          <Card>
            <Paper elevation={0}>
              <CustomTable
                keys={tableKeys}
                dataLength={employees.length}
                isLoading={isLoading}
                documentCount={employeesCount}
                page={page}
                limit={limit}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                tableBody={<EmployeeRow data={employees} onClickRow={null} />}
              />
            </Paper>
          </Card>
        </Grid>
      </Grid>
      {isOpenRegisterDialog && (
        <RegisterEmployeeDialog
          open={isOpenRegisterDialog}
          handleOpenClose={handleToggleRegisterDialog}
          isLoading={isLoadingRegister}
          handleConfirm={handleRegisterEmployee}
        />
      )}
    </Container>
  );
};
