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
import { WO_STATUS_CLOSED } from 'src/constants/workorderStatus';

export const CustomerJobRow = ({ data }) => {
  return (
    <>
      {data.map((item, index) => {
        const status = item.workOrderStatus;
        const paymentStatus = item.workOrderPaymentStatus;
        return (
          <TableRow key={index} hover={true} sx={{ cursor: 'pointer' }}>
            <TableCell>{item.workOrderVehicle.vehicleNumber}</TableCell>
            <TableCell>
              <Chip
                icon={status === WO_STATUS_CLOSED ? <CheckCircleIcon /> : <PendingIcon />}
                label={status}
                color={status === WO_STATUS_CLOSED ? 'success' : 'warning'}
              />
            </TableCell>
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
