import React from 'react';
import { Formik } from 'formik';

import {
  AppBar,
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import Slide from '@mui/material/Slide';
import CloseIcon from '@mui/icons-material/Close';

import { CurrencyInput } from 'src/components/currency-input/currency-input';
import { AddWoChargeSchema } from 'src/schema/add-wo-charge-schema';
import CustomDialogHeader from 'src/components/custom-dialog-header/custom-dialog-header';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export const WoChargeFormDialog = ({
  open,
  isAdd,
  initialValues,
  isLoading,
  handleOpenClose,
  handleSubmit,
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
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={AddWoChargeSchema}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values, resetForm);
        }}
      >
        {({ errors, touched, resetForm, handleSubmit, getFieldProps }) => (
          <form onSubmit={handleSubmit}>
            <CustomDialogHeader
              title={isAdd ? 'Add Charge' : 'Update Charge'}
              isLoading={isLoading}
              handleClose={() => {
                handleOpenClose();
                resetForm();
              }}
            />
            <DialogContent>
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid size={12}>
                  <TextField
                    label="Charge Name"
                    name={'chargeName'}
                    required
                    fullWidth
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('chargeName')}
                    error={touched.chargeName && Boolean(errors.chargeName)}
                    helperText={touched.chargeName && errors.chargeName}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="Amount"
                    name={'chargeAmount'}
                    fullWidth
                    required
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('chargeAmount')}
                    error={touched.chargeAmount && Boolean(errors.chargeAmount)}
                    helperText={touched.chargeAmount && errors.chargeAmount}
                    slotProps={{ input: { inputComponent: CurrencyInput } }}
                  />
                </Grid>
              </Grid>
            </DialogContent>
          </form>
        )}
      </Formik>
    </Dialog>
  );
};
