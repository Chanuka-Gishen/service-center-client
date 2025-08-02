import React from 'react';
import {
  Card,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';

import { CustomTable } from 'src/components/custom-table/custom-table';
import { RegisterCustomerDialog } from '../components/register-customer-dialog';
import { CustomerRow } from '../components/customer-row';
import { CustomersStatCard } from '../components/stat-component';

export const CustomersView = ({
  customers,
  customersCount,
  selectedFilters,
  uniqueCustomersCount,
  repeatingCustomersCount,
  newCustomersCount,
  isLoading,
  isLoadingAdd,
  isOpenAdd,
  isLoadingCustomersCount,
  isLoadingRepeatingCustomersCount,
  isLoadingNewCustomersCount,
  handleChangeSearch,
  handleNavigateCustomer,
  handleToggleAddDialog,
  handleAddCustomer,
  tableKeys,
  pagination,
}) => {
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
        <Grid size={12}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 4, md: 4, lg: 3 }}>
              <CustomersStatCard
                title="Unique Customers"
                count={uniqueCustomersCount}
                icon={<PermContactCalendarIcon fontSize="medium" />}
                isLoading={isLoadingCustomersCount}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4, md: 4, lg: 3 }}>
              <CustomersStatCard
                title="Repeating Customers"
                count={repeatingCustomersCount}
                icon={<TransferWithinAStationIcon fontSize="medium" />}
                isLoading={isLoadingRepeatingCustomersCount}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4, md: 4, lg: 3 }}>
              <CustomersStatCard
                title="New Customers"
                count={newCustomersCount?.currentMonthCount ?? 0}
                icon={<TransferWithinAStationIcon fontSize="medium" />}
                isLoading={isLoadingNewCustomersCount}
                includeFooter={true}
                percentageChange={newCustomersCount?.percentageChange ?? 0}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid size={{ xs: 12, sm: 4, md: 4, lg: 3 }}>
          <TextField
            label="Customer Name"
            value={selectedFilters.name}
            name="name"
            onChange={handleChangeSearch}
            autoComplete="off"
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4, md: 4, lg: 3 }}>
          <TextField
            label="Customer Mobile"
            value={selectedFilters.mobile}
            name="mobile"
            onChange={handleChangeSearch}
            autoComplete="off"
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4, md: 4, lg: 3 }}>
          <TextField
            label="Customer Secondary Mobile"
            value={selectedFilters.secMobile}
            name="secMobile"
            onChange={handleChangeSearch}
            autoComplete="off"
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4, md: 4, lg: 3 }}>
          <TextField
            label="Vehicle Number"
            value={selectedFilters.vehicleNumber}
            name="vehicleNumber"
            onChange={handleChangeSearch}
            autoComplete="off"
            fullWidth
          />
        </Grid>
        <Grid size={{ sm: 12, md: 12, lg: 12 }}>
          <Card>
            <Paper elevation={0}>
              <CustomTable
                keys={tableKeys}
                dataLength={customers.length}
                isLoading={isLoading}
                documentCount={customersCount}
                page={pagination.page}
                limit={pagination.limit}
                handleChangePage={pagination.handleChangePage}
                handleChangeRowsPerPage={pagination.handleChangeRowsPerPage}
                tableBody={<CustomerRow data={customers} onClickRow={handleNavigateCustomer} />}
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
