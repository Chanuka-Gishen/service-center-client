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
import Grid from '@mui/material/Grid';
import { Formik } from 'formik';
import { CurrencyInput } from 'src/components/currency-input/currency-input';
import { ITEM_CATEGORIES_LABELS } from 'src/constants/item-categories';
import { AddInventoryItemSchema } from 'src/schema/add-inv-item-schema';

export const AddItemDialog = ({
  open,
  categoryOptions,
  brandOptions,
  isLoading,
  isLoadingCategoryOptions,
  isLoadingBrandsOptions,
  handleOpenClose,
  handleConfirm,
}) => {
  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Add Inventory Item</DialogTitle>

      <Formik
        initialValues={{
          itemCode: '',
          itemName: '',
          itemCategory: null,
          itemBrand: null,
          itemDescription: '',
          itemQuantity: 0,
          itemUnit: 'Pieces',
          itemBuyingPrice: 0,
          itemDiscountAmount: 0,
          itemSellingPrice: 0,
          itemSupplier: '',
          itemThreshold: 5,
        }}
        validationSchema={AddInventoryItemSchema}
        onSubmit={(values) => {
          handleConfirm(values);
        }}
      >
        {({ values, errors, touched, resetForm, handleSubmit, getFieldProps, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid size={{ sm: 12, xs: 12, lg: 6 }}>
                  <TextField
                    label="Item Code"
                    name="itemCode"
                    required
                    fullWidth
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('itemCode')}
                    error={touched.itemCode && Boolean(errors.itemCode)}
                    helperText={touched.itemCode && errors.itemCode}
                  />
                </Grid>
                <Grid size={{ sm: 12, xs: 12, lg: 12 }}>
                  <TextField
                    label="Item Title"
                    name="itemName"
                    required
                    fullWidth
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('itemName')}
                    error={touched.itemName && Boolean(errors.itemName)}
                    helperText={touched.itemName && errors.itemName}
                  />
                </Grid>
                {/* <Grid size={{ sm: 12, xs: 12, lg: 12 }}>
                  <TextField
                    label="Item Description"
                    name="itemDescription"
                    fullWidth
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('itemDescription')}
                    error={touched.itemDescription && Boolean(errors.itemDescription)}
                    helperText={touched.itemDescription && errors.itemDescription}
                  />
                </Grid> */}
                <Grid size={{ xs: 12, sm: 12, lg: 6 }}>
                  <FormControl fullWidth>
                    <Autocomplete
                      options={categoryOptions}
                      disabled={isLoadingCategoryOptions}
                      value={categoryOptions.find((opt) => opt._id === values.itemCategory) || null}
                      getOptionLabel={(option) => option.categoryTitle}
                      onChange={(e, value) => setFieldValue('itemCategory', value?._id ?? null)}
                      renderInput={(params) => <TextField label="Category" {...params} />}
                    />
                    <FormHelperText error={touched.itemCategory && errors.itemCategory}>
                      {touched.itemCategory && errors.itemCategory}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, lg: 6 }}>
                  <FormControl fullWidth>
                    <Autocomplete
                      options={brandOptions}
                      disabled={isLoadingBrandsOptions}
                      value={brandOptions.find((opt) => opt._id === values.itemBrand) || null}
                      getOptionLabel={(option) => option.brandName}
                      onChange={(e, value) => setFieldValue('itemBrand', value?._id ?? null)}
                      renderInput={(params) => <TextField label="Brand" {...params} />}
                    />
                    <FormHelperText error={touched.itemBrand && errors.itemBrand}>
                      {touched.itemBrand && errors.itemBrand}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, lg: 6 }}>
                  <TextField
                    label="Item Supplier"
                    name="itemSupplier"
                    fullWidth
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('itemSupplier')}
                    error={touched.itemSupplier && Boolean(errors.itemSupplier)}
                    helperText={touched.itemSupplier && errors.itemSupplier}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, lg: 6 }}>
                  <TextField
                    label="Item Quantity"
                    name="itemQuantity"
                    type="number"
                    fullWidth
                    required
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('itemQuantity')}
                    error={touched.itemQuantity && Boolean(errors.itemQuantity)}
                    helperText={touched.itemQuantity && errors.itemQuantity}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, lg: 6 }}>
                  <TextField
                    label="Item Threshold"
                    name="itemThreshold"
                    fullWidth
                    required
                    type="number"
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('itemThreshold')}
                    error={touched.itemThreshold && Boolean(errors.itemThreshold)}
                    helperText={touched.itemThreshold && errors.itemThreshold}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, lg: 6 }}>
                  <TextField
                    label="Item Cost Price"
                    name="itemBuyingPrice"
                    fullWidth
                    required
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('itemBuyingPrice')}
                    error={touched.itemBuyingPrice && Boolean(errors.itemBuyingPrice)}
                    helperText={touched.itemBuyingPrice && errors.itemBuyingPrice}
                    slotProps={{ input: { inputComponent: CurrencyInput } }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, lg: 6 }}>
                  <TextField
                    label="Discount"
                    name="itemDiscountAmount"
                    fullWidth
                    required
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('itemDiscountAmount')}
                    error={touched.itemDiscountAmount && Boolean(errors.itemDiscountAmount)}
                    helperText={touched.itemDiscountAmount && errors.itemDiscountAmount}
                    slotProps={{ input: { inputComponent: CurrencyInput } }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, lg: 6 }}>
                  <TextField
                    label="Item Selling Price"
                    name="itemSellingPrice"
                    fullWidth
                    required
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('itemSellingPrice')}
                    error={touched.itemSellingPrice && Boolean(errors.itemSellingPrice)}
                    helperText={touched.itemSellingPrice && errors.itemSellingPrice}
                    slotProps={{ input: { inputComponent: CurrencyInput } }}
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
