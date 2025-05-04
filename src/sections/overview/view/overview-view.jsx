import React from 'react';
import Chart from 'react-apexcharts';
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Container,
  Paper,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import Grid from '@mui/material/Grid2';

import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import PendingIcon from '@mui/icons-material/Pending';
import TaxiAlertIcon from '@mui/icons-material/TaxiAlert';

import useAuthStore from 'src/store/auth-store';
import StatCard from 'src/components/stat-card';
import { CustomTable } from 'src/components/custom-table/custom-table';
import { LowStocksRow } from '../components/low-stocks-row';
import { ITEM_STS_LOW_STOCK, ITEM_STS_OUTOFSTOCK } from 'src/constants/item-status';
import { formatCurrency } from 'src/utils/format-number';

// ----------------------------------------------------------------------

export const Overview = ({
  selectedInvStatus,
  setSelectedInvStatus,
  stockTableColumns,
  invStockStats,
  invStockStatsCount,
  chartTotalRevenueData,
  charTotalJobsData,
  activeJobsCount,
  todayRevenue,
  totalReceivables,
  isLoadingChartRevenueData,
  isLoadingChartTotalJobs,
  isLoadingStockAvailabilityStats,
  isLoadingActiveJobsCount,
  isLoadingTodayRevenue,
  isLoadingReceivables,
}) => {
  const theme = useTheme();
  const { auth } = useAuthStore.getState();

  // Revenue Chart Options
  const revenueOptions = {
    chart: {
      type: 'line',
      height: 350,
      zoom: {
        enabled: false,
      },
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    title: {
      text: 'Daily Revenue (Last 7 Days)',
      align: 'left',
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
      },
    },
    xaxis: {
      type: 'datetime',
      categories: chartTotalRevenueData.map((item) => item.date),
      labels: {
        format: 'dd MMM',
      },
    },
    yaxis: {
      title: {
        text: 'Revenue (LKR)',
      },
      labels: {
        formatter: (value) => formatCurrency(value),
      },
    },
    tooltip: {
      y: {
        formatter: (value) => formatCurrency(value),
      },
    },
    colors: ['#4CAF50'],
  };

  // Order Count Chart Options
  const orderCountOptions = {
    chart: {
      type: 'line',
      height: 350,
      zoom: {
        enabled: false,
      },
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    title: {
      text: 'Daily Work Orders (Last 7 Days)',
      align: 'left',
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
      },
    },
    xaxis: {
      type: 'datetime',
      categories: charTotalJobsData.map((item) => item.date),
      labels: {
        format: 'dd MMM',
      },
    },
    yaxis: {
      title: {
        text: 'Number of Orders',
      },
      min: 0,
      tickAmount: 5,
    },
    colors: ['#3F51B5'],
  };

  // Chart Series Data
  const revenueSeries = [
    {
      name: 'Revenue',
      data: chartTotalRevenueData.map((item) => item.totalRevenue),
    },
  ];

  const orderCountSeries = [
    {
      name: 'Work Orders',
      data: charTotalJobsData.map((item) => item.count),
    },
  ];

  return (
    <Container maxWidth="xl">
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, sm: 12, md: 8, lg: 8 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4 }}>
              <StatCard
                title={'Today Revenue'}
                isLoading={isLoadingTodayRevenue}
                value={todayRevenue}
                icon={<LocalAtmIcon color="success" fontSize="large" />}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4 }}>
              <StatCard
                title={'Receivables'}
                isLoading={isLoadingReceivables}
                value={totalReceivables}
                icon={<PendingIcon color="info" fontSize="large" />}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4 }}>
              <StatCard
                title={'Active Queue'}
                isLoading={isLoadingActiveJobsCount}
                type="number"
                value={activeJobsCount}
                icon={<TaxiAlertIcon color="success" fontSize="large" />}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
              <Card
                sx={{
                  borderRadius: 2,
                  boxShadow: theme.shadows[2],
                  '&:hover': {
                    boxShadow: theme.shadows[6],
                  },
                  transition: 'box-shadow 0.3s ease',
                }}
              >
                <Paper elevation={0} sx={{ p: '10px' }}>
                  <Chart options={revenueOptions} series={revenueSeries} type="line" height={350} />
                </Paper>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
              <Card
                sx={{
                  borderRadius: 2,
                  boxShadow: theme.shadows[2],
                  '&:hover': {
                    boxShadow: theme.shadows[6],
                  },
                  transition: 'box-shadow 0.3s ease',
                }}
              >
                <Paper elevation={0} sx={{ p: '10px' }}>
                  <Chart
                    options={orderCountOptions}
                    series={orderCountSeries}
                    type="line"
                    height={350}
                  />
                </Paper>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="h5">
                Stocks {isLoadingStockAvailabilityStats ? `(...)` : `(${invStockStatsCount})`}
              </Typography>
              <ButtonGroup variant="outlined" aria-label="Loading button group">
                <Button
                  variant={selectedInvStatus === ITEM_STS_OUTOFSTOCK ? 'contained' : 'outlined'}
                  onClick={() => setSelectedInvStatus(ITEM_STS_OUTOFSTOCK)}
                  loading={isLoadingStockAvailabilityStats}
                  loadingPosition="start"
                >
                  {ITEM_STS_OUTOFSTOCK}
                </Button>
                <Button
                  variant={selectedInvStatus === ITEM_STS_LOW_STOCK ? 'contained' : 'outlined'}
                  onClick={() => setSelectedInvStatus(ITEM_STS_LOW_STOCK)}
                  loading={isLoadingStockAvailabilityStats}
                  loadingPosition="start"
                >
                  {ITEM_STS_LOW_STOCK}
                </Button>
              </ButtonGroup>
            </Stack>

            <Card>
              <Paper elevation={0}>
                <CustomTable
                  keys={stockTableColumns}
                  isLoading={isLoadingStockAvailabilityStats}
                  dataLength={invStockStats.length}
                  tableBody={<LowStocksRow data={invStockStats} />}
                  enablePagination={false}
                />
              </Paper>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

Overview.propTypes = {};
