import { TableCell, TableRow } from '@mui/material';
import { fDate } from 'src/utils/format-time';

export const BookingsRow = ({ data, onClickRow }) => {
  return (
    <>
      {data.map((item, index) => (
        <TableRow
          key={index}
          hover={true}
          onClick={() => onClickRow(item)}
          sx={{ cursor: 'pointer' }}
        >
          <TableCell>{`${item.customer.customerPrefix}.${item.customer.customerName}`}</TableCell>
          <TableCell>{item.customer.customerMobile}</TableCell>
          <TableCell>{item.vehicle.vehicleNumber}</TableCell>
          <TableCell>{fDate(item.date)}</TableCell>
          <TableCell>{item.timeSlot}</TableCell>
        </TableRow>
      ))}
    </>
  );
};
