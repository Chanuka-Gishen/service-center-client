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
import { Formik } from 'formik';
import Grid from '@mui/material/Grid2';

import { returnStockSchema } from 'src/schema/return-stock-schema';
import { RETURN_TYP_CASH, RETURN_TYPS } from 'src/constants/return-Types';
import { PAY_METHODS } from 'src/constants/payment-methods';
import { returnProcessSchema } from 'src/schema/return-process-schema';

export const ReturnProcessDialog = ({ open, handleClose, isLoading, handleConfirm }) => {
  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="md"
    >
      <DialogTitle id="alert-dialog-title">Process Return Items</DialogTitle>
      <Formik
        initialValues={{
          returnType: null,
          paymentMethod: null,
          paymentTransactionId: '',
        }}
        validationSchema={returnProcessSchema}
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
                <Grid size={12}>
                  <FormControl fullWidth>
                    <InputLabel id="select-label">Return Type</InputLabel>
                    <Select
                      labelId="select-label"
                      id="simple-select"
                      label="Return Type"
                      name="returnType"
                      required
                      value={values.returnType || ''}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {RETURN_TYPS.map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>{touched.returnType && errors.returnType}</FormHelperText>
                  </FormControl>
                </Grid>
                {values.returnType === RETURN_TYP_CASH && (
                  <Grid size={{ xs: 12, md: 6 }}>
                    <FormControl fullWidth>
                      <InputLabel id="select-label">Payment Method</InputLabel>
                      <Select
                        labelId="select-label"
                        id="simple-select"
                        label="Payment Method"
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
                )}
                {values.returnType === RETURN_TYP_CASH && (
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      label="Transaction ID"
                      name="paymentTransactionId"
                      fullWidth
                      autoComplete="off"
                      variant="outlined"
                      {...getFieldProps('paymentTransactionId')}
                    />
                  </Grid>
                )}
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
