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
import { CurrencyInput } from 'src/components/currency-input/currency-input';
import { PAY_METHOD_CASH, PAY_METHODS } from 'src/constants/payment-methods';
import { PAY_SC_INCOME } from 'src/constants/payment-source';
import { incomePaymentSchema } from 'src/schema/add-income-schema';

export const AddIncomeDialog = ({ open, isLoading, handleOpenClose, handleConfirm }) => {
  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Add Income Payment</DialogTitle>

      <Formik
        initialValues={{
          paymentAmount: 0,
          paymentSource: '',
          paymentMethod: PAY_METHOD_CASH,
          paymentTransactionId: '',
          paymentNotes: '',
          paymentDate: new Date(),
        }}
        validationSchema={incomePaymentSchema}
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
                <Grid size={{ xs: 12, sm: 6, lg: 6 }}>
                  <TextField
                    label="Amount"
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
                <Grid size={{ sm: 12, xs: 12, lg: 6 }}>
                  <TextField
                    label="Transaction ID"
                    name="paymentTransactionId"
                    fullWidth
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('paymentTransactionId')}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, lg: 6 }}>
                  <FormControl
                    fullWidth
                    required
                    error={Boolean(touched.paymentSource && errors.paymentSource)}
                  >
                    <InputLabel id="select-label">Source</InputLabel>
                    <Select
                      labelId="select-label"
                      id="simple-select"
                      label="Source"
                      name="paymentSource"
                      required
                      value={values.paymentSource || ''}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {PAY_SC_INCOME.map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText error={Boolean(touched.paymentSource && errors.paymentSource)}>
                      {touched.paymentSource && errors.paymentSource}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, lg: 6 }}>
                  <FormControl fullWidth required>
                    <InputLabel id="paymentSource-label">Method</InputLabel>
                    <Select
                      labelId="paymentSource-label"
                      id="paymentSource"
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
                <Grid size={{ xs: 12, sm: 12, lg: 6 }}>
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
                    label="Notes"
                    name="paymentNotes"
                    multiline
                    rows={2}
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
