import React, { useState } from 'react';
import { CELL_TYPES } from 'src/constants/common-constants';
import { InventoryView } from '../view/inventory-view';

const InventoryController = () => {
  const tableKeys = [
    {
      header: 'Item Title',
      value: 'itemTitle',
      type: CELL_TYPES.STRING,
    },
    {
      header: 'Item Description',
      value: 'itemDescription',
      type: CELL_TYPES.STRING,
    },
    {
      header: 'Item Quantity',
      value: 'itemQuantity',
      type: CELL_TYPES.NUMBER,
    },
    {
      header: 'Cost Price',
      value: 'itemCostPrice',
      type: CELL_TYPES.CURRENCY,
    },
    {
      header: 'Selling Price',
      value: 'itemSellingPrice',
      type: CELL_TYPES.CURRENCY,
    },
  ];

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [documentCount, setDocumentCount] = useState(0);

  const [items, setItems] = useState([]);

  const [isOpenAdd, setIsOpenAdd] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingAdd, setIsLoadingAdd] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setLimit(parseInt(event.target.value, 10));
  };

  const handleToggleAddDialog = () => {
    setIsOpenAdd(!isOpenAdd);
  };

  const handleAddItem = async () => {};

  const handleFetchItems = async () => {};

  return (
    <InventoryView
      items={items}
      isLoading={isLoading}
      isLoadingAdd={isLoadingAdd}
      isOpenAdd={isOpenAdd}
      handleToggleAddDialog={handleToggleAddDialog}
      handleAddItem={handleAddItem}
      tableKeys={tableKeys}
      limit={limit}
      page={page}
      documentCount={documentCount}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
};

export default InventoryController;
