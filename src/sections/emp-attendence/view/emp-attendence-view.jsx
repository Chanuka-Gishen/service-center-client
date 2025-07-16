import { Box, Container, Tab, Tabs, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

import PendingIcon from '@mui/icons-material/Pending';

import { AttendenceTab } from '../components/attendence-tab';
import { LeavesTab } from '../components/leaves-tab';
import StatCard from 'src/components/stat-card';

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

export const EmpAttendenceView = ({ selectedTab, handleSelectTab }) => {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Typography variant="h4">Manage Attendence</Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <StatCard
            title={'Pending Leave Requests'}
            isLoading={false}
            value={0}
            type="Number"
            icon={<PendingIcon color="info" fontSize="large" />}
          />
        </Grid>
        <Grid size={12}>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={selectedTab}
                onChange={handleSelectTab}
                aria-label="basic tabs example"
                variant="fullWidth"
              >
                <Tab label="Attendance Records" {...a11yProps(0)} />
                <Tab label="Leave Requests" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={selectedTab} index={0}>
              <AttendenceTab />
            </CustomTabPanel>
            <CustomTabPanel value={selectedTab} index={1}>
              <LeavesTab />
            </CustomTabPanel>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
