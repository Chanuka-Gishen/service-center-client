import React from 'react';
import {
  Button,
  Card,
  Chip,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { CustomTable } from 'src/components/custom-table/custom-table';
import { AccountsRow } from '../components/accounts-row';
import { PAYMENT_TYPES } from 'src/constants/payment-types';
import { PAY_SC_COMBINED } from 'src/constants/payment-source';
import { AddExpenseDialog } from '../components/add-expense-dialog';

export const AccountsView = ({
  tableTitles,
  searchParams,
  payments,
  paymentsCount,
  isOpenAdd,
  isLoadingPayments,
  isLoadingCreateExp,
  limit,
  page,
  handleChangeSearchParam,
  handleDeleteSearchParam,
  handleToggleAddExpenseDialog,
  handleAddExpenseRecord,
  handleChangePage,
  handleChangeRowsPerPage,
}) => {
  return (
    <Container maxWidth='xl'>
      <Grid container spacing={4}>
        <Grid size={12}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h5">Manage Accounts</Typography>
            <Button variant="contained" onClick={handleToggleAddExpenseDialog}>
              Add Payment
            </Button>
          </Stack>
        </Grid>
        <Grid size={{ sm: 12, md: 4, lg: 4 }}>
          <FormControl fullWidth>
            <InputLabel id="select-label">Payment Type</InputLabel>
            <Select
              labelId="select-label"
              id="simple-select"
              label="Payment Type"
              name="type"
              fullWidth
              value={searchParams.type || ''}
              onChange={handleChangeSearchParam}
            >
              {PAYMENT_TYPES.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ sm: 12, md: 4, lg: 4 }}>
          <FormControl fullWidth>
            <InputLabel id="select-label">Payment Source</InputLabel>
            <Select
              labelId="select-label"
              id="simple-select"
              label="Payment Source"
              name="source"
              fullWidth
              value={searchParams.source || ''}
              onChange={handleChangeSearchParam}
            >
              {PAY_SC_COMBINED.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        {(searchParams.type || searchParams.source) && (
          <Grid size={12}>
            <Stack direction="row" spacing={2} flexWrap="wrap">
              {searchParams.type && (
                <Chip label={searchParams.type} onDelete={() => handleDeleteSearchParam('type')} />
              )}
              {searchParams.source && (
                <Chip
                  label={searchParams.source}
                  onDelete={() => handleDeleteSearchParam('source')}
                />
              )}
            </Stack>
          </Grid>
        )}
        <Grid size={12}>
          <Card>
            <Paper elevation={0}>
              <CustomTable
                keys={tableTitles}
                dataLength={payments.length}
                isLoading={isLoadingPayments}
                documentCount={paymentsCount}
                page={page}
                limit={limit}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                tableBody={<AccountsRow data={payments} />}
              />
            </Paper>
          </Card>
        </Grid>
      </Grid>
      {isOpenAdd && (
        <AddExpenseDialog
          open={isOpenAdd}
          handleOpenClose={handleToggleAddExpenseDialog}
          handleConfirm={handleAddExpenseRecord}
          isLoading={isLoadingCreateExp}
        />
      )}
    </Container>
  );
};
