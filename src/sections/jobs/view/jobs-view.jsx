import React from 'react';
import { Card, Container, Paper, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { CustomTable } from 'src/components/custom-table/custom-table';
import { JobRow } from '../components/job-row';

export const JobsView = ({
  tableTitles,
  jobs,
  jobsCount,
  isLoadingJobs,
  handleOnRowClick,
  limit,
  page,
  handleChangePage,
  handleChangeRowsPerPage,
}) => {
  return (
    <Container>
      <Grid container spacing={4}>
        <Grid size={{ sm: 12, md: 12, lg: 12 }}>
          <Typography variant="h4">Work History</Typography>
        </Grid>
        <Grid size={{ sm: 12, md: 12, lg: 12 }}>
          <Card>
            <Paper elevation={0}>
              <CustomTable
                keys={tableTitles}
                dataLength={jobs.length}
                isLoading={isLoadingJobs}
                documentCount={jobsCount}
                page={page}
                limit={limit}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                tableBody={<JobRow data={jobs} onClickRow={handleOnRowClick} />}
              />
            </Paper>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};
