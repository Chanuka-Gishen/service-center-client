import React from 'react';
import { Button, Card, Container, Paper, Stack, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { CustomTable } from 'src/components/custom-table/custom-table';
import { SupplierRow } from '../components/supplier-row';
import { AddSupplierDialog } from '../components/add-supplier-dialog';

export const SuppliersView = ({
  tableColumns,
  suppliers,
  suppliersCount,
  selectInvItems,
  inputValueItemName,
  selectedFilters,
  limit,
  page,
  isOpenAdd,
  isLoadingSuppliers,
  isLoadingInvSelect,
  handleChangeSearch,
  handleInputChange,
  handleRowClick,
  handleToggleAddDialog,
  handleAddSupplier,
  handleChangeRowsPerPage,
  handleChangePage,
}) => {
  return (
    <Container>
      <Grid container spacing={4}>
        <Grid size={12}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h5">Manage Suppliers</Typography>
            <Button
              startIcon={<AddCircleOutlineIcon />}
              variant="contained"
              onClick={handleToggleAddDialog}
            >
              Add
            </Button>
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 3, lg: 3 }}>
          <TextField
            label="Supplier Name"
            name="name"
            value={selectedFilters.name}
            onChange={handleChangeSearch}
            autoComplete="off"
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
          <Card>
            <Paper elevation={0}>
              <CustomTable
                keys={tableColumns}
                dataLength={suppliers.length}
                isLoading={isLoadingSuppliers}
                documentCount={suppliersCount}
                page={page}
                limit={limit}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                tableBody={<SupplierRow data={suppliers} onClickRow={handleRowClick} />}
              />
            </Paper>
          </Card>
        </Grid>
      </Grid>
      {isOpenAdd && (
        <AddSupplierDialog
          open={isOpenAdd}
          handleOpenClose={handleToggleAddDialog}
          handleConfirm={handleAddSupplier}
          isLoading={false}
          isLoadingItems={isLoadingInvSelect}
          handleInputChange={handleInputChange}
          inputValue={inputValueItemName}
          options={selectInvItems}
        />
      )}
    </Container>
  );
};
