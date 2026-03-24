import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { Formik } from 'formik';
import Grid from '@mui/material/Grid';

import { CurrencyInput } from 'src/components/currency-input/currency-input';
import { UpdateWoItemSchema } from 'src/schema/update-wo-item-schema';

export const UpdateWoItemDialog = ({
  open,
  handleClose,
  initialValues,
  isLoading,
  handleConfirm,
}) => {
  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Update Workorder Item</DialogTitle>
      <Formik
        initialValues={initialValues}
        validationSchema={UpdateWoItemSchema}
        onSubmit={(values) => {
          handleConfirm(values);
        }}
        enableReinitialize={true}
      >
        {({ errors, touched, resetForm, handleSubmit, getFieldProps }) => (
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="Quantity"
                    name={'quantity'}
                    type="number"
                    required
                    fullWidth
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('quantity')}
                    error={touched.quantity && Boolean(errors.quantity)}
                    helperText={touched.quantity && errors.quantity}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="Item Unit Price"
                    name={'unitPrice'}
                    fullWidth
                    required
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('unitPrice')}
                    error={touched.unitPrice && Boolean(errors.unitPrice)}
                    helperText={touched.unitPrice && errors.unitPrice}
                    slotProps={{ input: { inputComponent: CurrencyInput } }}
                  />
                </Grid>
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
