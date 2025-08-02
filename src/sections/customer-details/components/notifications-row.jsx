import { Fragment, useState } from 'react';
import { Collapse, IconButton, TableCell, TableRow, Typography } from '@mui/material';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { fDateTime } from 'src/utils/format-time';

export const NotificationsRow = ({ data }) => {
  const [open, setOpen] = useState(null);

  const handleToggleRow = (id) => {
    setOpen((prev) => (prev === id ? null : id));
  };

  return (
    <>
      {data.map((item, index) => {
        return (
          <Fragment key={index}>
            <TableRow hover={false} sx={{ borderBottom: 'unset', cursor: 'pointer' }}>
              <TableCell>{item.notificationType}</TableCell>
              <TableCell>{item.notificationTitle}</TableCell>
              <TableCell>{fDateTime(item.createdAt)}</TableCell>
              <TableCell align="right">
                <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={() => handleToggleRow(index)}
                >
                  {open === index ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
              </TableCell>
            </TableRow>
            {open === index && (
              <TableRow sx={{ paddingBottom: 0, paddingTop: 0 }}>
                <TableCell colSpan={4}>
                  <Collapse in={open === index} timeout="auto" unmountOnExit>
                    <Typography textAlign="justify">{item.notificationContent}</Typography>
                  </Collapse>
                </TableCell>
              </TableRow>
            )}
          </Fragment>
        );
      })}
    </>
  );
};
