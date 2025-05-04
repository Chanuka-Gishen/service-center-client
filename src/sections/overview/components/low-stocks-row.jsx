import { TableCell, TableRow } from '@mui/material';

export const LowStocksRow = ({ data }) => {
  return (
    <>
      {data.map((item, index) => (
        <TableRow key={index} hover={true} sx={{ cursor: 'pointer' }}>
          <TableCell>{item.itemCode}</TableCell>
          <TableCell>{item.itemName}</TableCell>
          <TableCell>{item.itemQuantity}</TableCell>
        </TableRow>
      ))}
    </>
  );
};
