import { useEffect, useState } from 'react';
import { BrandsView } from '../view/brands-view';
import usePagination from 'src/hooks/usePagination';
import { BRAND_STS_ACTIVE } from 'src/constants/common-constants';
import useBrand from 'src/hooks/useBrand';

const BrandsController = () => {
  const tableKeys = [
    'Brand',
    'Manufacturer',
    'Description',
    'Products Count',
    'Status',
    'Created At',
    'Updated At',
  ];

  const {
    brands,
    brandsCount,
    isLoadingBrands,
    isLoadingAddBrands,
    isLoadingUpdateBrands,
    getBrands,
    addBrand,
    updateBrand,
  } = useBrand();

  const [searchParams, setSearchParams] = useState({
    search: '',
    brandStatus: '',
    sortBy: 'brandName',
    sortOrder: 'asc',
  });
  const [initialValues, setInitialValues] = useState({
    brandName: '',
    brandDescription: '',
    brandManufacturer: '',
    brandIsActive: true,
  });
  const [selectedRow, setSelectedRow] = useState(null);

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
    setSelectedRow(row);
    if (!isOpenUpdate && row) {
      setInitialValues({
        brandName: row.brandName,
        brandDescription: row.brandDescription,
        brandManufacturer: row.brandManufacturer,
        brandIsActive: row.brandIsActive,
      });
    }

    setIsOpenUpdate(!isOpenUpdate);
  };

  const handleAddBrand = async (values) => {
    const result = await addBrand(values);

    if (result) {
      handleToggleAddDialog();
      getBrands(queryParams);
    }
  };

  const handleUpdateBrand = async (values) => {
    const result = await updateBrand(values, selectedRow._id);

    if (result) {
      setSelectedRow(null);
      handleToggleUpdateDialog();
      getBrands(queryParams);
    }
  };

  useEffect(() => {
    getBrands(queryParams);
  }, [
    pagination.limit,
    pagination.page,
    searchParams.search,
    searchParams.brandStatus,
    searchParams.sortBy,
    searchParams.sortOrder,
  ]);

  return (
    <BrandsView
      tableTitles={tableKeys}
      searchParams={searchParams}
      brands={brands}
      brandsCount={brandsCount}
      pagination={pagination}
      initialValues={initialValues}
      isOpenAdd={isOpenAdd}
      isOpenUpdate={isOpenUpdate}
      isLoading={isLoadingBrands}
      isLoadingAddBrands={isLoadingAddBrands}
      isLoadingUpdateBrands={isLoadingUpdateBrands}
      handleChangeSearchParam={handleChangeSearchParam}
      handleDeleteSearchParam={handleDeleteSearchParam}
      handleToggleAddDialog={handleToggleAddDialog}
      handleToggleUpdateDialog={handleToggleUpdateDialog}
      handleAddBrand={handleAddBrand}
      handleUpdateBrand={handleUpdateBrand}
    />
  );
};

export default BrandsController;
