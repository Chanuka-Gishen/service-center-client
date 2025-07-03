import {
  Box,
  Button,
  Card,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { CustomTable } from 'src/components/custom-table/custom-table';
import { ReturnItemsRow } from './return-items-row';
import { RETURN_TYPS } from 'src/constants/return-Types';
import { RETURN_STS } from 'src/constants/return-status';
import useAuthStore from 'src/store/auth-store';
import { USER_ROLE } from 'src/constants/user-role';
import { ReturnProcessDialog } from './return-process-dialog';
import ConfirmationDialog from 'src/components/confirmation-dialog/confirmation-dialog';

export const GrnReturnTab = ({
  returnColumns,
  returnFilters,
  selectedReturnRow,
  supplierReturns,
  supplierReturnsCount,
  isOpenProcessReturn,
  isOpenCancelReturn,
  isLoadingSupReturns,
  isLoadingProcessReturns,
  isLoadingCancelReturns,
  returnPagination,
  handleToggleProcessReturn,
  handleToggleCancelReturn,
  handleChangeSearchReturns,
  handleDeleteSearchParam,
  handleSelectReturnRow,
  handleProcessReturnItem,
  handleCancelReturnItem,
}) => {
  const { auth } = useAuthStore();

  return (
    <Box maxWidth="xl" sx={{ mt: '20px' }}>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 4 }}>
              <FormControl fullWidth>
                <InputLabel id="select-label">Return Type</InputLabel>
                <Select
                  labelId="select-label"
                  id="simple-select"
                  label="Return Type"
                  name="typeFilter"
                  fullWidth
                  value={returnFilters.typeFilter || ''}
                  onChange={handleChangeSearchReturns}
                >
                  {RETURN_TYPS.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <FormControl fullWidth>
                <InputLabel id="select-label">Return Status</InputLabel>
                <Select
                  labelId="select-label"
                  id="simple-select"
                  label="Return Status"
                  name="statusFilter"
                  fullWidth
                  value={returnFilters.statusFilter || ''}
                  onChange={handleChangeSearchReturns}
                >
                  {RETURN_STS.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        {(returnFilters.typeFilter || returnFilters.statusFilter) && (
          <Grid size={12}>
            <Stack direction="row" spacing={2} flexWrap="wrap">
              {returnFilters.typeFilter && (
                <Chip
                  label={returnFilters.typeFilter}
                  onDelete={() => handleDeleteSearchParam('typeFilter')}
                />
              )}
              {returnFilters.statusFilter && (
                <Chip
                  label={returnFilters.statusFilter}
                  onDelete={() => handleDeleteSearchParam('statusFilter')}
                />
              )}
            </Stack>
          </Grid>
        )}
        {selectedReturnRow && (
          <Grid size={12}>
            <Stack spacing={2}>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                justifyContent="space-between"
                alignItems="center"
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography fontWeight="bold">Selected Record (1)</Typography>
                  <Button variant="contained" onClick={() => handleSelectReturnRow()}>
                    Deselect
                  </Button>
                </Stack>

                <Stack direction="row" spacing={1}>
                  <Button variant="contained" onClick={handleToggleProcessReturn}>
                    Process Return
                  </Button>
                  {auth.user.userRole === USER_ROLE.SUPER_ADMIN && (
                    <Button variant="contained" onClick={handleToggleCancelReturn}>
                      Cancel Return
                    </Button>
                  )}
                </Stack>
              </Stack>

              <Card elevation={4}>
                <Paper elevation={0}>
                  <Table>
                    <TableBody>
                      <ReturnItemsRow data={[selectedReturnRow]} onClickRow={null} />
                    </TableBody>
                  </Table>
                </Paper>
              </Card>
            </Stack>
          </Grid>
        )}
        <Grid size={12}>
          <Card>
            <Paper elevation={0}>
              <CustomTable
                keys={returnColumns}
                isLoading={isLoadingSupReturns}
                dataLength={supplierReturns.length}
                documentCount={supplierReturnsCount}
                limit={returnPagination.limit}
                page={returnPagination.page}
                handleChangePage={returnPagination.handleChangePage}
                handleChangeRowsPerPage={returnPagination.handleChangeRowsPerPage}
                tableBody={
                  <ReturnItemsRow data={supplierReturns} onClickRow={handleSelectReturnRow} />
                }
              />
            </Paper>
          </Card>
        </Grid>
      </Grid>
      {isOpenProcessReturn && (
        <ReturnProcessDialog
          open={isOpenProcessReturn}
          handleClose={handleToggleProcessReturn}
          handleConfirm={handleProcessReturnItem}
          isLoading={isLoadingProcessReturns}
        />
      )}
      {isOpenCancelReturn && (
        <ConfirmationDialog
          open={isOpenCancelReturn}
          contentText={
            'Are you sure that you want to cancel this return invoice? Once proceed cannot be reversed'
          }
          handleClose={handleToggleCancelReturn}
          handleSubmit={handleCancelReturnItem}
          isLoading={isLoadingCancelReturns}
        />
      )}
    </Box>
  );
};
