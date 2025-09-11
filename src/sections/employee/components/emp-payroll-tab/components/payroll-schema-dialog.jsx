import React, { Fragment } from 'react';
import { ErrorMessage, FieldArray, Formik } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Slide,
  Stack,
  TextField,
} from '@mui/material';
import Grid from '@mui/material/Grid2';

import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

import { CurrencyInput } from 'src/components/currency-input/currency-input';
import addEmpSalarySchema from 'src/schema/add-emp-salary-schema';
import updateEmpSalarySchema from 'src/schema/update-emp-salary-schema';
import { PAY_FREQUENCE } from 'src/constants/payroll-constants';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export const PayrollSchemaDialog = ({
  initialValues,
  isCreate,
  open,
  isLoading,
  handleOpenClose,
  handleSubmitSchema,
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
        {isCreate ? 'Add' : 'Update'} Employee Salary Schema
      </DialogTitle>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={isCreate ? addEmpSalarySchema : updateEmpSalarySchema}
        onSubmit={(values) => {
          handleSubmitSchema(values);
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
          setFieldValue,
          getFieldProps,
        }) => (
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <Grid container spacing={1} alignItems="center">
                {isCreate && (
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      label="Basic Sallary"
                      name="baseSalary"
                      fullWidth
                      required
                      autoComplete="off"
                      variant="outlined"
                      {...getFieldProps('baseSalary')}
                      error={touched.baseSalary && Boolean(errors.baseSalary)}
                      helperText={touched.baseSalary && errors.baseSalary}
                      slotProps={{ input: { inputComponent: CurrencyInput } }}
                    />
                  </Grid>
                )}

                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControl fullWidth required>
                    <InputLabel id="select-label">Sallary Frequency</InputLabel>
                    <Select
                      labelId="select-label"
                      id="simple-select"
                      label="Sallary Frequency"
                      name="empPayFrequency"
                      required
                      fullWidth
                      value={values.payFrequency || ''}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {PAY_FREQUENCE.map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText error={touched.empPayFrequency && errors.empPayFrequency}>
                      {touched.empPayFrequency && errors.empPayFrequency}
                    </FormHelperText>
                  </FormControl>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Box>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <FormControlLabel
                        value={values.epfEligible}
                        control={
                          <Checkbox
                            onChange={(e) => setFieldValue('epfEligible', e.target.checked)}
                            checked={values.epfEligible}
                          />
                        }
                        label="EPF"
                        labelPlacement="end"
                      />
                      <FormControlLabel
                        value={values.etfEligible}
                        control={
                          <Checkbox
                            onChange={(e) => setFieldValue('etfEligible', e.target.checked)}
                            checked={values.etfEligible}
                          />
                        }
                        label="ETF"
                        labelPlacement="end"
                      />
                    </Stack>
                  </Box>
                </Grid>
                <Grid size={12}>
                  <Divider>Recurring Allowances</Divider>
                </Grid>
                <Grid size={12}>
                  <FieldArray name="recurringAllowances">
                    {({ insert, remove, push }) => (
                      <Grid container spacing={2}>
                        <Grid size={12}>
                          <Button onClick={() => push({ type: '', amount: 0 })}>Add New</Button>
                        </Grid>
                        <>
                          {values.recurringAllowances.length > 0 &&
                            values.recurringAllowances.map((item, index) => {
                              const typeError =
                                touched.recurringAllowances?.[index]?.type &&
                                errors.recurringAllowances?.[index]?.type;

                              const amountError =
                                touched.recurringAllowances?.[index]?.amount &&
                                errors.recurringAllowances?.[index]?.amount;
                              return (
                                <Fragment key={index}>
                                  <Grid size={{ xs: 12, md: 6 }}>
                                    <TextField
                                      label="Description"
                                      name={`recurringAllowances.[${index}].type`}
                                      fullWidth
                                      required
                                      autoComplete="off"
                                      variant="outlined"
                                      {...getFieldProps(`recurringAllowances.[${index}].type`)}
                                      error={typeError}
                                      helperText={
                                        touched.recurringAllowances &&
                                        touched.recurringAllowances[index] &&
                                        touched.recurringAllowances[index].type &&
                                        errors.recurringAllowances &&
                                        errors.recurringAllowances[index] &&
                                        errors.recurringAllowances[index].type
                                      }
                                    />
                                  </Grid>
                                  <Grid size={{ xs: 12, md: 5 }}>
                                    <TextField
                                      label="Amount"
                                      name={`recurringAllowances.[${index}].amount`}
                                      fullWidth
                                      required
                                      autoComplete="off"
                                      variant="outlined"
                                      {...getFieldProps(`recurringAllowances.[${index}].amount`)}
                                      error={amountError}
                                      helperText={
                                        touched.recurringAllowances &&
                                        touched.recurringAllowances[index] &&
                                        touched.recurringAllowances[index].amount &&
                                        errors.recurringAllowances &&
                                        errors.recurringAllowances[index] &&
                                        errors.recurringAllowances[index].amount
                                      }
                                      slotProps={{ input: { inputComponent: CurrencyInput } }}
                                    />
                                  </Grid>
                                  <Grid size={{ xs: 12, md: 1 }}>
                                    <IconButton onClick={() => remove(index)}>
                                      <RemoveCircleIcon />
                                    </IconButton>
                                  </Grid>
                                </Fragment>
                              );
                            })}
                        </>
                      </Grid>
                    )}
                  </FieldArray>
                </Grid>
                <Grid size={12}>
                  <Divider>Recurring Earnings</Divider>
                </Grid>
                <Grid size={12}>
                  <FieldArray name="otherRecurringEarnings">
                    {({ insert, remove, push }) => (
                      <Grid container spacing={2}>
                        <Grid size={12}>
                          <Button onClick={() => push({ type: '', amount: 0 })}>Add New</Button>
                        </Grid>
                        <>
                          {values.otherRecurringEarnings.length > 0 &&
                            values.otherRecurringEarnings.map((item, index) => {
                              const typeError =
                                touched.otherRecurringEarnings?.[index]?.type &&
                                errors.otherRecurringEarnings?.[index]?.type;

                              const amountError =
                                touched.otherRecurringEarnings?.[index]?.amount &&
                                errors.otherRecurringEarnings?.[index]?.amount;
                              return (
                                <Fragment key={index}>
                                  <Grid size={{ xs: 12, md: 6 }}>
                                    <TextField
                                      label="Description"
                                      name={`otherRecurringEarnings.[${index}].type`}
                                      fullWidth
                                      required
                                      autoComplete="off"
                                      variant="outlined"
                                      {...getFieldProps(`otherRecurringEarnings.[${index}].type`)}
                                      error={typeError}
                                      helperText={
                                        touched.otherRecurringEarnings &&
                                        touched.otherRecurringEarnings[index] &&
                                        touched.otherRecurringEarnings[index].type &&
                                        errors.otherRecurringEarnings &&
                                        errors.otherRecurringEarnings[index] &&
                                        errors.otherRecurringEarnings[index].type
                                      }
                                    />
                                  </Grid>
                                  <Grid size={{ xs: 12, md: 5 }}>
                                    <TextField
                                      label="Amount"
                                      name={`otherRecurringEarnings.[${index}].amount`}
                                      fullWidth
                                      required
                                      autoComplete="off"
                                      variant="outlined"
                                      {...getFieldProps(`otherRecurringEarnings.[${index}].amount`)}
                                      error={amountError}
                                      helperText={
                                        touched.otherRecurringEarnings &&
                                        touched.otherRecurringEarnings[index] &&
                                        touched.otherRecurringEarnings[index].amount &&
                                        errors.otherRecurringEarnings &&
                                        errors.otherRecurringEarnings[index] &&
                                        errors.otherRecurringEarnings[index].amount
                                      }
                                      slotProps={{ input: { inputComponent: CurrencyInput } }}
                                    />
                                  </Grid>
                                  <Grid size={{ xs: 12, md: 1 }}>
                                    <IconButton onClick={() => remove(index)}>
                                      <RemoveCircleIcon />
                                    </IconButton>
                                  </Grid>
                                </Fragment>
                              );
                            })}
                        </>
                      </Grid>
                    )}
                  </FieldArray>
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
