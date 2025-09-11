import { Card, Paper } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { CustomTable } from 'src/components/custom-table/custom-table';
import { BookingsRow } from './bookings-row';
import { BookingInfo } from './booking-info';

export const ProcessedBookingsTab = ({
  bookings,
  bookingsCount,
  selectedBooking,
  processedPagination,
  isLoadingBookings,
  handleSelectRow,
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
              limit={processedPagination.limit}
              page={processedPagination.page}
              handleChangePage={processedPagination.handleChangePage}
              handleChangeRowsPerPage={processedPagination.handleChangeRowsPerPage}
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
            handleCancelBooking={null}
            handleCompleteBooking={null}
            handleToggleCancelDialog={null}
            handleToggleCompleteDialog={null}
            handleToggleUpdateDialog={null}
            handleUpdateBooking={null}
            initialValues={null}
            isLoadingCancelBooking={false}
            isLoadingCompleteBooking={false}
            isLoadingUpdateBooking={false}
            isOpenCancel={false}
            isOpenComplete={false}
            isOpenUpdate={false}
          />
        </Grid>
      )}
    </Grid>
  );
};
