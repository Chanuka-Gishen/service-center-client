import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Formik } from 'formik';
import { supplierSchema } from 'src/schema/supplier-schema';

export const UpdateSupplierDialog = ({
  open,
  initialValues,
  isLoading,
  isLoadingOptions,
  handleOpenClose,
  handleConfirm,
  options,
}) => {
  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Update Supplier Info</DialogTitle>

      <Formik
        initialValues={initialValues}
        validationSchema={supplierSchema}
        onSubmit={(values) => {
          handleConfirm(values);
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
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid size={{ sm: 12, xs: 12, lg: 12 }}>
                  <TextField
                    label="Supplier"
                    name="supplierName"
                    required
                    fullWidth
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('supplierName')}
                    error={touched.supplierName && Boolean(errors.supplierName)}
                    helperText={touched.supplierName && errors.supplierName}
                  />
                </Grid>
                <Grid size={{ sm: 12, xs: 12, lg: 6 }}>
                  <TextField
                    label="Contact Person"
                    name="supplierContactPerson"
                    fullWidth
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('supplierContactPerson')}
                    error={touched.supplierContactPerson && Boolean(errors.supplierContactPerson)}
                    helperText={touched.supplierContactPerson && errors.supplierContactPerson}
                  />
                </Grid>
                <Grid size={{ sm: 12, xs: 12, lg: 6 }}>
                  <TextField
                    label="Supplier Contact No"
                    name="supplierPhone"
                    fullWidth
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('supplierPhone')}
                    error={touched.supplierPhone && Boolean(errors.supplierPhone)}
                    helperText={touched.supplierPhone && errors.supplierPhone}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 12, lg: 12 }}>
                  <Autocomplete
                    multiple
                    options={options}
                    getOptionLabel={(option) => option.itemName}
                    filterSelectedOptions
                    isOptionEqualToValue={(option, value) => option._id === value._id}
                    value={values.supplierProducts}
                    loading={isLoadingOptions}
                    loadingText="Loading..."
                    onChange={(event, value) => {
                      setFieldValue('supplierProducts', value);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Supplier Products"
                        placeholder="Select Products"
                      />
                    )}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, lg: 12 }}>
                  <TextField
                    label="Notes"
                    name="supplierNotes"
                    fullWidth
                    multiline
                    rows={2}
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('supplierNotes')}
                    error={touched.supplierNotes && Boolean(errors.supplierNotes)}
                    helperText={touched.supplierNotes && errors.supplierNotes}
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
