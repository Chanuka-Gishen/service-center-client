import React from 'react';

import Grid from '@mui/material/Grid2';
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  Chip,
  CircularProgress,
  Container,
  Divider,
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
import { NAVIGATION_ROUTES } from 'src/routes/navigation-routes';
import { WO_STATUS_OPEN } from 'src/constants/workorderStatus';
import { fDate, fDateTime } from 'src/utils/format-time';
import { formatCurrency } from 'src/utils/format-number';
import { AddPaymentDialog } from 'src/sections/workorders/components/add-payment-dialog';
import { PAY_STATUS_PAID } from 'src/constants/payment-status';
import commonUtil from 'src/utils/common-util';
import { EditAssigneeButton } from 'src/components/edit-assignee-button';

export const WorkorderView = ({
  job,
  woPayments,
  isLoading,
  isDownloading,
  isLoadingCreate,
  isLoadingWoPayments,
  isLoadingUpdateAssignee,
  isOpenPaymentDlg,
  handleTogglePaymentDlg,
  handleAddPaymentRecord,
  handelUpdateWorkorderAssignees,
  downloadInvoice,
}) => {
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
              <EditAssigneeButton
                assignees={job.workOrderAssignees}
                isLoading={isLoadingUpdateAssignee}
                handleAssign={handelUpdateWorkorderAssignees}
              />
              {job.workOrderPaymentStatus != PAY_STATUS_PAID && job.workOrderInvoiceNumber && (
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
                {woPayments.map((payment) => (
                  <Card>
                    <TableContainer>
                      <Table>
                        <TableBody>
                          <TableRow>
                            <TableCell variant="head">{fDate(payment.createdAt)}</TableCell>
                            <TableCell>{formatCurrency(payment.paymentAmount)}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell variant="head">Method</TableCell>
                            <TableCell>{payment.paymentMaymentMethod}</TableCell>
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
    </Container>
  );
};
