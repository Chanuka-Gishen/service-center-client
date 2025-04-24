import { Chip, TableCell, TableRow } from '@mui/material';

export const UserRow = ({ data }) => {
  return (
    <>
      {data.map((item, index) => (
        <TableRow key={index} hover={true} sx={{ cursor: 'pointer' }}>
          <TableCell>{`${item.userFirstName} ${item.userLastName}`}</TableCell>
          <TableCell>{item.userEmail}</TableCell>
          <TableCell>{item.userRole}</TableCell>
          <TableCell>
            <Chip
              label={item.userIsActive ? 'Active' : 'Terminated'}
              color={item.userIsActive ? 'success' : 'error'}
            />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};
