import React from 'react';
import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import Slide from '@mui/material/Slide';
import { DatePicker } from '@mui/x-date-pickers';
import { Formik } from 'formik';

import CloseIcon from '@mui/icons-material/Close';

import { GENDERS } from 'src/constants/gender';
import { MARTIAL_STATUS } from 'src/constants/martial-status';
import { EMP_RELATIONSHIPS } from 'src/constants/relationship-constants';
import { EMPLOYMENT_TYPES } from 'src/constants/employment-types';
import { EMP_ROLES } from 'src/constants/emp-role';
import { EmployeeUpdateValidationSchema } from 'src/schema/emp-update-schema';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export const EmpUpdateDialog = ({ open, data, isLoading, handleOpenClose, handleConfirm }) => {
  const { createdAt, updatedAt, empSalary, empPayFrequency, __v, id, ...cleanedData } = data;

  const initialValues = {
    ...cleanedData,
    empDob: new Date(data.empDob),
    empHireDate: new Date(data.empHireDate),
  };

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      slots={{
        transition: Transition,
      }}
      fullScreen
      disableAutoFocus
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleOpenClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1, cursor: 'pointer' }} variant="h6" component="div">
            Update Employee Information
          </Typography>
        </Toolbar>
      </AppBar>

      <Formik
        initialValues={initialValues}
        validationSchema={EmployeeUpdateValidationSchema}
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
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                  <TextField
                    label="Employee Full Name"
                    name="empFullName"
                    required
                    fullWidth
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('empFullName')}
                    error={touched.empFullName && Boolean(errors.empFullName)}
                    helperText={touched.empFullName && errors.empFullName}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 3, lg: 3 }}>
                  <FormControl fullWidth required>
                    <InputLabel id="select-label">Gender</InputLabel>
                    <Select
                      labelId="select-label"
                      id="simple-select"
                      label="Gender"
                      name="empGender"
                      required
                      fullWidth
                      value={values.empGender || ''}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {GENDERS.map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText error={touched.empGender && errors.empGender}>
                      {touched.empGender && errors.empGender}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 3, lg: 3 }}>
                  <FormControl fullWidth required>
                    <InputLabel id="select-label-martial-status">Martial Status</InputLabel>
                    <Select
                      labelId="select-label-martial-status"
                      id="simple-select"
                      label="Martial Status"
                      name="empMaritalStatus"
                      required
                      fullWidth
                      value={values.empMaritalStatus || ''}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {MARTIAL_STATUS.map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText error={touched.empMaritalStatus && errors.empMaritalStatus}>
                      {touched.empMaritalStatus && errors.empMaritalStatus}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4 }}>
                  <FormControl fullWidth required>
                    <InputLabel id="select-label">Role</InputLabel>
                    <Select
                      labelId="select-label"
                      id="simple-select"
                      label="Role"
                      name="empRole"
                      required
                      fullWidth
                      value={values.empRole || ''}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {EMP_ROLES.map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText error={touched.empRole && errors.empRole}>
                      {touched.empRole && errors.empRole}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, lg: 4 }}>
                  <TextField
                    label="Employee Email"
                    name="empEmail"
                    fullWidth
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('empEmail')}
                    error={touched.empEmail && Boolean(errors.empEmail)}
                    helperText={touched.empEmail && errors.empEmail}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, lg: 4 }}>
                  <TextField
                    label="Employee Mobile"
                    name="empPhone"
                    fullWidth
                    required
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('empPhone')}
                    error={touched.empPhone && Boolean(errors.empPhone)}
                    helperText={touched.empPhone && errors.empPhone}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 12, lg: 4 }}>
                  <TextField
                    label="NIC Number"
                    name="empNic"
                    fullWidth
                    required
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('empNic')}
                    error={touched.empNic && Boolean(errors.empNic)}
                    helperText={touched.empNic && errors.empNic}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, lg: 3 }}>
                  <FormControl fullWidth required>
                    <DatePicker
                      label="Select DOB"
                      maxDate={new Date()}
                      slotProps={{
                        textField: {
                          required: true,
                        },
                      }}
                      value={values.empDob}
                      onChange={(date) => setFieldValue('empDob', date, true)}
                    />
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, lg: 12 }}>
                  <Divider>Emergency Contact Information</Divider>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, lg: 4 }}>
                  <TextField
                    label="Name"
                    name="empEmergencyContact.name"
                    fullWidth
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('empEmergencyContact.name')}
                    error={
                      touched.empEmergencyContact?.name && Boolean(errors.empEmergencyContact?.name)
                    }
                    helperText={
                      touched.empEmergencyContact?.name && errors.empEmergencyContact?.name
                    }
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, lg: 4 }}>
                  <TextField
                    label="Contact Number"
                    name="empEmergencyContact.phone"
                    fullWidth
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('empEmergencyContact.phone')}
                    error={
                      touched.empEmergencyContact?.phone &&
                      Boolean(errors.empEmergencyContact?.phone)
                    }
                    helperText={
                      touched.empEmergencyContact?.phone && errors.empEmergencyContact?.phone
                    }
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4 }}>
                  <FormControl fullWidth>
                    <InputLabel id="select-label">Relationship</InputLabel>
                    <Select
                      labelId="select-label"
                      id="simple-select"
                      label="Relationship"
                      name="empEmergencyContact.relationship"
                      fullWidth
                      value={values.empEmergencyContact.relationship || ''}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {EMP_RELATIONSHIPS.map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText
                      error={
                        touched.empEmergencyContact?.relationship &&
                        errors.empEmergencyContact?.relationship
                      }
                    >
                      {touched.empEmergencyContact?.relationship &&
                        errors.empEmergencyContact?.relationship}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, lg: 12 }}>
                  <Divider>Employee Address</Divider>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, lg: 8 }}>
                  <TextField
                    label="Street"
                    name="empAddress.street"
                    fullWidth
                    required
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('empAddress.street')}
                    error={touched.empAddress?.street && Boolean(errors.empAddress?.street)}
                    helperText={touched.empAddress?.street && errors.empAddress?.street}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, lg: 4 }}>
                  <TextField
                    label="City"
                    name="empAddress.city"
                    fullWidth
                    required
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('empAddress.city')}
                    error={touched.empAddress?.city && Boolean(errors.empAddress?.city)}
                    helperText={touched.empAddress?.city && errors.empAddress?.city}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, lg: 4 }}>
                  <TextField
                    label="Province"
                    name="empAddress.province"
                    fullWidth
                    required
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('empAddress.province')}
                    error={touched.empAddress?.province && Boolean(errors.empAddress?.province)}
                    helperText={touched.empAddress?.province && errors.empAddress?.province}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, lg: 4 }}>
                  <TextField
                    label="Postal Code"
                    name="empAddress.postalCode"
                    fullWidth
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('empAddress.postalCode')}
                    error={touched.empAddress?.postalCode && Boolean(errors.empAddress?.postalCode)}
                    helperText={touched.empAddress?.postalCode && errors.empAddress?.postalCode}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, lg: 4 }}>
                  <TextField
                    label="Country"
                    name="empAddress.country"
                    fullWidth
                    required
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('empAddress.country')}
                    error={touched.empAddress?.country && Boolean(errors.empAddress?.country)}
                    helperText={touched.empAddress?.country && errors.empAddress?.country}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, lg: 12 }}>
                  <Divider>Employeement Information</Divider>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, lg: 4 }}>
                  <TextField
                    label="Employee Id"
                    name="empId"
                    fullWidth
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('empId')}
                    error={touched.empId && Boolean(errors.empId)}
                    helperText={touched.empId && errors.empId}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, lg: 4 }}>
                  <TextField
                    label="Job Title"
                    name="empJobTitle"
                    fullWidth
                    required
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('empJobTitle')}
                    error={touched.empJobTitle && Boolean(errors.empJobTitle)}
                    helperText={touched.empJobTitle && errors.empJobTitle}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
                  <FormControl fullWidth required>
                    <InputLabel id="select-label">Employment Type</InputLabel>
                    <Select
                      labelId="select-label"
                      id="simple-select"
                      label="Relationship"
                      name="empEmploymentType"
                      required
                      fullWidth
                      value={values.empEmploymentType || ''}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {EMPLOYMENT_TYPES.map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText error={touched.empEmploymentType && errors.empEmploymentType}>
                      {touched.empEmploymentType && errors.empEmploymentType}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, lg: 4 }}>
                  <FormControl required fullWidth>
                    <DatePicker
                      maxDate={new Date()}
                      slotProps={{
                        textField: {
                          required: true,
                        },
                      }}
                      label="Select Hired Date"
                      value={values.empHireDate}
                      onChange={(date) => setFieldValue('empHireDate', date, true)}
                    />
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, lg: 12 }}>
                  <Divider>Bank Account Details</Divider>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, lg: 6 }}>
                  <TextField
                    label="Account Number"
                    name="empBankDetails.accountNumber"
                    fullWidth
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('empBankDetails.accountNumber')}
                    error={
                      touched.empBankDetails?.accountNumber &&
                      Boolean(errors.empBankDetails?.accountNumber)
                    }
                    helperText={
                      touched.empBankDetails?.accountNumber && errors.empBankDetails?.accountNumber
                    }
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, lg: 6 }}>
                  <TextField
                    label="Bank Name"
                    name="empBankDetails.bankName"
                    fullWidth
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('empBankDetails.bankName')}
                    error={
                      touched.empBankDetails?.bankName && Boolean(errors.empBankDetails?.bankName)
                    }
                    helperText={touched.empBankDetails?.bankName && errors.empBankDetails?.bankName}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, lg: 6 }}>
                  <TextField
                    label="Bank Branch"
                    name="empBankDetails.branch"
                    fullWidth
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('empBankDetails.branch')}
                    error={touched.empBankDetails?.branch && Boolean(errors.empBankDetails?.branch)}
                    helperText={touched.empBankDetails?.branch && errors.empBankDetails?.branch}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, lg: 6 }}>
                  <FormControl fullWidth>
                    <InputLabel id="select-label">Account Type</InputLabel>
                    <Select
                      labelId="select-label"
                      id="simple-select"
                      label="Account Type"
                      name="empBankDetails.accountType"
                      fullWidth
                      value={values.empBankDetails.accountType || ''}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <MenuItem value={'current'}>current</MenuItem>
                      <MenuItem value={'Savings'}>Savings</MenuItem>
                    </Select>
                    <FormHelperText
                      error={
                        touched.empBankDetails?.accountType && errors.empBankDetails?.accountType
                      }
                    >
                      {touched.empBankDetails?.accountType && errors.empBankDetails?.accountType}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, lg: 12 }}>
                  <Divider>Leave Information</Divider>
                </Grid>

                <Grid size={{ xs: 12, sm: 12, lg: 4 }}>
                  <TextField
                    label="Vacation Leaves"
                    name="empLeaveBalance.vacation"
                    type="number"
                    fullWidth
                    required
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('empLeaveBalance.vacation')}
                    error={
                      touched.empLeaveBalance?.vacation && Boolean(errors.empLeaveBalance?.vacation)
                    }
                    helperText={
                      touched.empLeaveBalance?.vacation && errors.empLeaveBalance?.vacation
                    }
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, lg: 4 }}>
                  <TextField
                    label="Sick Leaves"
                    name="empLeaveBalance.sick"
                    type="number"
                    fullWidth
                    required
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('empLeaveBalance.sick')}
                    error={touched.empLeaveBalance?.sick && Boolean(errors.empLeaveBalance?.sick)}
                    helperText={touched.empLeaveBalance?.sick && errors.empLeaveBalance?.sick}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, lg: 4 }}>
                  <TextField
                    label="Personal Leaves"
                    name="empLeaveBalance.personal"
                    type="number"
                    fullWidth
                    required
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('empLeaveBalance.personal')}
                    error={
                      touched.empLeaveBalance?.personal && Boolean(errors.empLeaveBalance?.personal)
                    }
                    helperText={
                      touched.empLeaveBalance?.personal && errors.empLeaveBalance?.personal
                    }
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
              <Button variant="contained" type="submit" disabled={isLoading}>
                Confirm
              </Button>
            </DialogActions>
          </form>
        )}
      </Formik>
    </Dialog>
  );
};
