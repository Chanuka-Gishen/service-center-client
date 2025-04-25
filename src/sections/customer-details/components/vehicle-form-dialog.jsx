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

import { VEHICLE_TYPES } from 'src/constants/vehicle-type';
import { VehicleSchema } from 'src/schema/vehicle-schema';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export const VehicleFormDialog = ({
  open,
  isAdd,
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
      <DialogTitle id="alert-dialog-title">
        {isAdd ? 'Register New Vehicle' : 'Update Vehicle Info'}
      </DialogTitle>

      <Formik
        initialValues={initialValues}
        validationSchema={VehicleSchema}
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
                <Grid size={{ xs: 12, sm: 12, lg: 6 }}>
                  <TextField
                    label="Vehicle Number"
                    name="vehicleNumber"
                    fullWidth
                    required
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
                    required
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
                    required
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('vehicleModel')}
                    error={touched.vehicleModel && Boolean(errors.vehicleModel)}
                    helperText={touched.vehicleModel && errors.vehicleModel}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                  <FormControl fullWidth>
                    <InputLabel id="select-label">Vehicle Type</InputLabel>
                    <Select
                      labelId="select-label"
                      id="simple-select"
                      label="Vehicle Type"
                      name="vehicleType"
                      required
                      fullWidth
                      value={values.vehicleType || ''}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {VEHICLE_TYPES.map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText error={touched.vehicleType && errors.vehicleType}>
                      {touched.vehicleType && errors.vehicleType}
                    </FormHelperText>
                  </FormControl>
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
