import { Chip, IconButton, TableCell, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { SAL_BONUS_STS_NOT_PROCESSED } from 'src/constants/payroll-constants';
import { formatCurrency } from 'src/utils/format-number';
import { fDate } from 'src/utils/format-time';

export const SalaryBonusRow = ({ data, handleDelete }) => {
  return (
    <>
      {data.map((item, index) => (
        <TableRow key={index} sx={{ cursor: 'pointer' }}>
          <TableCell>{item.bonusDescription}</TableCell>
          <TableCell>{formatCurrency(item.bonusAmount)}</TableCell>
          <TableCell>
            <Chip
              label={item.bonusStatus}
              color={item.bonusStatus === SAL_BONUS_STS_NOT_PROCESSED ? 'info' : 'success'}
            />
          </TableCell>
          <TableCell>{`${item.bonusEnteredBy.userFirstName} ${item.bonusEnteredBy.userLastName}`}</TableCell>
          <TableCell>{fDate(item.bonusDate)}</TableCell>
          <TableCell>
            {item.bonusStatus === SAL_BONUS_STS_NOT_PROCESSED && (
              <IconButton onClick={() => handleDelete(item._id)}>
                <DeleteIcon />
              </IconButton>
            )}
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};
