import React from 'react';
import { Formik } from 'formik';

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
import Grid from '@mui/material/Grid';
import Slide from '@mui/material/Slide';
import { brandSchema } from 'src/schema/brand-schema';
import { BRAND_STATUS } from 'src/constants/common-constants';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export const BrandForm = ({ open, initialValues, isLoading, handleOpenClose, handleConfirm }) => {
  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      slots={{
        transition: Transition,
      }}
      maxWidth="md"
    >
      <DialogTitle id="alert-dialog-title">Brand Form</DialogTitle>

      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={brandSchema}
        onSubmit={(values) => {
          handleConfirm(values);
        }}
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
              <Grid container spacing={2} alignItems="center">
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="Brand Name"
                    name="brandName"
                    required
                    fullWidth
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('brandName')}
                    error={touched.brandName && Boolean(errors.brandName)}
                    helperText={touched.brandName && errors.brandName}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="Description"
                    name="brandDescription"
                    fullWidth
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('brandDescription')}
                    error={touched.brandDescription && Boolean(errors.brandDescription)}
                    helperText={touched.brandDescription && errors.brandDescription}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="Manufacturer"
                    name="brandManufacturer"
                    fullWidth
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('brandManufacturer')}
                    error={touched.brandManufacturer && Boolean(errors.brandManufacturer)}
                    helperText={touched.brandManufacturer && errors.brandManufacturer}
                  />
                </Grid>

                <Grid size={12}>
                  <FormControl
                    fullWidth
                    required
                    error={Boolean(touched.brandStatus && errors.brandStatus)}
                  >
                    <InputLabel id="select-label">Brand Status</InputLabel>
                    <Select
                      labelId="select-label"
                      id="simple-select"
                      label="Brand Status"
                      name="brandIsActive"
                      required
                      value={values.brandIsActive}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <MenuItem value={true}>Active</MenuItem>
                      <MenuItem value={false}>Not Active</MenuItem>
                    </Select>
                    <FormHelperText error={Boolean(touched.brandIsActive && errors.brandIsActive)}>
                      {touched.brandIsActive && errors.brandIsActive}
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
