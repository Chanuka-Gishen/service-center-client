import React from 'react';
import {
  alpha,
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Container,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Menu,
  MenuItem,
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
  data,
  selectedVehicle,
  customerInitialValues,
  vehicleInitialValues,
  isOpenCreate,
  isOpenUpdateCustomer,
  isOpenAddVehicle,
  isOpenUpdateVehicle,
  isLoading,
  isLoadingCreate,
  isLoadingUpdate,
  isLoadingUpdateVehicle,
  isLoadingAddVehicle,
  handleToggleWorkOrderCreateDialog,
  handleToggleUpdateCustomerDialog,
  handleToggleAddVehicleDialog,
  handleToggleUpdateVehicleDialog,
  handleCreateWorkOrder,
  handleUpdateCustomer,
  handleAddVehicle,
  handleUpdateVehicle,
  optionsAnchorEl,
  isOpenOptions,
  handleClickOptions,
  handleCloseOptions,
}) => {
  const { auth } = useAuthStore.getState();
  return (
    <Container maxWidth="lg">
      <Grid container rowSpacing={4} columnSpacing={2}>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href={NAVIGATION_ROUTES.customers.base}>
              Customers
            </Link>
            <Typography sx={{ color: 'text.primary' }}>
              {isLoading ? 'Loading...' : (data.customerName ?? ' - ')}
            </Typography>
          </Breadcrumbs>
        </Grid>
        {data != null && (
          <>
            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 2 }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Typography variant="h5">Customer Details</Typography>
                  {auth.user.userRole === USER_ROLE.SUPER_ADMIN && (
                    <Button variant="contained" onClick={handleToggleUpdateCustomerDialog}>
                      Edit Customer
                    </Button>
                  )}
                </Stack>
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
            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 2 }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Typography variant="h5">Customer Vehicles</Typography>
                  <Button variant="contained" onClick={handleToggleAddVehicleDialog}>
                    Add Vehicle
                  </Button>
                </Stack>

                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                  {data.customerVehicles.map((item, index) => (
                    <ListItem
                      key={index}
                      secondaryAction={
                        // <IconButton
                        //   edge="end"
                        //   aria-label="create"
                        //   onClick={(e) => {
                        //     e.stopPropagation();
                        //     handleToggleWorkOrderCreateDialog(item);
                        //   }}
                        // >
                        //   <EngineeringIcon />
                        // </IconButton>
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
    </Container>
  );
};
