import { Box, Container, Tab, Tabs } from '@mui/material';
import Grid from '@mui/material/Grid2';

import PendingIcon from '@mui/icons-material/Pending';

import StatCard from 'src/components/stat-card';
import { ProcessedBookingsTab } from '../components/processed-bookings-tab';
import { PendingBookingsTab } from '../components/pending-bookings-tab';

const CustomTabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      sx={{ pt: '20px' }}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </Box>
  );
};

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

export const BookingsView = ({
  selectedTab,
  selectedBooking,
  initialValues,
  bookings,
  bookingsCount,
  totalBookingsCount,
  totalPendingBookingsCount,
  totalTodayBookingsCount,
  pendingPagination,
  processedPagination,
  isOpenUpdate,
  isOpenComplete,
  isOpenCancel,
  isLoadingBookings,
  isLoadingUpdateBooking,
  isLoadingCompleteBooking,
  isLoadingCancelBooking,
  isLoadingTotalBookingsCount,
  isLoadingTotalPendingBookingCount,
  isLoadingTodayBookingsCount,
  handleSelectTab,
  handleToggleUpdateDialog,
  handleToggleCompleteDialog,
  handleToggleCancelDialog,
  handleSelectRow,
  handleUpdateBooking,
  handleCompleteBooking,
  handleCancelBooking,
}) => {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title={'Total Bookings Made'}
            value={totalBookingsCount}
            type="number"
            isLoading={isLoadingTotalBookingsCount}
            icon={<PendingIcon color="info" fontSize="large" />}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title={'Pending Bookings'}
            value={totalPendingBookingsCount}
            type="number"
            isLoading={isLoadingTotalPendingBookingCount}
            icon={<PendingIcon color="info" fontSize="large" />}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title={'New Bookings'}
            value={totalTodayBookingsCount}
            type="number"
            isLoading={isLoadingTodayBookingsCount}
            icon={<PendingIcon color="info" fontSize="large" />}
          />
        </Grid>
        <Grid size={12}>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={selectedTab}
                onChange={handleSelectTab}
                aria-label="basic tabs example"
                variant="fullWidth"
              >
                <Tab label="Pending Bookings" {...a11yProps(0)} />
                <Tab label="Processed Bookings" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={selectedTab} index={0}>
              <PendingBookingsTab
                selectedBooking={selectedBooking}
                initialValues={initialValues}
                bookings={bookings}
                bookingsCount={bookingsCount}
                pendingPagination={pendingPagination}
                isOpenUpdate={isOpenUpdate}
                isOpenComplete={isOpenComplete}
                isOpenCancel={isOpenCancel}
                isLoadingBookings={isLoadingBookings}
                isLoadingUpdateBooking={isLoadingUpdateBooking}
                isLoadingCompleteBooking={isLoadingCompleteBooking}
                isLoadingCancelBooking={isLoadingCancelBooking}
                handleToggleUpdateDialog={handleToggleUpdateDialog}
                handleToggleCompleteDialog={handleToggleCompleteDialog}
                handleToggleCancelDialog={handleToggleCancelDialog}
                handleSelectRow={handleSelectRow}
                handleUpdateBooking={handleUpdateBooking}
                handleCompleteBooking={handleCompleteBooking}
                handleCancelBooking={handleCancelBooking}
              />
            </CustomTabPanel>
            <CustomTabPanel value={selectedTab} index={1}>
              <ProcessedBookingsTab
                bookings={bookings}
                bookingsCount={bookingsCount}
                processedPagination={processedPagination}
                selectedBooking={selectedBooking}
                isLoadingBookings={isLoadingBookings}
                handleSelectRow={handleSelectRow}
              />
            </CustomTabPanel>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
