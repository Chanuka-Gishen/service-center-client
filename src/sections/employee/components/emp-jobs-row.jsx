import { TableCell, TableRow } from '@mui/material';
import { fDate } from 'src/utils/format-time';

export const EmpJobsRow = ({ data }) => {
  return (
    <>
      {data.map((item, index) => (
        <TableRow key={index} hover={true} sx={{ cursor: 'pointer' }}>
          <TableCell>{item.workorderVehicle.vehicleNumber}</TableCell>
          <TableCell>{item.workorderType}</TableCell>
          <TableCell>{item.workorderMileage}</TableCell>
          <TableCell>{item.workorderInvoiceNumber}</TableCell>
          <TableCell>{item.workorderStatus}</TableCell>
          <TableCell>{fDate(item.createdAt)}</TableCell>
        </TableRow>
      ))}
    </>
  );
};
