import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import Slide from '@mui/material/Slide';
import { Formik } from 'formik';

import { UserValidationSchema } from 'src/schema/add-user-schema';
import { updateUserSchema } from 'src/schema/update-user-schema';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export const UpdateUserDialog = ({
  open,
  initialValues,
  isSelectedCurrentUser,
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
      <DialogTitle id="alert-dialog-title">Update Admin Details</DialogTitle>

      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={updateUserSchema}
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
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <Grid container spacing={2} sx={{ mt: 2 }} alignItems="center">
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

                {!isSelectedCurrentUser && (
                  <>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <FormControl
                        fullWidth
                        required
                        error={Boolean(touched.userIsActive && errors.userIsActive)}
                      >
                        <InputLabel id="select-label">Active Status</InputLabel>
                        <Select
                          labelId="select-label"
                          id="simple-select"
                          label="Active Status"
                          name="userIsActive"
                          required
                          value={values.userIsActive}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        >
                          <MenuItem value={true}>Active</MenuItem>
                          <MenuItem value={false}>Disabled</MenuItem>
                        </Select>
                        <FormHelperText
                          error={Boolean(touched.userIsActive && errors.userIsActive)}
                        >
                          {touched.userIsActive && errors.userIsActive}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <FormControl
                        fullWidth
                        required
                        component="fieldset"
                        variant="standard"
                        error={Boolean(touched.isUserFirstLogin && errors.isUserFirstLogin)}
                      >
                        <FormControlLabel
                          control={
                            <Switch
                              checked={values.isUserFirstLogin}
                              onChange={(e) => {
                                setFieldValue('isUserFirstLogin', e.target.checked);
                              }}
                            />
                          }
                          label="Approve Reset Password"
                        />

                        <FormHelperText
                          error={Boolean(touched.isUserFirstLogin && errors.isUserFirstLogin)}
                        >
                          {touched.isUserFirstLogin && errors.isUserFirstLogin}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                  </>
                )}
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
