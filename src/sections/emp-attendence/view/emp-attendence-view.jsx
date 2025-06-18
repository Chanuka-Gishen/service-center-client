import {
  Button,
  Card,
  Chip,
  Container,
  FormControl,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { CustomTable } from 'src/components/custom-table/custom-table';
import { EmpAttendenceRow } from '../components/emp-attendence-row';
import { EmpAttendenceDialog } from '../components/emp-attendence-dialog';
import { DatePicker } from '@mui/x-date-pickers';
import { fDate } from 'src/utils/format-time';

export const EmpAttendenceView = ({
  tableHeaders,
  pagination,
  searchParams,
  attendences,
  attendenceCount,
  isOpenUploadDlg,
  selectedFile,
  isLoadingAttendences,
  isLoadingAddAttendences,
  fetchEmpAttendences,
  handleChangeSearchParam,
  handleChangeSearchParamDate,
  handleDeleteSearchParam,
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
        <Grid size={{ sm: 12, md: 3 }}>
          <TextField
            label="Employee Name"
            value={searchParams.name}
            name="name"
            onChange={handleChangeSearchParam}
            autoComplete="off"
            fullWidth
          />
        </Grid>
        <Grid size={{ sm: 12, md: 3 }}>
          <TextField
            label="Employee ID"
            value={searchParams.empId}
            name="empId"
            onChange={handleChangeSearchParam}
            autoComplete="off"
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <FormControl required fullWidth>
            <DatePicker
              maxDate={new Date()}
              slotProps={{
                textField: {
                  //disabled: true,
                },
                field: { clearable: true },
              }}
              views={['month', 'year']}
              label="Date"
              name="date"
              value={searchParams.date}
              onChange={(date) => handleChangeSearchParamDate(date)}
            />
          </FormControl>
        </Grid>
        {(searchParams.name || searchParams.empId || searchParams.date) && (
          <Grid size={12}>
            <Stack direction="row" spacing={2} flexWrap="wrap">
              {searchParams.empId && (
                <Chip
                  label={searchParams.empId}
                  onDelete={() => handleDeleteSearchParam('empId')}
                />
              )}
              {searchParams.name && (
                <Chip label={searchParams.name} onDelete={() => handleDeleteSearchParam('name')} />
              )}
              {searchParams.date && (
                <Chip
                  label={fDate(searchParams.date, 'MMMM-yyyy')}
                  onDelete={() => handleDeleteSearchParam('date')}
                />
              )}
            </Stack>
          </Grid>
        )}
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
