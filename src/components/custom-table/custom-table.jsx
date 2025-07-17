import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';

import TableLoadingRow from './table-loading-row.jsx';
import TableEmptyRow from './table-empty-row.jsx';

export const CustomTable = ({
  keys,
  dataLength,
  isLoading,
  tableBody,
  enableAction = false,
  enablePagination = true,
  documentCount = 0,
  rowerPerPage = [5, 10, 20, 30],
  page = 0,
  limit = 10,
  handleChangePage,
  handleChangeRowsPerPage,
}) => {
  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {keys.map((item, index) => (
                <TableCell key={index} align={'left'}>
                  {item}
                </TableCell>
              ))}
              {enableAction && <TableCell align={'right'}>Action</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading && <TableLoadingRow colSpan={keys.length} />}
            {!isLoading && dataLength === 0 && (
              <TableEmptyRow colSpan={enableAction ? keys.length + 1 : keys.length} />
            )}
            {!isLoading && dataLength > 0 && <>{tableBody}</>}
          </TableBody>
        </Table>
      </TableContainer>
      {documentCount > 5 && enablePagination && (
        <TablePagination
          page={page}
          component="div"
          count={documentCount}
          rowsPerPage={limit}
          onPageChange={handleChangePage}
          rowsPerPageOptions={rowerPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </>
  );
};

CustomTable.propTypes = {
  keys: PropTypes.array.isRequired,
  data: PropTypes.array,
  isLoading: PropTypes.bool.isRequired,
  enableAction: PropTypes.bool,
  documentCount: PropTypes.number,
  rowerPerPage: PropTypes.array,
  page: PropTypes.number,
  limit: PropTypes.number,
  handleChangePage: PropTypes.func,
  handleChangeRowsPerPage: PropTypes.func,
};
