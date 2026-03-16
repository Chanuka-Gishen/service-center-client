import {
  Button,
  Card,
  Chip,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { CustomTable } from 'src/components/custom-table/custom-table';
import { InventoryCategoryRow } from '../components/inventory-category-row';
import { InventoryCategoryForm } from '../components/inventory-category-form';

export const InventoryCategoriesView = ({
  tableHeaders,
  searchParams,
  categories,
  categoriesCount,
  pagination,
  initialValues,
  isOpenAdd,
  isOpenUpdate,
  isLoading,
  isLoadingAddCategor,
  isLoadingUpdateCategory,
  handleChangeSearchParam,
  handleDeleteSearchParam,
  handleToggleAddDialog,
  handleToggleUpdateDialog,
  handleAddInventoryCategory,
  handleUpdateInventoryCategory,
}) => {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid size={12}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h4">Manage Inventory Categories</Typography>
            <Tooltip title="Add New Category">
              <Button
                variant="contained"
                endIcon={<AddCircleOutlineIcon />}
                onClick={handleToggleAddDialog}
              >
                Add New Category
              </Button>
            </Tooltip>
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <TextField
            label="Category Title"
            value={searchParams.name}
            name="name"
            onChange={handleChangeSearchParam}
            autoComplete="off"
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <FormControl fullWidth>
            <InputLabel id="select-label">Category Status</InputLabel>
            <Select
              labelId="select-label"
              id="simple-select"
              label="Category Status"
              name="status"
              fullWidth
              value={searchParams.status}
              onChange={handleChangeSearchParam}
            >
              <MenuItem value={''}>Any</MenuItem>
              <MenuItem value={true}>Active</MenuItem>
              <MenuItem value={false}>Not Active</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {(searchParams.name || typeof searchParams.status === 'boolean') && (
          <Grid size={12}>
            <Stack direction="row" spacing={2} flexWrap="wrap">
              {searchParams.name && (
                <Chip label={searchParams.name} onDelete={() => handleDeleteSearchParam('name')} />
              )}
              {typeof searchParams.status === 'boolean' && (
                <Chip
                  label={searchParams.status ? 'Available' : 'Not Available'}
                  onDelete={() => handleDeleteSearchParam('status')}
                />
              )}
            </Stack>
          </Grid>
        )}
        <Grid size={12}>
          <Card>
            <Paper elevation={0}>
              <CustomTable
                keys={tableHeaders}
                dataLength={categories.length}
                isLoading={isLoading}
                documentCount={categoriesCount}
                page={pagination.page}
                limit={pagination.limit}
                handleChangePage={pagination.handleChangePage}
                handleChangeRowsPerPage={pagination.handleChangeRowsPerPage}
                tableBody={
                  <InventoryCategoryRow data={categories} onClick={handleToggleUpdateDialog} />
                }
              />
            </Paper>
          </Card>
        </Grid>
      </Grid>
      {isOpenAdd && (
        <InventoryCategoryForm
          open={isOpenAdd}
          initialValues={initialValues}
          isLoading={isLoadingAddCategor}
          handleOpenClose={handleToggleAddDialog}
          handleConfirm={handleAddInventoryCategory}
        />
      )}
      {isOpenUpdate && (
        <InventoryCategoryForm
          open={isOpenUpdate}
          initialValues={initialValues}
          isLoading={isLoadingUpdateCategory}
          handleOpenClose={handleToggleUpdateDialog}
          handleConfirm={handleUpdateInventoryCategory}
        />
      )}
    </Container>
  );
};
