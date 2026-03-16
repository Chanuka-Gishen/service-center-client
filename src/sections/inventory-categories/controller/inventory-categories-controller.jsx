import { useEffect, useState } from 'react';
import usePagination from 'src/hooks/usePagination';
import { InventoryCategoriesView } from '../view/inventory-categories-view';
import useInventoryCategory from 'src/hooks/useInventoryCategory';

const InventoryCategoriesController = () => {
  const tableKeys = ['Category', 'Product Count', 'Is Active', 'Created At', 'Updated At'];

  const {
    categories,
    categoriesCount,
    isLoadingCategories,
    isLoadingAddCategory,
    isLoadingUpdateCategory,
    getCategories,
    addCategory,
    updateCategory,
  } = useInventoryCategory();

  const baseValues = { categoryTitle: '', isActive: true };

  const [searchParams, setSearchParams] = useState({
    name: '',
    status: '',
  });
  const [initialValues, setInitialValues] = useState(baseValues);

  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);

  const pagination = usePagination();

  //------------------
  const queryParams = { ...pagination.params, ...searchParams };
  //------------------

  const handleChangeSearchParam = (event) => {
    setSearchParams({
      ...searchParams,
      [event.target.name]: event.target.value,
    });
  };

  const handleDeleteSearchParam = (filterName) => {
    setSearchParams((prevFilters) => ({
      ...prevFilters,
      [filterName]: '',
    }));
  };

  const handleToggleAddDialog = () => {
    setIsOpenAdd(!isOpenAdd);
  };

  const handleToggleUpdateDialog = (row = null) => {
    if (!isOpenUpdate && row) {
      setInitialValues({ _id: row._id, categoryTitle: row.categoryTitle, isActive: row.isActive });
    } else {
      setInitialValues(baseValues);
    }

    setIsOpenUpdate(!isOpenUpdate);
  };

  const handleAddInventoryCategory = async (values) => {
    const result = await addCategory(values);

    if (result) {
      handleToggleAddDialog();
      getCategories(queryParams);
    }
  };

  const handleUpdateInventoryCategory = async (values) => {
    const result = await updateCategory(values);

    if (result) {
      handleToggleUpdateDialog();
      getCategories(queryParams);
    }
  };

  useEffect(() => {
    getCategories(queryParams);
  }, [pagination.limit, pagination.page, searchParams.name, searchParams.status]);

  return (
    <InventoryCategoriesView
      tableHeaders={tableKeys}
      searchParams={searchParams}
      categories={categories}
      categoriesCount={categoriesCount}
      pagination={pagination}
      initialValues={initialValues}
      isOpenAdd={isOpenAdd}
      isOpenUpdate={isOpenUpdate}
      isLoading={isLoadingCategories}
      isLoadingAddCategor={isLoadingAddCategory}
      isLoadingUpdateCategory={isLoadingUpdateCategory}
      handleChangeSearchParam={handleChangeSearchParam}
      handleDeleteSearchParam={handleDeleteSearchParam}
      handleToggleAddDialog={handleToggleAddDialog}
      handleToggleUpdateDialog={handleToggleUpdateDialog}
      handleAddInventoryCategory={handleAddInventoryCategory}
      handleUpdateInventoryCategory={handleUpdateInventoryCategory}
    />
  );
};

export default InventoryCategoriesController;
