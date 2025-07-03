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
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tabs,
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
import { UpdateSupplierDialog } from '../components/update-supplier-dialog';
import { AddBulkStockDialog } from '../components/add-bulk-stock-dialog';
import { GrnTab } from '../components/grn-tab';
import { GrnReturnTab } from '../components/grn-return-tab';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </Box>
  );
}

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

export const SupplierDetailsView = ({
  selectedTab,
  stockMvColumns,
  returnColumns,
  paymentColumns,
  initialValues,
  grmInitialValues,
  filters,
  returnFilters,
  selectItems,
  selectedReturnRow,
  supplier,
  supplierGrnRecords,
  supplierPayments,
  supplierGrnCount,
  supplierPaymentsCount,
  supplierReturns,
  supplierReturnsCount,
  isOpenUpdateSupplier,
  isOpenAddBulk,
  isOpenProcessReturn,
  isOpenCancelReturn,
  isLoadingSupplier,
  isLoadingSupplierGrnRecords,
  isLoadingSupplierPayments,
  isLoadingSupReturns,
  isLoadingSupUpdate,
  isLoadingAddStockBulk,
  isLoadingSelect,
  isLoadingProcessReturns,
  isLoadingCancelReturns,
  movementPagination,
  paymentsPagination,
  returnPagination,
  handleSelectTab,
  handleChangeSearch,
  handleChangeSearchReturns,
  handleDeleteSearchParamReturns,
  handleSelectReturnRow,
  handleSelectItem,
  handleRowClick,
  handleToggleUpdateSupplier,
  handleToggleAddBulk,
  handleToggleProcessReturn,
  handleToggleCancelReturn,
  handleRemoveItem,
  handleUpdateSupplierInfo,
  handleAddBulkStock,
  handleProcessReturnItem,
  handleCancelReturnItem,
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
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={selectedTab}
                onChange={handleSelectTab}
                aria-label="supplier info tab"
                variant="fullWidth"
              >
                <Tab label="Good Received Notes (GRN)" {...a11yProps(0)} />
                <Tab label="Returned Items" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={selectedTab} index={0}>
              <GrnTab
                stockMvColumns={stockMvColumns}
                grmInitialValues={grmInitialValues}
                filters={filters}
                selectItems={selectItems}
                supplierGrnRecords={supplierGrnRecords}
                supplierGrnCount={supplierGrnCount}
                isOpenAddBulk={isOpenAddBulk}
                isLoadingSupplierGrnRecords={isLoadingSupplierGrnRecords}
                isLoadingAddStockBulk={isLoadingAddStockBulk}
                isLoadingSelect={isLoadingSelect}
                movementPagination={movementPagination}
                handleChangeSearch={handleChangeSearch}
                handleSelectItem={handleSelectItem}
                handleRowClick={handleRowClick}
                handleToggleAddBulk={handleToggleAddBulk}
                handleRemoveItem={handleRemoveItem}
                handleAddBulkStock={handleAddBulkStock}
              />
            </CustomTabPanel>
            <CustomTabPanel value={selectedTab} index={1}>
              <GrnReturnTab
                returnColumns={returnColumns}
                returnFilters={returnFilters}
                selectedReturnRow={selectedReturnRow}
                supplierReturns={supplierReturns}
                supplierReturnsCount={supplierReturnsCount}
                returnPagination={returnPagination}
                isOpenProcessReturn={isOpenProcessReturn}
                isOpenCancelReturn={isOpenCancelReturn}
                isLoadingSupReturns={isLoadingSupReturns}
                isLoadingProcessReturns={isLoadingProcessReturns}
                isLoadingCancelReturns={isLoadingCancelReturns}
                handleToggleProcessReturn={handleToggleProcessReturn}
                handleToggleCancelReturn={handleToggleCancelReturn}
                handleChangeSearchReturns={handleChangeSearchReturns}
                handleDeleteSearchParam={handleDeleteSearchParamReturns}
                handleSelectReturnRow={handleSelectReturnRow}
                handleProcessReturnItem={handleProcessReturnItem}
                handleCancelReturnItem={handleCancelReturnItem}
              />
            </CustomTabPanel>
          </Box>
        </Grid>
      </Grid>
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
