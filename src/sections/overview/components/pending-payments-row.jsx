import { TableCell, TableRow } from '@mui/material';
import { formatCurrency } from 'src/utils/format-number';
import { fDate } from 'src/utils/format-time';

export const PendingPaymentsRow = ({ data }) => {
  return (
    <>
      {data.map((item, index) => (
        <TableRow key={index} hover={true} sx={{ cursor: 'pointer' }}>
          <TableCell>{item.paymentworkOrder.workOrderVehicle.vehicleNumber}</TableCell>
          <TableCell>{`${item.paymentCustomer.customerPrefix} ${item.paymentCustomer.customerName}`}</TableCell>
          <TableCell>{formatCurrency(item.paymentAmount)}</TableCell>
          <TableCell>{item.paymentTransactionId}</TableCell>
          <TableCell>{fDate(item.createdAt)}</TableCell>
        </TableRow>
      ))}
    </>
  );
};
