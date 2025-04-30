import React from 'react';
import {
  Card,
  Chip,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { CustomTable } from 'src/components/custom-table/custom-table';
import { JobRow } from '../components/job-row';
import { PAY_STATUS } from 'src/constants/paymentStatus';

export const JobsView = ({
  tableTitles,
  searchParams,
  jobs,
  jobsCount,
  isLoadingJobs,
  handleOnRowClick,
  limit,
  page,
  handleChangePage,
  handleChangeRowsPerPage,
  handleChangeSearchParam,
  handleDeleteSearchParam,
}) => {
  return (
    <Container>
      <Grid container spacing={4}>
        <Grid size={{ sm: 12, md: 12, lg: 12 }}>
          <Typography variant="h4">Work History</Typography>
        </Grid>
        <Grid size={{ sm: 12, md: 12, lg: 12 }}>
          <Grid container spacing={2}>
            <Grid size={{ sm: 12, md: 4, lg: 4 }}>
              <TextField
                label="Customer Name"
                value={searchParams.name}
                name="name"
                onChange={handleChangeSearchParam}
                autoComplete="off"
                fullWidth
              />
            </Grid>
            <Grid size={{ sm: 12, md: 4, lg: 4 }}>
              <TextField
                label="Vehicle Number"
                value={searchParams.vehicleNo}
                name="vehicleNo"
                onChange={handleChangeSearchParam}
                autoComplete="off"
                fullWidth
              />
            </Grid>
            <Grid size={{ sm: 12, md: 4, lg: 4 }}>
              <TextField
                label="Invoice Number"
                value={searchParams.invoiceNo}
                name="invoiceNo"
                onChange={handleChangeSearchParam}
                autoComplete="off"
                fullWidth
              />
            </Grid>
            <Grid size={{ sm: 12, md: 4, lg: 4 }}>
              <FormControl fullWidth>
                <InputLabel id="select-label">Payment Status</InputLabel>
                <Select
                  labelId="select-label"
                  id="simple-select"
                  label="Payment Status"
                  name="paymentStatus"
                  fullWidth
                  value={searchParams.paymentStatus || ''}
                  onChange={handleChangeSearchParam}
                >
                  {PAY_STATUS.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        {(searchParams.name ||
          searchParams.vehicleNo ||
          searchParams.invoiceNo ||
          searchParams.paymentStatus) && (
          <Grid size={12}>
            <Stack direction="row" spacing={2} flexWrap="wrap">
              {searchParams.name && (
                <Chip label={searchParams.name} onDelete={() => handleDeleteSearchParam('name')} />
              )}
              {searchParams.vehicleNo && (
                <Chip
                  label={searchParams.vehicleNo}
                  onDelete={() => handleDeleteSearchParam('vehicleNo')}
                />
              )}
              {searchParams.invoiceNo && (
                <Chip
                  label={searchParams.invoiceNo}
                  onDelete={() => handleDeleteSearchParam('invoiceNo')}
                />
              )}
              {searchParams.paymentStatus && (
                <Chip
                  label={searchParams.paymentStatus}
                  onDelete={() => handleDeleteSearchParam('paymentStatus')}
                />
              )}
            </Stack>
          </Grid>
        )}

        <Grid size={{ sm: 12, md: 12, lg: 12 }}>
          <Card>
            <Paper elevation={0}>
              <CustomTable
                keys={tableTitles}
                dataLength={jobs.length}
                isLoading={isLoadingJobs}
                documentCount={jobsCount}
                page={page}
                limit={limit}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                tableBody={<JobRow data={jobs} onClickRow={handleOnRowClick} />}
              />
            </Paper>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};
