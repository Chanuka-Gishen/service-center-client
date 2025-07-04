import { Chip, TableCell, TableRow } from '@mui/material';

import { fDateTime } from 'src/utils/format-time';

export const ActivitiesRow = ({ data }) => {
  return (
    <>
      {data.map((item, index) => (
        <TableRow key={index} hover={true} sx={{ cursor: 'pointer' }}>
          <TableCell>{item.action}</TableCell>
          <TableCell>
            <Chip label={item.status} color={item.status === 'Success' ? 'success' : 'error'} />
          </TableCell>

          <TableCell>{item.failureReason ?? ' - '}</TableCell>
          <TableCell>{item.deviceType}</TableCell>
          <TableCell>{item.deviceModel}</TableCell>
          <TableCell>{fDateTime(item.createdAt)}</TableCell>
        </TableRow>
      ))}
    </>
  );
};
