import { Box, Card, Paper } from '@mui/material';
import { PayrollRow } from './payroll-row';
import { CustomTable } from 'src/components/custom-table/custom-table';

const tableHeaders = [
  'Month',
  'Start Date',
  'To Date',
  'Total Employees',
  'Total',
  'Total Bonuses',
  'Total Deductions',
  'Generated At',
];

export const PayrollTab = ({ data, dataCount, isLoading, pagination, handleOnClickRow }) => {
  return (
    <Box sx={{ mt: '20px' }}>
      <Card>
        <Paper elevation={0}>
          <CustomTable
            keys={tableHeaders}
            dataLength={data.length}
            isLoading={isLoading}
            documentCount={dataCount}
            page={pagination.page}
            limit={pagination.limit}
            handleChangePage={pagination.handleChangePage}
            handleChangeRowsPerPage={pagination.handleChangeRowsPerPage}
            tableBody={<PayrollRow data={data} onClickRow={handleOnClickRow} />}
          />
        </Paper>
      </Card>
    </Box>
  );
};
