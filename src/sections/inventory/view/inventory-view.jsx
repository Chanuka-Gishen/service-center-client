import React from 'react';

import {
  Box,
  Button,
  Card,
  Container,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { CustomTable } from 'src/components/custom-table/custom-table';
import { AddItemDialog } from '../components/add-item-dialog';
import { InventoryRow } from '../components/inventory-row';

export const InventoryView = ({
  items,
  selectedFilters,
  isLoading,
  isLoadingAdd,
  isOpenAdd,
  handleChangeSearch,
  handleToggleAddDialog,
  handleAddItem,
  tableKeys,
  limit,
  page,
  documentCount,
  handleNavigateItem,
  handleChangePage,
  handleChangeRowsPerPage,
}) => {
  const matchDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  return (
    <Container maxWidth={'xl'}>
      <Grid container spacing={4}>
        <Grid size={{ sm: 12, md: 12, lg: 12 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h4">Manage Inventory</Typography>
            <Box flexGrow={1} />
            <Tooltip title="Add Item">
              <Button
                variant="contained"
                endIcon={<AddCircleOutlineIcon />}
                onClick={handleToggleAddDialog}
              >
                Add Item
              </Button>
            </Tooltip>
          </Stack>
        </Grid>
        <Grid size={{ sm: 12, md: 4, lg: 3 }}>
          <TextField
            label="Item Code"
            name="code"
            value={selectedFilters.code}
            onChange={handleChangeSearch}
            autoComplete="off"
            fullWidth
          />
        </Grid>
        <Grid size={{ sm: 12, md: 4, lg: 3 }}>
          <TextField
            label="Item Title"
            name="name"
            value={selectedFilters.name}
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
                dataLength={items.length}
                isLoading={isLoading}
                documentCount={documentCount}
                page={page}
                limit={limit}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                tableBody={<InventoryRow data={items} onClickRow={handleNavigateItem} />}
              />
            </Paper>
          </Card>
        </Grid>
      </Grid>
      {isOpenAdd && (
        <AddItemDialog
          open={isOpenAdd}
          handleOpenClose={handleToggleAddDialog}
          isLoading={isLoadingAdd}
          handleConfirm={handleAddItem}
        />
      )}
    </Container>
  );
};
