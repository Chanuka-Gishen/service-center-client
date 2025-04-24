import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { InventoryItemView } from '../view/inventory-item-view';
import useInventory from 'src/hooks/useInventory';

const logsTable = [
  'Movement Type',
  'Previous Quantity',
  'New Quantity',
  'Stock Value',
  'Supplier',
  'Created At',
];

const InventoryItemController = () => {
  const location = useLocation();
  const { id } = location.state || {};

  const {
    item,
    stockLogs,
    stockLogsCount,
    isLoadingItem,
    isLoadingEdit,
    isLoadingStockUpdate,
    isLoadingStockUpdateLogs,
    updateItem,
    updateItemStock,
    fetchItemInfo,
    fetchStockUpdateLogs,
  } = useInventory();

  const [optionsAnchorEl, setOptionsAnchorEl] = useState(null);
  const isOpenOptions = Boolean(optionsAnchorEl);

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const [initialValues, setInitialValues] = useState({});

  const [isOpenUpdateDialog, setIsOpenUpdateDialog] = useState(false);
  const [isOpenUpdateStockDialog, setIsOpenUpdateStockDialog] = useState(false);

  const params = {
    id,
    page,
    limit,
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setLimit(parseInt(event.target.value, 10));
  };

  const handleClickOptions = (event) => {
    setOptionsAnchorEl(event.currentTarget);
  };

  const handleCloseOptions = () => {
    setOptionsAnchorEl(null);
  };

  const handleToggleUpdateDialog = () => {
    if (!isOpenUpdateDialog) {
      handleCloseOptions();
      setInitialValues({
        itemName: item.itemName,
        itemCategory: item.itemCategory,
        itemDescription: item.itemDescription,
        itemUnit: 'Pieces',
        itemBuyingPrice: item.itemBuyingPrice,
        itemSellingPrice: item.itemSellingPrice,
        itemSupplier: item.itemSupplier,
        itemThreshold: item.itemThreshold,
      });
    } else {
      setInitialValues({});
    }
    setIsOpenUpdateDialog(!isOpenUpdateDialog);
  };

  const handleToggleStockUpdateDialog = () => {
    if (!isOpenUpdateStockDialog) handleCloseOptions();
    setIsOpenUpdateStockDialog(!isOpenUpdateStockDialog);
  };

  const handleUpdateStock = async (values) => {
    const data = {
      _id: item._id,
      ...values,
    };

    const isSuccess = await updateItemStock(data);

    if (isSuccess) {
      handleToggleStockUpdateDialog();
      fetchItemInfo(item._id)
      fetchStockUpdateLogs(params);
    }
  };

  const handleUpdateItem = async (values) => {
    const isSuccess = await updateItem(item._id, values);

    if (isSuccess) {
      handleToggleUpdateDialog();
      fetchItemInfo(item._id);
    }
  };

  useEffect(() => {
    if (id) {
      fetchItemInfo(id);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (id) {
      fetchStockUpdateLogs(params);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit]);

  return (
    <InventoryItemView
      logsTable={logsTable}
      data={item}
      stockLogs={stockLogs}
      stockLogsCount={stockLogsCount}
      initialValues={initialValues}
      optionsAnchorEl={optionsAnchorEl}
      isLoading={isLoadingItem}
      isLoadingEdit={isLoadingEdit}
      isLoadingStockUpdate={isLoadingStockUpdate}
      isLoadingStockUpdateLogs={isLoadingStockUpdateLogs}
      isOpenOptions={isOpenOptions}
      isOpenUpdateDialog={isOpenUpdateDialog}
      isOpenUpdateStockDialog={isOpenUpdateStockDialog}
      handleClickOptions={handleClickOptions}
      handleCloseOptions={handleCloseOptions}
      handleToggleUpdateDialog={handleToggleUpdateDialog}
      handleToggleStockUpdateDialog={handleToggleStockUpdateDialog}
      handleUpdateItem={handleUpdateItem}
      handleUpdateStock={handleUpdateStock}
      limit={limit}
      page={page}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
};

export default InventoryItemController;
