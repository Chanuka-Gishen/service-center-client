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
const returnColumns = [
  'GRN Code',
  'Item Code',
  'Item Name',
  'Qty',
  'Reason',
  'Total Value',
  'Type',
  'Status',
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
    supplierReturns,
    supplierReturnsCount,
    supplierItems,
    isLoadingSupplier,
    isLoadingSupUpdate,
    isLoadingSupplierGrnRecords,
    isLoadingSupplierPayments,
    isLoadingAddStockBulk,
    isLoadingSupReturns,
    isLoadingProcessReturns,
    isLoadingCancelReturns,
    isLoadingUpdateReturns,
    fetchSupplierInfo,
    fetchSupplierGrnRecords,
    fetchSupplierRecentPayments,
    fetchSupplierReturnItems,
    updateSupplier,
    addStockBulks,
    processItemReturnRecord,
    cancelItemReturnRecord,
    updateItemReturnRecord,
  } = useSupplier();

  const { selectItems, isLoadingSelect, fetchItemsForInvoiceSelection } = useInventory();

  const movementPagination = usePagination();
  const paymentsPagination = usePagination(5);

  const [initialValues, setInitialValues] = useState({});
  const [returnInitialValues, setReturnInitialValues] = useState({});
  const initValues = {
    grnReceivedDate: new Date(),
    grnDiscountAmount: 0,
    grnItems: [],
  };
  const [grmInitialValues, setGrmInitialValues] = useState(initValues);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedReturnRow, setSelectedReturnRow] = useState(null);

  const [filters, setFilters] = useState({ name: '', code: '' });
  const [returnFilters, setReturnFilters] = useState({ typeFilter: '', statusFilter: '' });

  const [isOpenUpdateSupplier, setIsOpenUpdateSupplier] = useState(false);
  const [isOpenAddBulk, setIsOpenAddBulk] = useState(false);
  const [isOpenProcessReturn, setIsOpenProcessReturn] = useState(false);
  const [isOpenCancelReturn, setIsOpenCancelReturn] = useState(false);
  const [isOpenUpdateReturn, setIsOpenUpdateReturn] = useState(false);

  const returnPagination = usePagination();

  //-----------------------------------------------------------------

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

  const returnQuery = {
    page: returnPagination.page,
    limit: returnPagination.limit,
    id,
    ...returnFilters,
  };

  //-----------------------------------------------------------------

  const handleChangeSearch = (e) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChangeSearchReturns = (e) => {
    setReturnFilters((prevFilters) => ({
      ...prevFilters,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDeleteSearchParamReturns = (filterName) => {
    setReturnFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: '',
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

  const handleSelectReturnRow = (row = null) => {
    setSelectedReturnRow(row);
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

  const handleSelectTab = (event, newValue) => {
    setSelectedTab(newValue);
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

  const handleToggleProcessReturn = () => {
    setIsOpenProcessReturn(!isOpenProcessReturn);
  };

  const handleToggleCancelReturn = () => {
    setIsOpenCancelReturn(!isOpenCancelReturn);
  };

  const handleToggleUpdateReturn = () => {
    if (!selectedReturnRow) return;

    if (isOpenUpdateReturn) {
      setReturnInitialValues({});
    } else {
      setReturnInitialValues({
        returnQty: selectedReturnRow.returnQty,
        returnReason: selectedReturnRow.returnReason,
        returnNote: selectedReturnRow.returnNote,
      });
    }

    setIsOpenUpdateReturn(!isOpenUpdateReturn);
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

  const handleProcessReturnItem = async (values) => {
    if (!selectedReturnRow) return;

    const data = {
      _id: selectedReturnRow._id,
      ...values,
    };

    const isSuccess = await processItemReturnRecord(data);

    if (isSuccess) {
      handleToggleProcessReturn();
      setSelectedReturnRow(null);
      fetchSupplierReturnItems(returnQuery);
      fetchSupplierRecentPayments(paramsPay);
    }
  };

  const handleCancelReturnItem = async () => {
    if (!selectedReturnRow) return;

    const params = {
      id: selectedReturnRow._id,
    };
    const isSuccess = await cancelItemReturnRecord(params);

    if (isSuccess) {
      handleToggleCancelReturn();
      setSelectedReturnRow(null);
      fetchSupplierReturnItems(returnQuery);
      fetchSupplierRecentPayments(paramsPay);
    }
  };

  const handleUpdateReturnItem = async (values) => {
    if (!selectedReturnRow) return;

    const data = {
      id: selectedReturnRow._id,
      ...values,
    };

    const isSuccess = await updateItemReturnRecord(data);

    if (isSuccess) {
      setSelectedReturnRow(null)
      handleToggleUpdateReturn();
      await fetchSupplierReturnItems(returnQuery);
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
    if (id && selectedTab === 0) {
      fetchSupplierGrnRecords(paramsMv);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movementPagination.limit, movementPagination.page, selectedTab]);

  useEffect(() => {
    if (id && selectedTab === 1) {
      fetchSupplierReturnItems(returnQuery);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [returnPagination.limit, returnPagination.page, selectedTab, returnFilters]);

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
      selectedTab={selectedTab}
      stockMvColumns={stockMvColumns}
      returnColumns={returnColumns}
      paymentColumns={paymentColumns}
      initialValues={initialValues}
      grmInitialValues={grmInitialValues}
      returnInitialValues={returnInitialValues}
      filters={filters}
      returnFilters={returnFilters}
      selectItems={selectItems}
      selectedReturnRow={selectedReturnRow}
      supplier={supplier}
      supplierItems={supplierItems}
      supplierGrnRecords={supplierGrnRecords}
      supplierPayments={supplierPayments}
      supplierGrnCount={supplierGrnCount}
      supplierPaymentsCount={supplierPaymentsCount}
      supplierReturns={supplierReturns}
      supplierReturnsCount={supplierReturnsCount}
      isOpenUpdateSupplier={isOpenUpdateSupplier}
      isOpenAddBulk={isOpenAddBulk}
      isOpenUpdateReturn={isOpenUpdateReturn}
      isOpenProcessReturn={isOpenProcessReturn}
      isOpenCancelReturn={isOpenCancelReturn}
      isLoadingSupplier={isLoadingSupplier}
      isLoadingSelect={isLoadingSelect}
      isLoadingSupplierGrnRecords={isLoadingSupplierGrnRecords}
      isLoadingSupplierPayments={isLoadingSupplierPayments}
      isLoadingSupReturns={isLoadingSupReturns}
      isLoadingSupUpdate={isLoadingSupUpdate}
      isLoadingAddStockBulk={isLoadingAddStockBulk}
      isLoadingProcessReturns={isLoadingProcessReturns}
      isLoadingCancelReturns={isLoadingCancelReturns}
      isLoadingUpdateReturns={isLoadingUpdateReturns}
      movementPagination={movementPagination}
      paymentsPagination={paymentsPagination}
      returnPagination={returnPagination}
      handleSelectTab={handleSelectTab}
      handleChangeSearch={handleChangeSearch}
      handleChangeSearchReturns={handleChangeSearchReturns}
      handleDeleteSearchParamReturns={handleDeleteSearchParamReturns}
      handleSelectReturnRow={handleSelectReturnRow}
      handleSelectItem={handleSelectItem}
      handleRowClick={handleRowClick}
      handleToggleUpdateSupplier={handleToggleUpdateSupplier}
      handleToggleAddBulk={handleToggleAddBulk}
      handleToggleProcessReturn={handleToggleProcessReturn}
      handleToggleCancelReturn={handleToggleCancelReturn}
      handleToggleUpdateReturn={handleToggleUpdateReturn}
      handleRemoveItem={handleRemoveItem}
      handleUpdateSupplierInfo={handleUpdateSupplierInfo}
      handleAddBulkStock={handleAddBulkStock}
      handleProcessReturnItem={handleProcessReturnItem}
      handleCancelReturnItem={handleCancelReturnItem}
      handleUpdateReturnItem={handleUpdateReturnItem}
    />
  );
};

export default SupplierDetailsController;
