import React, { useState } from 'react';
import {
  alpha,
  Box,
  Breadcrumbs,
  Card,
  Chip,
  CircularProgress,
  Container,
  IconButton,
  Link,
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

import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InventoryIcon from '@mui/icons-material/Inventory';

import { NAVIGATION_ROUTES } from 'src/routes/navigation-routes';
import { formatCurrency } from 'src/utils/format-number';
import { ITEM_STS_INSTOCK, ITEM_STS_LOW_STOCK } from 'src/constants/item-status';
import { UpdateItemDialog } from '../component/item-update-dialog';
import { UpdateStockDialog } from '../component/update-stock-dialog';
import { fDate } from 'src/utils/format-time';
import { CustomTable } from 'src/components/custom-table/custom-table';
import { StockLogsRow } from '../component/stock-logs-row';
import useAuthStore from 'src/store/auth-store';
import { USER_ROLE } from 'src/constants/user-role';

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

export const InventoryItemView = ({
  logsTable,
  data,
  stockLogs,
  stockLogsCount,
  initialValues,
  optionsAnchorEl,
  isLoading,
  isLoadingEdit,
  isLoadingStockUpdate,
  isLoadingStockUpdateLogs,
  isOpenOptions,
  isOpenUpdateDialog,
  isOpenUpdateStockDialog,
  handleClickOptions,
  handleCloseOptions,
  handleToggleUpdateDialog,
  handleToggleStockUpdateDialog,
  handleUpdateItem,
  handleUpdateStock,
  limit,
  page,
  handleChangePage,
  handleChangeRowsPerPage,
}) => {
  const { auth } = useAuthStore.getState();

  return (
    <Container maxWidth="xl">
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href={NAVIGATION_ROUTES.inventory.base}>
              Inventory
            </Link>
            <Typography sx={{ color: 'text.primary' }}>
              {isLoading ? 'Loading...' : data ? data.itemName : ' - '}
            </Typography>
          </Breadcrumbs>
        </Grid>
        {!isLoading && data && (
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 2 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h5">Item Details</Typography>
                <IconButton
                  aria-label="options"
                  id="demo-customized-button"
                  aria-controls={isOpenOptions ? 'demo-customized-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={isOpenOptions ? 'true' : undefined}
                  onClick={handleClickOptions}
                >
                  <MoreVertIcon />
                </IconButton>
                <StyledMenu
                  id="demo-customized-menu"
                  MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                  }}
                  anchorEl={optionsAnchorEl}
                  open={isOpenOptions}
                  onClose={handleCloseOptions}
                >
                  {auth.user.userRole === USER_ROLE.SUPER_ADMIN && (
                    <MenuItem onClick={handleToggleUpdateDialog} disableRipple>
                      <EditIcon />
                      Edit
                    </MenuItem>
                  )}

                  <MenuItem onClick={handleToggleStockUpdateDialog} disableRipple>
                    <InventoryIcon />
                    Update Stock
                  </MenuItem>
                </StyledMenu>
              </Stack>

              <Card>
                <Paper>
                  <TableContainer>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell variant="head">Item Code</TableCell>
                          <TableCell>{data.itemCode}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell variant="head">Item Name</TableCell>
                          <TableCell>{data.itemName}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell variant="head">Item Available Quantity</TableCell>
                          <TableCell>{data.itemQuantity}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell variant="head">Item Threshold Limit</TableCell>
                          <TableCell>{data.itemThreshold}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell variant="head">Item Availability Status</TableCell>
                          <TableCell>
                            <Chip
                              label={data.itemStatus}
                              color={
                                data.itemStatus === ITEM_STS_INSTOCK
                                  ? 'success'
                                  : data.itemStatus === ITEM_STS_LOW_STOCK
                                    ? 'warning'
                                    : 'error'
                              }
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell variant="head">Item Category</TableCell>
                          <TableCell>{data.itemCategory}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell variant="head">Item Description</TableCell>
                          <TableCell>{data.itemDescription ?? ' - '}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell variant="head">Item Supplier</TableCell>
                          <TableCell>{data.itemSupplier ?? ' - '}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell variant="head">Buying Price</TableCell>
                          <TableCell>{formatCurrency(data.itemBuyingPrice)}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell variant="head">Selling Price</TableCell>
                          <TableCell>{formatCurrency(data.itemSellingPrice)}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell variant="head">Last Updated At</TableCell>
                          <TableCell>{fDate(data.updatedAt)}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </Card>
            </Box>
          </Grid>
        )}
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 2 }}>
            <Typography variant="h5" sx={{ mt: '5px' }}>
              Stock Update Logs
            </Typography>
            {isLoadingStockUpdateLogs && (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexGrow: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <CircularProgress />
              </Box>
            )}
            {!isLoadingStockUpdateLogs && (
              <Card>
                <Paper>
                  <CustomTable
                    keys={logsTable}
                    dataLength={stockLogs.length}
                    isLoading={isLoadingStockUpdateLogs}
                    documentCount={stockLogsCount}
                    page={page}
                    limit={limit}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                    tableBody={<StockLogsRow data={stockLogs} />}
                  />
                </Paper>
              </Card>
            )}
          </Box>
        </Grid>
      </Grid>
      {isOpenUpdateDialog && (
        <UpdateItemDialog
          open={isOpenUpdateDialog}
          initialValues={initialValues}
          handleOpenClose={handleToggleUpdateDialog}
          handleConfirm={handleUpdateItem}
          isLoading={isLoadingEdit}
        />
      )}
      {isOpenUpdateStockDialog && (
        <UpdateStockDialog
          open={isOpenUpdateStockDialog}
          handleOpenClose={handleToggleStockUpdateDialog}
          handleConfirm={handleUpdateStock}
          isLoading={isLoadingStockUpdate}
        />
      )}
    </Container>
  );
};
