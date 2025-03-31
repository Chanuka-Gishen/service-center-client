import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import Slide from '@mui/material/Slide';
import { Formik } from 'formik';

import { RegisterCustomerSchema } from 'src/schema/register-customer-schema';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export const RegisterCustomerDialog = ({ open, isLoading, handleOpenClose, handleConfirm }) => {
  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      slots={{
        transition: Transition,
      }}
    >
      <DialogTitle id="alert-dialog-title">Register New Customer</DialogTitle>

      <Formik
        initialValues={{
          customerName: '',
          customerMobile: '',
          customerEmail: '',
          vehicleNumber: '',
          vehicleManufacturer: '',
          vehicleModel: '',
        }}
        validationSchema={RegisterCustomerSchema}
        onSubmit={(values) => {
          handleConfirm(values);
        }}
      >
        {({ errors, touched, resetForm, handleSubmit, getFieldProps }) => (
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid size={{ xs: 12, sm: 12, lg: 12 }}>
                  <TextField
                    label="Customer Name"
                    name="customerName"
                    required
                    fullWidth
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('customerName')}
                    error={touched.customerName && Boolean(errors.customerName)}
                    helperText={touched.customerName && errors.customerName}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, lg: 6 }}>
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
                <Grid size={{ xs: 12, sm: 12, lg: 12 }}>
                  <Divider>Vehicle Info</Divider>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, lg: 6 }}>
                  <TextField
                    label="Vehicle Number"
                    name="vehicleNumber"
                    fullWidth
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('vehicleNumber')}
                    error={touched.vehicleNumber && Boolean(errors.vehicleNumber)}
                    helperText={touched.vehicleNumber && errors.vehicleNumber}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, lg: 6 }}>
                  <TextField
                    label="Vehicle Manufactuerer"
                    name="vehicleManufacturer"
                    fullWidth
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('vehicleManufacturer')}
                    error={touched.vehicleManufacturer && Boolean(errors.vehicleManufacturer)}
                    helperText={touched.vehicleManufacturer && errors.vehicleManufacturer}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, lg: 6 }}>
                  <TextField
                    label="Vehicle Model"
                    name="vehicleModel"
                    fullWidth
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('vehicleModel')}
                    error={touched.vehicleModel && Boolean(errors.vehicleModel)}
                    helperText={touched.vehicleModel && errors.vehicleModel}
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
