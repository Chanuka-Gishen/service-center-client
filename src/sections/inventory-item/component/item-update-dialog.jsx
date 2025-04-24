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
import { Formik } from 'formik';
import { CurrencyInput } from 'src/components/currency-input/currency-input';
import { ITEM_CATEGORIES_LABELS } from 'src/constants/item-categories';
import { UpdateInventoryItemSchema } from 'src/schema/update-inv-item-schema';

export const UpdateItemDialog = ({ open, initialValues, isLoading, handleOpenClose, handleConfirm }) => {
  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Update Inventory Item</DialogTitle>

      <Formik
        initialValues={initialValues}
        validationSchema={UpdateInventoryItemSchema}
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
          handleSubmit,
          getFieldProps,
          handleChange,
          handleBlur,
        }) => (
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <Grid container spacing={2} sx={{ mt: 1 }}>
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
                <Grid size={{ sm: 12, xs: 12, lg: 12 }}>
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
                  <FormControl fullWidth>
                    <InputLabel id="select-label">Category</InputLabel>
                    <Select
                      labelId="select-label"
                      id="simple-select"
                      label="Category"
                      name="itemCategory"
                      required
                      value={values.itemCategory || ''}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {ITEM_CATEGORIES_LABELS.map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText error={touched.itemCategory && errors.itemCategory}>
                      {touched.itemCategory && errors.itemCategory}
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
