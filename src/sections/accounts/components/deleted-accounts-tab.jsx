import { Card, Container, Paper } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { CustomTable } from 'src/components/custom-table/custom-table';
import { DeletedAccountsRow } from './deleted-accounts-row';

export const DeletedAccountsTab = ({
  tableTitles,
  payments,
  paymentsCount,
  pagination,
  isLoadingPayments,
}) => {
  return (
    <Container maxWidth="xl" sx={{ mt: '10px' }}>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Card>
            <Paper elevation={0}>
              <CustomTable
                keys={tableTitles}
                dataLength={payments.length}
                isLoading={isLoadingPayments}
                documentCount={paymentsCount}
                page={pagination.page}
                limit={pagination.limit}
                handleChangePage={pagination.handleChangePage}
                handleChangeRowsPerPage={pagination.handleChangeRowsPerPage}
                tableBody={<DeletedAccountsRow data={payments} />}
              />
            </Paper>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};
