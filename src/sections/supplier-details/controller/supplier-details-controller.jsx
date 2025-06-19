import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { SupplierDetailsView } from '../view/supplier-details-view';
import useSupplier from 'src/hooks/useSupplier';
import usePagination from 'src/hooks/usePagination';
import useInventory from 'src/hooks/useInventory';
import { PAY_METHOD_CASH } from 'src/constants/payment-methods';
import debounce from 'lodash.debounce';

const stockMvColumns = [
  'Item',
  'Type',
  'Quantity',
  'Total Value',
  'Paid Amount',
  'Due Amount',
  'Date',
];
const paymentColumns = ['Method', 'Amount', 'Date'];

const SupplierDetailsController = () => {
  const { id } = useParams();

  const {
    supplier,
    supplierStockMovements,
    supplierMovementCount,
    supplierPayments,
    supplierPaymentsCount,
    supplierItems,
    isLoadingSupplier,
    isLoadingSupUpdate,
    isLoadingSupplierMovements,
    isLoadingSupplierPayments,
    isLoadingAddSupPayment,
    isLoadingAddStockBulk,
    fetchSupplierInfo,
    fetchSupplierStockMovements,
    fetchSupplierRecentPayments,
    createSupplierPayments,
    updateSupplier,
    addStockBulks,
  } = useSupplier();

  const { selectItems, isLoadingSelect, fetchItemsForInvoiceSelection } = useInventory();

  const movementPagination = usePagination();
  const paymentsPagination = usePagination(5);

  const [initialValues, setInitialValues] = useState({});
  const initValues = {
    stockPaymentMethod: PAY_METHOD_CASH,
    stockNotes: '',
    stockItems: [],
  };
  const [grmInitialValues, setGrmInitialValues] = useState(initValues);

  const [selectedRow, setSelectedRow] = useState(null);
  const [filters, setFilters] = useState({ name: '' });

  const [isOpenUpdateSupplier, setIsOpenUpdateSupplier] = useState(false);
  const [isOpenAddPayment, setIsOpenAddPayment] = useState(false);
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

    const exists = grmInitialValues.stockItems.some((item) => item._id === selectedItem._id);

    if (!exists) {
      const newItem = {
        _id: selectedItem._id,
        itemName: selectedItem.itemName,
        stockQuantity: 1,
        stockTotalValue: 0,
        stockPaymentPaidAmount: 0,
      };

      setGrmInitialValues((prev) => ({
        ...prev,
        stockItems: [...prev.stockItems, newItem],
      }));
    }
  };

  const handleRemoveItem = (_idToRemove) => {
    setGrmInitialValues((prev) => ({
      ...prev,
      stockItems: prev.stockItems.filter((item) => item._id !== _idToRemove),
    }));
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

  const handleToggleAddPayment = (row = null) => {
    setSelectedRow(row);
    setIsOpenAddPayment(!isOpenAddPayment);
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

  const handleAddSupplierPayment = async (values) => {
    const data = {
      paymentStockMovement: selectedRow._id,
      ...values,
    };
    const isSuccess = await createSupplierPayments(data);

    if (isSuccess) {
      handleToggleAddPayment();
      await fetchSupplierInfo(id);
      await fetchSupplierStockMovements(paramsMv);
      await fetchSupplierRecentPayments(paramsPay);
    }
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
      await fetchSupplierStockMovements(paramsMv);
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
      fetchSupplierStockMovements(paramsMv);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movementPagination.limit, movementPagination.page]);

  // Trigger fetch when input changes
  useEffect(() => {
    if (filters.name) {
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
      selectedRow={selectedRow}
      selectItems={selectItems}
      supplier={supplier}
      supplierItems={supplierItems}
      supplierStockMovements={supplierStockMovements}
      supplierPayments={supplierPayments}
      supplierMovementCount={supplierMovementCount}
      supplierPaymentsCount={supplierPaymentsCount}
      isOpenUpdateSupplier={isOpenUpdateSupplier}
      isOpenAddPayment={isOpenAddPayment}
      isOpenAddBulk={isOpenAddBulk}
      isLoadingSupplier={isLoadingSupplier}
      isLoadingSelect={isLoadingSelect}
      isLoadingSupplierMovements={isLoadingSupplierMovements}
      isLoadingSupplierPayments={isLoadingSupplierPayments}
      isLoadingAddSupPayment={isLoadingAddSupPayment}
      isLoadingSupUpdate={isLoadingSupUpdate}
      isLoadingAddStockBulk={isLoadingAddStockBulk}
      movementPagination={movementPagination}
      paymentsPagination={paymentsPagination}
      handleChangeSearch={handleChangeSearch}
      handleSelectItem={handleSelectItem}
      handleToggleUpdateSupplier={handleToggleUpdateSupplier}
      handleToggleAddPayment={handleToggleAddPayment}
      handleToggleAddBulk={handleToggleAddBulk}
      handleRemoveItem={handleRemoveItem}
      handleAddSupplierPayment={handleAddSupplierPayment}
      handleUpdateSupplierInfo={handleUpdateSupplierInfo}
      handleAddBulkStock={handleAddBulkStock}
    />
  );
};

export default SupplierDetailsController;
