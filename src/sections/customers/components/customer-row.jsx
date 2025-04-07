import { TableCell, TableRow } from '@mui/material';
import { fDate } from 'src/utils/format-time';

export const CustomerRow = ({ data, onClickRow = null }) => {
  return (
    <>
      {data.map((item, index) => (
        <TableRow
          key={index}
          hover={onClickRow ? true : false}
          onClick={() => onClickRow(item._id)}
          sx={{ cursor: 'pointer' }}
        >
          <TableCell>{`${item.customerPrefix} ${item.customerName}`}</TableCell>
          <TableCell>{item.customerMobile}</TableCell>
          <TableCell>{item.customerEmail}</TableCell>
          <TableCell>{fDate(item.createdAt)}</TableCell>
        </TableRow>
      ))}
    </>
  );
};
