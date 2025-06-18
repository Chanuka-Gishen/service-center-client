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
  Table,
  TableBody,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Grid from '@mui/material/Grid2';

import DeselectIcon from '@mui/icons-material/Deselect';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { CustomTable } from 'src/components/custom-table/custom-table';
import { AccountsRow } from '../components/accounts-row';
import { PAYMENT_TYPES } from 'src/constants/payment-types';
import { PAY_SC_COMBINED } from 'src/constants/payment-source';
import { DatePicker } from '@mui/x-date-pickers';
import { fDate } from 'src/utils/format-time';
import { SelectedAccRow } from './selected-acc-row';
import useAuthStore from 'src/store/auth-store';
import { USER_ROLE } from 'src/constants/user-role';
import ConfirmationDialog from 'src/components/confirmation-dialog/confirmation-dialog';
import { AddExpenseDialog } from './add-expense-dialog';
import { AddIncomeDialog } from './add-income-dialog';

export const ManageAccountsTab = ({
  tableTitles,
  searchParams,
  selectedRow,
  payments,
  paymentsCount,
  isOpenAdd,
  isOpenDelete,
  isOpenAddIncome,
  isLoadingPayments,
  isLoadingCreateExp,
  isLoadingCreateInc,
  isLoadingDeleteManPayment,
  limit,
  page,
  handleSelectRow,
  handleDeselectRow,
  handleChangeSearchParam,
  handleChangeSearchParamDate,
  handleDeleteSearchParam,
  handleToggleDeleteDialog,
  handleToggleAddExpenseDialog,
  handleToggleAddIncomeDialog,
  handleAddExpenseRecord,
  handleAddIncomeRecord,
  handleDeletePayment,
  handleChangePage,
  handleChangeRowsPerPage,
}) => {
  const { auth } = useAuthStore();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Container maxWidth="xl" sx={{ mt: '10px' }}>
      <Grid container spacing={4}>
        <Grid size={12}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent={isSmallScreen ? 'space-between' : 'flex-end'}
            spacing={2}
          >
            <Button variant="contained" onClick={handleToggleAddIncomeDialog}>
              Add Income
            </Button>
            <Button variant="contained" onClick={handleToggleAddExpenseDialog}>
              Add Expense
            </Button>
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
        {selectedRow && (
          <Grid size={12}>
            <Stack spacing={2}>
              <Stack
                direction={{ xs: 'column', md: 'row' }}
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography>Selected Row (1)</Typography>
                <Stack direction="row" spacing={2}>
                  <Button
                    startIcon={<DeselectIcon />}
                    variant="contained"
                    onClick={handleDeselectRow}
                  >
                    Deselect
                  </Button>
                  {auth.user.userRole === USER_ROLE.SUPER_ADMIN && (
                    <Button
                      startIcon={<DeleteOutlineIcon />}
                      variant="contained"
                      onClick={handleToggleDeleteDialog}
                      loading={isLoadingDeleteManPayment}
                      disabled={isLoadingDeleteManPayment}
                    >
                      Delete
                    </Button>
                  )}
                </Stack>
              </Stack>

              <Card>
                <Paper elevation={0}>
                  <Table>
                    <TableBody>
                      <SelectedAccRow item={selectedRow} />
                    </TableBody>
                  </Table>
                </Paper>
              </Card>
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
                tableBody={<AccountsRow data={payments} onClick={handleSelectRow} />}
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
      {isOpenDelete && (
        <ConfirmationDialog
          open={isOpenDelete}
          handleClose={handleToggleDeleteDialog}
          contentText={
            'Are you sure that you want to delete this payment record? Once proceed the record will be updated as deleted and accounts will updated accordingly'
          }
          handleSubmit={handleDeletePayment}
          isLoading={isLoadingDeleteManPayment}
        />
      )}
    </Container>
  );
};
