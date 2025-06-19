import { TableCell, TableRow } from '@mui/material';
import { formatCurrency } from 'src/utils/format-number';
import { fDate } from 'src/utils/format-time';

export const SupplierMovementsRow = ({ data, selectedRow, onClickRow }) => {
  return (
    <>
      {data.map((item, index) => (
        <TableRow
          key={index}
          hover={item.stockPaymentBalance > 0 ? true : false}
          onClick={() => {
            item.stockPaymentBalance > 0 ? onClickRow(item) : null;
          }}
          selected={selectedRow && selectedRow._id === item._id}
          sx={{ cursor: 'pointer' }}
        >
          <TableCell>{item.stockItem.itemName}</TableCell>
          <TableCell>{item.stockMovementType}</TableCell>
          <TableCell>{item.stockQuantity}</TableCell>
          <TableCell>{formatCurrency(item.stockTotalValue)}</TableCell>
          <TableCell>{formatCurrency(item.stockPaymentPaidAmount)}</TableCell>
          <TableCell>{formatCurrency(item.stockPaymentBalance)}</TableCell>
          <TableCell>{fDate(item.createdAt)}</TableCell>
        </TableRow>
      ))}
    </>
  );
};
