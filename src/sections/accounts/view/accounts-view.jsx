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
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { CustomTable } from 'src/components/custom-table/custom-table';
import { AccountsRow } from '../components/accounts-row';
import { PAYMENT_TYPES } from 'src/constants/payment-types';
import { PAY_SC_COMBINED } from 'src/constants/payment-source';
import { AddExpenseDialog } from '../components/add-expense-dialog';
import { AddIncomeDialog } from '../components/add-income-dialog';
import { DatePicker } from '@mui/x-date-pickers';
import { fDate } from 'src/utils/format-time';

export const AccountsView = ({
  tableTitles,
  searchParams,
  payments,
  paymentsCount,
  isOpenAdd,
  isOpenAddIncome,
  isLoadingPayments,
  isLoadingCreateExp,
  isLoadingCreateInc,
  limit,
  page,
  handleChangeSearchParam,
  handleChangeSearchParamDate,
  handleDeleteSearchParam,
  handleToggleAddExpenseDialog,
  handleToggleAddIncomeDialog,
  handleAddExpenseRecord,
  handleAddIncomeRecord,
  handleChangePage,
  handleChangeRowsPerPage,
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Container maxWidth="xl">
      <Grid container spacing={4}>
        <Grid size={12}>
          <Stack
            direction={isSmallScreen ? 'column' : 'row'}
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
          >
            <Typography variant="h5">Manage Accounts</Typography>
            <Stack direction="row" spacing={2}>
              <Button variant="contained" onClick={handleToggleAddIncomeDialog}>
                Add Income
              </Button>
              <Button variant="contained" onClick={handleToggleAddExpenseDialog}>
                Add Expense
              </Button>
            </Stack>
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
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
        <Grid size={{ xs: 12, md: 3 }}>
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
        <Grid size={{ xs: 12, md: 3 }}>
          <FormControl required fullWidth>
            <DatePicker
              maxDate={new Date()}
              slotProps={{
                textField: {
                  //disabled: true,
                },
                field: { clearable: true },
              }}
              label="Date"
              name="date"
              value={searchParams.date}
              onChange={(date) => handleChangeSearchParamDate(date)}
            />
          </FormControl>
        </Grid>
        {(searchParams.type || searchParams.source || searchParams.date) && (
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
              {searchParams.date && (
                <Chip
                  label={fDate(searchParams.date)}
                  onDelete={() => handleDeleteSearchParam('date')}
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
      {isOpenAddIncome && (
        <AddIncomeDialog
          open={isOpenAddIncome}
          handleOpenClose={handleToggleAddIncomeDialog}
          handleConfirm={handleAddIncomeRecord}
          isLoading={isLoadingCreateInc}
        />
      )}
    </Container>
  );
};
