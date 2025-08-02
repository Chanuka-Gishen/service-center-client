import React from 'react';
import {
  alpha,
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Card,
  Container,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PaymentIcon from '@mui/icons-material/Payment';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import EngineeringIcon from '@mui/icons-material/Engineering';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { NAVIGATION_ROUTES } from 'src/routes/navigation-routes';
import { fDate } from 'src/utils/format-time';
import { CreateWorkOrderDialog } from '../components/create-workorder-dialog';
import { CUS_TYPE_INDIVIDUAL } from 'src/constants/customer-type';
import { VEHICLE_TYPE_PETROL } from 'src/constants/vehicle-type';
import useAuthStore from 'src/store/auth-store';
import { USER_ROLE } from 'src/constants/user-role';
import { UpdateCustomerDialog } from '../components/update-customer-dialog';
import { VehicleFormDialog } from '../components/vehicle-form-dialog';
import { CustomTable } from 'src/components/custom-table/custom-table';
import { CustomerJobRow } from '../components/customer-job-row';
import StatCard from 'src/components/stat-card';
import ConfirmationDialog from 'src/components/confirmation-dialog/confirmation-dialog';
import { NotificationsRow } from '../components/notifications-row';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: 'rgb(55, 65, 81)',
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
      },
    },
    ...theme.applyStyles('dark', {
      color: theme.palette.grey[300],
    }),
  },
}));

export const CustomerDetailsView = ({
  tableColumns,
  notificationTableColumns,
  data,
  customerJobs,
  customerJobsCount,
  customerSmsLogs,
  customerSmsLogsCount,
  customerPaymentStats,
  selectedVehicle,
  customerInitialValues,
  vehicleInitialValues,
  workorderPagination,
  notificationsPagination,
  isOpenCreate,
  isOpenUpdateCustomer,
  isOpenAddVehicle,
  isOpenUpdateVehicle,
  isOpenSendRemainder,
  isLoading,
  isLoadingCustomerJobs,
  isLoadingCustomerPayStats,
  isLoadingCreate,
  isLoadingUpdate,
  isLoadingUpdateVehicle,
  isLoadingAddVehicle,
  isLoadingSendPaymentRemainder,
  isLoadingCustomerSmsLogs,
  handleToggleWorkOrderCreateDialog,
  handleToggleUpdateCustomerDialog,
  handleToggleAddVehicleDialog,
  handleToggleUpdateVehicleDialog,
  handleToggleSendRemainderDialog,
  handleCreateWorkOrder,
  handleUpdateCustomer,
  handleAddVehicle,
  handleUpdateVehicle,
  handleSendInvoiceRemainder,
  optionsAnchorEl,
  isOpenOptions,
  handleClickOptions,
  handleCloseOptions,
}) => {
  const { auth } = useAuthStore.getState();
  return (
    <Container maxWidth="xl">
      <Grid container rowSpacing={4} columnSpacing={2}>
        <Grid size={{ xs: 12, sm: 4, md: 6 }}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href={NAVIGATION_ROUTES.customers.base}>
              Customers
            </Link>
            <Typography sx={{ color: 'text.primary' }}>
              {isLoading ? 'Loading...' : (data.customerName ?? ' - ')}
            </Typography>
          </Breadcrumbs>
        </Grid>
        {auth.user.userRole === USER_ROLE.SUPER_ADMIN && (
          <Grid size={{ xs: 6, sm: 3, md: 2, lg: 2 }}>
            <Button fullWidth variant="contained" onClick={handleToggleUpdateCustomerDialog}>
              Edit Customer
            </Button>
          </Grid>
        )}

        {auth.user.userRole === USER_ROLE.SUPER_ADMIN && (
          <Grid size={{ xs: 6, sm: 3, md: 2, lg: 2 }}>
            <Button fullWidth variant="contained" onClick={handleToggleSendRemainderDialog}>
              Invoice Remainder
            </Button>
          </Grid>
        )}

        <Grid size={{ xs: 6, sm: 3, md: 2, lg: 2 }}>
          <Button fullWidth variant="contained" onClick={handleToggleAddVehicleDialog}>
            Add Vehicle
          </Button>
        </Grid>
        <Grid size={12}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6, md: 4, xl: 3 }}>
              <StatCard
                title="Revenue Generated"
                isLoading={isLoadingCustomerPayStats}
                value={customerPaymentStats ? customerPaymentStats.totalRevenue : 0.0}
                icon={<AttachMoneyIcon color="success" fontSize="large" />}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, xl: 3 }}>
              <StatCard
                title="Receivables"
                isLoading={isLoadingCustomerPayStats}
                value={customerPaymentStats ? customerPaymentStats.totalReceivable : 0.0}
                icon={<PaymentIcon color="info" fontSize="large" />}
              />
            </Grid>
          </Grid>
        </Grid>
        {data != null && (
          <>
            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 5 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 2 }}>
                <Typography variant="h5">Customer Details</Typography>
                <TableContainer>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell variant="head">Customer Name</TableCell>
                        <TableCell>{data.customerName}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell variant="head">Customer Type</TableCell>
                        <TableCell>{data.customerType ?? CUS_TYPE_INDIVIDUAL}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell variant="head">Customer Mobile</TableCell>
                        <TableCell>{data.customerMobile}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell variant="head">Customer Secondary Mobile</TableCell>
                        <TableCell>{data.customerSecondaryMobile}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell variant="head">Customer Email</TableCell>
                        <TableCell>{data.customerEmail ?? ' - '}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell variant="head">Customer Since</TableCell>
                        <TableCell>{fDate(data.createdAt)}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 3 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 2 }}>
                <Typography variant="h5">Customer Vehicles</Typography>

                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                  {data.customerVehicles.map((item, index) => (
                    <ListItem
                      key={index}
                      secondaryAction={
                        <>
                          <IconButton
                            aria-label="options"
                            id="demo-customized-button"
                            aria-controls={isOpenOptions ? 'demo-customized-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={isOpenOptions ? 'true' : undefined}
                            onClick={(e) => handleClickOptions(e, item)}
                          >
                            <MoreVertIcon />
                          </IconButton>
                          <StyledMenu
                            id="demo-customized-menu"
                            anchorEl={optionsAnchorEl}
                            open={isOpenOptions && selectedVehicle._id === item._id}
                            onClose={handleCloseOptions}
                          >
                            {auth.user.userRole === USER_ROLE.SUPER_ADMIN && (
                              <MenuItem onClick={handleToggleUpdateVehicleDialog} disableRipple>
                                <EditIcon />
                                Update Vehicle
                              </MenuItem>
                            )}

                            <MenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                handleToggleWorkOrderCreateDialog(item);
                              }}
                              disableRipple
                            >
                              <EngineeringIcon />
                              Create Workorder
                            </MenuItem>
                          </StyledMenu>
                        </>
                      }
                    >
                      <ListItemAvatar>
                        <Avatar>
                          <DirectionsCarFilledIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.vehicleNumber}
                        secondary={`${item.vehicleManufacturer} - ${item.vehicleModel} - ${item.vehicleType ?? VEHICLE_TYPE_PETROL}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Grid>
          </>
        )}
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 2 }}>
            <Typography variant="h5">Notifications/Remainders</Typography>
            <Card>
              <Paper elevation={0}>
                <CustomTable
                  keys={notificationTableColumns}
                  dataLength={customerSmsLogs.length}
                  isLoading={isLoadingCustomerSmsLogs}
                  documentCount={customerSmsLogsCount}
                  page={notificationsPagination.page}
                  limit={notificationsPagination.limit}
                  handleChangePage={notificationsPagination.handleChangePage}
                  handleChangeRowsPerPage={notificationsPagination.handleChangeRowsPerPage}
                  tableBody={<NotificationsRow data={customerSmsLogs} />}
                  enableAction={true}
                />
              </Paper>
            </Card>
          </Box>
        </Grid>
        <Grid size={12}>
          <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 2 }}>
            <Typography variant="h5">Customer Workorder history</Typography>
            <Card>
              <Paper elevation={0}>
                <CustomTable
                  keys={tableColumns}
                  dataLength={customerJobs.length}
                  isLoading={isLoadingCustomerJobs}
                  documentCount={customerJobsCount}
                  page={workorderPagination.page}
                  limit={workorderPagination.limit}
                  handleChangePage={workorderPagination.handleChangePage}
                  handleChangeRowsPerPage={workorderPagination.handleChangeRowsPerPage}
                  tableBody={<CustomerJobRow data={customerJobs} />}
                />
              </Paper>
            </Card>
          </Box>
        </Grid>
      </Grid>
      {isOpenCreate && selectedVehicle && (
        <CreateWorkOrderDialog
          open={isOpenCreate}
          data={selectedVehicle}
          handleOpenClose={handleToggleWorkOrderCreateDialog}
          isLoading={isLoadingCreate}
          handleConfirm={handleCreateWorkOrder}
        />
      )}
      {isOpenUpdateCustomer && (
        <UpdateCustomerDialog
          open={isOpenUpdateCustomer}
          initialValues={customerInitialValues}
          handleOpenClose={handleToggleUpdateCustomerDialog}
          isLoading={isLoadingUpdate}
          handleConfirm={handleUpdateCustomer}
        />
      )}
      {isOpenAddVehicle && (
        <VehicleFormDialog
          isAdd={true}
          open={isOpenAddVehicle}
          initialValues={vehicleInitialValues}
          handleOpenClose={handleToggleAddVehicleDialog}
          isLoading={isLoadingAddVehicle}
          handleConfirm={handleAddVehicle}
        />
      )}
      {isOpenUpdateVehicle && (
        <VehicleFormDialog
          isAdd={false}
          open={isOpenUpdateVehicle}
          initialValues={vehicleInitialValues}
          handleOpenClose={handleToggleUpdateVehicleDialog}
          isLoading={isLoadingUpdateVehicle}
          handleConfirm={handleUpdateVehicle}
        />
      )}
      {isOpenSendRemainder && (
        <ConfirmationDialog
          open={isOpenSendRemainder}
          contentText={
            'Are you sure that you want to send payment balance remainder to this customer? The message will be sent only if there is a balance amount to be paid'
          }
          handleClose={handleToggleSendRemainderDialog}
          isLoading={isLoadingSendPaymentRemainder}
          handleSubmit={handleSendInvoiceRemainder}
        />
      )}
    </Container>
  );
};
