import { Chip, TableCell, TableRow } from '@mui/material';
import {
  PAY_STATUS_PAID,
  PAY_STATUS_PARTIALLY_PAID,
  PAY_STATUS_REFUNDED,
  PAY_STATUS_UNPAID,
  PAY_STATUS_WRITTEN_OFF,
} from 'src/constants/payment-status';
import { fDate } from 'src/utils/format-time';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PendingIcon from '@mui/icons-material/Pending';
import { formatCurrency } from 'src/utils/format-number';

export const JobRow = ({ data, onClickRow }) => {
  return (
    <>
      {data.map((item, index) => {
        const paymentStatus = item.workOrderPaymentStatus;
        return (
          <TableRow
            key={index}
            hover={true}
            onClick={() => onClickRow(item)}
            sx={{ cursor: 'pointer' }}
          >
            <TableCell>{`${item.customer.customerPrefix ?? 'Mr. '} ${item.customer.customerName}`}</TableCell>
            <TableCell>{item.vehicle.vehicleNumber}</TableCell>
            <TableCell>{item.workOrderMileage}</TableCell>
            <TableCell>{item.workOrderInvoiceNumber}</TableCell>
            <TableCell>
              <Chip
                icon={
                  paymentStatus === PAY_STATUS_PAID ? (
                    <CheckCircleIcon />
                  ) : paymentStatus === PAY_STATUS_UNPAID ? (
                    <CancelIcon />
                  ) : (
                    <PendingIcon />
                  )
                }
                label={item.workOrderPaymentStatus}
                color={
                  paymentStatus === PAY_STATUS_PAID
                    ? 'success'
                    : paymentStatus === PAY_STATUS_PARTIALLY_PAID
                      ? 'warning'
                      : [PAY_STATUS_WRITTEN_OFF, PAY_STATUS_REFUNDED].includes(paymentStatus)
                        ? 'info'
                        : 'error'
                }
              />
            </TableCell>
            <TableCell>{formatCurrency(item.workOrderTotalAmount)}</TableCell>
            <TableCell>{formatCurrency(item.workOrderBalanceAmount)}</TableCell>
            <TableCell>{fDate(item.createdAt)}</TableCell>
          </TableRow>
        );
      })}
    </>
  );
};
