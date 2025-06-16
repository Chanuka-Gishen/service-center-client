import { TableCell, TableRow } from '@mui/material';

export const EmpAttendenceRow = ({ data }) => {
  return (
    <>
      {data.map((item, index) => (
        <TableRow key={index} hover={true} sx={{ cursor: 'pointer' }}>
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
