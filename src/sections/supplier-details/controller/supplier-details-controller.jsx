import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { SupplierDetailsView } from '../view/supplier-details-view';
import useSupplier from 'src/hooks/useSupplier';
import usePagination from 'src/hooks/usePagination';
import useInventory from 'src/hooks/useInventory';

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
    isLoadingSupplier,
    isLoadingSupUpdate,
    isLoadingSupplierMovements,
    isLoadingSupplierPayments,
    isLoadingAddSupPayment,
    fetchSupplierInfo,
    fetchSupplierStockMovements,
    fetchSupplierRecentPayments,
    createSupplierPayments,
    updateSupplier,
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

  const [selectedRow, setSelectedRow] = useState(null);

  const [isOpenUpdateSupplier, setIsOpenUpdateSupplier] = useState(false);
  const [isOpenAddPayment, setIsOpenAddPayment] = useState(false);

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
    }
  };

  useEffect(() => {
    if (id) {
      fetchSupplierInfo(id);
      fetchItemsForSelection();
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
      selectedRow={selectedRow}
      selectInvItems={selectInvItems}
      supplier={supplier}
      supplierStockMovements={supplierStockMovements}
      supplierPayments={supplierPayments}
      supplierMovementCount={supplierMovementCount}
      supplierPaymentsCount={supplierPaymentsCount}
      isOpenUpdateSupplier={isOpenUpdateSupplier}
      isOpenAddPayment={isOpenAddPayment}
      isLoadingInvSelect={isLoadingInvSelect}
      isLoadingSupplier={isLoadingSupplier}
      isLoadingSupplierMovements={isLoadingSupplierMovements}
      isLoadingSupplierPayments={isLoadingSupplierPayments}
      isLoadingAddSupPayment={isLoadingAddSupPayment}
      isLoadingSupUpdate={isLoadingSupUpdate}
      movementPagination={movementPagination}
      paymentsPagination={paymentsPagination}
      handleToggleUpdateSupplier={handleToggleUpdateSupplier}
      handleToggleAddPayment={handleToggleAddPayment}
      handleAddSupplierPayment={handleAddSupplierPayment}
      handleUpdateSupplierInfo={handleUpdateSupplierInfo}
    />
  );
};

export default SupplierDetailsController;
