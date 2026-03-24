import React, { Fragment } from 'react';
import {
  Avatar,
  Badge,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

import { fDateTime } from 'src/utils/format-time';
import { formatCurrency } from 'src/utils/format-number';
import { WokrOrderUpdateDialog } from '../components/workorder-update-dialog';
import { WO_STATUS_COMPLETED, WO_STATUS_OPEN } from 'src/constants/workorderStatus';
import ConfirmationDialog from 'src/components/confirmation-dialog/confirmation-dialog';
import { PAY_STATUS_PAID } from 'src/constants/payment-status';
import { AddPaymentDialog } from '../components/add-payment-dialog';
import { EditAssigneeButton } from 'src/components/edit-assignee-button';
import commonUtil from 'src/utils/common-util';
import { ActiveWorkorderList } from '../components/active-workorder-list';
import { WorkOrderItemsSelect } from '../components/workorder-items-select';
import { UpdateWoItemDialog } from '../components/update-wo-item-dialog';
import { WoChargeFormDialog } from '../components/wo-charge-form-dialog';

export const WorkordersView = ({
  workorders,
  selectItems,
  selectedId,
  selectedJob,
  initialValues,
  itemInitialValues,
  chargeInitialValues,
  selectedFilters,
  showExQuantity,
  isOpenUpdate,
  isOpenSelectItemDlg,
  isOpenCompleteDlg,
  isOpenClosedDlg,
  isOpenPaymentDlg,
  isOpenItemUpdateDlg,
  isOpenItemDeleteDlg,
  isOpenChargeAddDlg,
  isOpenChargeUpdateDlg,
  isOpenChargeDeleteDlg,
  isLoading,
  isLoadingJob,
  isLoadingUpdate,
  isLoadingUpdateAssignee,
  isLoadingAddWorkorderItem,
  isLoadingAddWorkorderCharge,
  isLoadingUpdateWorkorderItem,
  isLoadingUpdateWorkorderCharge,
  isLoadingDeleteWorkorderItem,
  isLoadingDeleteWorkorderCharge,
  isLoadingSelect,
  isLoadingComplete,
  isLoadingClosed,
  isLoadingCreate,
  isDownloading,
  handleSelectJob,
  handleToggleShowExQuantity,
  handleToggleUpdateDialog,
  handleToggleSelectItemDialog,
  handleToggleCompleteDlg,
  handleToggleClosedDlg,
  handleTogglePaymentDlg,
  handleToggleItemUpdateDialog,
  handleToggleItemDeleteDialog,
  handleToggleChargeAddDialog,
  handleToggleChargeUpdateDialog,
  handleToggleChargeDeleteDialog,
  downloadInvoice,
  handleAddWorkorderItem,
  handleUdpateWorkOrderStatusComplete,
  handleUpdateWorkOrderStatusClosed,
  handleUpdateWorkOrder,
  handelUpdateWorkorderAssignees,
  handleAddPaymentRecord,
  handleUpdateWorkorderItem,
  handleDeleteWorkorderItem,
  handleAddWorkorderCharge,
  handleUpdateWorkorderCharge,
  handleDeleteWorkorderCharge,
  handleChangeSearch,
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Container maxWidth="xl">
      <Grid container rowSpacing={4} columnSpacing={4}>
        <Grid size={12} order={0}>
          <Stack spacing={2} direction="row" alignItems="center">
            <Typography variant="h5">Active Work Orders</Typography>
            <Avatar sx={{ bgcolor: theme.palette.primary.main, width: 24, height: 24 }}>
              {workorders.length}
            </Avatar>
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, lg: 3 }} order={1}>
          <ActiveWorkorderList
            selectedId={selectedId}
            workorders={workorders}
            isLoading={isLoading}
            handleSelect={handleSelectJob}
          />
        </Grid>
        {selectedJob && selectedId && !isLoadingJob && (
          <Grid size={{ xs: 12, lg: 7 }} order={{ xs: 3, lg: 2 }}>
            <Box
              display="flex"
              flexDirection="column"
              gap={2}
              sx={{ bgcolor: 'background.paper', p: '10px' }}
            >
              <Stack
                direction={isSmallScreen ? 'column' : 'row'}
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="h6">{selectedJob.workorderCustomer.customerName}</Typography>
                <Typography>{`Created At ${fDateTime(selectedJob.createdAt)}`}</Typography>
              </Stack>
              <Stack
                direction={isSmallScreen ? 'column' : 'row'}
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography>{`${selectedJob.workorderVehicle.vehicleNumber} - ${selectedJob.workorderVehicle.vehicleManufacturer} - ${selectedJob.workorderVehicle.vehicleModel}`}</Typography>
                <Typography>{`Updated At ${fDateTime(selectedJob.updatedAt)}`}</Typography>
              </Stack>
              <Stack
                direction={isSmallScreen ? 'column' : 'row'}
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography>{`Current Mileage - ${selectedJob.workorderMileage} KM`}</Typography>
                {selectedJob.workorderStatus != WO_STATUS_OPEN && (
                  <Typography>
                    <b>#INVOICE NO</b>
                    {` ${selectedJob.workorderInvoiceNumber ?? <em>Not Created Yet</em>}`}
                  </Typography>
                )}
              </Stack>

              {selectedJob.workorderAssignees && selectedJob.workorderAssignees.length > 0 && (
                <>
                  <Divider />
                  <Typography variant="h6">Workorder Assignees</Typography>
                  <Stack direction="row" spacing={2} flexWrap="wrap">
                    {selectedJob.workorderAssignees.map((emp) => (
                      <Chip variant="outlined" label={emp.empFullName} />
                    ))}
                  </Stack>
                  <Divider />
                </>
              )}

              <TableContainer>
                <Table size="small">
                  {selectedJob.workorderItems.length > 0 && (
                    <TableHead>
                      <TableRow>
                        <TableCell>Item</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell align="right">Unit Price</TableCell>
                        <TableCell align="right">Discount</TableCell>
                        <TableCell align="right">Total Price</TableCell>
                        {selectedJob && selectedJob.workorderStatus === WO_STATUS_OPEN && (
                          <TableCell align="right"></TableCell>
                        )}
                      </TableRow>
                    </TableHead>
                  )}
                  <TableBody>
                    {selectedJob.workorderItems.map((customItem, index) => (
                      <TableRow
                        key={index}
                        hover
                        sx={{ cursor: 'pointer' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleItemUpdateDialog(customItem);
                        }}
                      >
                        <TableCell>{customItem.inventoryItemName}</TableCell>
                        <TableCell>{customItem.quantity + customItem.exQuantity}</TableCell>
                        <TableCell align="right">{formatCurrency(customItem.unitPrice)}</TableCell>
                        <TableCell align="right">
                          {formatCurrency(customItem.cashDiscount)}
                        </TableCell>
                        <TableCell align="right">
                          {formatCurrency(customItem.totalNetPrice)}
                        </TableCell>
                        {selectedJob && selectedJob.workorderStatus === WO_STATUS_OPEN && (
                          <TableCell align="right">
                            <IconButton
                              onClick={(e) => {
                                e.stopPropagation();
                                handleToggleItemDeleteDialog(customItem._id);
                              }}
                            >
                              <RemoveCircleIcon color="error" />
                            </IconButton>
                          </TableCell>
                        )}
                      </TableRow>
                    ))}

                    {(selectedJob.workorderCharges || []).map((customCharge, index) => (
                      <TableRow
                        key={index}
                        hover
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleChargeUpdateDialog(customCharge);
                        }}
                        sx={{ cursor: 'pointer' }}
                      >
                        <TableCell colSpan={4}>{customCharge.chargeName}</TableCell>
                        <TableCell align="right">
                          {formatCurrency(customCharge.chargeAmount)}
                        </TableCell>
                        {selectedJob && selectedJob.workorderStatus === WO_STATUS_OPEN && (
                          <TableCell align="right">
                            <IconButton
                              onClick={(e) => {
                                e.stopPropagation();
                                handleToggleChargeDeleteDialog(customCharge._id);
                              }}
                            >
                              <RemoveCircleIcon color="error" />
                            </IconButton>
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={5}>
                        <Divider> Summary </Divider>
                      </TableCell>
                    </TableRow>
                    {selectedJob.workorderDiscountPercentage > 0 && (
                      <TableRow>
                        <TableCell align="right" colSpan={4}>
                          Discount Percentage
                        </TableCell>
                        <TableCell align="right">{`${selectedJob.DiscountPercentage} %`}</TableCell>
                      </TableRow>
                    )}
                    {selectedJob.workorderDiscountCash > 0 && (
                      <TableRow>
                        <TableCell align="right" colSpan={4}>
                          Cash Discount
                        </TableCell>
                        <TableCell align="right">
                          {formatCurrency(selectedJob.workorderDiscountCash)}
                        </TableCell>
                      </TableRow>
                    )}
                    <TableRow>
                      <TableCell variant="head" align="right" colSpan={4}>
                        Total Discount
                      </TableCell>
                      <TableCell variant="head" align="right">
                        {formatCurrency(selectedJob.workorderTotalDiscount)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head" align="right" colSpan={4}>
                        Total Amount
                      </TableCell>
                      <TableCell variant="head" align="right">
                        {formatCurrency(selectedJob.workorderTotalAmount)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head" align="right" colSpan={4}>
                        Subtotal Amount
                      </TableCell>
                      <TableCell variant="head" align="right">
                        {formatCurrency(selectedJob.workorderSubTotalAmount)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="right" colSpan={4}>
                        Paid Amount
                      </TableCell>
                      <TableCell align="right">
                        {formatCurrency(selectedJob.workorderPaidAmount)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="right" colSpan={4}>
                        Balance Amount
                      </TableCell>
                      <TableCell align="right">
                        {formatCurrency(selectedJob.workorderBalanceAmount)}
                      </TableCell>
                    </TableRow>
                    {!commonUtil.stringIsEmptyOrSpaces(selectedJob.workorderNotes) && (
                      <TableRow>
                        <TableCell colSpan={3}>Notes</TableCell>
                        <TableCell align="right">{selectedJob.workorderNotes}</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Grid>
        )}
        {selectedJob && selectedId && !isLoadingJob && (
          <Grid size={{ xs: 12, lg: 2 }} order={{ xs: 2, lg: 3 }}>
            <Stack spacing={1} direction={{ xs: 'row', lg: 'column' }}>
              {selectedJob.workorderStatus === WO_STATUS_OPEN && (
                <Fragment>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleToggleUpdateDialog}
                    disabled={isLoadingUpdate}
                  >
                    Edit Invoice
                  </Button>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleToggleSelectItemDialog}
                    disabled={isLoadingAddWorkorderItem}
                  >
                    Add Invoice Item
                  </Button>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleToggleChargeAddDialog}
                    disabled={isLoadingAddWorkorderCharge}
                  >
                    Add Invoice Charges
                  </Button>
                </Fragment>
              )}
              <EditAssigneeButton
                assignees={selectedJob.workorderAssignees}
                isLoading={isLoadingUpdateAssignee}
                handleAssign={handelUpdateWorkorderAssignees}
              />
              {selectedJob.workorderPaymentStatus != PAY_STATUS_PAID && (
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleTogglePaymentDlg}
                  disabled={isLoadingCreate}
                >
                  Add Payment
                </Button>
              )}

              {selectedJob.workorderStatus != WO_STATUS_OPEN &&
                selectedJob.workorderInvoiceNumber && (
                  <Button
                    variant="contained"
                    size="large"
                    disabled={isDownloading}
                    onClick={() => downloadInvoice(selectedJob)}
                  >
                    Download Invoice
                  </Button>
                )}
              {selectedJob.workorderStatus != WO_STATUS_COMPLETED && (
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleToggleCompleteDlg}
                  disabled={isLoadingComplete}
                >
                  Complete Invoice
                </Button>
              )}
              {selectedJob.workorderStatus === WO_STATUS_COMPLETED && (
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleToggleClosedDlg}
                  disabled={isLoadingClosed}
                >
                  Close Invoice
                </Button>
              )}
            </Stack>
          </Grid>
        )}
      </Grid>
      {isOpenUpdate && (
        <WokrOrderUpdateDialog
          open={isOpenUpdate}
          initialValues={initialValues}
          isLoading={isLoadingUpdate}
          handleOpenClose={handleToggleUpdateDialog}
          handleUpdateWorkOrder={handleUpdateWorkOrder}
        />
      )}
      {isOpenSelectItemDlg && (
        <WorkOrderItemsSelect
          open={isOpenSelectItemDlg}
          selectedFilters={selectedFilters}
          invItems={selectItems}
          isLoading={isLoadingSelect}
          isLoadingAdd={isLoadingAddWorkorderItem}
          handleClose={handleToggleSelectItemDialog}
          handleChangeSearch={handleChangeSearch}
          handleAddNewInventoryRow={handleAddWorkorderItem}
        />
      )}
      {isOpenItemUpdateDlg && (
        <UpdateWoItemDialog
          open={isOpenItemUpdateDlg}
          initialValues={itemInitialValues}
          isLoading={isLoadingUpdateWorkorderItem}
          handleClose={handleToggleItemUpdateDialog}
          handleConfirm={handleUpdateWorkorderItem}
        />
      )}
      {isOpenItemDeleteDlg && (
        <ConfirmationDialog
          contentText="Are you sure you want to delete this work order item? This action cannot be undone."
          open={isOpenItemDeleteDlg}
          isLoading={isLoadingDeleteWorkorderItem}
          handleClose={handleToggleItemDeleteDialog}
          handleSubmit={handleDeleteWorkorderItem}
        />
      )}
      {isOpenChargeAddDlg && (
        <WoChargeFormDialog
          isAdd={true}
          open={isOpenChargeAddDlg}
          initialValues={chargeInitialValues}
          isLoading={isLoadingAddWorkorderCharge}
          handleOpenClose={handleToggleChargeAddDialog}
          handleSubmit={handleAddWorkorderCharge}
        />
      )}
      {isOpenChargeUpdateDlg && (
        <WoChargeFormDialog
          isAdd={false}
          open={isOpenChargeUpdateDlg}
          initialValues={chargeInitialValues}
          isLoading={isLoadingUpdateWorkorderCharge}
          handleOpenClose={handleToggleChargeUpdateDialog}
          handleSubmit={handleUpdateWorkorderCharge}
        />
      )}
      {isOpenChargeDeleteDlg && (
        <ConfirmationDialog
          contentText="Are you sure you want to delete this work order Charge? This action cannot be undone."
          open={isOpenChargeDeleteDlg}
          isLoading={isLoadingDeleteWorkorderCharge}
          handleClose={handleToggleChargeDeleteDialog}
          handleSubmit={handleDeleteWorkorderCharge}
        />
      )}
      {isOpenPaymentDlg && (
        <AddPaymentDialog
          open={isOpenPaymentDlg}
          handleClose={handleTogglePaymentDlg}
          data={selectedJob}
          isLoading={isLoadingCreate}
          handleConfirm={handleAddPaymentRecord}
        />
      )}
      {isOpenCompleteDlg && (
        <ConfirmationDialog
          open={isOpenCompleteDlg}
          handleClose={handleToggleCompleteDlg}
          isLoading={isLoadingComplete}
          handleSubmit={handleUdpateWorkOrderStatusComplete}
          contentText={
            'Are you sure that you want to COMPLETE the work order? Invoice number will be generate upon this change.'
          }
        />
      )}
      {isOpenClosedDlg && (
        <ConfirmationDialog
          open={isOpenClosedDlg}
          handleClose={handleToggleClosedDlg}
          isLoading={isLoadingClosed}
          handleSubmit={handleUpdateWorkOrderStatusClosed}
          contentText={
            'Are you sure that you want to CLOSE the work order? You will not be able to edit the invoice upon this change.'
          }
        />
      )}
    </Container>
  );
};
