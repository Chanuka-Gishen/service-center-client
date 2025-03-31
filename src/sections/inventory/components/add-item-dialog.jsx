import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Formik } from 'formik';
import { CurrencyInput } from 'src/components/currency-input/currency-input';
import { ITEM_CATEGOREIS } from 'src/constants/itemCategories';
import { AddInventoryItemSchema } from 'src/schema/add-inv-item-schema';

export const AddItemDialog = ({ open, isLoading, handleOpenClose, handleConfirm }) => {
  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Add Inventory Item</DialogTitle>

      <Formik
        initialValues={{
          itemName: '',
          itemCategory: '',
          itemDescription: '',
          itemQuantity: 0,
          itemUnit: 'Pieces',
          itemBuyingPrice: 0,
          itemSellingPrice: 0,
          itemSupplier: '',
          itemThreshold: 5,
        }}
        validationSchema={AddInventoryItemSchema}
        onSubmit={(values) => {
          console.log(values);
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
                <Grid size={{ sm: 12, md: 12, lg: 12 }}>
                  <TextField
                    label="Item Title"
                    name="itemTitle"
                    required
                    fullWidth
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('itemTitle')}
                    error={touched.itemTitle && Boolean(errors.itemTitle)}
                    helperText={touched.itemTitle && errors.itemTitle}
                  />
                </Grid>
                <Grid size={{ sm: 12, md: 12, lg: 12 }}>
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
                <Grid size={{ xs: 12, sm: 12, lg: 6 }}>
                  <FormControl fullWidth>
                    <InputLabel id="select-label">Category</InputLabel>
                    <Select
                      labelId="select-label"
                      id="simple-select"
                      label="Category"
                      name="itemCategory"
                      required
                      value={values.itemCategory}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <MenuItem value={ITEM_CATEGOREIS.OIL.code}>
                        {ITEM_CATEGOREIS.OIL.label}
                      </MenuItem>
                      <MenuItem value={ITEM_CATEGOREIS.BRK.code}>
                        {ITEM_CATEGOREIS.BRK.label}
                      </MenuItem>
                      <MenuItem value={ITEM_CATEGOREIS.FLT.code}>
                        {ITEM_CATEGOREIS.FLT.label}
                      </MenuItem>
                      <MenuItem value={ITEM_CATEGOREIS.BAT.code}>
                        {ITEM_CATEGOREIS.BAT.label}
                      </MenuItem>
                      <MenuItem value={ITEM_CATEGOREIS.TIR.code}>
                        {ITEM_CATEGOREIS.TIR.label}
                      </MenuItem>
                      <MenuItem value={ITEM_CATEGOREIS.ENG.code}>
                        {ITEM_CATEGOREIS.ENG.label}
                      </MenuItem>
                    </Select>
                  </FormControl>
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
                <Grid size={{ xs: 12, sm: 6, lg: 6 }}>
                  <TextField
                    label="Item Threshold"
                    name="itemThreshold"
                    fullWidth
                    required
                    type='number'
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('itemThreshold')}
                    error={touched.itemThreshold && Boolean(errors.itemThreshold)}
                    helperText={touched.itemThreshold && errors.itemThreshold}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, lg: 6 }}>
                  <TextField
                    label="Item Supplier"
                    name="itemSupplier"
                    fullWidth
                    type="number"
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('itemSupplier')}
                    error={touched.itemSupplier && Boolean(errors.itemSupplier)}
                    helperText={touched.itemSupplier && errors.itemSupplier}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  handleOpenClose();
                  resetForm;
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
