import { Chip, TableCell, TableRow } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

import { fDate } from 'src/utils/format-time';

export const InventoryCategoryRow = ({ data, onClick }) => {
  return (
    <>
      {data.map((item) => {
        const isActive = item.isActive;
        return (
          <TableRow
            key={item._id}
            hover={true}
            onClick={() => onClick(item)}
            sx={{ cursor: 'pointer' }}
          >
            <TableCell>{item.categoryTitle}</TableCell>
            <TableCell>{item.productCount}</TableCell>
            <TableCell>
              <Chip
                icon={isActive ? <CheckCircleIcon /> : <CancelIcon />}
                label={isActive ? 'Active' : 'Not Active'}
                color={isActive ? 'success' : 'warning'}
              />
            </TableCell>
            <TableCell>{fDate(item.createdAt)}</TableCell>
            <TableCell>{fDate(item.updatedAt)}</TableCell>
          </TableRow>
        );
      })}
    </>
  );
};
