import React, { useEffect, useMemo, useState } from 'react';
import { CELL_TYPES } from 'src/constants/common-constants';
import { InventoryView } from '../view/inventory-view';
import useInventory from 'src/hooks/useInventory';

const InventoryController = () => {
  const tableKeys = [
    {
      header: 'Item Code',
      value: 'itemCode',
      type: CELL_TYPES.STRING,
    },
    {
      header: 'Item Name',
      value: 'itemName',
      type: CELL_TYPES.STRING,
    },
    {
      header: 'Item Description',
      value: 'itemDescription',
      type: CELL_TYPES.STRING,
    },
    { header: 'Category', value: 'itemCategory', type: CELL_TYPES.STRING },
    {
      header: 'Item Quantity',
      value: 'itemQuantity',
      type: CELL_TYPES.NUMBER,
    },
    {
      header: 'Threshold',
      value: 'itemQuantity',
      type: CELL_TYPES.NUMBER,
    },
    {
      header: 'Cost Price',
      value: 'itemBuyingPrice',
      type: CELL_TYPES.CURRENCY,
    },
    {
      header: 'Selling Price',
      value: 'itemSellingPrice',
      type: CELL_TYPES.CURRENCY,
    },
    {
      header: 'Supplier',
      value: 'itemSupplier',
      type: CELL_TYPES.STRING,
    },
    {
      header: 'Status',
      value: 'itemStatus',
      type: CELL_TYPES.STRING,
    },
  ];

  const { items, itemsCount, isLoading, isLoadingAdd, fetchAllItems, addItems } = useInventory();

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const [isOpenAdd, setIsOpenAdd] = useState(false);

  const [selectedFilters, setSelectedFilters] = useState({
    name: '',
    code: '',
  });

  const memoizedSelectedFilters = useMemo(() => selectedFilters, [selectedFilters]);

  //------------------
  const queryParams = { page, limit, ...selectedFilters };
  //------------------

  const handleChangeSearch = (e) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [e.target.name]: e.target.value,
    }));
  };

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

  const handleAddItem = async (data) => {
    const response = await addItems(data);

    if (response) {
      handleToggleAddDialog();

      await fetchAllItems(queryParams);
    }
  };

  useEffect(() => {
    fetchAllItems(queryParams);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit, memoizedSelectedFilters]);

  return (
    <InventoryView
      items={items}
      selectedFilters={selectedFilters}
      isLoading={isLoading}
      isLoadingAdd={isLoadingAdd}
      isOpenAdd={isOpenAdd}
      handleChangeSearch={handleChangeSearch}
      handleToggleAddDialog={handleToggleAddDialog}
      handleAddItem={handleAddItem}
      tableKeys={tableKeys}
      limit={limit}
      page={page}
      documentCount={itemsCount}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
};

export default InventoryController;
