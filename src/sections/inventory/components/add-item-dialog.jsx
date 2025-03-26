import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Formik } from 'formik';
import { CurrencyInput } from 'src/components/currency-input/currency-input';
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
          itemTitle: '',
          itemDescription: '',
          itemQuantity: 0,
          itemCostPrice: 0.0,
          itemSellingPrice: 0.0,
        }}
        validationSchema={AddInventoryItemSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ errors, touched, resetForm, handleSubmit, getFieldProps }) => (
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid size={{ sm: 12, md: 12, lg: 6 }}>
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
                <Grid size={{ sm: 12, md: 12, lg: 6 }}>
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
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('itemQuantity')}
                    error={touched.itemQuantity && Boolean(errors.itemQuantity)}
                    helperText={touched.itemQuantity && errors.itemQuantity}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, lg: 6 }}>
                  <TextField
                    label="Item Cost Price"
                    name="itemCostPrice"
                    fullWidth
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('itemCostPrice')}
                    error={touched.itemCostPrice && Boolean(errors.itemCostPrice)}
                    helperText={touched.itemCostPrice && errors.itemCostPrice}
                    slotProps={{ input: { inputComponent: CurrencyInput } }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, lg: 6 }}>
                  <TextField
                    label="Item Selling Price"
                    name="itemSellingPrice"
                    fullWidth
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
