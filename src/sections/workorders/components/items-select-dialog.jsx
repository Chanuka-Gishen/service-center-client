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
import Grid from '@mui/material/Grid2';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import TableEmptyRow from 'src/components/custom-table/table-empty-row';
import TableLoadingRow from 'src/components/custom-table/table-loading-row';

export const ItemsSelectDialog = ({
  open,
  handleClose,
  data,
  selectedFilters,
  isLoading,
  handleChangeSearch,
  handleAddItem,
}) => {
  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Select Inventory Item</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
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
          <Grid size={12}>
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
                      {!isLoading && data.length === 0 && <TableEmptyRow colSpan={5} />}
                      {!isLoading && data.length > 0 && (
                        <>
                          {data.map((item, index) => (
                            <TableRow key={index} hover>
                              <TableCell>{item.itemCode}</TableCell>
                              <TableCell>{item.itemName}</TableCell>
                              <TableCell>{item.itemQuantity}</TableCell>
                              <TableCell>
                                <IconButton
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleAddItem(item);
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
      </DialogContent>

      <DialogActions>
        <Button variant="contained" onClick={handleClose} autoFocus>
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
};
