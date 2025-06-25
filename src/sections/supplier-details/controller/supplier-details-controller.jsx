import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { SupplierDetailsView } from '../view/supplier-details-view';
import useSupplier from 'src/hooks/useSupplier';
import usePagination from 'src/hooks/usePagination';
import useInventory from 'src/hooks/useInventory';
import { PAY_METHOD_CASH } from 'src/constants/payment-methods';
import debounce from 'lodash.debounce';
import { useRouter } from 'src/routes/hooks';
import { NAVIGATION_ROUTES } from 'src/routes/navigation-routes';

const stockMvColumns = [
  'Code',
  'Total Value',
  'Paid Amount',
  'Due Amount',
  'Discount',
  'Payment Status',
  'Created At',
];
const paymentColumns = ['Method', 'Amount', 'Date'];

const SupplierDetailsController = () => {
  const { id } = useParams();

  const router = useRouter();

  const {
    supplier,
    supplierGrnRecords,
    supplierGrnCount,
    supplierPayments,
    supplierPaymentsCount,
    supplierItems,
    isLoadingSupplier,
    isLoadingSupUpdate,
    isLoadingSupplierGrnRecords,
    isLoadingSupplierPayments,
    isLoadingAddStockBulk,
    fetchSupplierInfo,
    fetchSupplierGrnRecords,
    fetchSupplierRecentPayments,
    updateSupplier,
    addStockBulks,
  } = useSupplier();

  const { selectItems, isLoadingSelect, fetchItemsForInvoiceSelection } = useInventory();

  const movementPagination = usePagination();
  const paymentsPagination = usePagination(5);

  const [initialValues, setInitialValues] = useState({});
  const initValues = {
    grnReceivedDate: new Date(),
    grnDiscountAmount: 0,
    grnItems: [],
  };
  const [grmInitialValues, setGrmInitialValues] = useState(initValues);

  const [filters, setFilters] = useState({ name: '', code: '' });

  const [isOpenUpdateSupplier, setIsOpenUpdateSupplier] = useState(false);
  const [isOpenAddBulk, setIsOpenAddBulk] = useState(false);

  const paramsMv = {
    id,
    page: movementPagination.page,
    limit: movementPagination.limit,
  };

  const paramsPay = {
    id,
    page: paymentsPagination.page,
    limit: paymentsPagination.limit,
  };

  const paramsItemOptions = {
    ...filters,
  };

  const handleChangeSearch = (e) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSelectItem = (selectedItem) => {
    if (!selectedItem) return;

    const exists = grmInitialValues.grnItems.some((item) => item._id === selectedItem._id);

    if (!exists) {
      const newItem = {
        _id: selectedItem._id,
        itemName: selectedItem.itemName,
        stockQuantity: 1,
        stockUnitPrice: selectedItem.itemBuyingPrice,
      };

      setGrmInitialValues((prev) => ({
        ...prev,
        grnItems: [...prev.grnItems, newItem],
      }));
    }
  };

  const handleRemoveItem = (_idToRemove) => {
    setGrmInitialValues((prev) => ({
      ...prev,
      grnItems: prev.grnItems.filter((item) => item._id !== _idToRemove),
    }));
  };

  const handleRowClick = (rowId) => {
    if (rowId && id) {
      router.push(`${NAVIGATION_ROUTES.suppliers.details.id}${id}/${rowId}`);
    }
  };

  const handleToggleUpdateSupplier = () => {
    if (!isOpenUpdateSupplier) {
      setInitialValues({
        supplierName: supplier.supplierName,
        supplierContactPerson: supplier.supplierContactPerson,
        supplierPhone: supplier.supplierPhone,
        supplierProducts: supplier.supplierProducts,
        supplierNotes: supplier.supplierNotes,
        supplierIsActive: supplier.supplierIsActive,
      });
    }
    setIsOpenUpdateSupplier(!isOpenUpdateSupplier);
  };

  const handleToggleAddBulk = () => {
    if (isOpenAddBulk) {
      setFilters({
        name: '',
      });
      setGrmInitialValues(initValues);
    }
    setIsOpenAddBulk(!isOpenAddBulk);
  };

  const handleUpdateSupplierInfo = async (values) => {
    const isSuccess = await updateSupplier(supplier._id, values);

    if (isSuccess) {
      handleToggleUpdateSupplier();
      fetchSupplierInfo(id);
      fetchSupplierItemsInfo(id);
    }
  };

  const handleAddBulkStock = async (values) => {
    const isSuccess = await addStockBulks(id, values);

    if (isSuccess) {
      handleToggleAddBulk();
      await fetchSupplierInfo(id);
      await fetchSupplierGrnRecords(paramsMv);
      await fetchSupplierRecentPayments(paramsPay);
    }
  };

  // Debounced API call
  const debouncedFetch = useMemo(() => debounce(fetchItemsForInvoiceSelection, 500), []);

  useEffect(() => {
    if (!id) return;

    fetchSupplierInfo(id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (id) {
      fetchSupplierGrnRecords(paramsMv);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movementPagination.limit, movementPagination.page]);

  // Trigger fetch when input changes
  useEffect(() => {
    if (filters.name || filters.code) {
      debouncedFetch(paramsItemOptions);
    }
    return () => debouncedFetch.cancel();
  }, [filters, debouncedFetch]);

  useEffect(() => {
    if (id) {
      fetchSupplierRecentPayments(paramsPay);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentsPagination.limit, paymentsPagination.page]);

  return (
    <SupplierDetailsView
      stockMvColumns={stockMvColumns}
      paymentColumns={paymentColumns}
      initialValues={initialValues}
      grmInitialValues={grmInitialValues}
      filters={filters}
      selectItems={selectItems}
      supplier={supplier}
      supplierItems={supplierItems}
      supplierGrnRecords={supplierGrnRecords}
      supplierPayments={supplierPayments}
      supplierGrnCount={supplierGrnCount}
      supplierPaymentsCount={supplierPaymentsCount}
      isOpenUpdateSupplier={isOpenUpdateSupplier}
      isOpenAddBulk={isOpenAddBulk}
      isLoadingSupplier={isLoadingSupplier}
      isLoadingSelect={isLoadingSelect}
      isLoadingSupplierGrnRecords={isLoadingSupplierGrnRecords}
      isLoadingSupplierPayments={isLoadingSupplierPayments}
      isLoadingSupUpdate={isLoadingSupUpdate}
      isLoadingAddStockBulk={isLoadingAddStockBulk}
      movementPagination={movementPagination}
      paymentsPagination={paymentsPagination}
      handleChangeSearch={handleChangeSearch}
      handleSelectItem={handleSelectItem}
      handleRowClick={handleRowClick}
      handleToggleUpdateSupplier={handleToggleUpdateSupplier}
      handleToggleAddBulk={handleToggleAddBulk}
      handleRemoveItem={handleRemoveItem}
      handleUpdateSupplierInfo={handleUpdateSupplierInfo}
      handleAddBulkStock={handleAddBulkStock}
    />
  );
};

export default SupplierDetailsController;
