import { TableCell, TableRow } from '@mui/material';
import { formatCurrency } from 'src/utils/format-number';
import { fDate } from 'src/utils/format-time';

export const SupplierGrnRow = ({ data, onClickRow }) => {
  return (
    <>
      {data.map((item, index) => (
        <TableRow
          key={index}
          hover={true}
          onClick={() => onClickRow(item._id)}
          sx={{ cursor: 'pointer' }}
        >
          <TableCell>{item.grnCode}</TableCell>
          <TableCell>{formatCurrency(item.grnTotalValue)}</TableCell>
          <TableCell>{formatCurrency(item.grnPaidAmount)}</TableCell>
          <TableCell>{formatCurrency(item.grnDueAmount)}</TableCell>
          <TableCell>{formatCurrency(item.grnDiscountAmount)}</TableCell>
          <TableCell>{item.grnPaymentStatus}</TableCell>
          <TableCell>{fDate(item.createdAt)}</TableCell>
        </TableRow>
      ))}
    </>
  );
};
