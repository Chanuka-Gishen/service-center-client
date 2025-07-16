import { TableCell, TableRow } from '@mui/material';
import { fDate } from 'src/utils/format-time';

export const PendingRqstsRow = ({ data, selectedRequest, onClickRow }) => {
  return (
    <>
      {data.map((item, index) => (
        <TableRow
          key={index}
          hover={true}
          selected={selectedRequest?._id === item._id}
          onClick={() => onClickRow(item)}
          sx={{ cursor: 'pointer' }}
        >
          <TableCell>{item.leaveRequestEmp.empFullName}</TableCell>
          <TableCell>{item.leaveRequestEmp.empId}</TableCell>
          <TableCell>{fDate(item.leaveRequestStartDate)}</TableCell>
          <TableCell>{fDate(item.leaveRequestEndDate)}</TableCell>
          <TableCell>{item.leaveRequestType}</TableCell>
          <TableCell>{item.leaveRequestHalfDayPeriod}</TableCell>
          <TableCell>{item.leaveRequestNoOfDays}</TableCell>
          <TableCell>{item.leaveRequestReason}</TableCell>
          <TableCell>{`${item.leaveRequestCreatedBy.userFirstName} ${item.leaveRequestCreatedBy.userLastName}`}</TableCell>
          <TableCell>{fDate(item.createdAt)}</TableCell>
        </TableRow>
      ))}
    </>
  );
};
