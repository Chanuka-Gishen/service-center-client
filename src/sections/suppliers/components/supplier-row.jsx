import { Chip, TableCell, TableRow } from '@mui/material';
import { formatCurrency } from 'src/utils/format-number';

export const SupplierRow = ({ data, onClickRow }) => {
  return (
    <>
      {data.map((item, index) => (
        <TableRow
          key={index}
          hover={true}
          onClick={() => onClickRow(item._id)}
          sx={{ cursor: 'pointer' }}
        >
          <TableCell>{item.supplierName}</TableCell>
          <TableCell>{item.supplierContactPerson}</TableCell>
          <TableCell>{item.supplierPhone}</TableCell>
          {/* <TableCell>
            {Array.isArray(item.supplierProducts) && item.supplierProducts.length > 0 ? (
              item.supplierProducts.map((v, index) => (
                <Typography key={index} variant="body2">
                  {v.itemName}
                </Typography>
              ))
            ) : (
              <Typography key={index} variant="body2">
                No Products
              </Typography>
            )}
          </TableCell> */}
          <TableCell>{formatCurrency(item.supplierDueAmount)}</TableCell>
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
