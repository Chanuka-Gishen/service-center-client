import { useState } from 'react';
import usePagination from 'src/hooks/usePagination';
import { InventoryCategoriesView } from '../view/inventory-categories-view';

const InventoryCategoriesController = () => {
  const tableKeys = ['Category', 'Product Count', 'Is Active', 'Created At', 'Updated At'];

  const [searchParams, setSearchParams] = useState({
    name: '',
    status: '',
  });
  const [initialValues, setInitialValues] = useState({ categoryTitle: '', isActive: true });

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
    }

    setIsOpenUpdate(!isOpenUpdate);
  };

  const handleAddInventoryCategory = async (values) => {};

  const handleUpdateInventoryCategory = async (values) => {};

  return (
    <InventoryCategoriesView
      tableHeaders={tableKeys}
      searchParams={searchParams}
      categories={[]}
      categoriesCount={0}
      pagination={pagination}
      initialValues={initialValues}
      isOpenAdd={isOpenAdd}
      isOpenUpdate={isOpenUpdate}
      isLoading={false}
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
