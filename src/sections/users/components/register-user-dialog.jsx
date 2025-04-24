import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
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

import { USER_ROLE } from 'src/constants/user-role';
import { UserValidationSchema } from 'src/schema/add-user-schema';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export const RegisterUserDialog = ({ open, isLoading, handleOpenClose, handleConfirm }) => {
  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      slots={{
        transition: Transition,
      }}
    >
      <DialogTitle id="alert-dialog-title">Register New User</DialogTitle>

      <Formik
        initialValues={{
          userFirstName: '',
          userLastName: '',
          userRole: USER_ROLE.STAFF,
          userEmail: '',
          userPassword: '',
        }}
        validationSchema={UserValidationSchema}
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
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                  <TextField
                    label="First Name"
                    name="userFirstName"
                    required
                    fullWidth
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('userFirstName')}
                    error={touched.userFirstName && Boolean(errors.userFirstName)}
                    helperText={touched.userFirstName && errors.userFirstName}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                  <TextField
                    label="Last Name"
                    name="userLastName"
                    required
                    fullWidth
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('userLastName')}
                    error={touched.userLastName && Boolean(errors.userLastName)}
                    helperText={touched.userLastName && errors.userLastName}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                  <TextField
                    label="User Email"
                    name="userEmail"
                    fullWidth
                    required
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('userEmail')}
                    error={touched.userEmail && Boolean(errors.userEmail)}
                    helperText={touched.userEmail && errors.userEmail}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                  <FormControl fullWidth required>
                    <InputLabel id="select-label">User Role</InputLabel>
                    <Select
                      labelId="select-label"
                      id="simple-select"
                      label="User Role"
                      name="userRole"
                      required
                      fullWidth
                      value={values.userRole || ''}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <MenuItem value={USER_ROLE.SUPER_ADMIN}>{USER_ROLE.SUPER_ADMIN}</MenuItem>
                      <MenuItem value={USER_ROLE.ADMIN}>{USER_ROLE.ADMIN}</MenuItem>
                      <MenuItem value={USER_ROLE.STAFF}>{USER_ROLE.STAFF}</MenuItem>
                    </Select>
                    <FormHelperText error={touched.userRole && errors.userRole}>
                      {touched.userRole && errors.userRole}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                  <TextField
                    label="User Password"
                    name="userPassword"
                    fullWidth
                    required
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('userPassword')}
                    error={touched.userPassword && Boolean(errors.userPassword)}
                    helperText={touched.userPassword && errors.userPassword}
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
