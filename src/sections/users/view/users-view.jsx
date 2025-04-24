import React from 'react';
import { Box, Button, Card, Container, Paper, Stack, Tooltip, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { CustomTable } from 'src/components/custom-table/custom-table';
import { UserRow } from '../components/user-row';
import { RegisterUserDialog } from '../components/register-user-dialog';

export const UsersView = ({
  tableKeys,
  data,
  documentCount,
  isLoading,
  isLoadingAdd,
  isOpenAdd,
  handleToggleAddDialog,
  handleRegisterUser,
  page,
  limit,
  handleChangePage,
  handleChangeRowsPerPage,
}) => {
  return (
    <Container>
      <Grid container>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="h5">Manage Users</Typography>
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
                  page={page}
                  limit={limit}
                  rowerPerPage={[10, 20, 30]}
                  documentCount={documentCount}
                  handleChangePage={handleChangePage}
                  handleChangeRowsPerPage={handleChangeRowsPerPage}
                  tableBody={<UserRow data={data} />}
                />
              </Paper>
            </Card>
          </Box>
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
    </Container>
  );
};
