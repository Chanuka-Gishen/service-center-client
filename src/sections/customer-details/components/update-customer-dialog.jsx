import React from 'react';
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
import Slide from '@mui/material/Slide';
import { Formik } from 'formik';

import { CUSTOMER_PREFIX } from 'src/constants/customer-prefix';
import { CUS_TYPE_INDIVIDUAL, CUSTOMER_TYPES } from 'src/constants/customer-type';
import { UpdateCustomerSchema } from 'src/schema/update-customer-schema';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export const UpdateCustomerDialog = ({
  open,
  initialValues,
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
    >
      <DialogTitle id="alert-dialog-title">Update Customer</DialogTitle>

      <Formik
        initialValues={initialValues}
        validationSchema={UpdateCustomerSchema}
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
        }) => (
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                  <FormControl fullWidth>
                    <InputLabel id="select-label">Customer Type</InputLabel>
                    <Select
                      labelId="select-label"
                      id="simple-select"
                      label="Customer Type"
                      name="customerType"
                      required
                      fullWidth
                      value={values.customerType || ''}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {CUSTOMER_TYPES.map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText error={touched.customerType && errors.customerType}>
                      {touched.customerType && errors.customerType}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                {values.customerType === CUS_TYPE_INDIVIDUAL && (
                  <Grid size={{ xs: 12, sm: 12, md: 2, lg: 2 }}>
                    <FormControl fullWidth>
                      <InputLabel id="select-label">Prefix</InputLabel>
                      <Select
                        labelId="select-label"
                        id="simple-select"
                        label="Category"
                        name="customerPrefix"
                        required
                        fullWidth
                        value={values.customerPrefix || ''}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        {CUSTOMER_PREFIX.map((item, index) => (
                          <MenuItem key={index} value={item}>
                            {item}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText error={touched.customerPrefix && errors.customerPrefix}>
                        {touched.customerPrefix && errors.customerPrefix}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                )}

                <Grid size={{ xs: 12, sm: 12, md: 10, lg: 10 }}>
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
