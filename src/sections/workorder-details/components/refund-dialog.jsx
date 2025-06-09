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
  Typography,
} from '@mui/material';
import { Formik } from 'formik';
import Grid from '@mui/material/Grid2';

import { PAY_METHOD_CASH, PAY_METHODS } from 'src/constants/payment-methods';
import { refundSchema } from 'src/schema/refund-schema';
import { DatePicker } from '@mui/x-date-pickers';

export const RefundDialog = ({ open, handleClose, isLoading, handleConfirm }) => {
  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Refund Payment</DialogTitle>
      <Formik
        initialValues={{
          paymentMethod: PAY_METHOD_CASH,
          paymentTransactionId: '',
          paymentNotes: '',
          paymentDate: new Date(),
        }}
        validationSchema={refundSchema}
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
          setFieldValue,
          getFieldProps,
          handleChange,
          handleBlur,
        }) => (
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 12, lg: 12 }}>
                  <Typography variant="subtitle1">
                    Are you sure that you want to issue a refund to this invoice ? This action
                    cannot be reveresed once proceed.
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, lg: 6 }}>
                  <FormControl fullWidth>
                    <InputLabel id="select-label">Method</InputLabel>
                    <Select
                      labelId="select-label"
                      id="simple-select"
                      label="Method"
                      name="paymentMethod"
                      required
                      value={values.paymentMethod || ''}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {PAY_METHODS.map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>{touched.paymentMethod && errors.paymentMethod}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, lg: 6 }}>
                  <TextField
                    label="Transaction ID"
                    name="paymentTransactionId"
                    fullWidth
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('paymentTransactionId')}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControl required fullWidth>
                    <DatePicker
                      maxDate={new Date()}
                      slotProps={{
                        textField: {
                          required: true,
                        },
                      }}
                      label="Payment Date"
                      value={values.paymentDate}
                      onChange={(date) => setFieldValue('paymentDate', date, true)}
                    />
                    <FormHelperText>{touched.paymentDate && errors.paymentDate}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid size={{ sm: 12, xs: 12, lg: 12 }}>
                  <TextField
                    label="Extra Notes"
                    name="paymentNotes"
                    fullWidth
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('paymentNotes')}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  handleClose();
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
