import React from 'react';
import { Formik } from 'formik';

import {
  AppBar,
  Box,
  Button,
  Dialog,
  DialogContent,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import Slide from '@mui/material/Slide';
import CloseIcon from '@mui/icons-material/Close';

import { WO_TYPES } from 'src/constants/workorder-types';

import { CurrencyInput } from 'src/components/currency-input/currency-input';
import { WorkOrderUpdateSchema } from 'src/schema/update-workorder-schema';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export const WokrOrderUpdateDialog = ({
  open,
  initialValues,
  isLoading,
  handleOpenClose,
  handleUpdateWorkOrder,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleOpenClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      slots={{
        transition: Transition,
      }}
    >
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={WorkOrderUpdateSchema}
        onSubmit={(values) => {
          handleUpdateWorkOrder(values);
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
            <AppBar sx={{ position: 'relative' }}>
              <Toolbar>
                <Stack
                  direction={'row'}
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{ minWidth: '100%' }}
                >
                  <Box display="flex" flexDirection="row" gap={2} alignItems="center">
                    <IconButton
                      edge="start"
                      color="inherit"
                      onClick={() => {
                        handleOpenClose();
                        resetForm();
                      }}
                      disabled={isLoading}
                      aria-label="close"
                    >
                      <CloseIcon />
                    </IconButton>
                    <Typography
                      sx={{ ml: 2, flex: 1, cursor: 'pointer' }}
                      variant="h6"
                      component="div"
                    >
                      Update Workorder
                    </Typography>
                  </Box>
                  <Box flexGrow={1} />
                  <Button
                    variant="outlined"
                    sx={{ color: 'white', borderColor: 'white' }}
                    type="submit"
                    disabled={isLoading}
                  >
                    Confirm
                  </Button>
                </Stack>
              </Toolbar>
            </AppBar>
            <DialogContent>
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Vehicle Mileage"
                    name="workorderMileage"
                    type="number"
                    required
                    fullWidth
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('workorderMileage')}
                    error={touched.workorderMileage && Boolean(errors.workorderMileage)}
                    helperText={touched.workorderMileage && errors.workorderMileage}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <FormControl fullWidth required>
                    <InputLabel id="select-label">Workorder Type</InputLabel>
                    <Select
                      labelId="select-label"
                      id="simple-select"
                      label="Workorder Type"
                      name="workorderType"
                      required
                      fullWidth
                      value={values.workorderType || ''}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {WO_TYPES.map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText error={touched.workorderType && errors.workorderType}>
                      {touched.workorderType && errors.workorderType}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Cash Discount"
                    name="workorderDiscountCash"
                    fullWidth
                    required
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('workorderDiscountCash')}
                    error={touched.workorderDiscountCash && Boolean(errors.workorderDiscountCash)}
                    helperText={touched.workorderDiscountCash && errors.workorderDiscountCash}
                    slotProps={{ input: { inputComponent: CurrencyInput } }}
                  />
                </Grid>
                <Grid size={12}>
                  <TextField
                    label="Notes"
                    name="workorderNotes"
                    fullWidth
                    multiline
                    rows={2}
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('workorderNotes')}
                  />
                </Grid>

                {/* <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="Discount"
                    name="workorderDiscountPercentage"
                    type="number"
                    fullWidth
                    required
                    slotProps={{
                      input: {
                        endAdornment: <InputAdornment position="end">%</InputAdornment>,
                      },
                    }}
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('workorderDiscountPercentage')}
                    error={
                      touched.workorderDiscountPercentage &&
                      Boolean(errors.workorderDiscountPercentage)
                    }
                    helperText={
                      touched.workorderDiscountPercentage && errors.workorderDiscountPercentage
                    }
                  />
                </Grid> */}
              </Grid>
            </DialogContent>
          </form>
        )}
      </Formik>
    </Dialog>
  );
};
