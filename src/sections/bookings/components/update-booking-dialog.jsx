import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { DateCalendar } from '@mui/x-date-pickers';
import { Formik } from 'formik';
import { TIME_SLOTS } from 'src/constants/common-constants';
import { updateBookingSchema } from 'src/schema/update-booking-schema';

export const UpdateBookingDialog = ({
  open,
  initialValues,
  isLoading,
  handleOpenClose,
  handleConfirm,
}) => {
  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Update Booking</DialogTitle>

      <Formik
        initialValues={initialValues}
        validationSchema={updateBookingSchema}
        onSubmit={(values) => {
          handleConfirm(values);
        }}
      >
        {({
          values,
          errors,
          touched,
          resetForm,
          handleSubmit,
          handleChange,
          handleBlur,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <Grid
                container
                spacing={2}
                sx={{ mt: 1 }}
                justifyContent="center"
                alignItems="center"
              >
                <Grid size={12}>
                  <FormControl required fullWidth>
                    <DateCalendar
                      value={values.date}
                      onChange={(date) => setFieldValue('date', date, true)}
                      minDate={new Date()}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          required: true,
                          variant: 'outlined',
                          sx: { mb: 3 },
                        },
                      }}
                    />
                    <FormHelperText error={touched.date && errors.date}>
                      {touched.date && errors.date}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid size={12}>
                  <FormControl fullWidth required error={Boolean(touched.timeSlot && errors.timeSlot)}>
                    <InputLabel id="select-label">Time Slot</InputLabel>
                    <Select
                      labelId="select-label"
                      id="simple-select"
                      label="Source"
                      name="timeSlot"
                      required
                      value={values.timeSlot || ''}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {TIME_SLOTS.map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText error={Boolean(touched.timeSlot && errors.timeSlot)}>
                      {touched.timeSlot && errors.timeSlot}
                    </FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  handleOpenClose();
                  resetForm();
                }}
                disabled={isLoading}
                variant="outlined"
              >
                Cancel
              </Button>
              <Button variant="contained" type="submit" disabled={isLoading} autoFocus>
                Confirm
              </Button>
            </DialogActions>
          </form>
        )}
      </Formik>
    </Dialog>
  );
};
