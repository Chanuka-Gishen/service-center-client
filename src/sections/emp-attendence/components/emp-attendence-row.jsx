import { TableCell, TableRow } from '@mui/material';
import { fDate } from 'src/utils/format-time';

export const EmpAttendenceRow = ({ data }) => {
  return (
    <>
      {data.map((item, index) => (
        <TableRow key={index} hover={true} sx={{ cursor: 'pointer' }}>
          <TableCell>{item.employee.empFullName}</TableCell>
          <TableCell>{item.employee.empId}</TableCell>
          <TableCell>{item.date}</TableCell>
          <TableCell>{item.checkIn}</TableCell>
          <TableCell>{item.checkOut}</TableCell>
          <TableCell>{item.totalHours}</TableCell>
          <TableCell>{item.status}</TableCell>
        </TableRow>
      ))}
    </>
  );
};
