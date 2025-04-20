import { Chip, TableCell, TableRow } from '@mui/material';
import {
  PAY_STATUS_OVERDUE,
  PAY_STATUS_PAID,
  PAY_STATUS_PARTIALLY_PAID,
  PAY_STATUS_UNPAID,
  PAY_STATUS_WRITTEN_OFF,
} from 'src/constants/paymentStatus';
import { fDate } from 'src/utils/format-time';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PendingIcon from '@mui/icons-material/Pending';
import { formatCurrency } from 'src/utils/format-number';

export const JobRow = ({ data, onClickRow }) => {
  const paymentChipColor = () => {
    switch (data.workOrderPaymentStatus) {
      case PAY_STATUS_PAID:
        return 'success';
      case PAY_STATUS_UNPAID:
        return 'error';
      case PAY_STATUS_PARTIALLY_PAID:
        return 'warning';
      case PAY_STATUS_OVERDUE:
        return 'error';
      case PAY_STATUS_WRITTEN_OFF:
        return 'info';
      default:
        return 'error';
    }
  };

  const paymentIcon = () => {
    switch (data.workOrderPaymentStatus) {
      case PAY_STATUS_PAID:
        return <CheckCircleIcon />;
      case PAY_STATUS_UNPAID:
        return <CancelIcon />;
      default:
        return <PendingIcon />;
    }
  };

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
                      : paymentStatus === PAY_STATUS_WRITTEN_OFF
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
