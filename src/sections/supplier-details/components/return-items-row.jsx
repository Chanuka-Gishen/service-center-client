import { TableCell, TableRow } from '@mui/material';
import { RETURN_STS_PENDING } from 'src/constants/return-status';
import { formatCurrency } from 'src/utils/format-number';

export const ReturnItemsRow = ({ data, onClickRow }) => {
  return (
    <>
      {data.map((item, index) => (
        <TableRow
          key={index}
          hover={onClickRow && item.returnStatus === RETURN_STS_PENDING ? true : false}
          onClick={() => {
            item.returnStatus === RETURN_STS_PENDING ? onClickRow(item) : null;
          }}
          sx={{ cursor: 'pointer' }}
        >
          <TableCell>{item.grnRef.grnCode}</TableCell>
          <TableCell>{item.returnItem.itemCode}</TableCell>
          <TableCell>{item.returnItem.itemName}</TableCell>
          <TableCell>{item.returnQty}</TableCell>
          <TableCell>{item.returnReason}</TableCell>
          <TableCell>{formatCurrency(item.returnStockValue)}</TableCell>
          <TableCell>{item.returnType}</TableCell>
          <TableCell>{item.returnStatus}</TableCell>
        </TableRow>
      ))}
    </>
  );
};
