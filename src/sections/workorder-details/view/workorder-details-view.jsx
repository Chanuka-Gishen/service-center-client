import React from 'react';

import Grid from '@mui/material/Grid2';
import {
  Alert,
  Box,
  Breadcrumbs,
  Button,
  Card,
  Chip,
  CircularProgress,
  Container,
  Divider,
  IconButton,
  Link,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { NAVIGATION_ROUTES } from 'src/routes/navigation-routes';
import { WO_STATUS_OPEN } from 'src/constants/workorderStatus';
import { fDate, fDateTime } from 'src/utils/format-time';
import { formatCurrency } from 'src/utils/format-number';
import { AddPaymentDialog } from 'src/sections/workorders/components/add-payment-dialog';
import {
  PAY_STATUS_COMPLETED,
  PAY_STATUS_PAID,
  PAY_STATUS_PENDING,
  PAY_STATUS_REFUNDED,
} from 'src/constants/payment-status';
import commonUtil from 'src/utils/common-util';
import { EditAssigneeButton } from 'src/components/edit-assignee-button';
import { PAY_METHOD_CHEQUE } from 'src/constants/payment-methods';
import ConfirmationDialog from 'src/components/confirmation-dialog/confirmation-dialog';
import useAuthStore from 'src/store/auth-store';
import { USER_ROLE } from 'src/constants/user-role';
import { RefundDialog } from '../components/refund-dialog';
import { PAY_SC_INCOME } from 'src/constants/payment-source';

export const WorkorderView = ({
  job,
  woPayments,
  isLoading,
  isDownloading,
  isLoadingCreate,
  isLoadingWoPayments,
  isLoadingDeleteWoPay,
  isLoadingUpdateAssignee,
  isLoadingPaymentComplete,
  isLoadingRefund,
  isOpenPaymentDlg,
  isOpenProceedPayDlg,
  isOpenRefundDlg,
  isOpenDeletePayment,
  handleTogglePaymentDlg,
  handleTogglePaymentProceedDlg,
  handleToggleRefundDialog,
  handleToggleDeletePaymentDlg,
  handleAddPaymentRecord,
  handelUpdateWorkorderAssignees,
  handleCompletePayment,
  handleIssueRefund,
  handleDeletePaymentRecord,
  downloadInvoice,
}) => {
  const { auth } = useAuthStore.getState();
  return (
    <Container maxWidth="xl">
      <Grid container spacing={4}>
        <Grid size={{ sm: 12, md: 12, lg: 12 }}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href={NAVIGATION_ROUTES.jobs.base}>
              Past Workorders
            </Link>
            <Typography sx={{ color: 'text.primary' }}>
              {isLoading ? 'Loading...' : 'Workorder Details'}
            </Typography>
          </Breadcrumbs>
        </Grid>
        {isLoading && (
          <Grid size={{ sm: 12, md: 12, lg: 12 }}>
            <CircularProgress />
          </Grid>
        )}
        {!isLoading && job && (
          <Grid size={{ sm: 12, md: 12, lg: 12 }}>
            <Stack spacing={1} direction="row">
              {auth.user.userRole === USER_ROLE.SUPER_ADMIN &&
                job.workOrderPaymentStatus != PAY_STATUS_REFUNDED && (
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleToggleRefundDialog}
                    disabled={isLoadingRefund}
                  >
                    Issue Refund
                  </Button>
                )}
              <EditAssigneeButton
                assignees={job.workOrderAssignees}
                isLoading={isLoadingUpdateAssignee}
                handleAssign={handelUpdateWorkorderAssignees}
              />
              {job.workOrderPaymentStatus != PAY_STATUS_PAID &&
                job.workOrderPaymentStatus != PAY_STATUS_REFUNDED &&
                job.workOrderInvoiceNumber && (
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleTogglePaymentDlg}
                    disabled={isLoadingCreate}
                  >
                    Add Payment
                  </Button>
                )}

              {job.workOrderStatus != WO_STATUS_OPEN && job.workOrderInvoiceNumber && (
                <Button
                  variant="contained"
                  size="large"
                  disabled={isDownloading}
                  onClick={() => downloadInvoice(job)}
                >
                  Download Invoice
                </Button>
              )}
            </Stack>
          </Grid>
        )}
        {woPayments.map((item) => {
          if (item.paymentStatus === PAY_STATUS_PENDING) {
            return (
              <Grid size={12}>
                <Alert severity="warning">
                  {`There is a pending cheque created at ${fDate(item.createdAt)}`}
                </Alert>
              </Grid>
            );
          }
        })}
        {!isLoading && job && (
          <Grid size={{ sm: 12, md: 8, lg: 8 }}>
            <Box
              display="flex"
              flexDirection="column"
              gap={2}
              sx={{ bgcolor: 'background.paper', p: '10px' }}
            >
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h6">{`${job.workOrderCustomer.customerPrefix ?? 'Mr'} ${job.workOrderCustomer.customerName}`}</Typography>
                <Typography>{`Created At ${fDateTime(job.createdAt)}`}</Typography>
              </Stack>
              <Typography>{`Contact Number - ${job.workOrderCustomer.customerMobile}`}</Typography>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography>{`${job.workOrderVehicle.vehicleNumber} - ${job.workOrderVehicle.vehicleManufacturer} - ${job.workOrderVehicle.vehicleModel}`}</Typography>
                <Typography>{`Updated At ${fDateTime(job.updatedAt)}`}</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography>{`Current Mileage - ${job.workOrderMileage} KM`}</Typography>
                {job.workOrderStatus != WO_STATUS_OPEN && (
                  <Typography>
                    <b>#INVOICE NO</b>
                    {` ${job.workOrderInvoiceNumber ?? '-'}`}
                  </Typography>
                )}
              </Stack>

              {job.workOrderAssignees && job.workOrderAssignees.length > 0 && (
                <>
                  <Divider />
                  <Typography variant="h6">Workorder Assignees</Typography>
                  <Stack direction="row" spacing={2} flexWrap="wrap">
                    {job.workOrderAssignees.map((emp) => (
                      <Chip variant="outlined" label={emp.empFullName} />
                    ))}
                  </Stack>
                  <Divider />
                </>
              )}

              <TableContainer>
                <Table>
                  {(job.workOrderCustomItems.length > 0 ||
                    job.workOrderServiceItems.length > 0) && (
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
                    {job.workOrderServiceItems.map((customItem, index) => (
                      <TableRow key={index}>
                        <TableCell>{customItem.inventoryItemName}</TableCell>
                        <TableCell>{customItem.quantity}</TableCell>
                        <TableCell align="right">{formatCurrency(customItem.unitPrice)}</TableCell>
                        <TableCell align="right">{formatCurrency(customItem.totalPrice)}</TableCell>
                      </TableRow>
                    ))}
                    {job.workOrderCustomItems.map((customItem, index) => (
                      <TableRow key={index}>
                        <TableCell>{customItem.inventoryItemName}</TableCell>
                        <TableCell>{customItem.quantity}</TableCell>
                        <TableCell align="right">{formatCurrency(customItem.unitPrice)}</TableCell>
                        <TableCell align="right">{formatCurrency(customItem.totalPrice)}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={3}>Notes</TableCell>
                      <TableCell align="right">{job.workOrderNotes}</TableCell>
                    </TableRow>
                    {job.workOrderServiceCharge > 0 && (
                      <TableRow>
                        <TableCell align="right" colSpan={3}>
                          Service Charge
                        </TableCell>
                        <TableCell align="right">
                          {formatCurrency(job.workOrderServiceCharge)}
                        </TableCell>
                      </TableRow>
                    )}
                    {job.workOrderOtherChargers > 0 && (
                      <TableRow>
                        <TableCell align="right" colSpan={3}>
                          Other Charges
                        </TableCell>
                        <TableCell align="right">
                          {formatCurrency(job.workOrderOtherChargers)}
                        </TableCell>
                      </TableRow>
                    )}
                    {job.workOrderDiscountPercentage > 0 && (
                      <TableRow>
                        <TableCell align="right" colSpan={3}>
                          Discount Percentage
                        </TableCell>
                        <TableCell align="right">{`${job.workOrderDiscountPercentage} %`}</TableCell>
                      </TableRow>
                    )}
                    {job.workOrderDiscountCash > 0 && (
                      <TableRow>
                        <TableCell align="right" colSpan={3}>
                          Cash Discount
                        </TableCell>
                        <TableCell align="right">
                          {formatCurrency(job.workOrderDiscountCash)}
                        </TableCell>
                      </TableRow>
                    )}
                    <TableRow>
                      <TableCell align="right" colSpan={3}>
                        Total Amount
                      </TableCell>
                      <TableCell align="right">
                        {formatCurrency(job.workOrderTotalAmount)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="right" colSpan={3}>
                        Paid Amount
                      </TableCell>
                      <TableCell align="right">
                        {formatCurrency(job.workOrderPaidAmount ?? 0)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="right" colSpan={3}>
                        Balance Amount
                      </TableCell>
                      <TableCell align="right">
                        {formatCurrency(job.workOrderBalanceAmount ?? 0)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Grid>
        )}
        <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4 }}>
          <Box display="flex" flexDirection="column" gap={2} sx={{ p: '10px' }}>
            <Typography variant="h5">Payment Records</Typography>
            {isLoadingWoPayments && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexGrow: 1,
                }}
              >
                <CircularProgress />
              </Box>
            )}
            {!isLoading && woPayments.length === 0 && (
              <Typography variant="caption">No Payment Records Found</Typography>
            )}
            {!isLoading && woPayments.length > 0 && (
              <>
                {woPayments.map((payment, index) => (
                  <Card key={index}>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        spacing: 2,
                      }}
                    >
                      <TableContainer>
                        <Table>
                          <TableBody>
                            <TableRow>
                              <TableCell variant="head">{fDate(payment.createdAt)}</TableCell>
                              <TableCell>
                                {formatCurrency(
                                  PAY_SC_INCOME.includes(payment.paymentSource)
                                    ? payment.paymentAmount
                                    : -payment.paymentAmount
                                )}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell variant="head">Method</TableCell>
                              <TableCell>{payment.paymentMethod}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell variant="head">Status</TableCell>
                              <TableCell>
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  justifyContent="space-between"
                                >
                                  <Chip
                                    label={payment.paymentStatus}
                                    color={
                                      payment.paymentStatus === PAY_STATUS_COMPLETED
                                        ? 'success'
                                        : 'warning'
                                    }
                                  />
                                  {payment.paymentStatus === PAY_STATUS_PENDING &&
                                    payment.paymentMethod === PAY_METHOD_CHEQUE && (
                                      <IconButton
                                        onClick={() => handleTogglePaymentProceedDlg(payment._id)}
                                      >
                                        <PriceChangeIcon />
                                      </IconButton>
                                    )}
                                </Stack>
                              </TableCell>
                            </TableRow>
                            {!commonUtil.stringIsEmptyOrSpaces(payment.paymentTransactionId) && (
                              <TableRow>
                                <TableCell variant="head">Transaction Id</TableCell>
                                <TableCell>{payment.paymentTransactionId}</TableCell>
                              </TableRow>
                            )}
                            {!commonUtil.stringIsEmptyOrSpaces(payment.paymentNotes) && (
                              <TableRow>
                                <TableCell variant="head">Notes</TableCell>
                                <TableCell>{payment.paymentNotes}</TableCell>
                              </TableRow>
                            )}
                            <TableRow>
                              <TableCell variant="head">Collected By</TableCell>
                              <TableCell>{`${payment.paymentCollectedBy.userFirstName} ${payment.paymentCollectedBy.userLastName}`}</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                      <IconButton
                        onClick={() => handleToggleDeletePaymentDlg(payment._id)}
                        loading={isLoadingDeleteWoPay}
                        disabled={isLoadingDeleteWoPay}
                      >
                        <DeleteForeverIcon />
                      </IconButton>
                    </Box>
                  </Card>
                ))}
              </>
            )}
          </Box>
        </Grid>
      </Grid>
      {isOpenPaymentDlg && (
        <AddPaymentDialog
          open={isOpenPaymentDlg}
          handleClose={handleTogglePaymentDlg}
          data={job}
          isLoading={isLoadingCreate}
          handleConfirm={handleAddPaymentRecord}
        />
      )}
      {isOpenProceedPayDlg && (
        <ConfirmationDialog
          open={isOpenProceedPayDlg}
          handleClose={handleTogglePaymentProceedDlg}
          contentText={
            'Please double check before completing this cheque payment. Once you proceed it cannot be reversed. The accounts will be updated if you wish to continue !'
          }
          handleSubmit={handleCompletePayment}
          isLoading={isLoadingPaymentComplete}
        />
      )}
      {isOpenRefundDlg && (
        <RefundDialog
          open={isOpenRefundDlg}
          handleClose={handleToggleRefundDialog}
          handleConfirm={handleIssueRefund}
          isLoading={isLoadingRefund}
        />
      )}
      {isOpenDeletePayment && (
        <ConfirmationDialog
          open={isOpenDeletePayment}
          handleClose={handleToggleDeletePaymentDlg}
          contentText={
            'Are you sure that you want to delete this payment record? The accounts will be updated in completion'
          }
          handleSubmit={handleDeletePaymentRecord}
          isLoading={isLoadingDeleteWoPay}
        />
      )}
    </Container>
  );
};
