import { Box, Button, Card, Container, Paper, Stack, Tab, Tabs, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { PendingRqstsRow } from '../components/pending-rqsts-row';
import { CustomTable } from 'src/components/custom-table/custom-table';
import { AcceptedRqstsRow } from '../components/accepted-rqsts-row';
import { RejectedRqstsRow } from '../components/rejected-rqsts-row';
import { AddLeaveRequest } from '../components/add-leave-request';
import { ProcessLeaveRequest } from '../components/process-leave-request';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      sx={{ pt: '20px' }}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </Box>
  );
}

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

export const LeavesTabView = ({
  selectedTab,
  selectedRequest,
  pendingColumns,
  approvedColumns,
  rejectedColumns,
  leaveRequests,
  leaveRqstCount,
  empSelectables,
  pendingPagination,
  processedPagination,
  rejectedPagination,
  isOpenAddRequest,
  isOpenProcessRequest,
  isLoadingLeaveRqsts,
  isLoadingEmpSelect,
  isLoadingCreateLeaveRqst,
  isLoadingProcessLeaveRqst,
  handleSelectTab,
  handleToggleAddRequest,
  handleToggleProcessRequest,
  handleAddLeaveRequest,
  handleProcessLeaveRequest,
}) => {
  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Stack direction="row" justifyContent="flex-end" alignItems="center">
          <Button variant="contained" onClick={handleToggleAddRequest}>
            Create Request
          </Button>
        </Stack>
      </Grid>
      <Grid size={12}>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={selectedTab}
              onChange={handleSelectTab}
              aria-label="leave request tabs"
              indicatorColor="secondary"
              textColor="inherit"
              variant="fullWidth"
            >
              <Tab label="Pending Requests" {...a11yProps(0)} />
              <Tab label="Processed Requests" {...a11yProps(1)} />
              <Tab label="Rejected Requests" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={selectedTab} index={0}>
            <Card>
              <Paper elevation={0}>
                <CustomTable
                  keys={pendingColumns}
                  dataLength={leaveRequests.length}
                  isLoading={isLoadingLeaveRqsts}
                  documentCount={leaveRqstCount}
                  page={pendingPagination.page}
                  limit={pendingPagination.limit}
                  handleChangePage={pendingPagination.handleChangePage}
                  handleChangeRowsPerPage={pendingPagination.handleChangeRowsPerPage}
                  tableBody={
                    <PendingRqstsRow
                      data={leaveRequests}
                      selectedRequest={selectedRequest}
                      onClickRow={handleToggleProcessRequest}
                    />
                  }
                />
              </Paper>
            </Card>
          </CustomTabPanel>
          <CustomTabPanel value={selectedTab} index={1}>
            <Card>
              <Paper elevation={0}>
                <CustomTable
                  keys={approvedColumns}
                  dataLength={leaveRequests.length}
                  isLoading={isLoadingLeaveRqsts}
                  documentCount={leaveRqstCount}
                  page={processedPagination.page}
                  limit={processedPagination.limit}
                  handleChangePage={processedPagination.handleChangePage}
                  handleChangeRowsPerPage={processedPagination.handleChangeRowsPerPage}
                  tableBody={<AcceptedRqstsRow data={leaveRequests} />}
                />
              </Paper>
            </Card>
          </CustomTabPanel>
          <CustomTabPanel value={selectedTab} index={2}>
            <Card>
              <Paper elevation={0}>
                <CustomTable
                  keys={rejectedColumns}
                  dataLength={leaveRequests.length}
                  isLoading={isLoadingLeaveRqsts}
                  documentCount={leaveRqstCount}
                  page={rejectedPagination.page}
                  limit={rejectedPagination.limit}
                  handleChangePage={rejectedPagination.handleChangePage}
                  handleChangeRowsPerPage={rejectedPagination.handleChangeRowsPerPage}
                  tableBody={<RejectedRqstsRow data={leaveRequests} />}
                />
              </Paper>
            </Card>
          </CustomTabPanel>
        </Box>
      </Grid>
      {isOpenAddRequest && (
        <AddLeaveRequest
          open={isOpenAddRequest}
          employees={empSelectables}
          handleOpenClose={handleToggleAddRequest}
          isLoadingEmps={isLoadingEmpSelect}
          isLoading={isLoadingCreateLeaveRqst}
          handleConfirm={handleAddLeaveRequest}
        />
      )}
      {isOpenProcessRequest && (
        <ProcessLeaveRequest
          open={isOpenProcessRequest}
          handleOpenClose={handleToggleProcessRequest}
          isLoading={isLoadingProcessLeaveRqst}
          handleConfirm={handleProcessLeaveRequest}
        />
      )}
    </Grid>
  );
};
