import {
  Box,
  Button,
  Card,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { fDate, fDateTime } from 'src/utils/format-time';
import { UpdateBookingDialog } from './update-booking-dialog';
import ConfirmationDialog from 'src/components/confirmation-dialog/confirmation-dialog';
import { STATUS_CREATED } from 'src/constants/common-constants';

export const BookingInfo = ({
  selectedBooking,
  initialValues,
  isOpenUpdate,
  isOpenComplete,
  isOpenCancel,
  isLoadingUpdateBooking,
  isLoadingCompleteBooking,
  isLoadingCancelBooking,
  handleToggleUpdateDialog,
  handleToggleCompleteDialog,
  handleToggleCancelDialog,
  handleUpdateBooking,
  handleCompleteBooking,
  handleCancelBooking,
}) => {
  
  return (
    <Grid container spacing={4}>
      {selectedBooking.bookingStatus === STATUS_CREATED && (
        <>
          <Grid size={{ xs: 6, sm: 3 }}>
            <Button fullWidth variant="outlined" onClick={handleToggleUpdateDialog}>
              Update Booking
            </Button>
          </Grid>
          <Grid size={{ xs: 6, sm: 3 }}>
            <Button fullWidth variant="outlined" onClick={handleToggleCompleteDialog}>
              Process Booking
            </Button>
          </Grid>
          <Grid size={{ xs: 6, sm: 3 }}>
            <Button fullWidth variant="outlined" onClick={handleToggleCancelDialog}>
              Cancel Booking
            </Button>
          </Grid>
        </>
      )}

      <Grid size={12}>
        <Chip color="success" label={`${fDate(selectedBooking.date)} at ${selectedBooking.timeSlot}`} />
      </Grid>
      {selectedBooking.bookingProcessedAt && (
        <Grid size={12}>
          <Chip
            color="success"
            label={`Processed at ${fDateTime(selectedBooking.bookingProcessedAt)}`}
          />
        </Grid>
      )}
      <Grid size={{ xs: 12, md: 6 }}>
        <Card>
          <Box sx={{ p: '5px' }}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell variant="head">Customer</TableCell>
                  <TableCell>{`${selectedBooking.customer.customerPrefix}. ${selectedBooking.customer.customerName}`}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head">Mobile Number</TableCell>
                  <TableCell>{selectedBooking.customer.customerMobile}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head">Type</TableCell>
                  <TableCell>{selectedBooking.customer.customerType}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Card>
          <Box sx={{ p: '5px' }}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell variant="head">Vehicle Number</TableCell>
                  <TableCell>{selectedBooking.vehicle.vehicleNumber}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head">Brand</TableCell>
                  <TableCell>{selectedBooking.vehicle.vehicleManufacturer}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head">Model</TableCell>
                  <TableCell>{selectedBooking.vehicle.vehicleModel}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head">Type</TableCell>
                  <TableCell>{selectedBooking.vehicle.vehicleType}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head">Issue</TableCell>
                  <TableCell>{selectedBooking.issue ? selectedBooking.issue : ' - '}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        </Card>
      </Grid>
      {isOpenUpdate && (
        <UpdateBookingDialog
          initialValues={initialValues}
          open={isOpenUpdate}
          handleOpenClose={handleToggleUpdateDialog}
          handleConfirm={handleUpdateBooking}
          isLoading={isLoadingUpdateBooking}
        />
      )}
      {isOpenComplete && (
        <ConfirmationDialog
          open={isOpenComplete}
          handleClose={handleToggleCompleteDialog}
          contentText={
            'Are you sure that you want to create a job for this booking and close this booking ? Cannot revert this process once proceed.'
          }
          handleSubmit={handleCompleteBooking}
          isLoading={isLoadingCompleteBooking}
        />
      )}
      {isOpenCancel && (
        <ConfirmationDialog
          open={isOpenCancel}
          handleClose={handleToggleCancelDialog}
          contentText={
            'Are you sure that you want to cancel this booking ? Cannot revert this process once proceed.'
          }
          handleSubmit={handleCancelBooking}
          isLoading={isLoadingCancelBooking}
        />
      )}
    </Grid>
  );
};
