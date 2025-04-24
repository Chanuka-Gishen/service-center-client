import { TableCell, TableRow } from '@mui/material';
import { formatCurrency } from 'src/utils/format-number';

export const InventoryRow = ({ data, onClickRow }) => {
  return (
    <>
      {data.map((item, index) => (
        <TableRow
          key={index}
          hover={true}
          onClick={() => onClickRow(item._id)}
          sx={{ cursor: 'pointer' }}
        >
          <TableCell>{item.itemCode}</TableCell>
          <TableCell>{item.itemName}</TableCell>
          <TableCell>{item.itemDescription}</TableCell>
          <TableCell>{item.itemCategory}</TableCell>
          <TableCell>{item.itemQuantity}</TableCell>
          <TableCell>{item.itemThreshold}</TableCell>
          <TableCell>{formatCurrency(item.itemBuyingPrice)}</TableCell>
          <TableCell>{formatCurrency(item.itemSellingPrice)}</TableCell>
          <TableCell>{item.itemSupplier}</TableCell>
          <TableCell>{item.itemStatus}</TableCell>
        </TableRow>
      ))}
    </>
  );
};
