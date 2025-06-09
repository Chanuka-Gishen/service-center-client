import React from 'react';

import { AppBar, Dialog, DialogContent, IconButton, Toolbar, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Slide from '@mui/material/Slide';
import CloseIcon from '@mui/icons-material/Close';

import { WokrOrderUpdateForm } from './workorder-update-form';
import { WorkOrderItemsSelect } from './workorder-items-select';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export const WokrOrderUpdateDialog = ({
  open,
  inventoryItems,
  filterValues,
  formik,
  handleAddNewInventoryRow,
  handleDeleteInventoryItem,
  isLoading,
  isLoadingItems,
  handleOpenClose,
  handleChangeSearch,
  handleConfirm,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleOpenClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      slots={{
        transition: Transition,
      }}
      fullScreen
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleOpenClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1, cursor: 'pointer' }} variant="h6" component="div">
            Update Workorder Invoice
          </Typography>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid size={{ xs: 12, md: 8 }}>
            <WokrOrderUpdateForm
              formik={formik}
              handleDeleteInventoryItem={handleDeleteInventoryItem}
              handleConfirm={handleConfirm}
              isLoading={isLoading}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <WorkOrderItemsSelect
              isLoading={isLoadingItems}
              invItems={inventoryItems}
              selectedFilters={filterValues}
              handleChangeSearch={handleChangeSearch}
              handleAddNewInventoryRow={handleAddNewInventoryRow}
            />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
