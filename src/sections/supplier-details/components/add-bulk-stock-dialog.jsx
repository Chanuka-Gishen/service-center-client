import React, { Fragment } from 'react';
import {
  Alert,
  AppBar,
  Autocomplete,
  Box,
  Button,
  Card,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import Slide from '@mui/material/Slide';
import { Formik } from 'formik';

import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

import { addGrnSchema } from 'src/schema/add-grn-schema';
import { PAY_METHODS } from 'src/constants/payment-methods';
import { CurrencyInput } from 'src/components/currency-input/currency-input';
import SummaryCard from './summary-card-bulk';
import { CustomTable } from 'src/components/custom-table/custom-table';
import { SelectItemsRow } from './select-items-row';
import { DatePicker } from '@mui/x-date-pickers';

const selectItemsHeaders = ['Item Code', 'Item Name'];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export const AddBulkStockDialog = ({
  open,
  filters,
  initialValues,
  selectItems,
  isLoadingSelect,
  isLoading,
  handleOpenClose,
  handleChangeSearch,
  handleSelectItem,
  handelRemoveItem,
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
      fullScreen
      disableAutoFocus
    >
      <Formik
        initialValues={initialValues}
        validationSchema={addGrnSchema}
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
                      Bulk Stock Entry
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
              <Grid container spacing={4} sx={{ mt: 1 }}>
                {values.grnItems.length <= 0 && (
                  <Grid size={12}>
                    <Alert variant="outlined" severity="warning">
                      Stock Items Not Selected
                    </Alert>
                  </Grid>
                )}

                <Grid size={12}>
                  <SummaryCard selectedItems={values.grnItems} />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Box
                    sx={{
                      borderBottom: { xs: '1px solid #ddd', md: 'none' },
                      borderRight: { xs: 'none', md: '1px solid #ddd' },
                      pb: { xs: 2, md: 0 },
                      pr: { xs: 0, md: 3 },
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid size={12}>
                        <TextField
                          label="Item Name"
                          name="name"
                          value={filters.name}
                          onChange={handleChangeSearch}
                          autoComplete="off"
                          fullWidth
                        />
                      </Grid>
                      <Grid size={12}>
                        <Card>
                          <Paper elevation={0}>
                            <CustomTable
                              keys={selectItemsHeaders}
                              isLoading={isLoadingSelect}
                              enableAction={true}
                              enablePagination={false}
                              dataLength={selectItems.length}
                              handleChangePage={null}
                              handleChangeRowsPerPage={null}
                              documentCount={10}
                              tableBody={
                                <SelectItemsRow
                                  data={selectItems}
                                  handleAddNewInventoryRow={handleSelectItem}
                                />
                              }
                            />
                          </Paper>
                        </Card>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 8 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid size={{ xs: 12, sm: 4 }}>
                      <FormControl required fullWidth>
                        <DatePicker
                          maxDate={new Date()}
                          slotProps={{
                            textField: {
                              required: true,
                            },
                          }}
                          label="Received Date"
                          value={values.grnReceivedDate}
                          onChange={(date) => setFieldValue('grnReceivedDate', date, true)}
                        />
                        <FormHelperText
                          error={touched.grnReceivedDate && Boolean(errors.grnReceivedDate)}
                        >
                          {touched.grnReceivedDate && errors.grnReceivedDate}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                      <TextField
                        label="Discount Amount"
                        name={'grnDiscountAmount'}
                        fullWidth
                        required
                        autoComplete="off"
                        variant="outlined"
                        {...getFieldProps('grnDiscountAmount')}
                        error={touched.grnDiscountAmount && Boolean(errors.grnDiscountAmount)}
                        helperText={touched.grnDiscountAmount && errors.grnDiscountAmount}
                        slotProps={{ input: { inputComponent: CurrencyInput } }}
                      />
                    </Grid>
                    <>
                      {values.grnItems.map((item, index) => {
                        // Calculate error states once to avoid repetition
                        const stockQtyError =
                          touched.grnItems?.[index]?.stockQuantity &&
                          errors.grnItems?.[index]?.stockQuantity;

                        const unitPriceError =
                          touched.grnItems?.[index]?.stockUnitPrice &&
                          errors.grnItems?.[index]?.stockUnitPrice;

                        return (
                          <Fragment key={index}>
                            <Grid size={12}>
                              <Divider>{item.itemName}</Divider>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 2 }}>
                              <TextField
                                label="Qty"
                                name={`grnItems.${index}.stockQuantity`}
                                fullWidth
                                required
                                type="number"
                                autoComplete="off"
                                variant="outlined"
                                {...getFieldProps(`grnItems.${index}.stockQuantity`)}
                                error={stockQtyError}
                                helperText={
                                  (touched.grnItems &&
                                    touched.grnItems[index] &&
                                    touched.grnItems[index].stockQuantity &&
                                    errors.grnItems &&
                                    errors.grnItems[index] &&
                                    errors.grnItems[index].stockQuantity) ||
                                  ''
                                }
                              />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 4 }}>
                              <TextField
                                label="Unit Price"
                                name={`grnItems.${index}.stockUnitPrice`}
                                fullWidth
                                required
                                autoComplete="off"
                                variant="outlined"
                                {...getFieldProps(`grnItems.${index}.stockUnitPrice`)}
                                error={unitPriceError}
                                helperText={
                                  (touched.grnItems &&
                                    touched.grnItems[index] &&
                                    touched.grnItems[index].stockUnitPrice &&
                                    errors.grnItems &&
                                    errors.grnItems[index] &&
                                    errors.grnItems[index].stockUnitPrice) ||
                                  ''
                                }
                                slotProps={{ input: { inputComponent: CurrencyInput } }}
                              />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 4 }}>
                              <TextField
                                label="Total Value"
                                fullWidth
                                required
                                autoComplete="off"
                                variant="outlined"
                                value={
                                  values.grnItems[index].stockUnitPrice *
                                  values.grnItems[index].stockQuantity
                                }
                                disabled={true}
                                slotProps={{ input: { inputComponent: CurrencyInput } }}
                              />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 2 }}>
                              <Button
                                variant="contained"
                                fullWidth
                                startIcon={<CancelIcon />}
                                onClick={() => handelRemoveItem(item._id)}
                              >
                                Remove
                              </Button>
                            </Grid>
                          </Fragment>
                        );
                      })}
                    </>
                  </Grid>
                </Grid>
              </Grid>
            </DialogContent>
          </form>
        )}
      </Formik>
    </Dialog>
  );
};
