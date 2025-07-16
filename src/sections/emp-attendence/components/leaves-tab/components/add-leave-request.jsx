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
  TextField,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { DatePicker } from '@mui/x-date-pickers';
import { Formik } from 'formik';
import {
  LEAVE_CAT,
  LEAVE_PERIODS,
  LEAVE_TYP_FULL,
  LEAVE_TYP_HALF,
  LEAVE_TYPES,
} from 'src/constants/leave-constants';
import { addLeaveRequestSchema } from 'src/schema/add-leave-rqst-schema';

export const AddLeaveRequest = ({
  open,
  employees,
  isLoading,
  isLoadingEmps,
  handleOpenClose,
  handleConfirm,
}) => {
  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Create Leave Request</DialogTitle>

      <Formik
        initialValues={{
          leaveRequestEmp: '',
          leaveRequestCategory: '',
          leaveRequestStartDate: null,
          leaveRequestEndDate: null,
          leaveRequestType: '',
          leaveRequestHalfDayPeriod: '',
          leaveRequestReason: '',
        }}
        validationSchema={addLeaveRequestSchema}
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
          getFieldProps,
          handleChange,
          handleBlur,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControl
                    fullWidth
                    required
                    error={Boolean(touched.leaveRequestEmp && errors.leaveRequestEmp)}
                  >
                    <InputLabel id="select-label-emp">Employee</InputLabel>
                    <Select
                      labelId="select-label-emp"
                      id="simple-select-emp"
                      label="Employee"
                      name="leaveRequestEmp"
                      required
                      value={values.leaveRequestEmp || ''}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {employees.map((item, index) => (
                        <MenuItem key={index} value={item._id}>
                          {item.empFullName}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText
                      error={Boolean(touched.leaveRequestEmp && errors.leaveRequestEmp)}
                    >
                      {touched.leaveRequestEmp && errors.leaveRequestEmp}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControl
                    fullWidth
                    required
                    error={Boolean(touched.leaveRequestCategory && errors.leaveRequestCategory)}
                  >
                    <InputLabel id="select-label-typ">Category</InputLabel>
                    <Select
                      labelId="select-label-period"
                      id="simple-select-period"
                      label="Category"
                      name="leaveRequestCategory"
                      required
                      value={values.leaveRequestCategory || ''}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {LEAVE_CAT.map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText
                      error={Boolean(touched.leaveRequestCategory && errors.leaveRequestCategory)}
                    >
                      {touched.leaveRequestCategory && errors.leaveRequestCategory}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControl
                    fullWidth
                    required
                    error={Boolean(touched.leaveRequestType && errors.leaveRequestType)}
                  >
                    <InputLabel id="select-label-typ">Type</InputLabel>
                    <Select
                      labelId="select-label-typ"
                      id="simple-select-typ"
                      label="Type"
                      name="leaveRequestType"
                      required
                      value={values.leaveRequestType || ''}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {LEAVE_TYPES.map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText
                      error={Boolean(touched.leaveRequestType && errors.leaveRequestType)}
                    >
                      {touched.leaveRequestType && errors.leaveRequestType}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                {values.leaveRequestType === LEAVE_TYP_HALF && (
                  <Grid size={{ xs: 12, md: 6 }}>
                    <FormControl
                      fullWidth
                      required
                      error={Boolean(
                        touched.leaveRequestHalfDayPeriod && errors.leaveRequestHalfDayPeriod
                      )}
                    >
                      <InputLabel id="select-label-typ">Time Period</InputLabel>
                      <Select
                        labelId="select-label-period"
                        id="simple-select-period"
                        label="Time Period"
                        name="leaveRequestHalfDayPeriod"
                        required
                        value={values.leaveRequestHalfDayPeriod || ''}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        {LEAVE_PERIODS.map((item, index) => (
                          <MenuItem key={index} value={item}>
                            {item}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText
                        error={Boolean(
                          touched.leaveRequestHalfDayPeriod && errors.leaveRequestHalfDayPeriod
                        )}
                      >
                        {touched.leaveRequestHalfDayPeriod && errors.leaveRequestHalfDayPeriod}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                )}

                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControl
                    required
                    fullWidth
                    error={Boolean(touched.leaveRequestStartDate && errors.leaveRequestStartDate)}
                  >
                    <DatePicker
                      minDate={new Date()}
                      slotProps={{
                        textField: {
                          required: true,
                        },
                      }}
                      label="From"
                      value={values.leaveRequestStartDate}
                      onChange={(date) => setFieldValue('leaveRequestStartDate', date, true)}
                    />
                    <FormHelperText>
                      {touched.leaveRequestStartDate && errors.leaveRequestStartDate}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                {values.leaveRequestType === LEAVE_TYP_FULL && (
                  <Grid size={{ xs: 12, md: 6 }}>
                    <FormControl
                      required
                      fullWidth
                      error={Boolean(touched.leaveRequestEndDate && errors.leaveRequestEndDate)}
                    >
                      <DatePicker
                        minDate={values.leaveRequestStartDate}
                        slotProps={{
                          textField: {
                            required: true,
                          },
                        }}
                        label="To"
                        value={values.leaveRequestEndDate}
                        onChange={(date) => setFieldValue('leaveRequestEndDate', date, true)}
                      />
                      <FormHelperText>
                        {touched.leaveRequestEndDate && errors.leaveRequestEndDate}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                )}

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="Reason"
                    name="leaveRequestReason"
                    fullWidth
                    required
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('leaveRequestReason')}
                    error={touched.leaveRequestReason && Boolean(errors.leaveRequestReason)}
                    helperText={touched.leaveRequestReason && errors.leaveRequestReason}
                  />
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
