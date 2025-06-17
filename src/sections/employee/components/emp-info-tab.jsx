import { Button, Stack, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import commonUtil from 'src/utils/common-util';
import { formatCurrency } from 'src/utils/format-number';
import { fDate } from 'src/utils/format-time';
import { EmpUpdateDialog } from './emp-update-dialog';
import useAuthStore from 'src/store/auth-store';
import { USER_ROLE } from 'src/constants/user-role';

export const EmpInfoTab = ({
  employee,
  isOpenUpdateDlg,
  isLoadingEmp,
  isLoadingUpdateEmp,
  handleToggleUpdateDlg,
  handleUpdateEmpInfo,
}) => {
  const { auth } = useAuthStore();
  return (
    <Grid container>
      {auth.user.userRole === USER_ROLE.SUPER_ADMIN && (
        <Grid size={12}>
          <Stack direction="row" justifyContent="flex-end" alignItems="center" sx={{ mt: '10px' }}>
            <Button variant="contained" onClick={handleToggleUpdateDlg}>
              Update Info
            </Button>
          </Stack>
        </Grid>
      )}

      <Grid size={{ xs: 12, md: 6 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell colSpan={2} variant="th">
                <Typography variant="h4">Personal Infomation</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>{isLoadingEmp ? 'Loading...' : employee?.empFullName}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Date Of Birth</TableCell>
              <TableCell>{isLoadingEmp ? 'Loading...' : fDate(employee?.empDob)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>NIC Number</TableCell>
              <TableCell>{isLoadingEmp ? 'Loading...' : employee?.empNic}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Gender</TableCell>
              <TableCell>{isLoadingEmp ? 'Loading...' : employee?.empGender}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Martial Status</TableCell>
              <TableCell>{isLoadingEmp ? 'Loading...' : employee?.empMaritalStatus}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2} variant="th">
                <Typography variant="h4">Contact Infomation</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>
                {isLoadingEmp ? (
                  'Loading...'
                ) : commonUtil.stringIsEmptyOrSpaces(employee?.empEmail) ? (
                  <i>Not Provided</i>
                ) : (
                  employee?.empEmail
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Mobile Number</TableCell>
              <TableCell>{isLoadingEmp ? 'Loading...' : employee?.empPhone}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Address</TableCell>
              <TableCell>
                {isLoadingEmp
                  ? 'Loading...'
                  : `${employee?.empAddress.street}, ${employee?.empAddress.city}, ${employee?.empAddress.country}`}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2} variant="th">
                <Typography variant="h4">Emergency Contact Infomation</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>
                {isLoadingEmp ? (
                  'Loading...'
                ) : commonUtil.stringIsEmptyOrSpaces(employee?.empEmergencyContact.name) ? (
                  <i>Not Provided</i>
                ) : (
                  employee?.empEmergencyContact.name
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Relationship</TableCell>
              <TableCell>
                {isLoadingEmp ? (
                  'Loading...'
                ) : commonUtil.stringIsEmptyOrSpaces(employee?.empEmergencyContact.relationship) ? (
                  <i>Not Provided</i>
                ) : (
                  employee?.empEmergencyContact.relationship
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Phone Number</TableCell>
              <TableCell>
                {isLoadingEmp ? (
                  'Loading...'
                ) : commonUtil.stringIsEmptyOrSpaces(employee?.empEmergencyContact.phone) ? (
                  <i>Not Provided</i>
                ) : (
                  employee?.empEmergencyContact.phone
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell colSpan={2} variant="th">
                <Typography variant="h4">Employment Details</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Employee ID</TableCell>
              <TableCell>{isLoadingEmp ? 'Loading...' : employee?.empId}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Job Title</TableCell>
              <TableCell>{isLoadingEmp ? 'Loading...' : employee?.empJobTitle}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Job Role</TableCell>
              <TableCell>{isLoadingEmp ? 'Loading...' : employee?.empRole}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Employment Type</TableCell>
              <TableCell>{isLoadingEmp ? 'Loading...' : employee?.empEmploymentType}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Hired Date</TableCell>
              <TableCell>{isLoadingEmp ? 'Loading...' : fDate(employee?.empHireDate)}</TableCell>
            </TableRow>
            {employee?.empTerminationDate && (
              <TableRow>
                <TableCell>Termination Date</TableCell>
                <TableCell>
                  {isLoadingEmp ? 'Loading...' : fDate(employee?.empTerminationDate)}
                </TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableCell colSpan={2} variant="th">
                <Typography variant="h4">Compensation</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Basic Sallary</TableCell>
              <TableCell>
                {isLoadingEmp ? 'Loading...' : formatCurrency(employee?.empSalary)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Salary Frequency</TableCell>
              <TableCell>{isLoadingEmp ? 'Loading...' : employee?.empPayFrequency}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Salary Frequency</TableCell>
              <TableCell>{isLoadingEmp ? 'Loading...' : employee?.empPayFrequency}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2} variant="th">
                <Typography variant="h4">Leave Limits (Monthly)</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Vacation</TableCell>
              <TableCell>
                {isLoadingEmp ? 'Loading...' : employee?.empLeaveBalance.vacation}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Sick</TableCell>
              <TableCell>{isLoadingEmp ? 'Loading...' : employee?.empLeaveBalance.sick}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Personal</TableCell>
              <TableCell>
                {isLoadingEmp ? 'Loading...' : employee?.empLeaveBalance.personal}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2} variant="th">
                <Typography variant="h4">Bank Account Details</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Bank Name</TableCell>
              <TableCell>
                {isLoadingEmp ? (
                  'Loading...'
                ) : commonUtil.stringIsEmptyOrSpaces(employee?.empBankDetails.bankName) ? (
                  <i>Not Provided</i>
                ) : (
                  employee?.empBankDetails.bankName
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Branch</TableCell>
              <TableCell>
                {isLoadingEmp ? (
                  'Loading...'
                ) : commonUtil.stringIsEmptyOrSpaces(employee?.empBankDetails.branch) ? (
                  <i>Not Provided</i>
                ) : (
                  employee?.empBankDetails.branch
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Account Number</TableCell>
              <TableCell>
                {isLoadingEmp ? (
                  'Loading...'
                ) : commonUtil.stringIsEmptyOrSpaces(employee?.empBankDetails.accountNumber) ? (
                  <i>Not Provided</i>
                ) : (
                  employee?.empBankDetails.accountNumber
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Account Type</TableCell>
              <TableCell>
                {isLoadingEmp ? (
                  'Loading...'
                ) : commonUtil.stringIsEmptyOrSpaces(employee?.empBankDetails.accountType) ? (
                  <i>Not Provided</i>
                ) : (
                  employee?.empBankDetails.accountType
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Grid>
      {isOpenUpdateDlg && (
        <EmpUpdateDialog
          open={isOpenUpdateDlg}
          data={employee}
          handleOpenClose={handleToggleUpdateDlg}
          isLoading={isLoadingUpdateEmp}
          handleConfirm={handleUpdateEmpInfo}
        />
      )}
    </Grid>
  );
};
