import React, { useEffect, useMemo, useState } from 'react';
import { CELL_TYPES } from 'src/constants/common-constants';
import { InventoryView } from '../view/inventory-view';
import useInventory from 'src/hooks/useInventory';

const InventoryController = () => {
  const tableKeys = [
    'Item Code',
    'Item Name',
    'Item Description',
    'Category',
    'Item Quantity',
    'Threshold',
    'Cost Price',
    'Selling Price',
    'Supplier',
    'Status',
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
