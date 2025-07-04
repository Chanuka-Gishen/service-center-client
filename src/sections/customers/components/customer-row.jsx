import { Box, TableCell, TableRow, Typography } from '@mui/material';
import { CUS_TYPE_INDIVIDUAL } from 'src/constants/customer-type';
import { fDate } from 'src/utils/format-time';

export const CustomerRow = ({ data, onClickRow = null }) => {
  return (
    <>
      {data.map((item, index) => (
        <TableRow
          key={index}
          hover={onClickRow ? true : false}
          onClick={() => onClickRow(item)}
          sx={{ cursor: 'pointer' }}
        >
          <TableCell>
            {item.customerType === CUS_TYPE_INDIVIDUAL
              ? `${item.customerPrefix} ${item.customerName}`
              : item.customerName}
          </TableCell>
          <TableCell>{item.customerMobile}</TableCell>
          <TableCell>{item.customerSecondaryMobile}</TableCell>
          <TableCell align='left'>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {Array.isArray(item.customerVehicles) && item.customerVehicles.length > 0
                ? item.customerVehicles.map((v, index) => <Typography key={index}>{v.vehicleNumber}</Typography>)
                : 'No vehicles'}
            </Box>
          </TableCell>
          <TableCell>{fDate(item.createdAt)}</TableCell>
        </TableRow>
      ))}
    </>
  );
};
