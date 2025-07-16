import React, { Fragment } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  Stack,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import Slide from '@mui/material/Slide';
import { Formik } from 'formik';
import { empAddAttendenceSchema } from 'src/schema/add-attendence-schema';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export const EmpAddAttendenceDialog = ({
  open,
  isLoading,
  isLoadingEmps,
  initialValues,
  handleOpenClose,
  handleSubmit,
}) => {
  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="md"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title">Add Employee Attendance Records</DialogTitle>
      <Formik
        initialValues={initialValues}
        validationSchema={empAddAttendenceSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, errors, touched, handleSubmit, setFieldValue, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <Grid container spacing={2} alignItems="center" justifyContent="center">
                <Grid size={12}>
                  <FormControl required fullWidth>
                    <DatePicker
                      maxDate={new Date()}
                      slotProps={{
                        textField: {
                          required: true,
                        },
                      }}
                      label="Date"
                      value={values.date}
                      onChange={(date) => setFieldValue('date', date, true)}
                    />
                    <FormHelperText>{touched.date && errors.date}</FormHelperText>
                  </FormControl>
                </Grid>
                {isLoadingEmps ? (
                  <Grid size={12}>
                    <Typography>Loading Employees...</Typography>
                  </Grid>
                ) : (
                  <>
                    {values.records.map((emp, index) => (
                      <Fragment key={index}>
                        <Grid size={{ xs: 12, md: 4 }}>
                          <Typography>{`${emp.empId} - ${emp.empFullName}`}</Typography>
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                          <FormControl
                            fullWidth
                            error={Boolean(
                              touched.records?.[index]?.checkIn && errors.records?.[index]?.checkIn
                            )}
                          >
                            <TimePicker
                              label="Check IN"
                              value={emp.checkIn}
                              onChange={(date) => setFieldValue(`records[${index}].checkIn`, date)}
                              ampm={false}
                              slotProps={{
                                textField: {
                                  required: true,
                                  error: Boolean(
                                    touched.records?.[index]?.checkIn &&
                                      errors.records?.[index]?.checkIn
                                  ),
                                  helperText:
                                    touched.records?.[index]?.checkIn &&
                                    errors.records?.[index]?.checkIn,
                                },
                              }}
                            />
                          </FormControl>
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                          <FormControl
                            fullWidth
                            error={Boolean(
                              touched.records?.[index]?.checkOut &&
                                errors.records?.[index]?.checkOut
                            )}
                          >
                            <TimePicker
                              label="Check OUT"
                              value={emp.checkOut}
                              onChange={(date) => setFieldValue(`records[${index}].checkOut`, date)}
                              ampm={false}
                              slotProps={{
                                textField: {
                                  required: true,
                                  error: Boolean(
                                    touched.records?.[index]?.checkOut &&
                                      errors.records?.[index]?.checkOut
                                  ),
                                  helperText:
                                    touched.records?.[index]?.checkOut &&
                                    errors.records?.[index]?.checkOut,
                                },
                              }}
                            />
                          </FormControl>
                        </Grid>
                      </Fragment>
                    ))}
                  </>
                )}
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleOpenClose} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" disabled={isSubmitting || isLoading}>
                {isLoading ? 'Submitting...' : 'Submit'}
              </Button>
            </DialogActions>
          </form>
        )}
      </Formik>
    </Dialog>
  );
};
