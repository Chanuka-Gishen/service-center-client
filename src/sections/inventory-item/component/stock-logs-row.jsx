import { TableCell, TableRow } from '@mui/material';
import { formatCurrency } from 'src/utils/format-number';
import { fDate } from 'src/utils/format-time';

export const StockLogsRow = ({ data }) => {
  return (
    <>
      {data.map((item, index) => (
        <TableRow
          key={index}
          hover={true}
          sx={{ cursor: 'pointer' }}
        >
          <TableCell>{item.stockMovementType}</TableCell>
          <TableCell>{item.stockPreviousQuantity}</TableCell>
          <TableCell>{item.stockNewQuantity}</TableCell>
          <TableCell>{formatCurrency(item.stockTotalValue)}</TableCell>
          <TableCell>{item.stockSupplier}</TableCell>
          <TableCell>{fDate(item.createdAt)}</TableCell>
        </TableRow>
      ))}
    </>
  );
};
