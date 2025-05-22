import React from 'react';
import { Box, Button, CircularProgress, Container, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Chart from 'react-apexcharts';

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SavingsIcon from '@mui/icons-material/Savings';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import DownloadIcon from '@mui/icons-material/Download';

import StatCard from 'src/components/stat-card';
import { formatCurrency } from 'src/utils/format-number';
import { DownloadReportDialog } from '../components/download-report-dialog';

export const AccountsReportsView = ({
  accSummary,
  finSummary,
  expSummary,
  timeRangeFin,
  isLoadingAccSummary,
  isLoadingFinSummary,
  isLoadingExpenseSummary,
  isLoadingFinReportDownload,
  isOpenDownload,
  handleOpenDownloadDialog,
  handleDownloadReport,
}) => {
  // Prepare data for chart
  const prepareSeries = () => {
    const incomeMap = {};
    const expenseMap = {};

    // Create maps for quick lookup
    finSummary.incomeData.forEach((item) => {
      incomeMap[item._id] = item.totalAmount;
    });

    finSummary.expenseData.forEach((item) => {
      expenseMap[item._id] = item.totalAmount;
    });

    // Get all unique dates
    const allDates = [
      ...new Set([
        ...finSummary.incomeData.map((item) => item._id),
        ...finSummary.expenseData.map((item) => item._id),
      ]),
    ];

    // Format data for ApexCharts
    return {
      categories: allDates,
      income: allDates.map((date) => incomeMap[date] || 0),
      expenses: allDates.map((date) => expenseMap[date] || 0),
    };
  };

  const { categories, income, expenses } = prepareSeries();

  // Fin Chart Options
  const chartOptions = {
    chart: {
      type: 'bar',
      stacked: false,
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '70%',
        endingShape: 'rounded',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: categories,
      labels: {
        formatter: function (value) {
          // Format date based on selected range
          if (timeRangeFin === 'year')
            return new Date(value).toLocaleDateString('default', { month: 'short' });
          if (timeRangeFin === 'month') return `Week ${new Date(value).getWeek()}`;
          return new Date(value).toLocaleDateString('default', { day: 'numeric', month: 'short' });
        },
      },
    },
    yaxis: {
      title: {
        text: 'Amount (Rs)',
      },
      labels: {
        formatter: function (value) {
          return formatCurrency(value);
        },
      },
    },
    fill: {
      opacity: 1,
    },
    colors: ['#4CAF50', '#F44336'], // Green for income, red for expenses
    legend: {
      position: 'top',
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return formatCurrency(val);
        },
      },
    },
  };

  // Fin Chart Series
  const series = [
    {
      name: 'Income',
      data: income,
    },
    {
      name: 'Expenses',
      data: expenses,
    },
  ];

  // Prepare data for pie chart
  const pieChartSeries = expSummary.categories.map((category) => category.totalAmount);
  const pieChartLabels = expSummary.categories.map((category) => category.category);

  const pieChartOptions = {
    chart: {
      type: 'pie',
    },
    labels: pieChartLabels,
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
    tooltip: {
      y: {
        formatter: function (value) {
          return formatCurrency(value);
        },
      },
    },
    legend: {
      position: 'right',
      formatter: function (seriesName, opts) {
        return `${seriesName}: ${formatCurrency(opts.w.globals.series[opts.seriesIndex])}`;
      },
    },
    dataLabels: {
      formatter: function (val, opts) {
        const percentage = Math.round(
          (opts.w.globals.series[opts.seriesIndex] / expSummary.grandTotal) * 100
        );
        return `${percentage}%`;
      },
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total Expenses',
              formatter: function () {
                return formatCurrency(expSummary.grandTotal);
              },
            },
          },
        },
      },
    },
  };

  return (
    <Container>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
          <Stack direction="row" alignItems="center" justifyContent="right">
            <Button
              variant="contained"
              startIcon={<DownloadIcon />}
              onClick={handleOpenDownloadDialog}
            >
              Download Report
            </Button>
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 3, lg: 3 }}>
          <StatCard
            title="Cash Balance"
            isLoading={isLoadingAccSummary}
            value={accSummary.length > 0 ? accSummary[0].accountCurrentBalance : 0.0}
            icon={<AttachMoneyIcon color="success" fontSize="large" />}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 3, lg: 3 }}>
          <StatCard
            title="Bank Balance"
            isLoading={isLoadingAccSummary}
            value={accSummary.length > 0 ? accSummary[1].accountCurrentBalance : 0.0}
            icon={<SavingsIcon color="success" fontSize="large" />}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 3, lg: 3 }}>
          <StatCard
            title="Total Receivables"
            isLoading={isLoadingAccSummary}
            value={accSummary.length > 0 ? accSummary[2].accountCurrentBalance : 0.0}
            icon={<AccountBalanceWalletIcon color="info" fontSize="large" />}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 3, lg: 3 }}>
          <StatCard
            title="Total Payables"
            isLoading={isLoadingAccSummary}
            value={accSummary.length > 0 ? accSummary[3].accountCurrentBalance : 0.0}
            icon={<RequestQuoteIcon color="error" fontSize="large" />}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
          {isLoadingFinSummary ? (
            <Box sx={{ display: 'flex', flexGrow: 1 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Chart options={chartOptions} series={series} type="bar" height={400} />
          )}
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
          {isLoadingExpenseSummary ? (
            <Box sx={{ display: 'flex', flexGrow: 1 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Chart options={pieChartOptions} series={pieChartSeries} type="donut" width="100%" />
          )}
        </Grid>
      </Grid>
      {isOpenDownload && (
        <DownloadReportDialog
          open={isOpenDownload}
          handleOpenClose={handleOpenDownloadDialog}
          handleConfirm={handleDownloadReport}
          isLoading={isLoadingFinReportDownload}
        />
      )}
    </Container>
  );
};
