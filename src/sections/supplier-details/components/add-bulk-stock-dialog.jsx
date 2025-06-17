import React from 'react';
import {
  AppBar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import Slide from '@mui/material/Slide';
import { Formik } from 'formik';

import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

import { addBulkStockSchema } from 'src/schema/add-bulk-stock-schema';
import { PAY_METHODS } from 'src/constants/payment-methods';
import { CurrencyInput } from 'src/components/currency-input/currency-input';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export const AddBulkStockDialog = ({
  open,
  initialValues,
  stockItems,
  isLoading,
  handleOpenClose,
  handleConfirm,
}) => {
  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      slots={{
        transition: Transition,
      }}
      fullScreen
      disableAutoFocus
    >
      <Formik
        initialValues={initialValues}
        validationSchema={addBulkStockSchema}
        onSubmit={(values) => {
          handleConfirm(values);
        }}
        enableReinitialize
      >
        {({
          values,
          errors,
          touched,
          resetForm,
          handleChange,
          handleBlur,
          handleSubmit,
          getFieldProps,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <AppBar sx={{ position: 'relative' }}>
              <Toolbar>
                <Stack
                  direction={'row'}
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{ minWidth: '100%' }}
                >
                  <Box display="flex" flexDirection="row" gap={2} alignItems="center">
                    <IconButton
                      edge="start"
                      color="inherit"
                      onClick={() => {
                        handleOpenClose();
                        resetForm();
                      }}
                      disabled={isLoading}
                      aria-label="close"
                    >
                      <CloseIcon />
                    </IconButton>
                    <Typography
                      sx={{ ml: 2, flex: 1, cursor: 'pointer' }}
                      variant="h6"
                      component="div"
                    >
                      Add Bulk Stocks
                    </Typography>
                  </Box>
                  <Box flexGrow={1} />
                  <Button
                    variant="outlined"
                    sx={{ color: 'white', borderColor: 'white' }}
                    type="submit"
                    disabled={isLoading}
                  >
                    Confirm
                  </Button>
                </Stack>
              </Toolbar>
            </AppBar>
            <DialogContent>
              <Grid
                container
                spacing={2}
                sx={{ mt: 1 }}
                alignItems="center"
                justifyContent="flex-end"
              >
                <Grid size={{ xs: 12, sm: 6 }}>
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
                <Grid size={{ xs: 12, sm: 6 }}>
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
                <>
                  {values.stockItems.map((item, index) => {
                    const foundItem = stockItems.find((stock) => stock._id === item._id);

                    if (foundItem) {
                      // Calculate error states once to avoid repetition
                      const stockQtyError =
                        touched.stockItems?.[index]?.stockQuantity &&
                        errors.stockItems?.[index]?.stockQuantity;

                      const totalValueError =
                        touched.stockItems?.[index]?.stockTotalValue &&
                        errors.stockItems?.[index]?.stockTotalValue;

                      const paidAmountError =
                        touched.stockItems?.[index]?.stockPaymentPaidAmount &&
                        errors.stockItems?.[index]?.stockPaymentPaidAmount;

                      const isPaid = item.stockTotalValue === item.stockPaymentPaidAmount;

                      const handleFixPaidAmount = () => {
                        if (isPaid) {
                          setFieldValue(`stockItems.${index}.stockPaymentPaidAmount`, 0);
                        } else {
                          setFieldValue(
                            `stockItems.${index}.stockPaymentPaidAmount`,
                            item.stockTotalValue
                          );
                        }
                      };

                      return (
                        <>
                          <Grid size={12}>
                            <Divider>{`${foundItem.itemName} - ${foundItem.itemCode}`}</Divider>
                          </Grid>
                          <Grid size={{ xs: 12, sm: 2 }}>
                            <TextField
                              label="Qty"
                              name={`stockItems.${index}.stockQuantity`}
                              fullWidth
                              required
                              type="number"
                              autoComplete="off"
                              variant="outlined"
                              {...getFieldProps(`stockItems.${index}.stockQuantity`)}
                              error={stockQtyError}
                              helperText={
                                (touched.stockItems &&
                                  touched.stockItems[index] &&
                                  touched.stockItems[index].stockQuantity &&
                                  errors.stockItems &&
                                  errors.stockItems[index] &&
                                  errors.stockItems[index].stockQuantity) ||
                                ''
                              }
                            />
                          </Grid>
                          <Grid size={{ xs: 12, sm: 4 }}>
                            <TextField
                              label="Total Value"
                              name={`stockItems.${index}.stockTotalValue`}
                              fullWidth
                              required
                              autoComplete="off"
                              variant="outlined"
                              {...getFieldProps(`stockItems.${index}.stockTotalValue`)}
                              error={totalValueError}
                              helperText={
                                (touched.stockItems &&
                                  touched.stockItems[index] &&
                                  touched.stockItems[index].stockTotalValue &&
                                  errors.stockItems &&
                                  errors.stockItems[index] &&
                                  errors.stockItems[index].stockTotalValue) ||
                                ''
                              }
                              slotProps={{ input: { inputComponent: CurrencyInput } }}
                            />
                          </Grid>
                          <Grid size={{ xs: 12, sm: 4 }}>
                            <TextField
                              label="Paid Amount"
                              name={`stockItems.${index}.stockPaymentPaidAmount`}
                              fullWidth
                              required
                              autoComplete="off"
                              variant="outlined"
                              {...getFieldProps(`stockItems.${index}.stockPaymentPaidAmount`)}
                              error={paidAmountError}
                              helperText={
                                (touched.stockItems &&
                                  touched.stockItems[index] &&
                                  touched.stockItems[index].stockPaymentPaidAmount &&
                                  errors.stockItems &&
                                  errors.stockItems[index] &&
                                  errors.stockItems[index].stockPaymentPaidAmount) ||
                                ''
                              }
                              slotProps={{ input: { inputComponent: CurrencyInput } }}
                            />
                          </Grid>
                          <Grid size={{ xs: 12, sm: 2 }}>
                            <Button
                              variant="contained"
                              startIcon={isPaid ? <CheckCircleIcon /> : <CloseIcon />}
                              sx={{ backgroundColor: isPaid ? '#388E3C' : '#D32F2F' }}
                              onClick={handleFixPaidAmount}
                            >
                              {isPaid ? 'Paid' : 'Not Paid'}
                            </Button>
                          </Grid>
                        </>
                      );
                    }
                  })}
                </>
              </Grid>
            </DialogContent>
          </form>
        )}
      </Formik>
    </Dialog>
  );
};
