import React, { useEffect, useMemo, useState } from 'react';
import { useFormik } from 'formik';

import { WorkordersView } from '../view/workorders-view';
import useWorkOrder from 'src/hooks/useWorkorder';
import useInventory from 'src/hooks/useInventory';
import { WorkOrderUpdateSchema } from 'src/schema/update-workorder-schema';

import commonUtil from 'src/utils/common-util';
import { useSnackbar } from 'notistack';
import { SNACKBAR_MESSAGE, SNACKBAR_VARIANT } from 'src/constants/snackbar-constants';

const WorkordersController = () => {
  const { enqueueSnackbar } = useSnackbar();
  const {
    workOrders,
    isLoading,
    isLoadingUpdate,
    isLoadingComplete,
    isLoadingClosed,
    fetchActiveWorkOrders,
    updateWorkOrder,
    updateWorkOrderToComplete,
    updateWorkOrderToClosed,
  } = useWorkOrder();
  const { selectItems, isLoadingSelect, fetchItemsForSelection } = useInventory();

  const [selectedJob, setSelectedJob] = useState(null);

  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [isOpenCompleteDlg, setIsOpenCompleteDlg] = useState(false);
  const [isOpenClosedDlg, setIsOpenClosedDlg] = useState(false);

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
      workOrderServiceItems: [],
      workOrderCustomItems: [],
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
        fetchItemsForSelection();
        formik.setValues({
          _id: selectedJob._id,
          workOrderMileage: selectedJob.workOrderMileage,
          workOrderServiceItems: selectedJob.workOrderServiceItems,
          workOrderCustomItems: selectedJob.workOrderCustomItems,
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

  const handleSelectJob = (job) => {
    setSelectedJob(selectedJob && selectedJob._id === job._id ? null : job);
  };

  const handleUdpateWorkOrderStatusComplete = async () => {
    const isSuccess = await updateWorkOrderToComplete(selectedJob._id);
    if (isSuccess) {
      handleToggleCompleteDlg();
      fetchActiveWorkOrders();
    }
  };

  const handleUpdateWorkOrderStatusClosed = async () => {
    const isSuccess = await updateWorkOrderToClosed(selectedJob._id);
    if (isSuccess) {
      handleToggleClosedDlg();
      fetchActiveWorkOrders();
    }
  };

  const handleUpdateWorkOrder = async () => {
    commonUtil.validateFormik(formik);

    if (formik.isValid && formik.dirty) {
      const isSucess = await updateWorkOrder(formik.values);

      if (isSucess) {
        handleToggleUpdateDialog();
        await fetchActiveWorkOrders();
        setSelectedJob(null)
      }
    } else {
      enqueueSnackbar(SNACKBAR_MESSAGE.FILL_REQUIRED_FIELDS, { variant: SNACKBAR_VARIANT.ERROR });
    }
  };

  useEffect(() => {
    fetchItemsForSelection(queryParams);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memoizedSelectedFilters]);

  useEffect(() => {
    fetchActiveWorkOrders();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <WorkordersView
      workOrders={workOrders}
      selectItems={selectItems}
      selectedJob={selectedJob}
      formik={formik}
      handleAddNewInventoryRow={handleAddNewInventoryRow}
      handleDeleteInventoryItem={handleDeleteInventoryItem}
      selectedFilters={selectedFilters}
      isOpenUpdate={isOpenUpdate}
      isOpenCompleteDlg={isOpenCompleteDlg}
      isOpenClosedDlg={isOpenClosedDlg}
      isLoading={isLoading}
      isLoadingUpdate={isLoadingUpdate}
      isLoadingSelect={isLoadingSelect}
      isLoadingComplete={isLoadingComplete}
      isLoadingClosed={isLoadingClosed}
      handleSelectJob={handleSelectJob}
      handleChangeSearch={handleChangeSearch}
      handleToggleUpdateDialog={handleToggleUpdateDialog}
      handleToggleCompleteDlg={handleToggleCompleteDlg}
      handleToggleClosedDlg={handleToggleClosedDlg}
      handleUdpateWorkOrderStatusComplete={handleUdpateWorkOrderStatusComplete}
      handleUpdateWorkOrderStatusClosed={handleUpdateWorkOrderStatusClosed}
      handleUpdateWorkOrder={handleUpdateWorkOrder}
    />
  );
};

export default WorkordersController;
