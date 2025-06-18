import React from 'react';
import { Box, Container, Tab, Tabs, useMediaQuery, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { ManageAccountsTab } from '../components/manage-accouts-tab';
import { DeletedAccountsTab } from '../components/deleted-accounts-tab';

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

export const AccountsView = ({
  tableTitles,
  deletedTableTitles,
  selectedTab,
  selectedRow,
  searchParams,
  payments,
  deletedPayments,
  paymentsCount,
  deletedPaymentsCount,
  isOpenAdd,
  isOpenDelete,
  isOpenAddIncome,
  isLoadingPayments,
  isLoadingDeletedPayments,
  isLoadingCreateExp,
  isLoadingCreateInc,
  isLoadingDeleteManPayment,
  limit,
  page,
  deleteTbPagination,
  handleSelectRow,
  handleDeselectRow,
  handleChangeSearchParam,
  handleChangeSearchParamDate,
  handleDeleteSearchParam,
  handleSelectTab,
  handleToggleDeleteDialog,
  handleToggleAddExpenseDialog,
  handleToggleAddIncomeDialog,
  handleAddExpenseRecord,
  handleAddIncomeRecord,
  handleDeletePayment,
  handleChangePage,
  handleChangeRowsPerPage,
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Container maxWidth="xl">
      <Grid container spacing={4}>
        <Grid size={12}>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={selectedTab}
                onChange={handleSelectTab}
                aria-label="basic tabs example"
                variant="fullWidth"
              >
                <Tab label="Manage Accounts" {...a11yProps(0)} />
                <Tab label="Deleted Records" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={selectedTab} index={0}>
              <ManageAccountsTab
                tableTitles={tableTitles}
                selectedTab={selectedTab}
                selectedRow={selectedRow}
                searchParams={searchParams}
                payments={payments}
                paymentsCount={paymentsCount}
                isOpenAdd={isOpenAdd}
                isOpenDelete={isOpenDelete}
                isOpenAddIncome={isOpenAddIncome}
                isLoadingPayments={isLoadingPayments}
                isLoadingCreateExp={isLoadingCreateExp}
                isLoadingCreateInc={isLoadingCreateInc}
                isLoadingDeleteManPayment={isLoadingDeleteManPayment}
                limit={limit}
                page={page}
                handleSelectRow={handleSelectRow}
                handleDeselectRow={handleDeselectRow}
                handleChangeSearchParam={handleChangeSearchParam}
                handleChangeSearchParamDate={handleChangeSearchParamDate}
                handleDeleteSearchParam={handleDeleteSearchParam}
                handleToggleDeleteDialog={handleToggleDeleteDialog}
                handleToggleAddExpenseDialog={handleToggleAddExpenseDialog}
                handleToggleAddIncomeDialog={handleToggleAddIncomeDialog}
                handleAddExpenseRecord={handleAddExpenseRecord}
                handleAddIncomeRecord={handleAddIncomeRecord}
                handleDeletePayment={handleDeletePayment}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </CustomTabPanel>
            <CustomTabPanel value={selectedTab} index={1}>
              <DeletedAccountsTab
                payments={deletedPayments}
                pagination={deleteTbPagination}
                tableTitles={deletedTableTitles}
                paymentsCount={deletedPaymentsCount}
                isLoadingPayments={isLoadingDeletedPayments}
              />
            </CustomTabPanel>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
