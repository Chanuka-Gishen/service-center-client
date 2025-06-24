import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Link,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

import { PAY_STATUS_COMPLETED } from 'src/constants/payment-status';

import { NAVIGATION_ROUTES } from 'src/routes/navigation-routes';
import { formatCurrency } from 'src/utils/format-number';
import { GrnAddPaymentDialog } from '../components/grn-add-payment-dialog';
import { CustomTable } from 'src/components/custom-table/custom-table';
import { PaymentHistoryRow } from '../components/payment-history-row';

const GRNItemCard = ({ item }) => {
  return (
    <Card sx={{ minWidth: 275, mb: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {item.itemName}
        </Typography>
        <Divider sx={{ my: 1 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2" color="text.secondary">
            Quantity:
          </Typography>
          <Typography variant="body2">{item.stockQuantity}</Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2" color="text.secondary">
            Unit Price:
          </Typography>
          <Typography variant="body2">{formatCurrency(item.stockUnitPrice)}</Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Typography variant="subtitle2">Total Price:</Typography>
          <Typography variant="subtitle2" fontWeight="bold">
            {formatCurrency(item.stockTotalPrice)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export const GrnInfoView = ({
  paymentColumns,
  supId,
  grnInfo,
  grnPayments,
  isOpenAddPayment,
  isLoadingGrnInfo,
  isLoadingGrnPayments,
  isLoadingAddGrnPayment,
  handelToggleAddPayment,
  handleAddPayment,
}) => {
  return (
    <Container>
      <Grid container spacing={4}>
        <Grid size={12}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href={NAVIGATION_ROUTES.suppliers.base}>
              Suppliers
            </Link>
            {supId && (
              <Link
                underline="hover"
                color="inherit"
                href={`${NAVIGATION_ROUTES.suppliers.details.id}${supId}`}
              >
                {supId ? 'Supplier Info' : 'Not Found'}
              </Link>
            )}
            <Typography sx={{ color: 'text.primary' }}>
              {isLoadingGrnInfo ? 'Loading...' : grnInfo ? grnInfo.grnCode : 'Not Found'}
            </Typography>
          </Breadcrumbs>
        </Grid>
        {grnInfo && grnInfo.grnPaymentStatus != PAY_STATUS_COMPLETED && (
          <Grid size={12}>
            <Button
              variant="contained"
              startIcon={<MonetizationOnIcon />}
              onClick={handelToggleAddPayment}
            >
              Add Payment
            </Button>
          </Grid>
        )}
        {!isLoadingGrnInfo && grnInfo && (
          <Grid size={{ xs: 12, sm: 6 }}>
            <Card>
              <Paper>
                <TableContainer>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell colSpan={2} variant="head">
                          <Typography variant="h4">GRN Info</Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell variant="head">GRN Code</TableCell>
                        <TableCell>{grnInfo.grnCode}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell variant="head">Stock Total Value</TableCell>
                        <TableCell>{formatCurrency(grnInfo.grnTotalValue)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell variant="head">Discount Amount</TableCell>
                        <TableCell>{formatCurrency(grnInfo.grnDiscountAmount)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell variant="head">Sub Total Amount</TableCell>
                        <TableCell>{formatCurrency(grnInfo.grnSubTotalValue || 0)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell variant="head">Paid Amount</TableCell>
                        <TableCell>{formatCurrency(grnInfo.grnPaidAmount)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell variant="head">Due Amount</TableCell>
                        <TableCell>{formatCurrency(grnInfo.grnDueAmount)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell variant="head">Payment Status</TableCell>
                        <TableCell>{grnInfo.grnPaymentStatus}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Card>
          </Grid>
        )}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Stack spacing={2}>
            <Typography variant="h5">Payment History</Typography>
            <Card>
              <Paper elevation={0}>
                <CustomTable
                  keys={paymentColumns}
                  isLoading={isLoadingGrnPayments}
                  dataLength={grnPayments.length}
                  handleChangePage={null}
                  handleChangeRowsPerPage={null}
                  enablePagination={false}
                  tableBody={<PaymentHistoryRow data={grnPayments} />}
                />
              </Paper>
            </Card>
          </Stack>
        </Grid>
        {!isLoadingGrnInfo && grnInfo && (
          <>
            {grnInfo.grnItems.map((item, index) => (
              <Grid key={index} size={{ xs: 12, sm: 4, md: 3 }}>
                <GRNItemCard item={item} />
              </Grid>
            ))}
          </>
        )}
      </Grid>
      {isOpenAddPayment && (
        <GrnAddPaymentDialog
          open={isOpenAddPayment}
          data={grnInfo}
          handleClose={handelToggleAddPayment}
          isLoading={isLoadingAddGrnPayment}
          handleConfirm={handleAddPayment}
        />
      )}
    </Container>
  );
};
