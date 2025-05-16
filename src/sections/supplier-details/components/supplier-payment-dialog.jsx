import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Formik } from 'formik';
import Grid from '@mui/material/Grid2';

import { PAY_METHOD_CASH, PAY_METHODS } from 'src/constants/payment-methods';
import { addPaymentSChema } from 'src/schema/add-payment-schema';
import { CurrencyInput } from 'src/components/currency-input/currency-input';
import { formatCurrency } from 'src/utils/format-number';

export const SupplierPaymentDialog = ({ open, handleClose, data, isLoading, handleConfirm }) => {
  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Add Payment</DialogTitle>
      <Formik
        initialValues={{
          paymentAmount: 0,
          paymentMethod: PAY_METHOD_CASH,
          paymentTransactionId: '',
          paymentNotes: '',
        }}
        validationSchema={addPaymentSChema}
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
        }) => (
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid size={{ xs: 12, sm: 12, lg: 12 }}>
                  <Stack direction="column" spacing={2}>
                    <Divider> Payment Status </Divider>
                    <Stack direction="row" spacing={2}>
                      <Typography variant="subtitle1">Total Amount :</Typography>
                      <Typography>{formatCurrency(data.stockTotalValue)}</Typography>
                    </Stack>
                    <Stack direction="row" spacing={2}>
                      <Typography variant="subtitle1">Balance Amount :</Typography>
                      <Typography>{formatCurrency(data.stockPaymentBalance)}</Typography>
                    </Stack>
                    <Divider> New Payment </Divider>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, lg: 6 }}>
                  <TextField
                    label="Payment Amount"
                    name="paymentAmount"
                    fullWidth
                    required
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('paymentAmount')}
                    error={touched.paymentAmount && Boolean(errors.paymentAmount)}
                    helperText={touched.paymentAmount && errors.paymentAmount}
                    slotProps={{ input: { inputComponent: CurrencyInput } }}
                  />
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
                    <FormHelperText>
                      {touched.paymentMethod && errors.paymentMethod}
                    </FormHelperText>
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
