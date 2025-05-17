import React, { useEffect, useMemo, useState } from 'react';

import { SuppliersView } from '../view/suppliers-view';
import useSupplier from 'src/hooks/useSupplier';
import useInventory from 'src/hooks/useInventory';
import { NAVIGATION_ROUTES } from 'src/routes/navigation-routes';
import { useRouter } from 'src/routes/hooks';

const tableColumns = [
  'Supplier',
  'Contact Person',
  'Phone No',
  'Products',
  'Due Amount',
  'Notes',
  'Is Active',
];

const SuppliersController = () => {
  const router = useRouter();

  const { suppliers, suppliersCount, isLoadingSuppliers, getAllSuppliers, registerSupplier } =
    useSupplier();

  const { selectInvItems, isLoadingInvSelect, fetchItemsForSelection } = useInventory();

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const [isOpenAdd, setIsOpenAdd] = useState(false);

  const [selectedFilters, setSelectedFilters] = useState({
    name: '',
  });
  const [inputValueItemName, setInputValueItemName] = useState('');

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

  const handleInputChange = (event, newInputValue) => {
    setInputValueItemName(newInputValue);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setLimit(parseInt(event.target.value, 10));
  };

  const handleRowClick = (id) => {
    if (id) {
      router.push(`${NAVIGATION_ROUTES.suppliers.details.id}${id}`);
    }
  };

  const handleToggleAddDialog = () => {
    setIsOpenAdd(!isOpenAdd);
  };

  const handleAddSupplier = async (values) => {
    const isSuccess = await registerSupplier(values);

    if (isSuccess) {
      getAllSuppliers();
      handleToggleAddDialog();
    }
  };

  useEffect(() => {
    fetchItemsForSelection();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getAllSuppliers(queryParams);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit, memoizedSelectedFilters]);

  return (
    <SuppliersView
      tableColumns={tableColumns}
      suppliers={suppliers}
      suppliersCount={suppliersCount}
      selectInvItems={selectInvItems}
      inputValueItemName={inputValueItemName}
      selectedFilters={selectedFilters}
      limit={limit}
      page={page}
      isOpenAdd={isOpenAdd}
      isLoadingSuppliers={isLoadingSuppliers}
      isLoadingInvSelect={isLoadingInvSelect}
      handleChangeSearch={handleChangeSearch}
      handleInputChange={handleInputChange}
      handleRowClick={handleRowClick}
      handleToggleAddDialog={handleToggleAddDialog}
      handleAddSupplier={handleAddSupplier}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
      handleChangePage={handleChangePage}
    />
  );
};

export default SuppliersController;
