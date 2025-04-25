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
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import Slide from '@mui/material/Slide';

import { createWorkOrderSchema } from 'src/schema/create-workorder-schema';
import { WO_TYPE_SERVICE, WO_TYPES } from 'src/constants/workorder-types';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export const CreateWorkOrderDialog = ({
  open,
  data,
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
      <DialogTitle id="alert-dialog-title">Create WorkOrder </DialogTitle>

      <Formik
        initialValues={{
          workOrderMileage: '',
          workOrderType: WO_TYPE_SERVICE,
        }}
        validationSchema={createWorkOrderSchema}
        onSubmit={(values) => {
          handleConfirm(values);
        }}
      >
        {({
          errors,
          values,
          touched,
          resetForm,
          handleSubmit,
          handleBlur,
          handleChange,
          getFieldProps,
        }) => (
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 12, lg: 12 }}>
                  <Stack direction="row" spacing={4}>
                    <Typography>Vehicle Number</Typography>
                    <Typography>{data.vehicleNumber}</Typography>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, lg: 6 }}>
                  <FormControl fullWidth required>
                    <InputLabel id="select-label">Workorder Type</InputLabel>
                    <Select
                      labelId="select-label"
                      id="simple-select"
                      label="Workorder Type"
                      name="workOrderType"
                      required
                      fullWidth
                      value={values.workOrderType || ''}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {WO_TYPES.map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText error={touched.workOrderType && errors.workOrderType}>
                      {touched.workOrderType && errors.workOrderType}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, lg: 6 }}>
                  <TextField
                    label="Vehicle Mileage"
                    name="workOrderMileage"
                    required
                    type="number"
                    fullWidth
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('workOrderMileage')}
                    error={touched.workOrderMileage && Boolean(errors.workOrderMileage)}
                    helperText={touched.workOrderMileage && errors.workOrderMileage}
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
