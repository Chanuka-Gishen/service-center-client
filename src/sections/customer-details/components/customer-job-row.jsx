import { Chip, TableCell, TableRow } from '@mui/material';
import {
  PAY_STATUS_OVERDUE,
  PAY_STATUS_PAID,
  PAY_STATUS_PARTIALLY_PAID,
  PAY_STATUS_UNPAID,
  PAY_STATUS_WRITTEN_OFF,
} from 'src/constants/payment-status';
import { fDate } from 'src/utils/format-time';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PendingIcon from '@mui/icons-material/Pending';
import { formatCurrency } from 'src/utils/format-number';
import { WO_STATUS_CLOSED } from 'src/constants/workorderStatus';

export const CustomerJobRow = ({ data }) => {
  return (
    <>
      {data.map((item, index) => {
        const status = item.workorderStatus;
        const paymentStatus = item.workorderPaymentStatus;
        return (
          <TableRow key={index} hover={true} sx={{ cursor: 'pointer' }}>
            <TableCell>{item.workorderVehicle.vehicleNumber}</TableCell>
            <TableCell>
              <Chip
                icon={status === WO_STATUS_CLOSED ? <CheckCircleIcon /> : <PendingIcon />}
                label={status}
                color={status === WO_STATUS_CLOSED ? 'success' : 'warning'}
              />
            </TableCell>
            <TableCell>{item.workorderInvoiceNumber}</TableCell>
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
                label={item.workorderPaymentStatus}
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
            <TableCell>{formatCurrency(item.workorderTotalAmount)}</TableCell>
            <TableCell>{formatCurrency(item.workorderBalanceAmount)}</TableCell>
            <TableCell>{fDate(item.createdAt)}</TableCell>
          </TableRow>
        );
      })}
    </>
  );
};
