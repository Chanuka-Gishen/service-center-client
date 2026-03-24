import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import TableEmptyRow from 'src/components/custom-table/table-empty-row';
import TableLoadingRow from 'src/components/custom-table/table-loading-row';

export const WorkOrderItemsSelect = ({
  open,
  selectedFilters,
  invItems,
  isLoading,
  isLoadingAdd,
  handleClose,
  handleChangeSearch,
  handleAddNewInventoryRow,
}) => {
  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="md"
    >
      <DialogTitle id="alert-dialog-title">Add Item</DialogTitle>
      <DialogContent>
        <Grid container spacing={4} sx={{ mt: '5px' }}>
          <Grid size={{ sm: 12, md: 4, lg: 6 }}>
            <TextField
              label="Item Code"
              name="code"
              value={selectedFilters.code}
              onChange={handleChangeSearch}
              autoComplete="off"
              fullWidth
            />
          </Grid>
          <Grid size={{ sm: 12, md: 4, lg: 6 }}>
            <TextField
              label="Item Title"
              name="name"
              value={selectedFilters.name}
              onChange={handleChangeSearch}
              autoComplete="off"
              fullWidth
            />
          </Grid>
          <Grid size={{ sm: 12, md: 4, lg: 12 }}>
            <Card>
              <Paper elevation={0}>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Code</TableCell>
                        <TableCell>Item</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {isLoading && <TableLoadingRow colSpan={5} />}
                      {!isLoading && invItems.length === 0 && <TableEmptyRow colSpan={5} />}
                      {!isLoading && invItems.length > 0 && (
                        <>
                          {invItems.map((item, index) => (
                            <TableRow key={index} sx={{ cursor: 'pointer' }}>
                              <TableCell>{item.itemCode}</TableCell>
                              <TableCell>{item.itemName}</TableCell>
                              <TableCell>{item.itemQuantity}</TableCell>
                              <TableCell>
                                <IconButton
                                  disabled={isLoadingAdd}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleAddNewInventoryRow(item);
                                  }}
                                >
                                  <AddCircleIcon />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))}
                        </>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Card>
          </Grid>
        </Grid>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
              resetForm();
            }}
            disabled={isLoading}
            variant="outlined"
          >
            Close
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};
