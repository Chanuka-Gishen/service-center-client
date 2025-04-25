import { TableCell, TableRow } from '@mui/material';
import { CUS_TYPE_INDIVIDUAL } from 'src/constants/customer-type';
import { fDate } from 'src/utils/format-time';

export const CustomerRow = ({ data, onClickRow = null }) => {
  return (
    <>
      {data.map((item, index) => (
        <TableRow
          key={index}
          hover={onClickRow ? true : false}
          onClick={() => onClickRow(item)}
          sx={{ cursor: 'pointer' }}
        >
          <TableCell>
            {item.customerType === CUS_TYPE_INDIVIDUAL
              ? `${item.customerPrefix} ${item.customerName}`
              : item.customerName}
          </TableCell>
          <TableCell>{item.customerMobile}</TableCell>
          <TableCell>{item.customerEmail}</TableCell>
          <TableCell>{fDate(item.createdAt)}</TableCell>
        </TableRow>
      ))}
    </>
  );
};
