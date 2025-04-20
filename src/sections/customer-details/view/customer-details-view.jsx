import React from 'react';
import {
  Avatar,
  Box,
  Breadcrumbs,
  Container,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
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

import { NAVIGATION_ROUTES } from 'src/routes/navigation-routes';
import { fDate } from 'src/utils/format-time';
import { CreateWorkOrderDialog } from '../components/create-workorder-dialog';

export const CustomerDetailsView = ({
  data,
  selectedVehicle,
  isOpenCreate,
  isLoading,
  isLoadingCreate,
  handleToggleWorkOrderCreateDialog,
  handleCreateWorkOrder,
}) => {
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
                <Typography variant="h5">Customer Details</Typography>
                <TableContainer>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell variant="head">Customer Name</TableCell>
                        <TableCell>{data.customerName}</TableCell>
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
                <Typography variant="h5">Customer Vehicles</Typography>
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                  {data.customerVehicles.map((item) => (
                    <ListItem
                      secondaryAction={
                        <IconButton
                          edge="end"
                          aria-label="create"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleWorkOrderCreateDialog(item);
                          }}
                        >
                          <EngineeringIcon />
                        </IconButton>
                      }
                    >
                      <ListItemAvatar>
                        <Avatar>
                          <DirectionsCarFilledIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.vehicleNumber}
                        secondary={`${item.vehicleManufacturer} - ${item.vehicleModel}`}
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
    </Container>
  );
};
