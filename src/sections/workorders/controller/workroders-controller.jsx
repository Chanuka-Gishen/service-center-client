import React, { useEffect, useMemo, useState } from 'react';

import { WorkordersView } from '../view/workorders-view';
import useWorkOrder from 'src/hooks/useWorkorder';
import useInventory from 'src/hooks/useInventory';
import usePayment from 'src/hooks/usePayment';

const WorkordersController = () => {
  const {
    workOrders,
    isLoading,
    isLoadingJob,
    isLoadingUpdate,
    isLoadingUpdateAssignee,
    isLoadingComplete,
    isLoadingClosed,
    isDownloading,
    fetchActiveWorkOrders,
    fetchWorkOrderInfo,
    updateWorkOrder,
    updateWorkorderAssignees,
    updateWorkOrderToComplete,
    updateWorkOrderToClosed,
    downloadInvoice,
  } = useWorkOrder();
  const { selectItems, isLoadingSelect, fetchItemsForInvoiceSelection } = useInventory();
  const { isLoadingCreate, createPayment } = usePayment();

  const [selectedId, setSelectedId] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);

  const [showExQuantity, setShowExQuantity] = useState(false);

  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [isOpenSelectItemDlg, setIsOpenSelectItemDlg] = useState(false);
  const [isOpenCompleteDlg, setIsOpenCompleteDlg] = useState(false);
  const [isOpenClosedDlg, setIsOpenClosedDlg] = useState(false);
  const [isOpenPaymentDlg, setIsOpenPaymentDlg] = useState(false);

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
          workOrderMileage: selectedJob.workOrderMileage,
          workOrderType: selectedJob.workOrderType,
          workOrderServiceItems: selectedJob.workOrderServiceItems,
          workOrderCustomItems: selectedJob.workOrderCustomItems,
          workOrderCustomChargers: selectedJob.workOrderCustomChargers || [],
          workOrderServiceCharge: selectedJob.workOrderServiceCharge,
          workOrderOtherChargers: selectedJob.workOrderOtherChargers,
          workOrderNotes: selectedJob.workOrderNotes,
          workOrderDiscountPercentage: selectedJob.workOrderDiscountPercentage,
          workOrderDiscountCash: selectedJob.workOrderDiscountCash,
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

  const handleSelectJob = (job) => {
    setSelectedId(selectedId === job._id ? null : job._id);
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
      paymentworkOrder: selectedJob._id,
      paymentCustomer: selectedJob.workOrderCustomer._id,
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
    const isSucess = await updateWorkOrder(values);

    if (isSucess) {
      handleToggleUpdateDialog();
      await handleFetchWorkOrder();
    }
  };

  useEffect(() => {
    fetchItemsForInvoiceSelection(queryParams);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memoizedSelectedFilters]);

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
      workOrders={workOrders}
      selectItems={selectItems}
      selectedId={selectedId}
      selectedJob={selectedJob}
      initialValues={initialValues}
      selectedFilters={selectedFilters}
      showExQuantity={showExQuantity}
      isOpenUpdate={isOpenUpdate}
      isOpenSelectItemDlg={isOpenSelectItemDlg}
      isOpenCompleteDlg={isOpenCompleteDlg}
      isOpenClosedDlg={isOpenClosedDlg}
      isOpenPaymentDlg={isOpenPaymentDlg}
      isLoading={isLoading}
      isLoadingJob={isLoadingJob}
      isLoadingUpdate={isLoadingUpdate}
      isLoadingUpdateAssignee={isLoadingUpdateAssignee}
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
      handleUdpateWorkOrderStatusComplete={handleUdpateWorkOrderStatusComplete}
      handleUpdateWorkOrderStatusClosed={handleUpdateWorkOrderStatusClosed}
      handleAddPaymentRecord={handleAddPaymentRecord}
      handleUpdateWorkOrder={handleUpdateWorkOrder}
      handelUpdateWorkorderAssignees={handelUpdateWorkorderAssignees}
      downloadInvoice={downloadInvoice}
    />
  );
};

export default WorkordersController;
