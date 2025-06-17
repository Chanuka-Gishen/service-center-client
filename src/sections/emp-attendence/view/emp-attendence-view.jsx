import { Button, Card, Container, Paper, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { CustomTable } from 'src/components/custom-table/custom-table';
import { EmpAttendenceRow } from '../components/emp-attendence-row';
import { EmpAttendenceDialog } from '../components/emp-attendence-dialog';

export const EmpAttendenceView = ({
  tableHeaders,
  pagination,
  attendences,
  attendenceCount,
  isOpenUploadDlg,
  selectedFile,
  isLoadingAttendences,
  isLoadingAddAttendences,
  fetchEmpAttendences,
  handleToggleUploadDialog,
  handleSelectFile,
  handleAddAttendenceRecords,
}) => {
  return (
    <Container>
      <Grid container spacing={4}>
        <Grid size={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h4">Manage Attendence</Typography>
            <Button variant="contained" onClick={handleToggleUploadDialog}>
              Add Records
            </Button>
          </Stack>
        </Grid>
        <Grid size={12}>
          <Card>
            <Paper elevation={0}>
              <CustomTable
                keys={tableHeaders}
                isLoading={isLoadingAttendences}
                dataLength={attendences.length}
                documentCount={attendenceCount}
                limit={pagination.limit}
                page={pagination.page}
                handleChangePage={pagination.handleChangePage}
                handleChangeRowsPerPage={pagination.handleChangeRowsPerPage}
                tableBody={<EmpAttendenceRow data={attendences} />}
              />
            </Paper>
          </Card>
        </Grid>
      </Grid>
      {isOpenUploadDlg && (
        <EmpAttendenceDialog
          open={isOpenUploadDlg}
          handleOpenClose={handleToggleUploadDialog}
          selectedFile={selectedFile}
          handleFileChange={handleSelectFile}
          handleUpload={handleAddAttendenceRecords}
          isLoading={isLoadingAddAttendences}
        />
      )}
    </Container>
  );
};
