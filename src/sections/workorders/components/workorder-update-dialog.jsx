import React from 'react';

import {
  AppBar,
  Box,
  Button,
  Dialog,
  DialogContent,
  Divider,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
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
import CloseIcon from '@mui/icons-material/Close';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

import { ItemsSelectDialog } from './items-select-dialog';
import { WO_TYPES } from 'src/constants/workorder-types';
import { FieldArray, Formik } from 'formik';
import { CurrencyInput } from 'src/components/currency-input/currency-input';
import { WorkOrderUpdateSchema } from 'src/schema/update-workorder-schema';
import { enqueueSnackbar } from 'notistack';
import { SNACKBAR_VARIANT } from 'src/constants/snackbar-constants';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export const WokrOrderUpdateDialog = ({
  open,
  isOpenSelectItemDlg,
  inventoryItems,
  filterValues,
  initialValues,
  isLoading,
  isLoadingItems,
  handleOpenClose,
  handleToggleSelectItemDialog,
  handleChangeSearch,
  handleUpdateWorkOrder,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleOpenClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      slots={{
        transition: Transition,
      }}
      fullScreen
    >
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={WorkOrderUpdateSchema}
        onSubmit={(values) => {
          handleUpdateWorkOrder(values);
        }}
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
                      Update Workorder
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
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField
                    label="Vehicle Mileage"
                    name="workOrderMileage"
                    type="number"
                    required
                    fullWidth
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('workOrderMileage')}
                    error={touched.workOrderMileage && Boolean(errors.workOrderMileage)}
                    helperText={touched.workOrderMileage && errors.workOrderMileage}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <FormControl fullWidth required>
                    <InputLabel id="select-label">Workorder Type</InputLabel>
                    <Select
                      labelId="select-label"
                      id="simple-select"
                      label="Workorder Type"
                      name="workOrderType"
                      required
                      fullWidth
                      value={values.workOrderType || ''}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {WO_TYPES.map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText error={touched.workOrderType && errors.workOrderType}>
                      {touched.workOrderType && errors.workOrderType}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid size={12}>
                  <Divider sx={{ fontWeight: 'bold' }}>Inventory Items</Divider>
                </Grid>
                <Grid size={12}>
                  <FieldArray name="workOrderServiceItems">
                    {({ push, remove }) => {
                      const handlePush = (data) => {
                        const itemExists = values.workOrderServiceItems.find(
                          (item) => item.inventoryItem === data._id
                        );

                        if (itemExists) {
                          enqueueSnackbar(`Item already added to the invoice - ${data.itemName}`, {
                            variant: SNACKBAR_VARIANT.INFO,
                          });
                          return;
                        }

                        push({
                          inventoryItem: data._id,
                          inventoryItemName: data.itemName,
                          quantity: 1,
                          exQuantity: 0,
                          unitPrice: data.itemSellingPrice,
                          cashDiscount: 0,
                          totalPrice: 1 * data.itemSellingPrice,
                        });
                      };
                      return (
                        <>
                          {values.workOrderServiceItems.map((item, index) => {
                            // Calculate error states once to avoid repetition
                            const quantityError =
                              touched.workOrderServiceItems?.[index]?.quantity &&
                              errors.workOrderServiceItems?.[index]?.quantity;

                            const exQuantityError =
                              touched.workOrderServiceItems?.[index]?.exQuantity &&
                              errors.workOrderServiceItems?.[index]?.exQuantity;

                            const unitPriceError =
                              touched.workOrderServiceItems?.[index]?.unitPrice &&
                              errors.workOrderServiceItems?.[index]?.unitPrice;

                            const cashDiscountError =
                              touched.workOrderServiceItems?.[index]?.cashDiscount &&
                              errors.workOrderServiceItems?.[index]?.cashDiscount;

                            // Calculate total price
                            const totalPrice = item.quantity * item.unitPrice - item.cashDiscount;
                            return (
                              <Grid
                                key={index}
                                container
                                spacing={1}
                                sx={{ marginBottom: '1rem' }}
                                justifyContent="flex-start"
                                alignItems="center"
                              >
                                <Grid size={{ xs: 12, md: 3 }}>
                                  <Typography variant="subtitle1">
                                    {values.workOrderServiceItems[index].inventoryItemName}
                                  </Typography>
                                </Grid>
                                <Grid size={{ xs: 12, md: 1 }}>
                                  <TextField
                                    label="Qty"
                                    name={`workOrderServiceItems.${index}.quantity`}
                                    type="number"
                                    required
                                    fullWidth
                                    autoComplete="off"
                                    variant="outlined"
                                    size="small"
                                    {...getFieldProps(`workOrderServiceItems.${index}.quantity`)}
                                    error={quantityError}
                                    helperText={
                                      (touched.workOrderServiceItems &&
                                        touched.workOrderServiceItems[index] &&
                                        touched.workOrderServiceItems[index].quantity &&
                                        errors.workOrderServiceItems &&
                                        errors.workOrderServiceItems[index] &&
                                        errors.workOrderServiceItems[index].quantity) ||
                                      ''
                                    }
                                  />
                                </Grid>
                                <Grid size={{ xs: 12, md: 1 }}>
                                  <TextField
                                    label="Ex Qty"
                                    name={'exQuantity'}
                                    type="number"
                                    fullWidth
                                    autoComplete="off"
                                    variant="outlined"
                                    size="small"
                                    {...getFieldProps(`workOrderServiceItems.${index}.exQuantity`)}
                                    error={exQuantityError}
                                    helperText={
                                      (touched.workOrderServiceItems &&
                                        touched.workOrderServiceItems[index] &&
                                        touched.workOrderServiceItems[index].exQuantity &&
                                        errors.workOrderServiceItems &&
                                        errors.workOrderServiceItems[index] &&
                                        errors.workOrderServiceItems[index].exQuantity) ||
                                      ''
                                    }
                                  />
                                </Grid>
                                <Grid size={{ xs: 12, md: 2 }}>
                                  <TextField
                                    label="Item Unit Price"
                                    name={`workOrderServiceItems.${index}.unitPrice`}
                                    fullWidth
                                    required
                                    autoComplete="off"
                                    variant="outlined"
                                    size="small"
                                    {...getFieldProps(`workOrderServiceItems.${index}.unitPrice`)}
                                    error={unitPriceError}
                                    helperText={
                                      (touched.workOrderServiceItems &&
                                        touched.workOrderServiceItems[index] &&
                                        touched.workOrderServiceItems[index].unitPrice &&
                                        errors.workOrderServiceItems &&
                                        errors.workOrderServiceItems[index] &&
                                        errors.workOrderServiceItems[index].unitPrice) ||
                                      ''
                                    }
                                    slotProps={{ input: { inputComponent: CurrencyInput } }}
                                  />
                                </Grid>
                                <Grid size={{ xs: 12, md: 2 }}>
                                  <TextField
                                    label="Discount"
                                    name={`workOrderServiceItems.${index}.cashDiscount`}
                                    fullWidth
                                    required
                                    autoComplete="off"
                                    variant="outlined"
                                    {...getFieldProps(
                                      `workOrderServiceItems.${index}.cashDiscount`
                                    )}
                                    error={cashDiscountError}
                                    helperText={
                                      (touched.workOrderServiceItems &&
                                        touched.workOrderServiceItems[index] &&
                                        touched.workOrderServiceItems[index].cashDiscount &&
                                        errors.workOrderServiceItems &&
                                        errors.workOrderServiceItems[index] &&
                                        errors.workOrderServiceItems[index].cashDiscount) ||
                                      ''
                                    }
                                    slotProps={{ input: { inputComponent: CurrencyInput } }}
                                  />
                                </Grid>
                                <Grid size={{ xs: 12, md: 2 }}>
                                  <TextField
                                    label="Item Selling Price"
                                    name={`workOrderServiceItems.${index}.totalPrice`}
                                    value={totalPrice}
                                    fullWidth
                                    required
                                    autoComplete="off"
                                    variant="outlined"
                                    size="small"
                                    disabled
                                    slotProps={{ input: { inputComponent: CurrencyInput } }}
                                  />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 12, lg: 1 }}>
                                  <IconButton onClick={() => remove(index)}>
                                    <RemoveCircleIcon />
                                  </IconButton>
                                </Grid>
                              </Grid>
                            );
                          })}
                          <Button variant="contained" onClick={handleToggleSelectItemDialog}>
                            Add Inventory Item
                          </Button>
                          {isOpenSelectItemDlg && (
                            <ItemsSelectDialog
                              open={isOpenSelectItemDlg}
                              data={inventoryItems}
                              isLoading={isLoadingItems}
                              selectedFilters={filterValues}
                              handleChangeSearch={handleChangeSearch}
                              handleAddItem={handlePush}
                              handleClose={handleToggleSelectItemDialog}
                            />
                          )}
                        </>
                      );
                    }}
                  </FieldArray>
                </Grid>
                <Grid size={12}>
                  <Divider sx={{ fontWeight: 'bold' }}>Custom Items</Divider>
                </Grid>
                <Grid size={12}>
                  <FieldArray name="workOrderCustomItems">
                    {({ push, remove }) => (
                      <>
                        {values.workOrderCustomItems.map((item, index) => {
                          // Calculate error states once to avoid repetition
                          const inventoryItemError =
                            touched.workOrderCustomItems?.[index]?.inventoryItemName &&
                            errors.workOrderCustomItems?.[index]?.inventoryItemName;

                          const quantityError =
                            touched.workOrderCustomItems?.[index]?.quantity &&
                            errors.workOrderCustomItems?.[index]?.quantity;

                          const unitPriceError =
                            touched.workOrderCustomItems?.[index]?.unitPrice &&
                            errors.workOrderCustomItems?.[index]?.unitPrice;

                          const cashDiscountError =
                            touched.workOrderCustomItems?.[index]?.cashDiscount &&
                            errors.workOrderCustomItems?.[index]?.cashDiscount;

                          // Calculate total price
                          const totalPrice = item.quantity * item.unitPrice - item.cashDiscount;
                          return (
                            <Grid
                              key={index}
                              container
                              spacing={1}
                              sx={{ marginBottom: '1rem' }}
                              justifyContent="flex-start"
                              alignItems="center"
                            >
                              <Grid size={{ xs: 12, md: 3 }}>
                                <TextField
                                  label="Item"
                                  name={`workOrderCustomItems.${index}.inventoryItemName`}
                                  required
                                  fullWidth
                                  autoComplete="off"
                                  variant="outlined"
                                  size="small"
                                  {...getFieldProps(
                                    `workOrderCustomItems.${index}.inventoryItemName`
                                  )}
                                  error={inventoryItemError}
                                  helperText={
                                    (touched.workOrderCustomItems &&
                                      touched.workOrderCustomItems[index] &&
                                      touched.workOrderCustomItems[index].inventoryItemName &&
                                      errors.workOrderCustomItems &&
                                      errors.workOrderCustomItems[index] &&
                                      errors.workOrderCustomItems[index].inventoryItemName) ||
                                    ''
                                  }
                                />
                              </Grid>
                              <Grid size={{ xs: 12, md: 2 }}>
                                <TextField
                                  label="Qty"
                                  name={`workOrderCustomItems.${index}.quantity`}
                                  type="number"
                                  required
                                  fullWidth
                                  autoComplete="off"
                                  variant="outlined"
                                  size="small"
                                  {...getFieldProps(`workOrderCustomItems.${index}.quantity`)}
                                  error={quantityError}
                                  helperText={
                                    (touched.workOrderCustomItems &&
                                      touched.workOrderCustomItems[index] &&
                                      touched.workOrderCustomItems[index].quantity &&
                                      errors.workOrderCustomItems &&
                                      errors.workOrderCustomItems[index] &&
                                      errors.workOrderCustomItems[index].quantity) ||
                                    ''
                                  }
                                />
                              </Grid>
                              <Grid size={{ xs: 12, md: 2 }}>
                                <TextField
                                  label="Item Unit Price"
                                  name={`workOrderCustomItems.${index}.unitPrice`}
                                  fullWidth
                                  required
                                  autoComplete="off"
                                  variant="outlined"
                                  size="small"
                                  {...getFieldProps(`workOrderCustomItems.${index}.unitPrice`)}
                                  error={unitPriceError}
                                  helperText={
                                    (touched.workOrderCustomItems &&
                                      touched.workOrderCustomItems[index] &&
                                      touched.workOrderCustomItems[index].unitPrice &&
                                      errors.workOrderCustomItems &&
                                      errors.workOrderCustomItems[index] &&
                                      errors.workOrderCustomItems[index].unitPrice) ||
                                    ''
                                  }
                                  slotProps={{ input: { inputComponent: CurrencyInput } }}
                                />
                              </Grid>
                              <Grid size={{ xs: 12, md: 2 }}>
                                <TextField
                                  label="Discount"
                                  name={`workOrderCustomItems.${index}.cashDiscount`}
                                  fullWidth
                                  required
                                  autoComplete="off"
                                  variant="outlined"
                                  {...getFieldProps(`workOrderCustomItems.${index}.cashDiscount`)}
                                  error={cashDiscountError}
                                  helperText={
                                    (touched.workOrderCustomItems &&
                                      touched.workOrderCustomItems[index] &&
                                      touched.workOrderCustomItems[index].cashDiscount &&
                                      errors.workOrderCustomItems &&
                                      errors.workOrderCustomItems[index] &&
                                      errors.workOrderCustomItems[index].cashDiscount) ||
                                    ''
                                  }
                                  slotProps={{ input: { inputComponent: CurrencyInput } }}
                                />
                              </Grid>
                              <Grid size={{ xs: 12, md: 2 }}>
                                <TextField
                                  label="Item Selling Price"
                                  name={`workOrderCustomItems.${index}.totalPrice`}
                                  value={totalPrice}
                                  fullWidth
                                  required
                                  autoComplete="off"
                                  variant="outlined"
                                  size="small"
                                  disabled
                                  slotProps={{ input: { inputComponent: CurrencyInput } }}
                                />
                              </Grid>
                              <Grid size={{ xs: 12, sm: 12, lg: 1 }}>
                                <IconButton onClick={() => remove(index)}>
                                  <RemoveCircleIcon />
                                </IconButton>
                              </Grid>
                            </Grid>
                          );
                        })}
                        <Button
                          variant="contained"
                          onClick={() =>
                            push({
                              inventoryItemName: '',
                              quantity: 1,
                              unitPrice: 0,
                              cashDiscount: 0,
                              totalPrice: 0,
                            })
                          }
                        >
                          Add Custom Invoice Item
                        </Button>
                      </>
                    )}
                  </FieldArray>
                </Grid>
                <Grid size={12}>
                  <Divider sx={{ fontWeight: 'bold' }}>Custom Charges</Divider>
                </Grid>
                <Grid size={12}>
                  <FieldArray name="workOrderCustomChargers">
                    {({ push, remove }) => (
                      <>
                        {values.workOrderCustomChargers.map((item, index) => {
                          // Calculate error states once to avoid repetition
                          const chargeNameError =
                            touched.workOrderCustomChargers?.[index]?.chargeName &&
                            errors.workOrderCustomChargers?.[index]?.chargeName;

                          const chargePriceError =
                            touched.workOrderCustomChargers?.[index]?.chargeAmount &&
                            errors.workOrderCustomChargers?.[index]?.chargeAmount;

                          return (
                            <Grid
                              key={index}
                              container
                              spacing={1}
                              sx={{ marginBottom: '1rem' }}
                              justifyContent="flex-start"
                              alignItems="center"
                            >
                              <Grid size={{ xs: 12, md: 8 }}>
                                <TextField
                                  label="Charge Name"
                                  name={`workOrderCustomChargers.${index}.chargeName`}
                                  required
                                  fullWidth
                                  autoComplete="off"
                                  variant="outlined"
                                  size="small"
                                  {...getFieldProps(`workOrderCustomChargers.${index}.chargeName`)}
                                  error={chargeNameError}
                                  helperText={
                                    (touched.workOrderCustomChargers &&
                                      touched.workOrderCustomChargers[index] &&
                                      touched.workOrderCustomChargers[index].chargeName &&
                                      errors.workOrderCustomChargers &&
                                      errors.workOrderCustomChargers[index] &&
                                      errors.workOrderCustomChargers[index].chargeName) ||
                                    ''
                                  }
                                />
                              </Grid>
                              <Grid size={{ xs: 12, md: 3 }}>
                                <TextField
                                  label="Amount"
                                  name={`workOrderCustomChargers.${index}.chargeAmount`}
                                  fullWidth
                                  required
                                  autoComplete="off"
                                  variant="outlined"
                                  size="small"
                                  {...getFieldProps(
                                    `workOrderCustomChargers.${index}.chargeAmount`
                                  )}
                                  error={chargePriceError}
                                  helperText={
                                    (touched.workOrderCustomChargers &&
                                      touched.workOrderCustomChargers[index] &&
                                      touched.workOrderCustomChargers[index].chargeAmount &&
                                      errors.workOrderCustomChargers &&
                                      errors.workOrderCustomChargers[index] &&
                                      errors.workOrderCustomChargers[index].chargeAmount) ||
                                    ''
                                  }
                                  slotProps={{ input: { inputComponent: CurrencyInput } }}
                                />
                              </Grid>
                              <Grid size={{ xs: 12, sm: 12, lg: 1 }}>
                                <IconButton onClick={() => remove(index)}>
                                  <RemoveCircleIcon />
                                </IconButton>
                              </Grid>
                            </Grid>
                          );
                        })}
                        <Button
                          variant="contained"
                          onClick={() =>
                            push({
                              chargeName: '',
                              chargeAmount: 0,
                            })
                          }
                        >
                          Add Custom Charges
                        </Button>
                      </>
                    )}
                  </FieldArray>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="Service Charge"
                    name="workOrderServiceCharge"
                    fullWidth
                    required
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('workOrderServiceCharge')}
                    error={touched.workOrderServiceCharge && Boolean(errors.workOrderServiceCharge)}
                    helperText={touched.workOrderServiceCharge && errors.workOrderServiceCharge}
                    slotProps={{ input: { inputComponent: CurrencyInput } }}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="Notes"
                    name="workOrderNotes"
                    fullWidth
                    multiline
                    rows={2}
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('workOrderNotes')}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="Cash Discount"
                    name="workOrderDiscountCash"
                    fullWidth
                    required
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('workOrderDiscountCash')}
                    error={touched.workOrderDiscountCash && Boolean(errors.workOrderDiscountCash)}
                    helperText={touched.workOrderDiscountCash && errors.workOrderDiscountCash}
                    slotProps={{ input: { inputComponent: CurrencyInput } }}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="Discount"
                    name="workOrderDiscountPercentage"
                    type="number"
                    fullWidth
                    required
                    slotProps={{
                      input: {
                        endAdornment: <InputAdornment position="end">%</InputAdornment>,
                      },
                    }}
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('workOrderDiscountPercentage')}
                    error={
                      touched.workOrderDiscountPercentage &&
                      Boolean(errors.workOrderDiscountPercentage)
                    }
                    helperText={
                      touched.workOrderDiscountPercentage && errors.workOrderDiscountPercentage
                    }
                  />
                </Grid>
              </Grid>
            </DialogContent>
          </form>
        )}
      </Formik>
    </Dialog>
  );
};
