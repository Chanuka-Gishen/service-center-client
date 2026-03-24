import React, { useEffect, useMemo, useState } from 'react';

import { WorkordersView } from '../view/workorders-view';
import useWorkOrder from 'src/hooks/useWorkorder';
import useInventory from 'src/hooks/useInventory';
import usePayment from 'src/hooks/usePayment';
import { WO_STATUS_OPEN } from 'src/constants/workorderStatus';

const chargeInitialValue = {
  chargeName: '',
  chargeAmount: 0,
};

const WorkordersController = () => {
  const {
    workorders,
    isLoading,
    isLoadingJob,
    isLoadingUpdate,
    isLoadingUpdateAssignee,
    isLoadingAddWorkorderItem,
    isLoadingAddWorkorderCharge,
    isLoadingUpdateWorkorderItem,
    isLoadingUpdateWorkorderCharge,
    isLoadingDeleteWorkorderItem,
    isLoadingDeleteWorkorderCharge,
    isLoadingComplete,
    isLoadingClosed,
    isDownloading,
    fetchActiveWorkOrders,
    fetchWorkOrderInfo,
    addWorkorderItem,
    addWorkorderCharge,
    updateWorkOrder,
    updateWorkorderAssignees,
    updateWorkorderItem,
    updateWorkorderCharge,
    updateWorkOrderToComplete,
    updateWorkOrderToClosed,
    deleteWorkorderItem,
    deleteWorkorderCharge,
    downloadInvoice,
  } = useWorkOrder();
  const { selectItems, isLoadingSelect, fetchItemsForInvoiceSelection } = useInventory();
  const { isLoadingCreate, createPayment } = usePayment();

  const [itemInitialValues, setItemInitialValues] = useState({});
  const [chargeInitialValues, setChargeInitialValues] = useState(chargeInitialValue);

  const [selectedId, setSelectedId] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  const [showExQuantity, setShowExQuantity] = useState(false);

  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [isOpenSelectItemDlg, setIsOpenSelectItemDlg] = useState(false);
  const [isOpenCompleteDlg, setIsOpenCompleteDlg] = useState(false);
  const [isOpenClosedDlg, setIsOpenClosedDlg] = useState(false);
  const [isOpenPaymentDlg, setIsOpenPaymentDlg] = useState(false);
  const [isOpenItemUpdateDlg, setIsOpenItemUpdateDlg] = useState(false);
  const [isOpenItemDeleteDlg, setIsOpenItemDeleteDlg] = useState(false);
  const [isOpenChargeAddDlg, setIsOpenChargeAddDlg] = useState(false);
  const [isOpenChargeUpdateDlg, setIsOpenChargeUpdateDlg] = useState(false);
  const [isOpenChargeDeleteDlg, setIsOpenChargeDeleteDlg] = useState(false);

  const [selectedFilters, setSelectedFilters] = useState({
    name: '',
    code: '',
  });

  const memoizedSelectedFilters = useMemo(() => selectedFilters, [selectedFilters]);

  //------------------
  const queryParams = { ...selectedFilters };
  //------------------
  const [initialValues, setInitialValues] = useState({});

  const handleChangeSearch = (e) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [e.target.name]: e.target.value,
    }));
  };

  const handleToggleShowExQuantity = () => {
    setShowExQuantity(!showExQuantity);
  };

  const handleToggleUpdateDialog = () => {
    if (selectedJob) {
      if (isOpenUpdate) {
        setInitialValues({});
      } else {
        fetchItemsForInvoiceSelection();
        setInitialValues({
          _id: selectedJob._id,
          workorderMileage: selectedJob.workorderMileage,
          workorderType: selectedJob.workorderType,
          workorderNotes: selectedJob.workorderNotes,
          workorderDiscountPercentage: selectedJob.workorderDiscountPercentage,
          workorderDiscountCash: selectedJob.workorderDiscountCash,
        });
      }
      setIsOpenUpdate(!isOpenUpdate);
    }
  };

  const handleToggleSelectItemDialog = () => {
    setIsOpenSelectItemDlg(!isOpenSelectItemDlg);
  };

  const handleToggleCompleteDlg = () => {
    setIsOpenCompleteDlg(!isOpenCompleteDlg);
  };

  const handleToggleClosedDlg = () => {
    setIsOpenClosedDlg(!isOpenClosedDlg);
  };

  const handleTogglePaymentDlg = () => {
    setIsOpenPaymentDlg(!isOpenPaymentDlg);
  };

  const handleToggleItemUpdateDialog = (values) => {
    if (selectedJob && selectedJob.workorderStatus != WO_STATUS_OPEN) return;

    if (!isOpenItemUpdateDlg) {
      if (!values) return;

      setItemInitialValues({
        _id: values._id,
        quantity: values.quantity,
        unitPrice: values.unitPrice,
      });
    } else {
      setItemInitialValues({});
    }

    setIsOpenItemUpdateDlg(!isOpenItemUpdateDlg);
  };

  const handleToggleItemDeleteDialog = (id = null) => {
    if (selectedJob && selectedJob.workorderStatus != WO_STATUS_OPEN) return;

    setSelectedRow(id);

    setIsOpenItemDeleteDlg(!isOpenItemDeleteDlg);
  };

  const handleToggleChargeAddDialog = () => {
    setIsOpenChargeAddDlg(!isOpenChargeAddDlg);
  };

  const handleToggleChargeUpdateDialog = (values = null) => {
    if (selectedJob && selectedJob.workorderStatus != WO_STATUS_OPEN) return;

    if (!isOpenChargeUpdateDlg && values) {
      setSelectedRow(values._id);
      setChargeInitialValues({
        chargeName: values.chargeName,
        chargeAmount: values.chargeAmount,
      });
    } else {
      setChargeInitialValues(chargeInitialValue);
    }

    setIsOpenChargeUpdateDlg(!isOpenChargeUpdateDlg);
  };

  const handleToggleChargeDeleteDialog = (id = null) => {
    if (selectedJob && selectedJob.workorderStatus != WO_STATUS_OPEN) return;

    setSelectedRow(id);

    setIsOpenChargeDeleteDlg(!isOpenChargeDeleteDlg);
  };

  const handleSelectJob = async (job) => {
    if (selectedId === job._id) {
      setSelectedId(null);
      setSelectedJob(null);
    } else {
      setSelectedId(job._id);
      await handleFetchWorkOrder();
    }
    //setSelectedId(selectedId === job._id ? null : job._id);
  };

  const handleUdpateWorkOrderStatusComplete = async () => {
    const isSuccess = await updateWorkOrderToComplete(selectedJob._id);
    if (isSuccess) {
      handleToggleCompleteDlg();
      handleFetchWorkOrder();
    }
  };

  const handleUpdateWorkOrderStatusClosed = async () => {
    const isSuccess = await updateWorkOrderToClosed(selectedJob._id);
    if (isSuccess) {
      handleToggleClosedDlg();
      setSelectedId(null);
      fetchActiveWorkOrders();
    }
  };

  const handleAddPaymentRecord = async (values) => {
    const data = {
      paymentWorkorder: selectedJob._id,
      paymentCustomer: selectedJob.workorderCustomer._id,
      ...values,
    };
    const isSuccess = await createPayment(data);

    if (isSuccess) {
      handleTogglePaymentDlg();
      handleFetchWorkOrder();
    }
  };

  const handleFetchWorkOrder = async () => {
    if (selectedId) {
      const result = await fetchWorkOrderInfo(selectedId);
      setSelectedJob(result);
    }
  };

  const handelUpdateWorkorderAssignees = async (values) => {
    const isSuccess = await updateWorkorderAssignees(selectedId, values);

    if (isSuccess) {
      await fetchActiveWorkOrders();
      setSelectedJob(null);
      setSelectedId(null);
    }
  };

  const handleUpdateWorkOrder = async (values) => {
    if (!values) return;

    const isSucess = await updateWorkOrder(values);

    if (isSucess) {
      handleToggleUpdateDialog();
      await handleFetchWorkOrder();
    }
  };

  const handleAddWorkorderItem = async (values) => {
    if (!values) return;

    const data = {
      workorder: selectedJob._id,
      inventoryItem: values._id,
      inventoryItemName: values.itemName,
      quantity: 1,
      unitPrice: values.itemSellingPrice,
      cashDiscount: 0,
      totalPrice: 1 * values.itemSellingPrice,
    };

    const isSucess = await addWorkorderItem(data);

    if (isSucess) {
      await handleFetchWorkOrder();
    }
  };

  const handleUpdateWorkorderItem = async (values) => {
    const isSuccess = await updateWorkorderItem(values);

    if (isSuccess) {
      handleToggleItemUpdateDialog();
      handleFetchWorkOrder();
    }
  };

  const handleDeleteWorkorderItem = async (values) => {
    if (!selectedRow) return;

    const isSuccess = await deleteWorkorderItem(selectedRow);

    if (isSuccess) {
      handleToggleItemDeleteDialog();
      handleFetchWorkOrder();
    }
  };

  const handleAddWorkorderCharge = async (values) => {
    const data = { workorder: selectedJob._id, ...values };

    const isSuccess = await addWorkorderCharge(data);

    if (isSuccess) {
      handleToggleChargeAddDialog();
      handleFetchWorkOrder();
    }
  };

  const handleUpdateWorkorderCharge = async (values, resetForm) => {
    const data = { _id: selectedRow, ...values };

    const isSuccess = await updateWorkorderCharge(data);

    if (isSuccess) {
      resetForm();
      handleToggleChargeUpdateDialog();
      handleFetchWorkOrder();
    }
  };

  const handleDeleteWorkorderCharge = async () => {
    const isSuccess = await deleteWorkorderCharge(selectedRow);

    if (isSuccess) {
      handleToggleChargeDeleteDialog();
      handleFetchWorkOrder();
    }
  };

  useEffect(() => {
    if (isOpenSelectItemDlg) fetchItemsForInvoiceSelection(queryParams);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memoizedSelectedFilters, isOpenSelectItemDlg]);

  useEffect(() => {
    handleFetchWorkOrder();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId]);

  useEffect(() => {
    fetchActiveWorkOrders();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <WorkordersView
      workorders={workorders}
      selectItems={selectItems}
      selectedId={selectedId}
      selectedJob={selectedJob}
      initialValues={initialValues}
      itemInitialValues={itemInitialValues}
      chargeInitialValues={chargeInitialValues}
      selectedFilters={selectedFilters}
      showExQuantity={showExQuantity}
      isOpenUpdate={isOpenUpdate}
      isOpenSelectItemDlg={isOpenSelectItemDlg}
      isOpenCompleteDlg={isOpenCompleteDlg}
      isOpenClosedDlg={isOpenClosedDlg}
      isOpenPaymentDlg={isOpenPaymentDlg}
      isOpenItemUpdateDlg={isOpenItemUpdateDlg}
      isOpenItemDeleteDlg={isOpenItemDeleteDlg}
      isOpenChargeAddDlg={isOpenChargeAddDlg}
      isOpenChargeUpdateDlg={isOpenChargeUpdateDlg}
      isOpenChargeDeleteDlg={isOpenChargeDeleteDlg}
      isLoading={isLoading}
      isLoadingJob={isLoadingJob}
      isLoadingUpdate={isLoadingUpdate}
      isLoadingUpdateAssignee={isLoadingUpdateAssignee}
      isLoadingAddWorkorderItem={isLoadingAddWorkorderItem}
      isLoadingUpdateWorkorderItem={isLoadingUpdateWorkorderItem}
      isLoadingDeleteWorkorderItem={isLoadingDeleteWorkorderItem}
      isLoadingAddWorkorderCharge={isLoadingAddWorkorderCharge}
      isLoadingUpdateWorkorderCharge={isLoadingUpdateWorkorderCharge}
      isLoadingDeleteWorkorderCharge={isLoadingDeleteWorkorderCharge}
      isLoadingSelect={isLoadingSelect}
      isLoadingComplete={isLoadingComplete}
      isLoadingClosed={isLoadingClosed}
      isLoadingCreate={isLoadingCreate}
      isDownloading={isDownloading}
      handleSelectJob={handleSelectJob}
      handleChangeSearch={handleChangeSearch}
      handleToggleShowExQuantity={handleToggleShowExQuantity}
      handleToggleUpdateDialog={handleToggleUpdateDialog}
      handleToggleSelectItemDialog={handleToggleSelectItemDialog}
      handleToggleCompleteDlg={handleToggleCompleteDlg}
      handleToggleClosedDlg={handleToggleClosedDlg}
      handleTogglePaymentDlg={handleTogglePaymentDlg}
      handleToggleItemUpdateDialog={handleToggleItemUpdateDialog}
      handleToggleItemDeleteDialog={handleToggleItemDeleteDialog}
      handleToggleChargeAddDialog={handleToggleChargeAddDialog}
      handleToggleChargeUpdateDialog={handleToggleChargeUpdateDialog}
      handleToggleChargeDeleteDialog={handleToggleChargeDeleteDialog}
      handleAddWorkorderItem={handleAddWorkorderItem}
      handleUdpateWorkOrderStatusComplete={handleUdpateWorkOrderStatusComplete}
      handleUpdateWorkOrderStatusClosed={handleUpdateWorkOrderStatusClosed}
      handleAddPaymentRecord={handleAddPaymentRecord}
      handleUpdateWorkOrder={handleUpdateWorkOrder}
      handleUpdateWorkorderItem={handleUpdateWorkorderItem}
      handleDeleteWorkorderItem={handleDeleteWorkorderItem}
      handleAddWorkorderCharge={handleAddWorkorderCharge}
      handleUpdateWorkorderCharge={handleUpdateWorkorderCharge}
      handleDeleteWorkorderCharge={handleDeleteWorkorderCharge}
      handelUpdateWorkorderAssignees={handelUpdateWorkorderAssignees}
      downloadInvoice={downloadInvoice}
    />
  );
};

export default WorkordersController;
