import { TableCell, TableRow } from '@mui/material';
import { fDate } from 'src/utils/format-time';

export const PayrollRow = ({ data, onClickRow }) => {
  return (
    <>
      {data.map((item, index) => (
        <TableRow
          key={index}
          hover={true}
          onClick={() => onClickRow(item._id)}
          sx={{ cursor: 'pointer' }}
        >
          <TableCell>{item.payrollMonth}</TableCell>
          <TableCell>{item.payrollStartDate}</TableCell>
          <TableCell>{item.payrollToDate}</TableCell>
          <TableCell>{item.payrollTotal}</TableCell>
          <TableCell>{item.payrollTotalBonuses}</TableCell>
          <TableCell>{item.payrollTotalDeductions}</TableCell>
          <TableCell>{fDate(item.payrollGeneratedAt)}</TableCell>
        </TableRow>
      ))}
    </>
  );
};
