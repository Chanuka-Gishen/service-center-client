import { TableCell, TableRow } from '@mui/material';
import { formatCurrency } from 'src/utils/format-number';
import { fDate } from 'src/utils/format-time';

export const EmployeeRow = ({ data, onClickRow }) => {
  return (
    <>
      {data.map((item, index) => (
        <TableRow
          key={index}
          hover={true}
          onClick={() => onClickRow(item)}
          sx={{ cursor: 'pointer' }}
        >
          <TableCell>{item.empFullName}</TableCell>
          <TableCell>{item.empRole}</TableCell>
          <TableCell>{item.empNic}</TableCell>
          <TableCell>{item.empPhone}</TableCell>
          <TableCell>{item.empJobTitle}</TableCell>
          <TableCell>{formatCurrency(item.empSalary)}</TableCell>
          <TableCell>{item.empIsActive ? 'Active' : 'Inactive/Terminated'}</TableCell>
          <TableCell>{fDate(item.empHireDate)}</TableCell>
          <TableCell>{fDate(item.empTerminationDate)}</TableCell>
        </TableRow>
      ))}
    </>
  );
};
