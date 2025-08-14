import {
  Box,
  Button,
  Card,
  Chip,
  CircularProgress,
  Divider,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { PayrollSchemaDialog } from '../components/payroll-schema-dialog';
import { formatCurrency } from 'src/utils/format-number';
import { Fragment } from 'react';
import { SalaryUpdateDialog } from '../components/salary-update-dialog';
import useAuthStore from 'src/store/auth-store';
import { USER_ROLE } from 'src/constants/user-role';
import { AddBonusDialog } from '../components/add-bonus-dialog';
import { CustomTable } from 'src/components/custom-table/custom-table';
import { SalaryBonusRow } from '../components/salary-bonus-row';
import { SalaryChangesRow } from '../components/salary-changes-row';
import ConfirmationDialog from 'src/components/confirmation-dialog/confirmation-dialog';

export const EmpPayrollTabView = ({
  bonusTableHeaders,
  salaryTableHeaders,
  initialValues,
  empPayrollSchema,
  empBonuses,
  empSalaryHistory,
  empBonusesCount,
  empSalaryHistoryCount,
  bonusesPagination,
  salaryPagination,
  isOpenSchemaDialog,
  isOpenUpdateSalaryDialog,
  isOpenAddBonusDialog,
  isOpenDeleteBonusDialog,
  isOpenSalaryRevertDialog,
  isLoadingEmpPayrollSchema,
  isLoadingCreatePayroll,
  isLoadingUpdatePayroll,
  isLoadingAddBonus,
  isLoadingChangeSalary,
  isLoadingBonuses,
  isLoadingDeleteBonus,
  isLoadingSalaryHistory,
  isLoadingSalaryReverse,
  handleToggleSchemaDialog,
  handleToggleUpdateSalaryDialog,
  handleToggleAddBonusDialog,
  handleToggleDeleteBonusDialog,
  handleToggleRevertSalaryDialog,
  handleSubmitSchema,
  handleSalaryChange,
  handleAddBonus,
  handleDeleteEmpBonus,
  handleReverseSalaryChange,
}) => {
  const { auth } = useAuthStore();

  return (
    <>
      <Grid container spacing={4} sx={{ mt: '20px' }}>
        <Grid size={12}>
          <Stack direction="row" spacing={2} alignItems="center">
            {!isLoadingEmpPayrollSchema && !empPayrollSchema && (
              <Button variant="contained" onClick={handleToggleSchemaDialog}>
                Create Schema
              </Button>
            )}
            {!isLoadingEmpPayrollSchema && empPayrollSchema && (
              <Fragment>
                {auth.user.userRole === USER_ROLE.SUPER_ADMIN && (
                  <Fragment>
                    <Button variant="contained" onClick={handleToggleAddBonusDialog}>
                      Add Bonus
                    </Button>
                    <Button variant="contained" onClick={handleToggleUpdateSalaryDialog}>
                      Update Salary
                    </Button>
                  </Fragment>
                )}
                <Button variant="contained" onClick={handleToggleSchemaDialog}>
                  Update Schema
                </Button>
              </Fragment>
            )}
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, md: 5 }}>
          <Stack spacing={2}>
            <Typography variant="h5">Salary Schema</Typography>
            <Card sx={{ p: '10px' }}>
              <Paper elevation={0}>
                <Stack spacing={2}>
                  {isLoadingEmpPayrollSchema && (
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <CircularProgress />
                    </Box>
                  )}

                  {!isLoadingEmpPayrollSchema && !empPayrollSchema && (
                    <Typography textAlign="center" variant="6">
                      Employee Salary Schema Not Created Yet
                    </Typography>
                  )}
                  {!isLoadingEmpPayrollSchema && empPayrollSchema && (
                    <Fragment>
                      <TableContainer>
                        <Table>
                          <TableBody>
                            <TableRow>
                              <TableCell>Basic Sallary</TableCell>
                              <TableCell>{formatCurrency(empPayrollSchema.baseSalary)}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Salary Frequency</TableCell>
                              <TableCell>{empPayrollSchema.payFrequency}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>EPF Eligible</TableCell>
                              <TableCell>
                                <Chip
                                  label={empPayrollSchema.epfEligible ? 'Yes' : 'No'}
                                  color={empPayrollSchema.epfEligible ? 'success' : 'error'}
                                />
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>ETF Eligible</TableCell>
                              <TableCell>
                                <Chip
                                  label={empPayrollSchema.etfEligible ? 'Yes' : 'No'}
                                  color={empPayrollSchema.etfEligible ? 'success' : 'error'}
                                />
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                      <Divider>Recurring Allowances</Divider>
                      <TableContainer>
                        <Table>
                          <TableBody>
                            {empPayrollSchema.recurringAllowances.length === 0 && (
                              <TableRow>
                                <TableCell colSpan={2} align="center">
                                  <Typography
                                    fontStyle="italic"
                                    variant="caption"
                                    textAlign="center"
                                  >
                                    This Employee Does Not Have Recurring Allowances
                                  </Typography>
                                </TableCell>
                              </TableRow>
                            )}
                            {empPayrollSchema.recurringAllowances.length > 0 &&
                              empPayrollSchema.recurringAllowances.map((item, index) => (
                                <TableRow key={index}>
                                  <TableCell>{item.type}</TableCell>
                                  <TableCell>{formatCurrency(item.amount)}</TableCell>
                                </TableRow>
                              ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                      <Divider>Recurring Earnings</Divider>
                      <TableContainer>
                        <Table>
                          <TableBody>
                            {empPayrollSchema.otherRecurringEarnings.length === 0 && (
                              <TableRow>
                                <TableCell colSpan={2} align="center">
                                  <Typography
                                    fontStyle="italic"
                                    variant="caption"
                                    textAlign="center"
                                  >
                                    This Employee Does Not Have Recurring Earnings
                                  </Typography>
                                </TableCell>
                              </TableRow>
                            )}
                            {empPayrollSchema.otherRecurringEarnings.length > 0 &&
                              empPayrollSchema.otherRecurringEarnings.map((item, index) => (
                                <TableRow key={index}>
                                  <TableCell>{item.type}</TableCell>
                                  <TableCell>{formatCurrency(item.amount)}</TableCell>
                                </TableRow>
                              ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Fragment>
                  )}
                </Stack>
              </Paper>
            </Card>
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, md: 7 }}>
          <Stack spacing={2}>
            <Typography variant="h5">Bonus Logs</Typography>
            <Card>
              <Paper elevation={0}>
                <CustomTable
                  keys={bonusTableHeaders}
                  dataLength={empBonuses.length}
                  isLoading={isLoadingBonuses}
                  documentCount={empBonusesCount}
                  page={bonusesPagination.page}
                  limit={bonusesPagination.limit}
                  handleChangePage={bonusesPagination.handleChangePage}
                  handleChangeRowsPerPage={bonusesPagination.handleChangeRowsPerPage}
                  tableBody={
                    <SalaryBonusRow
                      data={empBonuses}
                      handleDelete={handleToggleDeleteBonusDialog}
                    />
                  }
                  enableAction={true}
                />
              </Paper>
            </Card>
          </Stack>
        </Grid>
        <Grid size={12}>
          <Stack spacing={2}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="h5">Salary Change Logs</Typography>
              {empSalaryHistoryCount > 0 && (
                <Button variant="contained" onClick={handleToggleRevertSalaryDialog}>
                  Reverse Last Change
                </Button>
              )}
            </Stack>
            <Card>
              <Paper elevation={0}>
                <CustomTable
                  keys={salaryTableHeaders}
                  dataLength={empSalaryHistory.length}
                  isLoading={isLoadingSalaryHistory}
                  documentCount={empSalaryHistoryCount}
                  page={salaryPagination.page}
                  limit={salaryPagination.limit}
                  handleChangePage={salaryPagination.handleChangePage}
                  handleChangeRowsPerPage={salaryPagination.handleChangeRowsPerPage}
                  tableBody={<SalaryChangesRow data={empSalaryHistory} />}
                />
              </Paper>
            </Card>
          </Stack>
        </Grid>
      </Grid>
      {isOpenSchemaDialog && (
        <PayrollSchemaDialog
          initialValues={initialValues}
          isCreate={empPayrollSchema ? false : true}
          open={isOpenSchemaDialog}
          handleOpenClose={handleToggleSchemaDialog}
          handleSubmitSchema={handleSubmitSchema}
          isLoading={empPayrollSchema ? isLoadingUpdatePayroll : isLoadingCreatePayroll}
        />
      )}
      {isOpenUpdateSalaryDialog && (
        <SalaryUpdateDialog
          open={isOpenUpdateSalaryDialog}
          handleOpenClose={handleToggleUpdateSalaryDialog}
          isLoading={isLoadingChangeSalary}
          handleConfirm={handleSalaryChange}
        />
      )}
      {isOpenAddBonusDialog && (
        <AddBonusDialog
          open={isOpenAddBonusDialog}
          handleOpenClose={handleToggleAddBonusDialog}
          handleConfirm={handleAddBonus}
          isLoading={isLoadingAddBonus}
        />
      )}
      {isOpenDeleteBonusDialog && (
        <ConfirmationDialog
          contentText={
            'Are you sure that you want to delete this bonus record? This action cannot be reversed'
          }
          open={isOpenDeleteBonusDialog}
          handleClose={handleToggleDeleteBonusDialog}
          handleSubmit={handleDeleteEmpBonus}
          isLoading={isLoadingDeleteBonus}
        />
      )}
      {isOpenSalaryRevertDialog && (
        <ConfirmationDialog
          contentText={
            'Are you sure that you want to undo last salary change? This action cannot be reversed'
          }
          open={isOpenSalaryRevertDialog}
          handleClose={handleToggleRevertSalaryDialog}
          handleSubmit={handleReverseSalaryChange}
          isLoading={isLoadingSalaryReverse}
        />
      )}
    </>
  );
};
