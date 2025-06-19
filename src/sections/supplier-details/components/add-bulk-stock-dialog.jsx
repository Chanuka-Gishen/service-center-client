import React, { Fragment } from 'react';
import {
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

import { addBulkStockSchema } from 'src/schema/add-bulk-stock-schema';
import { PAY_METHODS } from 'src/constants/payment-methods';
import { CurrencyInput } from 'src/components/currency-input/currency-input';
import SummaryCard from './summary-card-bulk';
import { CustomTable } from 'src/components/custom-table/custom-table';
import { SelectItemsRow } from './select-items-row';

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
        validationSchema={addBulkStockSchema}
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
                <Grid size={12}>
                  <SummaryCard selectedItems={values.stockItems} />
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
                      <FormControl fullWidth required>
                        <InputLabel id="select-label">Payment Method</InputLabel>
                        <Select
                          labelId="select-label"
                          id="simple-select"
                          label="Payment Method"
                          name="stockPaymentMethod"
                          required
                          value={values.stockPaymentMethod || ''}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        >
                          {PAY_METHODS.map((item, index) => (
                            <MenuItem key={index} value={item}>
                              {item}
                            </MenuItem>
                          ))}
                        </Select>
                        <FormHelperText
                          error={touched.stockPaymentMethod && errors.stockPaymentMethod}
                        >
                          {touched.stockPaymentMethod && errors.stockPaymentMethod}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 8 }}>
                      <TextField
                        label="Notes"
                        name="stockNotes"
                        fullWidth
                        multiline
                        rows={2}
                        autoComplete="off"
                        variant="outlined"
                        {...getFieldProps('stockNotes')}
                        error={touched.stockNotes && Boolean(errors.stockNotes)}
                        helperText={touched.stockNotes && errors.stockNotes}
                      />
                    </Grid>
                    <>
                      {values.stockItems.map((item, index) => {
                        // Calculate error states once to avoid repetition
                        const stockQtyError =
                          touched.stockItems?.[index]?.stockQuantity &&
                          errors.stockItems?.[index]?.stockQuantity;

                        const totalValueError =
                          touched.stockItems?.[index]?.stockTotalValue &&
                          errors.stockItems?.[index]?.stockTotalValue;

                        const paidAmountError =
                          touched.stockItems?.[index]?.stockPaymentPaidAmount &&
                          errors.stockItems?.[index]?.stockPaymentPaidAmount;

                        const isPaid = item.stockTotalValue === item.stockPaymentPaidAmount;

                        const handleFixPaidAmount = () => {
                          if (isPaid) {
                            setFieldValue(`stockItems.${index}.stockPaymentPaidAmount`, 0);
                          } else {
                            setFieldValue(
                              `stockItems.${index}.stockPaymentPaidAmount`,
                              item.stockTotalValue
                            );
                          }
                        };

                        return (
                          <Fragment key={index}>
                            <Grid size={12}>
                              <Divider>{item.itemName}</Divider>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 2 }}>
                              <TextField
                                label="Qty"
                                name={`stockItems.${index}.stockQuantity`}
                                fullWidth
                                required
                                type="number"
                                autoComplete="off"
                                variant="outlined"
                                {...getFieldProps(`stockItems.${index}.stockQuantity`)}
                                error={stockQtyError}
                                helperText={
                                  (touched.stockItems &&
                                    touched.stockItems[index] &&
                                    touched.stockItems[index].stockQuantity &&
                                    errors.stockItems &&
                                    errors.stockItems[index] &&
                                    errors.stockItems[index].stockQuantity) ||
                                  ''
                                }
                              />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 4 }}>
                              <TextField
                                label="Total Value"
                                name={`stockItems.${index}.stockTotalValue`}
                                fullWidth
                                required
                                autoComplete="off"
                                variant="outlined"
                                {...getFieldProps(`stockItems.${index}.stockTotalValue`)}
                                error={totalValueError}
                                helperText={
                                  (touched.stockItems &&
                                    touched.stockItems[index] &&
                                    touched.stockItems[index].stockTotalValue &&
                                    errors.stockItems &&
                                    errors.stockItems[index] &&
                                    errors.stockItems[index].stockTotalValue) ||
                                  ''
                                }
                                slotProps={{ input: { inputComponent: CurrencyInput } }}
                              />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 4 }}>
                              <TextField
                                label="Paid Amount"
                                name={`stockItems.${index}.stockPaymentPaidAmount`}
                                fullWidth
                                required
                                autoComplete="off"
                                variant="outlined"
                                {...getFieldProps(`stockItems.${index}.stockPaymentPaidAmount`)}
                                error={paidAmountError}
                                helperText={
                                  (touched.stockItems &&
                                    touched.stockItems[index] &&
                                    touched.stockItems[index].stockPaymentPaidAmount &&
                                    errors.stockItems &&
                                    errors.stockItems[index] &&
                                    errors.stockItems[index].stockPaymentPaidAmount) ||
                                  ''
                                }
                                slotProps={{ input: { inputComponent: CurrencyInput } }}
                              />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 1 }}>
                              <IconButton onClick={handleFixPaidAmount}>
                                {isPaid ? (
                                  <CheckCircleIcon sx={{ color: '#388E3C' }} />
                                ) : (
                                  <CloseIcon sx={{ color: '#D32F2F' }} />
                                )}
                              </IconButton>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 1 }}>
                              <Button
                                variant="contained"
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
