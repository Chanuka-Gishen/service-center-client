import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { Formik } from 'formik';
import Grid from '@mui/material/Grid2';

import workOrderAssigneesSchema from 'src/schema/assign-emp-schema';

export const EditAssigneeDialog = ({
  open,
  options,
  values,
  handleClose,
  isLoading,
  isLoadingEmpSelect,
  handleConfirm,
}) => {
  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle id="alert-dialog-title">Manage Workorder Assignees</DialogTitle>
      <Formik
        initialValues={{
          assignees: values ?? [],
        }}
        validationSchema={workOrderAssigneesSchema}
        onSubmit={(values) => {
          handleConfirm(values.assignees);
        }}
      >
        {({ values, resetForm, handleSubmit, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid size={{ xs: 12, sm: 12, lg: 12 }}>
                  <Autocomplete
                    multiple
                    fullWidth
                    loading={isLoadingEmpSelect}
                    loadingText='Loading Employees...'
                    id="tags-outlined"
                    options={options}
                    getOptionLabel={(option) => option.empFullName}
                    defaultValue={values.assignees}
                    filterSelectedOptions
                    isOptionEqualToValue={(option, value) => option._id === value._id}
                    onChange={(e, value) => {
                      setFieldValue('assignees', value);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Select Employees" placeholder="Favorites" />
                    )}
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
