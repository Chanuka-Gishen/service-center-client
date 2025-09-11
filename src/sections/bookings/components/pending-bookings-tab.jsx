import { Card, Paper } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { CustomTable } from 'src/components/custom-table/custom-table';
import { BookingsRow } from './bookings-row';
import { BookingInfo } from './booking-info';

export const PendingBookingsTab = ({
  selectedBooking,
  initialValues,
  bookings,
  bookingsCount,
  pendingPagination,
  isOpenUpdate,
  isOpenComplete,
  isOpenCancel,
  isLoadingBookings,
  isLoadingUpdateBooking,
  isLoadingCompleteBooking,
  isLoadingCancelBooking,
  handleToggleUpdateDialog,
  handleToggleCompleteDialog,
  handleToggleCancelDialog,
  handleSelectRow,
  handleUpdateBooking,
  handleCompleteBooking,
  handleCancelBooking,
}) => {
  return (
    <Grid container spacing={4}>
      <Grid size={{ xs: 12, md: 6 }}>
        <Card>
          <Paper elevation={0}>
            <CustomTable
              keys={['Customer', 'Mobile No', 'Vehicle No', 'Date', 'Time Slot']}
              documentCount={bookingsCount}
              isLoading={isLoadingBookings}
              limit={pendingPagination.limit}
              page={pendingPagination.page}
              handleChangePage={pendingPagination.handleChangePage}
              handleChangeRowsPerPage={pendingPagination.handleChangeRowsPerPage}
              dataLength={bookings.length}
              tableBody={<BookingsRow data={bookings} onClickRow={handleSelectRow} />}
            />
          </Paper>
        </Card>
      </Grid>
      {selectedBooking && (
        <Grid size={{ xs: 12, md: 6 }}>
          <BookingInfo
            selectedBooking={selectedBooking}
            initialValues={initialValues}
            isOpenUpdate={isOpenUpdate}
            isOpenComplete={isOpenComplete}
            isOpenCancel={isOpenCancel}
            isLoadingUpdateBooking={isLoadingUpdateBooking}
            isLoadingCompleteBooking={isLoadingCompleteBooking}
            isLoadingCancelBooking={isLoadingCancelBooking}
            handleToggleUpdateDialog={handleToggleUpdateDialog}
            handleToggleCompleteDialog={handleToggleCompleteDialog}
            handleToggleCancelDialog={handleToggleCancelDialog}
            handleUpdateBooking={handleUpdateBooking}
            handleCompleteBooking={handleCompleteBooking}
            handleCancelBooking={handleCancelBooking}
          />
        </Grid>
      )}
    </Grid>
  );
};
