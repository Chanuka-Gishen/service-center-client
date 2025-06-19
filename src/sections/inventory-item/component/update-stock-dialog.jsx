import {
  Autocomplete,
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
import { CurrencyInput } from 'src/components/currency-input/currency-input';
import { PAY_METHOD_CREDIT, PAY_METHODS } from 'src/constants/payment-methods';
import { STOCK_IN, STOCK_MV_TYPES } from 'src/constants/stock-movement-types';
import { StockUpdateSchema } from 'src/schema/stock-update-schema';

export const UpdateStockDialog = ({
  open,
  options,
  isLoadingOptions,
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
      <DialogTitle id="alert-dialog-title">Update Inventory Item Stocks</DialogTitle>

      <Formik
        initialValues={{
          stockMovementType: STOCK_IN,
          stockQuantity: 0,
          stockTotalValue: 0,
          stockPaymentPaidAmount: 0,
          stockPaymentMethod: PAY_METHOD_CREDIT,
          stockSupplier: null,
          stockNotes: '',
        }}
        validationSchema={StockUpdateSchema}
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
          setFieldValue,
          handleChange,
          handleBlur,
        }) => (
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid size={{ xs: 12, sm: 12, lg: 6 }}>
                  <FormControl fullWidth required>
                    <InputLabel id="select-label">Movement Type</InputLabel>
                    <Select
                      labelId="select-label"
                      id="simple-select"
                      label="Movement Type"
                      name="stockMovementType"
                      required
                      value={values.stockMovementType || ''}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {STOCK_MV_TYPES.map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText error={touched.stockMovementType && errors.stockMovementType}>
                      {touched.stockMovementType && errors.stockMovementType}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, lg: 6 }}>
                  <FormControl fullWidth required>
                    <Autocomplete
                      disablePortal
                      options={options}
                      getOptionLabel={(option) => option.supplierName}
                      value={values.stockSupplier}
                      loading={isLoadingOptions}
                      filterSelectedOptions
                      loadingText="Loading..."
                      onChange={(event, newValue) => {
                        setFieldValue('stockSupplier', newValue);
                      }}
                      renderInput={(params) => (
                        <TextField required {...params} label="Item Supplier" />
                      )}
                    />
                    <FormHelperText error={touched.stockSupplier && errors.stockSupplier}>
                      {touched.stockSupplier && errors.stockSupplier}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, lg: 6 }}>
                  <TextField
                    label="Stock Quantity"
                    name="stockQuantity"
                    fullWidth
                    required
                    type="number"
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('stockQuantity')}
                    error={touched.stockQuantity && Boolean(errors.stockQuantity)}
                    helperText={touched.stockQuantity && errors.stockQuantity}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, lg: 6 }}>
                  <TextField
                    label="Total Value"
                    name="stockTotalValue"
                    fullWidth
                    required
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('stockTotalValue')}
                    error={touched.stockTotalValue && Boolean(errors.stockTotalValue)}
                    helperText={touched.stockTotalValue && errors.stockTotalValue}
                    slotProps={{ input: { inputComponent: CurrencyInput } }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, lg: 6 }}>
                  <TextField
                    label="Paid Amount"
                    name="stockPaymentPaidAmount"
                    fullWidth
                    required
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('stockPaymentPaidAmount')}
                    error={touched.stockPaymentPaidAmount && Boolean(errors.stockPaymentPaidAmount)}
                    helperText={touched.stockPaymentPaidAmount && errors.stockPaymentPaidAmount}
                    slotProps={{ input: { inputComponent: CurrencyInput } }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, lg: 6 }}>
                  <FormControl fullWidth required>
                    <InputLabel id="select-label">Payment Method</InputLabel>
                    <Select
                      labelId="select-label"
                      id="simple-select"
                      label="Payment Method"
                      name="stockPaymentMethod"
                      required
                      value={values.stockPaymentMethod || ''}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {PAY_METHODS.map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText error={touched.stockPaymentMethod && errors.stockPaymentMethod}>
                      {touched.stockPaymentMethod && errors.stockPaymentMethod}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, lg: 12 }}>
                  <TextField
                    label="Notes"
                    name="stockNotes"
                    fullWidth
                    multiline
                    rows={2}
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('stockNotes')}
                    error={touched.stockNotes && Boolean(errors.stockNotes)}
                    helperText={touched.stockNotes && errors.stockNotes}
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
