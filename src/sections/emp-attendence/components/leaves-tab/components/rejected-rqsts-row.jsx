import { TableCell, TableRow } from '@mui/material';
import { fDate } from 'src/utils/format-time';

export const RejectedRqstsRow = ({ data }) => {
  return (
    <>
      {data.map((item, index) => (
        <TableRow key={index} hover={false} sx={{ cursor: 'pointer' }}>
          <TableCell>{item.leaveRequestEmp.empFullName}</TableCell>
          <TableCell>{item.leaveRequestEmp.empId}</TableCell>
          <TableCell>{fDate(item.leaveRequestStartDate)}</TableCell>
          <TableCell>{fDate(item.leaveRequestEndDate)}</TableCell>
          <TableCell>{item.leaveRequestType}</TableCell>
          <TableCell>{item.leaveRequestHalfDayPeriod}</TableCell>
          <TableCell>{item.leaveRequestNoOfDays}</TableCell>
          <TableCell>{item.leaveRequestReason}</TableCell>
          <TableCell>{`${item.leaveRequestCreatedBy.userFirstName} ${item.leaveRequestCreatedBy.userLastName}`}</TableCell>
          <TableCell>{`${item.leaveRequestApprovedBy.userFirstName} ${item.leaveRequestApprovedBy.userLastName}`}</TableCell>
          <TableCell>{item.leaveRequestRejectionReason}</TableCell>
          <TableCell>{fDate(item.createdAt)}</TableCell>
          <TableCell>{fDate(item.leaveRequestApprovedAt)}</TableCell>
        </TableRow>
      ))}
    </>
  );
};
