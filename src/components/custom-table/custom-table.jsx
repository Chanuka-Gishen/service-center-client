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
import { CELL_TYPES } from 'src/constants/common-constants';
import { formatCurrency } from 'src/utils/format-number';
import { fDate } from 'src/utils/format-time';


export const CustomTable = ({
  keys,
  data,
  isLoading,
  enableAction = false,
  documentCount = 0,
  rowerPerPage = [10, 20, 30],
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
                  {item.header}
                </TableCell>
              ))}
              {enableAction && <TableCell align={'right'}>Action</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading && <TableLoadingRow colSpan={keys.length} />}
            {!isLoading && data.length === 0 && <TableEmptyRow colSpan={keys.length} />}
            {!isLoading && data.length > 0 && (
              <>
                {data.map((item, index) => (
                  <TableRow key={index}>
                    {keys.map((key, index) => (
                      <TableCell key={index}>
                        {[CELL_TYPES.STRING, CELL_TYPES.NUMBER].includes(key.type) &&
                          item[`${key.value}`]}
                        {key.type === CELL_TYPES.CURRENCY && formatCurrency(item[`${key.value}`])}
                        {key.type === CELL_TYPES.DATE && fDate(item[`${key.value}`])}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {data.length > 10 && (
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
  handleChangePage: PropTypes.func.isRequired,
  handleChangeRowsPerPage: PropTypes.func.isRequired,
};
