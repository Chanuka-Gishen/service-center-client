import React from 'react';
import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Skeleton,
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
import Grid from '@mui/material/Grid2';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import { fDateTime } from 'src/utils/format-time';
import { formatCurrency } from 'src/utils/format-number';
import { WokrOrderUpdateDialog } from '../components/workorder-update-dialog';
import {
  WO_STATUS_CLOSED,
  WO_STATUS_COMPLETED,
  WO_STATUS_OPEN,
} from 'src/constants/workorderStatus';
import ConfirmationDialog from 'src/components/confirmation-dialog/confirmation-dialog';
import { PAY_STATUS_PAID } from 'src/constants/payment-status';
import { AddPaymentDialog } from '../components/add-payment-dialog';
import { EditAssigneeButton } from 'src/components/edit-assignee-button';

const LoadingStack = () => {
  return (
    <Stack>
      {[...Array(4)].map((_, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 2,
            width: '100%',
            alignItems: 'center',
          }}
        >
          <Skeleton variant="circular" width={50} height={50} sx={{ flexShrink: 0 }} />
          <Stack sx={{ width: 'calc(100% - 56px)' }}>
            <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100%' }} />
            <Skeleton variant="text" sx={{ fontSize: '2rem', width: '100%' }} />
          </Stack>
        </Box>
      ))}
    </Stack>
  );
};

export const WorkordersView = ({
  workOrders,
  selectItems,
  selectedId,
  selectedJob,
  formik,
  handleAddNewInventoryRow,
  handleDeleteInventoryItem,
  selectedFilters,
  isOpenUpdate,
  isOpenCompleteDlg,
  isOpenClosedDlg,
  isOpenPaymentDlg,
  isLoading,
  isLoadingJob,
  isLoadingUpdate,
  isLoadingUpdateAssignee,
  isLoadingSelect,
  isLoadingComplete,
  isLoadingClosed,
  isLoadingCreate,
  isDownloading,
  handleSelectJob,
  handleToggleUpdateDialog,
  handleToggleCompleteDlg,
  handleToggleClosedDlg,
  handleTogglePaymentDlg,
  handleUpdateWorkOrder,
  downloadInvoice,
  handleUdpateWorkOrderStatusComplete,
  handleUpdateWorkOrderStatusClosed,
  handelUpdateWorkorderAssignees,
  handleAddPaymentRecord,
  handleChangeSearch,
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Container maxWidth="xl">
      <Grid container rowSpacing={4} columnSpacing={4}>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
          <Typography variant="h5">Active Work Orders</Typography>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 3, lg: 3 }}>
          {isLoading ? (
            <LoadingStack />
          ) : (
            <>
              {workOrders.length > 0 ? (
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                  {workOrders.map((item, index) => (
                    <ListItemButton
                      key={index}
                      onClick={() => handleSelectJob(item)}
                      selected={selectedId ? item._id === selectedId : false}
                    >
                      <ListItemAvatar>
                        <Avatar>
                          <DirectionsCarFilledIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.workOrderCustomer.customerName}
                        secondary={item.workOrderVehicle.vehicleNumber}
                      />
                    </ListItemButton>
                  ))}
                </List>
              ) : (
                <Typography>No Active Orders Found</Typography>
              )}
            </>
          )}
        </Grid>
        {selectedJob && selectedId && !isLoadingJob && (
          <Grid size={{ xs: 12, sm: 12, md: 7, lg: 7 }}>
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
                <Typography variant="h6">{selectedJob.workOrderCustomer.customerName}</Typography>
                <Typography>{`Created At ${fDateTime(selectedJob.createdAt)}`}</Typography>
              </Stack>
              <Stack
                direction={isSmallScreen ? 'column' : 'row'}
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography>{`${selectedJob.workOrderVehicle.vehicleNumber} - ${selectedJob.workOrderVehicle.vehicleManufacturer} - ${selectedJob.workOrderVehicle.vehicleModel}`}</Typography>
                <Typography>{`Updated At ${fDateTime(selectedJob.updatedAt)}`}</Typography>
              </Stack>
              <Stack
                direction={isSmallScreen ? 'column' : 'row'}
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography>{`Current Mileage - ${selectedJob.workOrderMileage} KM`}</Typography>
                {selectedJob.workOrderStatus != WO_STATUS_OPEN && (
                  <Typography>
                    <b>#INVOICE NO</b>
                    {` ${selectedJob.workOrderInvoiceNumber ?? '-'}`}
                  </Typography>
                )}
              </Stack>

              {selectedJob.workOrderAssignees && selectedJob.workOrderAssignees.length > 0 && (
                <>
                  <Divider />
                  <Typography variant="h6">Workorder Assignees</Typography>
                  <Stack direction="row" spacing={2} flexWrap="wrap">
                    {selectedJob.workOrderAssignees.map((emp) => (
                      <Chip variant="outlined" label={emp.empFullName} />
                    ))}
                  </Stack>
                  <Divider />
                </>
              )}

              <TableContainer>
                <Table>
                  {(selectedJob.workOrderCustomItems.length > 0 ||
                    selectedJob.workOrderServiceItems.length > 0) && (
                    <TableHead>
                      <TableRow>
                        <TableCell>Item</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell align="right">Unit Price</TableCell>
                        <TableCell align="right">Total Price</TableCell>
                      </TableRow>
                    </TableHead>
                  )}
                  <TableBody>
                    {selectedJob.workOrderServiceItems.map((customItem, index) => (
                      <TableRow key={index}>
                        <TableCell>{customItem.inventoryItemName}</TableCell>
                        <TableCell>{customItem.quantity}</TableCell>
                        <TableCell align="right">{formatCurrency(customItem.unitPrice)}</TableCell>
                        <TableCell align="right">{formatCurrency(customItem.totalPrice)}</TableCell>
                      </TableRow>
                    ))}
                    {selectedJob.workOrderCustomItems.map((customItem, index) => (
                      <TableRow key={index}>
                        <TableCell>{customItem.inventoryItemName}</TableCell>
                        <TableCell>{customItem.quantity}</TableCell>
                        <TableCell align="right">{formatCurrency(customItem.unitPrice)}</TableCell>
                        <TableCell align="right">{formatCurrency(customItem.totalPrice)}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={3}>Notes</TableCell>
                      <TableCell align="right">{selectedJob.workOrderNotes}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="right" colSpan={3}>
                        Service Charge
                      </TableCell>
                      <TableCell align="right">
                        {formatCurrency(selectedJob.workOrderServiceCharge)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="right" colSpan={3}>
                        Other Charges
                      </TableCell>
                      <TableCell align="right">
                        {formatCurrency(selectedJob.workOrderOtherChargers)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="right" colSpan={3}>
                        Discount Percentage
                      </TableCell>
                      <TableCell align="right">{`${selectedJob.workOrderDiscountPercentage} %`}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="right" colSpan={3}>
                        Cash Discount
                      </TableCell>
                      <TableCell align="right">
                        {formatCurrency(selectedJob.workOrderDiscountCash)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="right" colSpan={3}>
                        Total Amount
                      </TableCell>
                      <TableCell align="right">
                        {formatCurrency(selectedJob.workOrderTotalAmount)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="right" colSpan={3}>
                        Paid Amount
                      </TableCell>
                      <TableCell align="right">
                        {formatCurrency(selectedJob.workOrderPaidAmount)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="right" colSpan={3}>
                        Balance Amount
                      </TableCell>
                      <TableCell align="right">
                        {formatCurrency(selectedJob.workOrderBalanceAmount)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Grid>
        )}
        {selectedJob && selectedId && !isLoadingJob && (
          <Grid size={{ xs: 12, sm: 12, md: 2, lg: 2 }}>
            <Stack spacing={1}>
              {selectedJob.workOrderStatus != WO_STATUS_CLOSED && (
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleToggleUpdateDialog}
                  disabled={isLoadingUpdate}
                >
                  Edit Invoice
                </Button>
              )}
              <EditAssigneeButton
                assignees={selectedJob.workOrderAssignees}
                isLoading={isLoadingUpdateAssignee}
                handleAssign={handelUpdateWorkorderAssignees}
              />
              {selectedJob.workOrderPaymentStatus != PAY_STATUS_PAID &&
                selectedJob.workOrderInvoiceNumber && (
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleTogglePaymentDlg}
                    disabled={isLoadingCreate}
                  >
                    Add Payment
                  </Button>
                )}

              {selectedJob.workOrderStatus != WO_STATUS_OPEN &&
                selectedJob.workOrderInvoiceNumber && (
                  <Button
                    variant="contained"
                    size="large"
                    disabled={isDownloading}
                    onClick={() => downloadInvoice(selectedJob)}
                  >
                    Download Invoice
                  </Button>
                )}
              {selectedJob.workOrderStatus != WO_STATUS_COMPLETED && (
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleToggleCompleteDlg}
                  disabled={isLoadingComplete}
                >
                  Complete Invoice
                </Button>
              )}
              {selectedJob.workOrderStatus === WO_STATUS_COMPLETED && (
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
          inventoryItems={selectItems}
          filterValues={selectedFilters}
          formik={formik}
          handleAddNewInventoryRow={handleAddNewInventoryRow}
          handleDeleteInventoryItem={handleDeleteInventoryItem}
          isLoading={isLoadingUpdate}
          isLoadingItems={isLoadingSelect}
          handleOpenClose={handleToggleUpdateDialog}
          handleChangeSearch={handleChangeSearch}
          handleConfirm={handleUpdateWorkOrder}
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
