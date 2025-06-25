import React from 'react';
import { FieldArray, FormikProvider } from 'formik';

import {
  Button,
  Divider,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

import { CurrencyInput } from 'src/components/currency-input/currency-input';
import { WO_TYPES } from 'src/constants/workorder-types';

export const WokrOrderUpdateForm = ({
  formik,
  handleDeleteInventoryItem,
  handleConfirm,
  isLoading,
}) => {
  const { values, getFieldProps, errors, touched, handleChange, handleBlur, handleSubmit } = formik;

  return (
    <FormikProvider value={formik}>
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
        <Grid size={{ xs: 12, sm: 12, lg: 12 }}>
          <Divider sx={{ fontWeight: 'bold' }}>Inventory Items</Divider>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, lg: 12 }}>
          {values.workOrderServiceItems.map((item, index) => {
            // Calculate error states once to avoid repetition
            const inventoryItemError =
              touched.workOrderServiceItems?.[index]?.inventoryItemName &&
              errors.workOrderServiceItems?.[index]?.inventoryItemName;

            const quantityError =
              touched.workOrderServiceItems?.[index]?.quantity &&
              errors.workOrderServiceItems?.[index]?.quantity;

            const exQuantityError =
              touched.workOrderServiceItems?.[index]?.exQuantity &&
              errors.workOrderServiceItems?.[index]?.exQuantity;

            const unitPriceError =
              touched.workOrderServiceItems?.[index]?.unitPrice &&
              errors.workOrderServiceItems?.[index]?.unitPrice;

            // Calculate total price
            const totalPrice = item.quantity * item.unitPrice;
            return (
              <Grid
                key={index}
                container
                spacing={1}
                sx={{ marginBottom: '1rem' }}
                justifyContent="flex-start"
                alignItems="center"
              >
                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField
                    label="Item"
                    name={`workOrderServiceItems.${index}.inventoryItemName`}
                    required
                    fullWidth
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps(`workOrderServiceItems.${index}.inventoryItemName`)}
                    error={inventoryItemError}
                    helperText={
                      (touched.workOrderServiceItems &&
                        touched.workOrderServiceItems[index] &&
                        touched.workOrderServiceItems[index].inventoryItemName &&
                        errors.workOrderServiceItems &&
                        errors.workOrderServiceItems[index] &&
                        errors.workOrderServiceItems[index].inventoryItemName) ||
                      ''
                    }
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 2 }}>
                  <TextField
                    label="Qty"
                    name={`workOrderServiceItems.${index}.quantity`}
                    type="number"
                    required
                    fullWidth
                    autoComplete="off"
                    variant="outlined"
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
                {/* <Grid size={{ xs: 12, md: 2 }}>
                  <TextField
                    label="Ex Qty"
                    name={`workOrderServiceItems.${index}.exQuantity`}
                    type="number"
                    fullWidth
                    autoComplete="off"
                    variant="outlined"
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
                </Grid> */}
                <Grid size={{ xs: 12, md: 3 }}>
                  <TextField
                    label="Unit Price"
                    name={`workOrderServiceItems.${index}.unitPrice`}
                    fullWidth
                    required
                    autoComplete="off"
                    variant="outlined"
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
                    label="Total Price"
                    name={`workOrderServiceItems.${index}.totalPrice`}
                    value={totalPrice}
                    fullWidth
                    required
                    autoComplete="off"
                    variant="outlined"
                    disabled
                    slotProps={{ input: { inputComponent: CurrencyInput } }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, lg: 1 }}>
                  <IconButton onClick={() => handleDeleteInventoryItem(index)}>
                    <RemoveCircleIcon />
                  </IconButton>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
        <Grid size={{ xs: 12, sm: 12, lg: 12 }}>
          <Divider sx={{ fontWeight: 'bold' }}>Custom Entries</Divider>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, lg: 12 }}>
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

                  // Calculate total price
                  const totalPrice = item.quantity * item.unitPrice;
                  return (
                    <Grid
                      key={index}
                      container
                      spacing={1}
                      sx={{ marginBottom: '1rem' }}
                      justifyContent="flex-start"
                      alignItems="center"
                    >
                      <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                          label="Item"
                          name={`workOrderCustomItems.${index}.inventoryItemName`}
                          required
                          fullWidth
                          autoComplete="off"
                          variant="outlined"
                          {...getFieldProps(`workOrderCustomItems.${index}.inventoryItemName`)}
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
                      <Grid size={{ xs: 12, md: 3 }}>
                        <TextField
                          label="Item Unit Price"
                          name={`workOrderCustomItems.${index}.unitPrice`}
                          fullWidth
                          required
                          autoComplete="off"
                          variant="outlined"
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
                          label="Item Selling Price"
                          name={`workOrderCustomItems.${index}.totalPrice`}
                          value={totalPrice}
                          fullWidth
                          required
                          autoComplete="off"
                          variant="outlined"
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
                  onClick={() =>
                    push({
                      inventoryItemName: '',
                      quantity: 1,
                      unitPrice: 0,
                      totalPrice: 0,
                    })
                  }
                >
                  Add Service Item
                </Button>
              </>
            )}
          </FieldArray>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, lg: 12 }}>
          <Divider sx={{ fontWeight: 'bold' }}>Chargers</Divider>
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
                          {...getFieldProps(`workOrderCustomChargers.${index}.chargeAmount`)}
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
                  onClick={() =>
                    push({
                      chargeName: '',
                      chargeAmount: 0,
                    })
                  }
                >
                  Add Custom Charge
                </Button>
              </>
            )}
          </FieldArray>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, lg: 6 }}>
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
        <Grid size={{ xs: 12, sm: 12, lg: 6 }}>
          <TextField
            label="Other Charges"
            name="workOrderOtherChargers"
            fullWidth
            required
            autoComplete="off"
            variant="outlined"
            {...getFieldProps('workOrderOtherChargers')}
            error={touched.workOrderOtherChargers && Boolean(errors.workOrderOtherChargers)}
            helperText={touched.workOrderOtherChargers && errors.workOrderOtherChargers}
            slotProps={{ input: { inputComponent: CurrencyInput } }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, lg: 12 }}>
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
        <Grid size={{ xs: 12, sm: 12, lg: 6 }}>
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
        <Grid size={{ xs: 12, sm: 12, lg: 6 }}>
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
              touched.workOrderDiscountPercentage && Boolean(errors.workOrderDiscountPercentage)
            }
            helperText={touched.workOrderDiscountPercentage && errors.workOrderDiscountPercentage}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, lg: 6 }}>
          <Button
            autoFocus
            fullWidth
            variant="contained"
            size="large"
            type="submit"
            onClick={handleConfirm}
            disabled={isLoading}
          >
            save
          </Button>
        </Grid>
      </Grid>
    </FormikProvider>
  );
};
