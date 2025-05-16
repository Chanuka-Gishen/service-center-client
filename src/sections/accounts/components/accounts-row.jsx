import { TableCell, TableRow } from '@mui/material';
import { formatCurrency } from 'src/utils/format-number';
import { fDate } from 'src/utils/format-time';

export const AccountsRow = ({ data }) => {
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
            <TableCell>{`${item.paymentCollectedBy.userFirstName} ${item.paymentCollectedBy.userLastName}`}</TableCell>
            <TableCell>{fDate(item.createdAt)}</TableCell>
          </TableRow>
        );
      })}
    </>
  );
};
