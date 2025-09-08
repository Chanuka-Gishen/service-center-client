import { Box, Button, Container, Stack, Tab, Tabs, Typography } from '@mui/material';
import { PayrollTab } from '../components/payroll-tab';
import { PayrollGenerateDialog } from '../components/payroll-generate-dialog';

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

export const PayrollView = ({
  selectedTab,
  empSelection,
  handleSelectTab,
  pagination,
  isOpenPayrollDialog,
  isLoadingEmpSelect,
  handleTogglePayrollDialog,
  handleGeneratePayroll,
}) => {
  return (
    <Container sx={{ mt: '20px' }}>
      <Stack spacing={4}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h5">Payroll Management</Typography>
          <Button variant="outlined" onClick={handleTogglePayrollDialog}>
            Generate Payroll
          </Button>
        </Stack>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={selectedTab}
              onChange={handleSelectTab}
              aria-label="payroll tabs"
              variant="fullWidth"
            >
              <Tab label="Pending Records" {...a11yProps(0)} />
              <Tab label="Processed Records" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={selectedTab} index={0}>
            <PayrollTab
              data={[]}
              dataCount={0}
              isLoading={false}
              pagination={pagination}
              handleOnClickRow={null}
            />
          </CustomTabPanel>
          <CustomTabPanel value={selectedTab} index={1}>
            <PayrollTab
              data={[]}
              dataCount={0}
              isLoading={false}
              pagination={pagination}
              handleOnClickRow={null}
            />
          </CustomTabPanel>
        </Box>
      </Stack>
      {isOpenPayrollDialog && (
        <PayrollGenerateDialog
          open={isOpenPayrollDialog}
          empSelection={empSelection}
          handleOpenClose={handleTogglePayrollDialog}
          handleConfirm={handleGeneratePayroll}
          isLoading={false}
          isLoadingEmpSelect={isLoadingEmpSelect}
        />
      )}
    </Container>
  );
};
