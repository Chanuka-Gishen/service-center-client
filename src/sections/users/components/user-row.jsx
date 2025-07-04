import { Chip, IconButton, TableCell, TableRow } from '@mui/material';

import EditNoteIcon from '@mui/icons-material/EditNote';

export const UserRow = ({ data, onClick, onEdit }) => {
  return (
    <>
      {data.map((item, index) => (
        <TableRow
          key={index}
          hover={true}
          sx={{ cursor: 'pointer' }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClick(item);
          }}
        >
          <TableCell>{`${item.userFirstName} ${item.userLastName}`}</TableCell>
          <TableCell>{item.userEmail}</TableCell>
          <TableCell>{item.userRole}</TableCell>
          <TableCell>
            <Chip
              label={item.userIsActive ? 'Active' : 'Terminated'}
              color={item.userIsActive ? 'success' : 'error'}
            />
          </TableCell>
          <TableCell>
            <IconButton
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onEdit(item);
              }}
            >
              <EditNoteIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};
