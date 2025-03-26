import React from 'react';
import {
  Box,
  Card,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

import { CustomTable } from 'src/components/custom-table/custom-table';
import { RegisterCustomerDialog } from '../components/register-customer-dialog';

export const CustomersView = ({
  customers,
  isLoading,
  isLoadingAdd,
  isOpenAdd,
  handleToggleAddDialog,
  handleAddCustomer,
  tableKeys,
  limit,
  page,
  documentCount,
  handleChangePage,
  handleChangeRowsPerPage,
}) => {
  const matchDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  return (
    <Container maxWidth={'lg'}>
      <Grid container spacing={4}>
        <Grid size={{ sm: 12, md: 12, lg: 12 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h4">Manage Customers</Typography>
            <Tooltip title="Register Customer">
              <IconButton onClick={handleToggleAddDialog}>
                <PersonAddAlt1Icon />
              </IconButton>
            </Tooltip>
          </Stack>
        </Grid>
        <Grid size={{ sm: 12, md: 12, lg: 12 }}>
          <Card>
            <Paper elevation={0}>
              <Container sx={{ p: '10px' }}>
                <Box
                  display="flex"
                  flexDirection={matchDownSm ? 'column' : 'row'}
                  //justifyContent="space-between"
                  alignItems="center"
                  gap={2}
                >
                  <TextField label="Customer Name" value={''} autoComplete="off" fullWidth />
                  <TextField label="Customer Mobile" value={''} autoComplete="off" fullWidth />
                  <TextField label="Customer NIC" value={''} autoComplete="off" fullWidth />
                  <Box flexGrow={1} />
                </Box>
              </Container>
              <CustomTable
                keys={tableKeys}
                data={customers}
                isLoading={isLoading}
                documentCount={documentCount}
                page={page}
                limit={limit}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </Paper>
          </Card>
        </Grid>
      </Grid>
      {isOpenAdd && (
        <RegisterCustomerDialog
          open={isOpenAdd}
          handleOpenClose={handleToggleAddDialog}
          isLoading={isLoadingAdd}
          handleConfirm={handleAddCustomer}
        />
      )}
    </Container>
  );
};
