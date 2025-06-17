import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { SupplierDetailsView } from '../view/supplier-details-view';
import useSupplier from 'src/hooks/useSupplier';
import usePagination from 'src/hooks/usePagination';
import useInventory from 'src/hooks/useInventory';
import { PAY_METHOD_CASH } from 'src/constants/payment-methods';

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
    isLoadingSupplierItems,
    isLoadingAddStockBulk,
    fetchSupplierInfo,
    fetchSupplierStockMovements,
    fetchSupplierRecentPayments,
    createSupplierPayments,
    updateSupplier,
    addStockBulks,
    fetchSupplierItemsInfo,
  } = useSupplier();

  const { selectInvItems, isLoadingInvSelect, fetchItemsForSelection } = useInventory();

  const movementPagination = usePagination();
  const paymentsPagination = usePagination(5);

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

  const [initialValues, setInitialValues] = useState({});
  const [grmInitialValues, setGrmInitialValues] = useState({});

  const [selectedRow, setSelectedRow] = useState(null);

  const [isOpenUpdateSupplier, setIsOpenUpdateSupplier] = useState(false);
  const [isOpenAddPayment, setIsOpenAddPayment] = useState(false);
  const [isOpenAddBulk, setIsOpenAddBulk] = useState(false);

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
    if (!isOpenAddBulk) {
      setGrmInitialValues({
        stockPaymentMethod: PAY_METHOD_CASH,
        stockNotes: '',
        stockItems: supplierItems.map((item) => ({
          _id: item._id,
          stockQuantity: 0,
          stockTotalValue: 0,
          stockPaymentPaidAmount: 0,
        })),
      });
    } else {
      setGrmInitialValues({});
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

  useEffect(() => {
    if (id) {
      fetchSupplierInfo(id);
      fetchItemsForSelection();
      fetchSupplierItemsInfo(id);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (id) {
      fetchSupplierStockMovements(paramsMv);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movementPagination.limit, movementPagination.page]);

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
      selectedRow={selectedRow}
      selectInvItems={selectInvItems}
      supplier={supplier}
      supplierItems={supplierItems}
      supplierStockMovements={supplierStockMovements}
      supplierPayments={supplierPayments}
      supplierMovementCount={supplierMovementCount}
      supplierPaymentsCount={supplierPaymentsCount}
      isOpenUpdateSupplier={isOpenUpdateSupplier}
      isOpenAddPayment={isOpenAddPayment}
      isOpenAddBulk={isOpenAddBulk}
      isLoadingInvSelect={isLoadingInvSelect}
      isLoadingSupplier={isLoadingSupplier}
      isLoadingSupplierMovements={isLoadingSupplierMovements}
      isLoadingSupplierPayments={isLoadingSupplierPayments}
      isLoadingAddSupPayment={isLoadingAddSupPayment}
      isLoadingSupUpdate={isLoadingSupUpdate}
      isLoadingSupplierItems={isLoadingSupplierItems}
      isLoadingAddStockBulk={isLoadingAddStockBulk}
      movementPagination={movementPagination}
      paymentsPagination={paymentsPagination}
      handleToggleUpdateSupplier={handleToggleUpdateSupplier}
      handleToggleAddPayment={handleToggleAddPayment}
      handleToggleAddBulk={handleToggleAddBulk}
      handleAddSupplierPayment={handleAddSupplierPayment}
      handleUpdateSupplierInfo={handleUpdateSupplierInfo}
      handleAddBulkStock={handleAddBulkStock}
    />
  );
};

export default SupplierDetailsController;
