import React, { useEffect, useMemo, useState } from 'react';
import { InventoryView } from '../view/inventory-view';
import useInventory from 'src/hooks/useInventory';
import { NAVIGATION_ROUTES } from 'src/routes/navigation-routes';
import { useNavigate } from 'react-router-dom';
import useInventoryCategory from 'src/hooks/useInventoryCategory';
import useBrand from 'src/hooks/useBrand';
import usePagination from 'src/hooks/usePagination';

const InventoryController = () => {
  const tableKeys = [
    'Item Code',
    'Item Name',
    'Category',
    'Brand',
    'Item Quantity',
    'Threshold',
    'Cost Price',
    'Selling Price',
    'Supplier',
    'Status',
  ];

  const navigate = useNavigate();
  const { items, itemsCount, isLoading, isLoadingAdd, fetchAllItems, addItems } = useInventory();
  const { categoryOptions, isLoadingCategoryOptions, getCategoryOptions } = useInventoryCategory();
  const { brandOptions, isLoadingBrandsOptions, getBrandsOptions } = useBrand();

  const pagination = usePagination();

  const [isOpenAdd, setIsOpenAdd] = useState(false);

  const [selectedFilters, setSelectedFilters] = useState({
    name: '',
    code: '',
  });

  const memoizedSelectedFilters = useMemo(() => selectedFilters, [selectedFilters]);

  //------------------
  const queryParams = { ...pagination.params, ...selectedFilters };
  //------------------

  const handleChangeSearch = (e) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [e.target.name]: e.target.value,
    }));
  };

  const handleToggleAddDialog = () => {
    setIsOpenAdd(!isOpenAdd);
  };

  const handleNavigateItem = (id) => {
    navigate(NAVIGATION_ROUTES.inventory.details.base, {
      state: {
        id,
      },
    });
  };

  const handleAddItem = async (data) => {
    const response = await addItems(data);

    if (response) {
      handleToggleAddDialog();

      await fetchAllItems(queryParams);
    }
  };

  useEffect(() => {
    getBrandsOptions();
    getCategoryOptions();
  }, []);

  useEffect(() => {
    fetchAllItems(queryParams);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.page, pagination.limit, memoizedSelectedFilters]);

  return (
    <InventoryView
      items={items}
      selectedFilters={selectedFilters}
      tableKeys={tableKeys}
      documentCount={itemsCount}
      brandOptions={brandOptions}
      categoryOptions={categoryOptions}
      pagination={pagination}
      isOpenAdd={isOpenAdd}
      isLoading={isLoading}
      isLoadingBrandsOptions={isLoadingBrandsOptions}
      isLoadingCategoryOptions={isLoadingCategoryOptions}
      isLoadingAdd={isLoadingAdd}
      handleNavigateItem={handleNavigateItem}
      handleChangeSearch={handleChangeSearch}
      handleToggleAddDialog={handleToggleAddDialog}
      handleAddItem={handleAddItem}
    />
  );
};

export default InventoryController;
