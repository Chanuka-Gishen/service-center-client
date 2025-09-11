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
  Slide,
  TextField,
} from '@mui/material';
import Grid from '@mui/material/Grid2';

import salaryChangeSchema from 'src/schema/salary-change-schema';
import { CurrencyInput } from 'src/components/currency-input/currency-input';
import { SAL_CHANGE_TYP_PROMOTION, SAL_CHANGE_TYPES } from 'src/constants/payroll-constants';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export const SalaryUpdateDialog = ({ open, isLoading, handleOpenClose, handleConfirm }) => {
  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      slots={{
        transition: Transition,
      }}
    >
      <DialogTitle id="alert-dialog-title">Update Employee Salary</DialogTitle>
      <Formik
        initialValues={{
          newSalary: 0,
          changeType: SAL_CHANGE_TYP_PROMOTION,
          reason: '',
        }}
        validationSchema={salaryChangeSchema}
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
                  <FormControl fullWidth required>
                    <InputLabel id="select-label">Change Type</InputLabel>
                    <Select
                      labelId="select-label"
                      id="simple-select"
                      label="Change Type"
                      name="changeType"
                      required
                      fullWidth
                      value={values.changeType}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {SAL_CHANGE_TYPES.map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText error={touched.changeType && errors.changeType}>
                      {touched.changeType && errors.changeType}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="New Base Salary"
                    name={'newSalary'}
                    fullWidth
                    required
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('newSalary')}
                    error={touched.newSalary && Boolean(errors.newSalary)}
                    helperText={touched.newSalary && errors.newSalary}
                    slotProps={{ input: { inputComponent: CurrencyInput } }}
                  />
                </Grid>
                <Grid size={12}>
                  <TextField
                    label="Reason"
                    name={'reason'}
                    fullWidth
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('reason')}
                    error={touched.reason && Boolean(errors.reason)}
                    helperText={touched.reason && errors.reason}
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
                Continue
              </Button>
            </DialogActions>
          </form>
        )}
      </Formik>
    </Dialog>
  );
};
