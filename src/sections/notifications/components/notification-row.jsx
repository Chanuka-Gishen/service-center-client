import { TableCell, TableRow, Typography } from '@mui/material';

import { fDateTime } from 'src/utils/format-time';

export const NotificationsRow = ({ data }) => {
  return (
    <>
      {data.map((item, index) => {
        return (
          <TableRow key={index} hover={false} sx={{ borderBottom: 'unset', cursor: 'pointer' }}>
            <TableCell>{item.notificationType}</TableCell>
            <TableCell>{item.notificationTitle}</TableCell>
            <TableCell>
              <Typography textAlign="justify">{item.notificationContent}</Typography>
            </TableCell>
            <TableCell>{fDateTime(item.createdAt)}</TableCell>
          </TableRow>
        );
      })}
    </>
  );
};
