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
import { SupplierMovementsRow } from '../components/supplier-movements-row';
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
  selectInvItems,
  selectedRow,
  supplier,
  supplierItems,
  supplierStockMovements,
  supplierPayments,
  supplierMovementCount,
  supplierPaymentsCount,
  isOpenUpdateSupplier,
  isOpenAddPayment,
  isOpenAddBulk,
  isLoadingInvSelect,
  isLoadingSupplier,
  isLoadingSupplierMovements,
  isLoadingSupplierPayments,
  isLoadingAddSupPayment,
  isLoadingSupUpdate,
  isLoadingSupplierItems,
  isLoadingAddStockBulk,
  movementPagination,
  paymentsPagination,
  handleToggleUpdateSupplier,
  handleToggleAddPayment,
  handleToggleAddBulk,
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
                        <TableRow>
                          <TableCell variant="head">Products</TableCell>
                          <TableCell>
                            {Array.isArray(supplier.supplierProducts) &&
                            supplier.supplierProducts.length > 0 ? (
                              <Stack direction="row" columnGap={2} rowGap={2} flexWrap="wrap">
                                {supplier.supplierProducts.map((product, index) => (
                                  <Chip
                                    key={index}
                                    label={product.itemName || 'Unnamed Product'}
                                    size="small"
                                    sx={{
                                      maxWidth: '100%',
                                      '& .MuiChip-label': {
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                      },
                                    }}
                                  />
                                ))}
                              </Stack>
                            ) : (
                              <Typography variant="caption" color="text.secondary">
                                No products
                              </Typography>
                            )}
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
            <Typography variant="h5">Stock Movements</Typography>
            {auth.user.userRole === USER_ROLE.SUPER_ADMIN &&
            supplier?.supplierProducts.length > 0 ? (
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
                isLoading={isLoadingSupplierMovements}
                dataLength={supplierStockMovements.length}
                documentCount={supplierMovementCount}
                limit={movementPagination.limit}
                page={movementPagination.page}
                handleChangePage={movementPagination.handleChangePage}
                handleChangeRowsPerPage={movementPagination.handleChangeRowsPerPage}
                tableBody={
                  <SupplierMovementsRow
                    data={supplierStockMovements}
                    selectedRow={selectedRow}
                    onClickRow={handleToggleAddPayment}
                  />
                }
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
          options={selectInvItems}
          isLoading={isLoadingSupUpdate}
          isLoadingOptions={isLoadingInvSelect}
          handleConfirm={handleUpdateSupplierInfo}
        />
      )}
      {isOpenAddBulk && (
        <AddBulkStockDialog
          open={isOpenAddBulk}
          stockItems={supplierItems}
          initialValues={grmInitialValues}
          handleOpenClose={handleToggleAddBulk}
          handleConfirm={handleAddBulkStock}
          isLoading={isLoadingAddStockBulk}
        />
      )}
    </Container>
  );
};
