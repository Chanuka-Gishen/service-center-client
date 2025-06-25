import React, { useEffect, useMemo, useState } from 'react';
import { useFormik } from 'formik';

import { WorkordersView } from '../view/workorders-view';
import useWorkOrder from 'src/hooks/useWorkorder';
import useInventory from 'src/hooks/useInventory';
import { WorkOrderUpdateSchema } from 'src/schema/update-workorder-schema';

import commonUtil from 'src/utils/common-util';
import { useSnackbar } from 'notistack';
import { SNACKBAR_MESSAGE, SNACKBAR_VARIANT } from 'src/constants/snackbar-constants';
import usePayment from 'src/hooks/usePayment';
import { WO_TYPE_SERVICE } from 'src/constants/workorder-types';

const WorkordersController = () => {
  const { enqueueSnackbar } = useSnackbar();
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

  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
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

  const formik = useFormik({
    initialValues: {
      workOrderMileage: 0,
      workOrderType: WO_TYPE_SERVICE,
      workOrderServiceItems: [],
      workOrderCustomItems: [],
      workOrderCustomChargers: [],
      workOrderServiceCharge: 0,
      workOrderOtherChargers: 0,
      workOrderNotes: '',
      workOrderDiscountPercentage: 0,
      workOrderDiscountCash: 0,
    },
    validationSchema: WorkOrderUpdateSchema,
    onSubmit: () => {
      null;
    },
    enableReinitialize: true,
  });

  const handleAddNewInventoryRow = (data) => {
    formik.setValues({
      ...formik.values,
      workOrderServiceItems: [
        ...formik.values.workOrderServiceItems,
        {
          inventoryItem: data._id,
          inventoryItemName: data.itemName,
          quantity: 1,
          exQuantity: 0,
          unitPrice: data.itemSellingPrice,
          totalPrice: 0,
        },
      ],
    });
  };

  const handleDeleteInventoryItem = (index) => {
    // Create copies of the current items array
    const updatedChargers = [...formik.values.workOrderServiceItems];
    const updatedErrors = formik.errors.workOrderServiceItems
      ? [...formik.errors.workOrderServiceItems]
      : [];
    const updatedTouched = formik.touched.workOrderServiceItems
      ? [...formik.touched.workOrderServiceItems]
      : [];

    // Remove the entry at the specified index from each array
    updatedChargers.splice(index, 1);
    if (updatedErrors.length > index) {
      updatedErrors.splice(index, 1);
    }
    if (updatedTouched.length > index) {
      updatedTouched.splice(index, 1);
    }

    // Update the form values with the modified arrays
    formik.setValues({
      ...formik.values,
      workOrderServiceItems: updatedChargers,
    });

    // Update the errors and touched states
    if (formik.errors.workOrderServiceItems) {
      formik.setErrors({
        ...formik.errors,
        workOrderServiceItems: updatedErrors,
      });
    }

    if (formik.touched.workOrderServiceItems) {
      formik.setTouched({
        ...formik.touched,
        workOrderServiceItems: updatedTouched,
      });
    }
  };

  const handleChangeSearch = (e) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [e.target.name]: e.target.value,
    }));
  };

  const handleToggleUpdateDialog = () => {
    if (selectedJob) {
      if (isOpenUpdate) {
        formik.resetForm();
      } else {
        fetchItemsForInvoiceSelection();
        formik.setValues({
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

  const handleUpdateWorkOrder = async () => {
    commonUtil.validateFormik(formik);

    if (formik.isValid && formik.dirty) {
      const isSucess = await updateWorkOrder(formik.values);

      if (isSucess) {
        handleToggleUpdateDialog();
        await fetchActiveWorkOrders();
        setSelectedJob(null);
        setSelectedId(null);
      }
    } else {
      enqueueSnackbar(SNACKBAR_MESSAGE.FILL_REQUIRED_FIELDS, { variant: SNACKBAR_VARIANT.ERROR });
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
      formik={formik}
      handleAddNewInventoryRow={handleAddNewInventoryRow}
      handleDeleteInventoryItem={handleDeleteInventoryItem}
      selectedFilters={selectedFilters}
      isOpenUpdate={isOpenUpdate}
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
      handleToggleUpdateDialog={handleToggleUpdateDialog}
      handleToggleCompleteDlg={handleToggleCompleteDlg}
      handleToggleClosedDlg={handleToggleClosedDlg}
      handleTogglePaymentDlg={handleTogglePaymentDlg}
      handleUdpateWorkOrderStatusComplete={handleUdpateWorkOrderStatusComplete}
      handleUpdateWorkOrderStatusClosed={handleUpdateWorkOrderStatusClosed}
      handleAddPaymentRecord={handleAddPaymentRecord}
      handelUpdateWorkorderAssignees={handelUpdateWorkorderAssignees}
      handleUpdateWorkOrder={handleUpdateWorkOrder}
      downloadInvoice={downloadInvoice}
    />
  );
};

export default WorkordersController;
