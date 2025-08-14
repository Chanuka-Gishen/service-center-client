import { Chip, TableCell, TableRow } from '@mui/material';

import { formatCurrency } from 'src/utils/format-number';
import { fDate } from 'src/utils/format-time';

export const SalaryChangesRow = ({ data }) => {
  return (
    <>
      {data.map((item, index) => (
        <TableRow key={index} sx={{ cursor: 'pointer' }}>
          <TableCell>{item.changeType}</TableCell>
          <TableCell>{item.reason}</TableCell>
          <TableCell>{formatCurrency(item.currentSalary)}</TableCell>
          <TableCell>{formatCurrency(item.newSalary)}</TableCell>
          <TableCell>{formatCurrency(item.difference)}</TableCell>
          <TableCell>{`${item.percentageChange} %`}</TableCell>
          <TableCell>
            <Chip label={item.status} color="success" />
          </TableCell>
          <TableCell>{`${item.approvedBy.userFirstName} ${item.approvedBy.userLastName}`}</TableCell>
          <TableCell>{fDate(item.effectiveDate)}</TableCell>
        </TableRow>
      ))}
    </>
  );
};
