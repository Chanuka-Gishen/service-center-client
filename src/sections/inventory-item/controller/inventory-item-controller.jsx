import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { InventoryItemView } from '../view/inventory-item-view';
import useInventory from 'src/hooks/useInventory';
import useSupplier from 'src/hooks/useSupplier';
import useInventoryCategory from 'src/hooks/useInventoryCategory';
import useBrand from 'src/hooks/useBrand';
import usePagination from 'src/hooks/usePagination';

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

  const { suppliersOptions, isLoadingSuppliersOptions, fetchSuppliersForSelection } = useSupplier();

  const { categoryOptions, isLoadingCategoryOptions, getCategoryOptions } = useInventoryCategory();
  const { brandOptions, isLoadingBrandsOptions, getBrandsOptions } = useBrand();

  const [optionsAnchorEl, setOptionsAnchorEl] = useState(null);
  const isOpenOptions = Boolean(optionsAnchorEl);

  const pagination = usePagination();

  const [initialValues, setInitialValues] = useState({});

  const [isOpenUpdateDialog, setIsOpenUpdateDialog] = useState(false);
  const [isOpenUpdateStockDialog, setIsOpenUpdateStockDialog] = useState(false);

  const params = {
    id,
    ...pagination.params,
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
        itemCode: item.itemCode,
        itemName: item.itemName,
        itemCategory: item.itemCategory,
        itemBrand: item.itemBrand,
        itemDescription: item.itemDescription,
        itemUnit: 'Pieces',
        itemBuyingPrice: item.itemBuyingPrice,
        itemDiscountAmount: item.itemDiscountAmount,
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
      fetchItemInfo(item._id);
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
    getBrandsOptions();
    getCategoryOptions();
  }, []);

  useEffect(() => {
    if (id) {
      fetchItemInfo(id);
    }
    fetchSuppliersForSelection();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (id) {
      fetchStockUpdateLogs(params);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.page, pagination.limit]);

  return (
    <InventoryItemView
      logsTable={logsTable}
      data={item}
      stockLogs={stockLogs}
      stockLogsCount={stockLogsCount}
      suppliersOptions={suppliersOptions}
      initialValues={initialValues}
      optionsAnchorEl={optionsAnchorEl}
      pagination={pagination}
      brandOptions={brandOptions}
      categoryOptions={categoryOptions}
      isLoading={isLoadingItem}
      isLoadingBrandsOptions={isLoadingBrandsOptions}
      isLoadingCategoryOptions={isLoadingCategoryOptions}
      isLoadingEdit={isLoadingEdit}
      isLoadingStockUpdate={isLoadingStockUpdate}
      isLoadingStockUpdateLogs={isLoadingStockUpdateLogs}
      isLoadingSuppliersOptions={isLoadingSuppliersOptions}
      isOpenOptions={isOpenOptions}
      isOpenUpdateDialog={isOpenUpdateDialog}
      isOpenUpdateStockDialog={isOpenUpdateStockDialog}
      handleClickOptions={handleClickOptions}
      handleCloseOptions={handleCloseOptions}
      handleToggleUpdateDialog={handleToggleUpdateDialog}
      handleToggleStockUpdateDialog={handleToggleStockUpdateDialog}
      handleUpdateItem={handleUpdateItem}
      handleUpdateStock={handleUpdateStock}
    />
  );
};

export default InventoryItemController;
