import { Chip, TableCell, TableRow } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

import { fDate } from 'src/utils/format-time';

export const BrandRow = ({ data, onClick }) => {
  return (
    <>
      {data.map((item) => {
        const isActive = item.brandIsActive;
        return (
          <TableRow
            key={item._id}
            hover={true}
            onClick={() => onClick(item)}
            sx={{ cursor: 'pointer' }}
          >
            <TableCell>{item.brandName}</TableCell>
            <TableCell>{item.brandManufacturer ?? ' - '}</TableCell>
            <TableCell>{item.brandDescription ?? ' - '}</TableCell>
            <TableCell>{item.brandProductCount}</TableCell>
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
