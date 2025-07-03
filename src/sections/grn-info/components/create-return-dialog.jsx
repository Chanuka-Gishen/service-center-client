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
  TextField,
} from '@mui/material';
import { Formik } from 'formik';
import Grid from '@mui/material/Grid2';

import { RETURN_REASONS } from 'src/constants/return-reasons';
import { returnStockSchema } from 'src/schema/return-stock-schema';

export const CreateReturnDialog = ({ open, handleClose, isLoading, handleConfirm }) => {
  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Return Item Record</DialogTitle>
      <Formik
        initialValues={{
          returnQty: 1,
          returnReason: '',
          returnNote: '',
        }}
        validationSchema={returnStockSchema}
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
        }) => (
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid size={{ xs: 12, sm: 6, lg: 6 }}>
                  <TextField
                    label="Return Qty"
                    name="returnQty"
                    fullWidth
                    required
                    type="number"
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('returnQty')}
                    error={touched.returnQty && Boolean(errors.returnQty)}
                    helperText={touched.returnQty && errors.returnQty}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, lg: 6 }}>
                  <FormControl fullWidth>
                    <InputLabel id="select-label">Reason</InputLabel>
                    <Select
                      labelId="select-label"
                      id="simple-select"
                      label="Reason"
                      name="returnReason"
                      required
                      value={values.returnReason || ''}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {RETURN_REASONS.map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>{touched.returnReason && errors.returnReason}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid size={{ sm: 12, xs: 12, lg: 12 }}>
                  <TextField
                    label="Notes"
                    name="returnNote"
                    fullWidth
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('returnNote')}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  handleClose();
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
          </form>
        )}
      </Formik>
    </Dialog>
  );
};
