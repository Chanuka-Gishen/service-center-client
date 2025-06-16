import { TableCell, TableRow } from '@mui/material';
import { fDate } from 'src/utils/format-time';

export const EmpJobsRow = ({ data }) => {
  return (
    <>
      {data.map((item, index) => (
        <TableRow key={index} hover={true} sx={{ cursor: 'pointer' }}>
          <TableCell>{item.workOrderVehicle.vehicleNumber}</TableCell>
          <TableCell>{item.workOrderType}</TableCell>
          <TableCell>{item.workOrderMileage}</TableCell>
          <TableCell>{item.workOrderInvoiceNumber}</TableCell>
          <TableCell>{item.workOrderStatus}</TableCell>
          <TableCell>{fDate(item.createdAt)}</TableCell>
        </TableRow>
      ))}
    </>
  );
};
