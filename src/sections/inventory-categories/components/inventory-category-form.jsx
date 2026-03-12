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

import { inventoryCategorySchema } from 'src/schema/inventory-category-schema';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export const InventoryCategoryForm = ({
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
      <DialogTitle id="alert-dialog-title">Inventory Category Form</DialogTitle>

      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={inventoryCategorySchema}
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
                <Grid size={12}>
                  <TextField
                    label="Category Title"
                    name="categoryTitle"
                    required
                    fullWidth
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('categoryTitle')}
                    error={touched.categoryTitle && Boolean(errors.categoryTitle)}
                    helperText={touched.categoryTitle && errors.categoryTitle}
                  />
                </Grid>

                <Grid size={12}>
                  <FormControl
                    fullWidth
                    required
                    error={Boolean(touched.isActive && errors.isActive)}
                  >
                    <InputLabel id="select-label">Active Status</InputLabel>
                    <Select
                      labelId="select-label"
                      id="simple-select"
                      label="Active Status"
                      name="isActive"
                      required
                      value={values.isActive}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <MenuItem value={true}>Active</MenuItem>
                      <MenuItem value={false}>Disabled</MenuItem>
                    </Select>
                    <FormHelperText error={Boolean(touched.isActive && errors.isActive)}>
                      {touched.isActive && errors.isActive}
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
