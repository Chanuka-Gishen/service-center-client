import { IconButton, TableCell, TableRow } from '@mui/material';

import AddCircleIcon from '@mui/icons-material/AddCircle';

export const SelectItemsRow = ({ data, handleAddNewInventoryRow }) => {
  return (
    <>
      {data.map((item, index) => (
        <TableRow key={index} hover>
          <TableCell>{item.itemCode}</TableCell>
          <TableCell>{item.itemName}</TableCell>
          <TableCell align='right'>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                handleAddNewInventoryRow(item);
              }}
            >
              <AddCircleIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};
