import { Card, Paper } from '@mui/material';
import { CustomTable } from 'src/components/custom-table/custom-table';
import { EmpJobsRow } from './emp-jobs-row';

export const EmpJobsTab = ({ headers, jobs, jobsCount, isLoading, pagination }) => {
  return (
    <Card sx={{ mt: '10px' }}>
      <Paper elevation={0}>
        <CustomTable
          keys={headers}
          dataLength={jobs.length}
          isLoading={isLoading}
          documentCount={jobsCount}
          page={pagination.page}
          limit={pagination.limit}
          handleChangePage={pagination.handleChangePage}
          handleChangeRowsPerPage={pagination.handleChangeRowsPerPage}
          tableBody={<EmpJobsRow data={jobs} />}
        />
      </Paper>
    </Card>
  );
};
