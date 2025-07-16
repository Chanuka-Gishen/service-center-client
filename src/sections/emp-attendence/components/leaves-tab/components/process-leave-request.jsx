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
import { Formik } from 'formik';
import { LEAVE_STS_APPROVED, LEAVE_STS_REJECTED } from 'src/constants/leave-constants';
import { processLeaveRequestSchema } from 'src/schema/process-leave-rqst-schema';

export const ProcessLeaveRequest = ({ open, isLoading, handleOpenClose, handleConfirm }) => {
  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Process Leave Request</DialogTitle>

      <Formik
        initialValues={{
          leaveRequestStatus: LEAVE_STS_APPROVED,
          leaveRequestRejectionReason: '',
        }}
        validationSchema={processLeaveRequestSchema}
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
                <Grid size={12}>
                  <FormControl
                    fullWidth
                    required
                    error={Boolean(touched.leaveRequestStatus && errors.leaveRequestStatus)}
                  >
                    <InputLabel id="select-label-sts">Status</InputLabel>
                    <Select
                      labelId="select-label-sts"
                      id="simple-select-sts"
                      label="Status"
                      name="leaveRequestStatus"
                      required
                      value={values.leaveRequestStatus || ''}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {[LEAVE_STS_APPROVED, LEAVE_STS_REJECTED].map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText
                      error={Boolean(touched.leaveRequestStatus && errors.leaveRequestStatus)}
                    >
                      {touched.leaveRequestStatus && errors.leaveRequestStatus}
                    </FormHelperText>
                  </FormControl>
                </Grid>

                {values.leaveRequestStatus === LEAVE_STS_REJECTED && (
                  <Grid size={12}>
                    <TextField
                      label="Rejected Reason"
                      name="leaveRequestRejectionReason"
                      fullWidth
                      required
                      autoComplete="off"
                      variant="outlined"
                      {...getFieldProps('leaveRequestRejectionReason')}
                      error={
                        touched.leaveRequestRejectionReason &&
                        Boolean(errors.leaveRequestRejectionReason)
                      }
                      helperText={
                        touched.leaveRequestRejectionReason && errors.leaveRequestRejectionReason
                      }
                    />
                  </Grid>
                )}
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
