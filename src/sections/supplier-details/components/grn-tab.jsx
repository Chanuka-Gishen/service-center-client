import React from 'react';
import { Box, Button, Card, Container, Paper, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { CustomTable } from 'src/components/custom-table/custom-table';
import { SupplierGrnRow } from './supplier-grn-row';
import useAuthStore from 'src/store/auth-store';
import { USER_ROLE } from 'src/constants/user-role';
import { AddBulkStockDialog } from './add-bulk-stock-dialog';

export const GrnTab = ({
  stockMvColumns,
  grmInitialValues,
  filters,
  selectItems,
  supplierGrnRecords,
  supplierGrnCount,
  isOpenAddBulk,
  isLoadingSupplierGrnRecords,
  isLoadingAddStockBulk,
  isLoadingSelect,
  movementPagination,
  handleChangeSearch,
  handleSelectItem,
  handleRowClick,
  handleToggleAddBulk,
  handleRemoveItem,
  handleAddBulkStock,
}) => {
  const { auth } = useAuthStore();

  return (
    <Box sx={{ mt: '10px' }}>
      <Grid container spacing={4}>
        <Grid size={12}>
          <Stack direction="row" alignItems="center" justifyContent="flex-end">
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
                tableBody={<SupplierGrnRow data={supplierGrnRecords} onClickRow={handleRowClick} />}
              />
            </Paper>
          </Card>
        </Grid>
      </Grid>
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
    </Box>
  );
};
