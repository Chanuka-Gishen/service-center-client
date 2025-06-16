import { Card, Paper } from '@mui/material';
import { CustomTable } from 'src/components/custom-table/custom-table';
import { EmpAttendenceRow } from './emp-attendence-row';

export const EmpAttendenceTab = ({ headers, data, dataCount, isLoading, pagination }) => {
  return (
    <Card sx={{ mt: '10px' }}>
      <Paper elevation={0}>
        <CustomTable
          keys={headers}
          dataLength={data.length}
          isLoading={isLoading}
          documentCount={dataCount}
          page={pagination.page}
          limit={pagination.limit}
          handleChangePage={pagination.handleChangePage}
          handleChangeRowsPerPage={pagination.handleChangeRowsPerPage}
          tableBody={<EmpAttendenceRow data={data} />}
        />
      </Paper>
    </Card>
  );
};
