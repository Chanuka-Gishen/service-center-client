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
import { RegisterCustomerSchema } from 'src/schema/register-customer-schema';

export const RegisterCustomerDialog = ({ open, isLoading, handleOpenClose, handleConfirm }) => {
  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Register New Customer</DialogTitle>

      <Formik
        initialValues={{
          customerFullName: '',
          customerMobile: '',
          customerEmail: '',
        }}
        validationSchema={RegisterCustomerSchema}
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
                    label="Customer Name"
                    name="customerFullName"
                    required
                    fullWidth
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('customerFullName')}
                    error={touched.customerFullName && Boolean(errors.customerFullName)}
                    helperText={touched.customerFullName && errors.customerFullName}
                  />
                </Grid>
                <Grid size={{ sm: 12, md: 12, lg: 6 }}>
                  <TextField
                    label="Customer Mobile"
                    name="customerMobile"
                    required={true}
                    fullWidth
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('customerMobile')}
                    error={touched.customerMobile && Boolean(errors.customerMobile)}
                    helperText={touched.customerMobile && errors.customerMobile}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, lg: 6 }}>
                  <TextField
                    label="Customer Email"
                    name="customerEmail"
                    fullWidth
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('customerEmail')}
                    error={touched.customerEmail && Boolean(errors.customerEmail)}
                    helperText={touched.customerEmail && errors.customerEmail}
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
