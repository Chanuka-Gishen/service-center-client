import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { DateCalendar, DatePicker } from '@mui/x-date-pickers';
import { ErrorMessage, Form, Formik } from 'formik';
import { payrollSchema } from 'src/schema/payroll-schema';

export const PayrollGenerateDialog = ({
  open,
  empSelection,
  isLoading,
  isLoadingEmpSelect,
  handleOpenClose,
  handleConfirm,
}) => {
  const now = new Date();

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="md"
    >
      <DialogTitle id="alert-dialog-title">Generate Employee's Payroll</DialogTitle>

      <Formik
        initialValues={{
          selectedEmployees: [],
          selectAll: false,
          fromDate: new Date(now.getFullYear(), now.getMonth() - 1, 10),
          toDate: new Date(now.getFullYear(), now.getMonth(), 10),
        }}
        validationSchema={payrollSchema}
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
        }) => {
          const handleSelectAll = (e) => {
            const isChecked = e.target.checked;
            setFieldValue('selectAll', isChecked);
            setFieldValue('selectedEmployees', isChecked ? empSelection.map((emp) => emp._id) : []);
          };

          const handleEmployeeSelect = (e) => {
            const { value, checked } = e.target;
            let newSelected = [...values.selectedEmployees];

            if (checked) {
              newSelected.push(value);
            } else {
              newSelected = newSelected.filter((id) => id !== value);
            }

            setFieldValue('selectedEmployees', newSelected);
            setFieldValue('selectAll', newSelected.length === empSelection.length);
          };
          return (
            <Form onSubmit={handleSubmit}>
              <DialogContent>
                <Grid container spacing={2}>
                  <Grid size={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="selectAll"
                          checked={values.selectAll}
                          onChange={handleSelectAll}
                        />
                      }
                      label="Select All Employees"
                    />
                  </Grid>
                  <Grid size={12}>
                    <FormGroup sx={{ maxHeight: 300, overflow: 'auto' }}>
                      <Grid container spacing={2}>
                        {empSelection.map((employee, index) => (
                          <Grid key={index} size={{ xs: 12, sm: 4 }}>
                            <FormControlLabel
                              key={employee._id}
                              control={
                                <Checkbox
                                  name="selectedEmployees"
                                  value={employee._id}
                                  checked={values.selectedEmployees.includes(employee._id)}
                                  onChange={handleEmployeeSelect}
                                />
                              }
                              label={employee.empFullName}
                            />
                          </Grid>
                        ))}
                      </Grid>
                      <ErrorMessage name="selectedEmployees" />
                    </FormGroup>
                  </Grid>
                  <Grid size={12}>
                    <Divider>Pay Date Range</Divider>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl required fullWidth>
                      <FormLabel>From</FormLabel>
                      <DateCalendar
                        maxDate={
                          new Date(
                            values.toDate.getFullYear(),
                            values.toDate.getMonth() - 1,
                            values.toDate.getDate()
                          )
                        }
                        minDate={
                          new Date(
                            values.toDate.getFullYear(),
                            values.toDate.getMonth() - 1,
                            values.toDate.getDate()
                          )
                        }
                        label="From Date"
                        value={values.fromDate}
                        onChange={(date) => setFieldValue('fromDate', date, true)}
                      />
                      <FormHelperText>{touched.fromDate && errors.fromDate}</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl required fullWidth>
                      <FormLabel>To</FormLabel>
                      <DateCalendar
                        maxDate={new Date(now.getFullYear(), now.getMonth(), 10)}
                        label="To Date"
                        value={values.toDate}
                        onChange={(date) => {
                          setFieldValue('toDate', date, true);
                          setFieldValue(
                            'fromDate',
                            new Date(date.getFullYear(), date.getMonth() - 1, date.getDate()),
                            true
                          );
                        }}
                      />
                      <FormHelperText>{touched.toDate && errors.toDate}</FormHelperText>
                    </FormControl>
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
            </Form>
          );
        }}
      </Formik>
    </Dialog>
  );
};
