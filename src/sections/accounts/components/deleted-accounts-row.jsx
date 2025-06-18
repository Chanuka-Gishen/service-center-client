import { TableCell, TableRow } from '@mui/material';
import { formatCurrency } from 'src/utils/format-number';
import { fDate } from 'src/utils/format-time';

export const DeletedAccountsRow = ({ data }) => {
  return (
    <>
      {data.map((item, index) => {
        return (
          <TableRow key={index} hover={true} sx={{ cursor: 'pointer' }}>
            <TableCell>{item.paymentType}</TableCell>
            <TableCell>{item.paymentSource}</TableCell>
            <TableCell>{item.paymentNotes}</TableCell>
            <TableCell>{formatCurrency(item.paymentAmount)}</TableCell>
            <TableCell>{item.paymentMethod}</TableCell>
            <TableCell>{item.paymentTransactionId}</TableCell>
            <TableCell>{`${item.paymentDeletedBy.userFirstName} ${item.paymentDeletedBy.userLastName}`}</TableCell>
            <TableCell>{fDate(item.paymentDeletedAt)}</TableCell>
          </TableRow>
        );
      })}
    </>
  );
};
