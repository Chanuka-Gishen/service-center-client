import React from 'react';
import { Formik } from 'formik';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  TextField,
} from '@mui/material';
import Grid from '@mui/material/Grid2';

import { CurrencyInput } from 'src/components/currency-input/currency-input';
import empBonusSchema from 'src/schema/add-emp-bonus-schema';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export const AddBonusDialog = ({ open, isLoading, handleOpenClose, handleConfirm }) => {
  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      slots={{
        transition: Transition,
      }}
    >
      <DialogTitle id="alert-dialog-title">Add Employee Bonus Current Month</DialogTitle>
      <Formik
        initialValues={{
          bonusAmount: 0,
          bonusDescription: '',
        }}
        validationSchema={empBonusSchema}
        onSubmit={(values) => {
          handleConfirm(values);
        }}
      >
        {({ errors, touched, resetForm, handleSubmit, getFieldProps }) => (
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <Grid container spacing={2} alignItems="center">
                <Grid size={12}>
                  <TextField
                    label="Description"
                    name={'bonusDescription'}
                    fullWidth
                    required
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('bonusDescription')}
                    error={touched.bonusDescription && Boolean(errors.bonusDescription)}
                    helperText={touched.bonusDescription && errors.bonusDescription}
                  />
                </Grid>
                <Grid size={12}>
                  <TextField
                    label="Bonus Amount"
                    name={'bonusAmount'}
                    fullWidth
                    required
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('bonusAmount')}
                    error={touched.bonusAmount && Boolean(errors.bonusAmount)}
                    helperText={touched.bonusAmount && errors.bonusAmount}
                    slotProps={{ input: { inputComponent: CurrencyInput } }}
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
