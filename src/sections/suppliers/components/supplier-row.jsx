import { Chip, TableCell, TableRow, Typography } from '@mui/material';

export const SupplierRow = ({ data }) => {
  return (
    <>
      {data.map((item, index) => (
        <TableRow key={index} hover={true} sx={{ cursor: 'pointer' }}>
          <TableCell>{item.supplierName}</TableCell>
          <TableCell>{item.supplierContactPerson}</TableCell>
          <TableCell>{item.supplierPhone}</TableCell>
          <TableCell>
            {Array.isArray(item.supplierProducts) && item.supplierProducts.length > 0
              ? item.supplierProducts.map((v, index) => (
                  <Typography key={index} variant='body2'>{v.itemName}</Typography>
                ))
              : <Typography key={index} variant='body2'>No Vehicles</Typography>}
          </TableCell>
          <TableCell>{item.supplierNotes}</TableCell>
          <TableCell>
            <Chip
              label={item.supplierIsActive ? 'Active' : 'Not Active'}
              color={item.supplierIsActive ? 'success' : 'error'}
            />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};
