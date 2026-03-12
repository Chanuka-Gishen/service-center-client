import { useState } from 'react';
import { BrandsView } from '../view/brands-view';
import usePagination from 'src/hooks/usePagination';

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

  const [searchParams, setSearchParams] = useState({
    search: '',
    brandStatus: '',
    sortBy: 'brandName',
    sortOrder: 'asc',
  });

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

  return (
    <BrandsView
      tableTitles={tableKeys}
      searchParams={searchParams}
      brands={[]}
      brandsCount={0}
      pagination={pagination}
      isLoading={false}
      handleChangeSearchParam={handleChangeSearchParam}
      handleDeleteSearchParam={handleDeleteSearchParam}
      handleToggleAddDialog={null}
    />
  );
};

export default BrandsController;
