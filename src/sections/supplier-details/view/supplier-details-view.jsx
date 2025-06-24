import React from 'react';
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  Chip,
  Container,
  Link,
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
import { NAVIGATION_ROUTES } from 'src/routes/navigation-routes';
import { formatCurrency } from 'src/utils/format-number';
import { CustomTable } from 'src/components/custom-table/custom-table';
import { SupplierGrnRow } from '../components/supplier-grn-row';
import { RecentPaymentsRow } from '../components/recent-payments-row';
import useAuthStore from 'src/store/auth-store';
import { USER_ROLE } from 'src/constants/user-role';
import { SupplierPaymentDialog } from '../components/supplier-payment-dialog';
import { UpdateSupplierDialog } from '../components/update-supplier-dialog';
import { AddBulkStockDialog } from '../components/add-bulk-stock-dialog';

export const SupplierDetailsView = ({
  stockMvColumns,
  paymentColumns,
  initialValues,
  grmInitialValues,
  filters,
  selectedRow,
  selectItems,
  supplier,
  supplierGrnRecords,
  supplierPayments,
  supplierGrnCount,
  supplierPaymentsCount,
  isOpenUpdateSupplier,
  isOpenAddPayment,
  isOpenAddBulk,
  isLoadingSupplier,
  isLoadingSupplierGrnRecords,
  isLoadingSupplierPayments,
  isLoadingAddSupPayment,
  isLoadingSupUpdate,
  isLoadingAddStockBulk,
  isLoadingSelect,
  movementPagination,
  paymentsPagination,
  handleChangeSearch,
  handleSelectItem,
  handleToggleUpdateSupplier,
  handleToggleAddPayment,
  handleToggleAddBulk,
  handleRemoveItem,
  handleAddSupplierPayment,
  handleUpdateSupplierInfo,
  handleAddBulkStock,
}) => {
  const { auth } = useAuthStore();

  return (
    <Container>
      <Grid container spacing={4}>
        <Grid size={12}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href={NAVIGATION_ROUTES.suppliers.base}>
              Suppliers
            </Link>
            <Typography sx={{ color: 'text.primary' }}>Information</Typography>
          </Breadcrumbs>
        </Grid>
        {!isLoadingSupplier && supplier && (
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
            <Stack spacing={2}>
              {auth.user.userRole === USER_ROLE.SUPER_ADMIN && (
                <Stack direction="row" justifyContent="right">
                  <Button variant="contained" size="small" onClick={handleToggleUpdateSupplier}>
                    Update Supplier
                  </Button>
                </Stack>
              )}

              <Card>
                <Paper>
                  <TableContainer>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell variant="head">Supplier Name</TableCell>
                          <TableCell>{supplier.supplierName}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell variant="head">Contact Person</TableCell>
                          <TableCell>{supplier.supplierContactPerson}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell variant="head">Contact Number</TableCell>
                          <TableCell>{supplier.supplierPhone}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell variant="head">Due Payments Amount</TableCell>
                          <TableCell>
                            <Typography
                              variant="body2"
                              sx={{
                                color:
                                  supplier.supplierDueAmount > 0 ? 'error.main' : 'text.secondary',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 0.5,
                              }}
                            >
                              {formatCurrency(supplier.supplierDueAmount)}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </Card>
            </Stack>
          </Grid>
        )}
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
          <Stack spacing={2}>
            <Typography variant="h5">Recent Payments</Typography>
            <Card>
              <Paper elevation={0}>
                <CustomTable
                  keys={paymentColumns}
                  isLoading={isLoadingSupplierPayments}
                  dataLength={supplierPayments.length}
                  documentCount={supplierPaymentsCount}
                  limit={paymentsPagination.limit}
                  page={paymentsPagination.page}
                  handleChangePage={paymentsPagination.handleChangePage}
                  handleChangeRowsPerPage={paymentsPagination.handleChangeRowsPerPage}
                  tableBody={<RecentPaymentsRow data={supplierPayments} />}
                />
              </Paper>
            </Card>
          </Stack>
        </Grid>
        <Grid size={12}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h5">Good Received Notes (GRN)</Typography>
            {auth.user.userRole === USER_ROLE.SUPER_ADMIN ? (
              <Button variant="contained" onClick={handleToggleAddBulk}>
                Add Stocks
              </Button>
            ) : null}
          </Stack>
        </Grid>
        <Grid size={12}>
          <Card>
            <Paper elevation={0}>
              <CustomTable
                keys={stockMvColumns}
                isLoading={isLoadingSupplierGrnRecords}
                dataLength={supplierGrnRecords.length}
                documentCount={supplierGrnCount}
                limit={movementPagination.limit}
                page={movementPagination.page}
                handleChangePage={movementPagination.handleChangePage}
                handleChangeRowsPerPage={movementPagination.handleChangeRowsPerPage}
                tableBody={<SupplierGrnRow data={supplierGrnRecords} onClickRow={null} />}
              />
            </Paper>
          </Card>
        </Grid>
      </Grid>
      {isOpenAddPayment && selectedRow && (
        <SupplierPaymentDialog
          open={isOpenAddPayment}
          data={selectedRow}
          handleClose={handleToggleAddPayment}
          handleConfirm={handleAddSupplierPayment}
          isLoading={isLoadingAddSupPayment}
        />
      )}
      {isOpenUpdateSupplier && (
        <UpdateSupplierDialog
          open={isOpenUpdateSupplier}
          initialValues={initialValues}
          handleOpenClose={handleToggleUpdateSupplier}
          isLoading={isLoadingSupUpdate}
          handleConfirm={handleUpdateSupplierInfo}
        />
      )}
      {isOpenAddBulk && (
        <AddBulkStockDialog
          open={isOpenAddBulk}
          filters={filters}
          selectItems={selectItems}
          initialValues={grmInitialValues}
          handleChangeSearch={handleChangeSearch}
          handleSelectItem={handleSelectItem}
          handleOpenClose={handleToggleAddBulk}
          handelRemoveItem={handleRemoveItem}
          handleConfirm={handleAddBulkStock}
          isLoading={isLoadingAddStockBulk}
          isLoadingSelect={isLoadingSelect}
        />
      )}
    </Container>
  );
};
