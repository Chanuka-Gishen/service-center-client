import {
  alpha,
  Button,
  Card,
  Chip,
  Container,
  FormControl,
  Menu,
  MenuItem,
  Paper,
  Stack,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { DatePicker } from '@mui/x-date-pickers';

import UploadFileIcon from '@mui/icons-material/UploadFile';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { CustomTable } from 'src/components/custom-table/custom-table';
import { EmpAttendenceRow } from '../components/emp-attendence-row';
import { EmpAttendenceDialog } from '../components/emp-attendence-dialog';

import { fDate } from 'src/utils/format-time';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: 'rgb(55, 65, 81)',
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
      },
    },
    ...theme.applyStyles('dark', {
      color: theme.palette.grey[300],
    }),
  },
}));

export const EmpAttendenceView = ({
  tableHeaders,
  pagination,
  searchParams,
  anchorEl,
  attendences,
  openOptions,
  attendenceCount,
  isOpenUploadDlg,
  isOpenAddDlg,
  selectedFile,
  isLoadingAttendences,
  isLoadingAddAttendences,
  fetchEmpAttendences,
  handleChangeSearchParam,
  handleChangeSearchParamDate,
  handleDeleteSearchParam,
  handleClickOptions,
  handleCloseOptions,
  handleToggleUploadDialog,
  handleToggleAddDialog,
  handleSelectFile,
  handleAddAttendenceRecords,
}) => {
  return (
    <Container>
      <Grid container spacing={4}>
        <Grid size={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h4">Manage Attendence</Typography>
            {/* <Button variant="contained" onClick={handleToggleUploadDialog}>
              Add Records
            </Button> */}
            <Button
              id="demo-customized-button"
              aria-controls={openOptions ? 'demo-customized-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={openOptions ? 'true' : undefined}
              variant="contained"
              disableElevation
              onClick={handleClickOptions}
              endIcon={<KeyboardArrowDownIcon />}
            >
              Options
            </Button>
            <StyledMenu
              id="demo-customized-menu"
              slotProps={{
                list: {
                  'aria-labelledby': 'demo-customized-button',
                },
              }}
              anchorEl={anchorEl}
              open={openOptions}
              onClose={handleCloseOptions}
            >
              <MenuItem onClick={handleToggleAddDialog} disableRipple>
                <AddCircleIcon />
                Add Attendence
              </MenuItem>
              <MenuItem onClick={handleToggleUploadDialog} disableRipple>
                <UploadFileIcon />
                Upload Records
              </MenuItem>
            </StyledMenu>
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
