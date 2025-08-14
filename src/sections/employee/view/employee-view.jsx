import { Box, Breadcrumbs, Chip, Container, emphasize, styled, Tab, Tabs } from '@mui/material';
import Grid from '@mui/material/Grid2';

import HomeIcon from '@mui/icons-material/Home';

import { NAVIGATION_ROUTES } from 'src/routes/navigation-routes';
import { EmpInfoTab } from '../components/emp-info-tab';
import { EmpJobsTab } from '../components/emp-jobs-tab';
import { EmpAttendenceTab } from '../components/emp-attendence-tab';
import { EmpPayrollTab } from '../components/emp-payroll-tab';

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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

export const EmployeeView = ({
  empId,
  jobHeaders,
  attHeaders,
  employee,
  empJobs,
  empAttendences,
  empJobsCount,
  empAttCount,
  selectedTab,
  jobsPagination,
  attPagination,
  isOpenUpdateDlg,
  isLoadingEmp,
  isLoadingEmpJobs,
  isLoadingEmpAtt,
  isLoadingUpdateEmp,
  handleOnClickBreadCrumb,
  handleSelectTab,
  handleToggleUpdateDlg,
  handleUpdateEmpInfo,
}) => {
  return (
    <Container>
      <Grid container spacing={4}>
        <Grid size={12}>
          <Breadcrumbs aria-label="breadcrumb">
            <StyledBreadcrumb
              onClick={() => handleOnClickBreadCrumb(NAVIGATION_ROUTES.employees.base)}
              label="Employees"
              icon={<HomeIcon fontSize="small" />}
            />
            <StyledBreadcrumb
              component="a"
              href="#"
              disabled
              label={isLoadingEmp ? 'Loading...' : employee.empFullName}
            />
          </Breadcrumbs>
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
                <Tab label="Employee Information" {...a11yProps(0)} />
                <Tab label="Assigned Jobs" {...a11yProps(1)} />
                <Tab label="Attendence" {...a11yProps(2)} />
                <Tab label="Payroll Management" {...a11yProps(3)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={selectedTab} index={0}>
              <EmpInfoTab
                employee={employee}
                isOpenUpdateDlg={isOpenUpdateDlg}
                isLoadingUpdateEmp={isLoadingUpdateEmp}
                isLoadingEmp={isLoadingEmp}
                handleToggleUpdateDlg={handleToggleUpdateDlg}
                handleUpdateEmpInfo={handleUpdateEmpInfo}
              />
            </CustomTabPanel>
            <CustomTabPanel value={selectedTab} index={1}>
              <EmpJobsTab
                headers={jobHeaders}
                jobs={empJobs}
                jobsCount={empJobsCount}
                pagination={jobsPagination}
                isLoading={isLoadingEmpJobs}
              />
            </CustomTabPanel>
            <CustomTabPanel value={selectedTab} index={2}>
              <EmpAttendenceTab
                data={empAttendences}
                isLoading={isLoadingEmpAtt}
                dataCount={empAttCount}
                headers={attHeaders}
                pagination={attPagination}
              />
            </CustomTabPanel>
            <CustomTabPanel value={selectedTab} index={3}>
              <EmpPayrollTab id={empId} />
            </CustomTabPanel>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
