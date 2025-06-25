import { TableCell, TableRow } from '@mui/material';
import { formatCurrency } from 'src/utils/format-number';
import { fDate } from 'src/utils/format-time';

export const PaymentHistoryRow = ({ data }) => {
  return (
    <>
      {data.map((item, index) => (
        <TableRow key={index} hover={true} sx={{ cursor: 'pointer' }}>
          <TableCell>{item.paymentMethod}</TableCell>
          <TableCell>{formatCurrency(item.paymentAmount)}</TableCell>
          <TableCell>{fDate(item.createdAt)}</TableCell>
        </TableRow>
      ))}
    </>
  );
};
