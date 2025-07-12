import { TableCell, TableRow } from '@mui/material';
import { fDate, fTime } from 'src/utils/format-time';

export const EmpAttendenceRow = ({ data }) => {
  return (
    <>
      {data.map((item, index) => (
        <TableRow key={index} hover={true} sx={{ cursor: 'pointer' }}>
          <TableCell>{fDate(item.date)}</TableCell>
          <TableCell>{fTime(item.checkIn)}</TableCell>
          <TableCell>{fTime(item.checkOut)}</TableCell>
          <TableCell>{item.totalHours}</TableCell>
          <TableCell>{item.status}</TableCell>
        </TableRow>
      ))}
    </>
  );
};
