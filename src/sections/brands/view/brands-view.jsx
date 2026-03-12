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
import { BrandRow } from '../components/brand-row';

export const BrandsView = ({
  tableTitles,
  searchParams,
  brands,
  brandsCount,
  pagination,
  isLoading,
  handleToggleAddDialog,
  handleChangeSearchParam,
  handleDeleteSearchParam,
}) => {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Grid size={12}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h4">Manage Brands</Typography>
            <Tooltip title="Add New Brand">
              <Button
                variant="contained"
                endIcon={<AddCircleOutlineIcon />}
                onClick={handleToggleAddDialog}
              >
                Add New Brand
              </Button>
            </Tooltip>
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <TextField
            label="Brand Name"
            value={searchParams.search}
            name="search"
            onChange={handleChangeSearchParam}
            autoComplete="off"
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <FormControl fullWidth>
            <InputLabel id="select-label">Brand Status</InputLabel>
            <Select
              labelId="select-label"
              id="simple-select"
              label="Brand Status"
              name="brandStatus"
              fullWidth
              value={searchParams.brandStatus || ''}
              onChange={handleChangeSearchParam}
            >
              <MenuItem value={true}>Active</MenuItem>
              <MenuItem value={false}>Not Active</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <FormControl fullWidth>
            <InputLabel id="select-label">Sort By</InputLabel>
            <Select
              labelId="select-label"
              id="simple-select"
              label="Sort By"
              name="sortBy"
              fullWidth
              value={searchParams.sortBy || ''}
              onChange={handleChangeSearchParam}
            >
              <MenuItem value={'brandName'}>By Brand Name</MenuItem>
              <MenuItem value={'brandProductCount'}>By Product Count</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <FormControl fullWidth>
            <InputLabel id="select-label">Sort Order</InputLabel>
            <Select
              labelId="select-label"
              id="simple-select"
              label="Sort Order"
              name="sortOrder"
              fullWidth
              value={searchParams.Order || ''}
              onChange={handleChangeSearchParam}
            >
              <MenuItem value={'asc'}>Ascending</MenuItem>
              <MenuItem value={'dsc'}>Descending</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {(searchParams.search || searchParams.brandStatus) && (
          <Grid size={12}>
            <Stack direction="row" spacing={2} flexWrap="wrap">
              {searchParams.search && (
                <Chip
                  label={searchParams.search}
                  onDelete={() => handleDeleteSearchParam('search')}
                />
              )}
              {searchParams.brandStatus && (
                <Chip
                  label={searchParams.brandStatus ? 'Available' : 'Not Available'}
                  onDelete={() => handleDeleteSearchParam('brandStatus')}
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
                dataLength={brands.length}
                isLoading={isLoading}
                documentCount={brandsCount}
                page={pagination.page}
                limit={pagination.limit}
                handleChangePage={pagination.handleChangePage}
                handleChangeRowsPerPage={pagination.handleChangeRowsPerPage}
                tableBody={<BrandRow data={brands} />}
              />
            </Paper>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};
