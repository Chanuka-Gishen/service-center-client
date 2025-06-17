import React, { useEffect, useState } from 'react';
import { WorkorderView } from '../view/workorder-details-view';
import { useLocation } from 'react-router-dom';
import useWorkOrder from 'src/hooks/useWorkorder';
import usePayment from 'src/hooks/usePayment';

const WorkorderController = () => {
  const location = useLocation();

  const { id } = location.state || {};

  const {
    fetchWorkOrderInfo,
    isLoadingJob,
    isLoadingUpdateAssignee,
    isDownloading,
    updateWorkorderAssignees,
    downloadInvoice,
  } = useWorkOrder();
  const {
    woPayments,
    isLoadingWoPayments,
    isLoadingCreate,
    isLoadingDeleteWoPay,
    isLoadingRefund,
    isLoadingPaymentComplete,
    createPayment,
    createRefoundRecord,
    fetchWorkorderPayments,
    processPaymentRecord,
    deleteWoPayment,
  } = usePayment();

  const [job, setJob] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const [isOpenPaymentDlg, setIsOpenPaymentDlg] = useState(false);
  const [isOpenProceedPayDlg, setIsOpenproceedPayDlg] = useState(false);
  const [isOpenRefundDlg, setIsOpenRefundDlg] = useState(false);
  const [isOpenDeletePayment, setIsOpenDeletePayment] = useState(false);

  const handleTogglePaymentDlg = () => {
    setIsOpenPaymentDlg(!isOpenPaymentDlg);
  };

  const handleTogglePaymentProceedDlg = (id = null) => {
    setSelectedPayment(id);
    setIsOpenproceedPayDlg(!isOpenProceedPayDlg);
  };

  const handleToggleRefundDialog = () => {
    setIsOpenRefundDlg(!isOpenRefundDlg);
  };

  const handleToggleDeletePaymentDlg = (id = null) => {
    setSelectedPayment(id);
    setIsOpenDeletePayment(!isOpenDeletePayment);
  };

  const handleAddPaymentRecord = async (values) => {
    const data = {
      paymentworkOrder: job._id,
      paymentCustomer: job.workOrderCustomer._id,
      ...values,
    };
    const isSuccess = await createPayment(data);

    if (isSuccess) {
      handleTogglePaymentDlg();
      fetchWorkorder();
      fetchWorkorderPayments();
    }
  };

  const handleDeletePaymentRecord = async () => {
    const isSuccess = await deleteWoPayment(selectedPayment);

    if (isSuccess) {
      handleToggleDeletePaymentDlg();
      await fetchWorkorder();
      await fetchWorkorderPayments(id);
    }
  };

  const handleCompletePayment = async () => {
    const isSuccess = await processPaymentRecord(selectedPayment);

    if (isSuccess) {
      handleTogglePaymentProceedDlg();
      await fetchWorkorder();
      await fetchWorkorderPayments(id);
    }
  };

  const handleIssueRefund = async (data) => {
    const body = {
      _id: id,
      ...data,
    };
    const isSuccess = await createRefoundRecord(body);

    if (isSuccess) {
      handleToggleRefundDialog();
      await fetchWorkorder();
      await fetchWorkorderPayments(id);
    }
  };

  const handelUpdateWorkorderAssignees = async (values) => {
    const isSuccess = await updateWorkorderAssignees(job._id, values);

    if (isSuccess) {
      await fetchWorkorder();
    }
  };

  const fetchWorkorder = async () => {
    if (id) {
      const result = await fetchWorkOrderInfo(id);

      if (result) {
        setJob(result);
      }
    }
  };

  useEffect(() => {
    fetchWorkorder();
    fetchWorkorderPayments(id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <WorkorderView
      job={job}
      woPayments={woPayments}
      isLoading={isLoadingJob}
      isDownloading={isDownloading}
      isLoadingCreate={isLoadingCreate}
      isLoadingWoPayments={isLoadingWoPayments}
      isLoadingDeleteWoPay={isLoadingDeleteWoPay}
      isLoadingUpdateAssignee={isLoadingUpdateAssignee}
      isLoadingPaymentComplete={isLoadingPaymentComplete}
      isLoadingRefund={isLoadingRefund}
      isOpenPaymentDlg={isOpenPaymentDlg}
      isOpenProceedPayDlg={isOpenProceedPayDlg}
      isOpenRefundDlg={isOpenRefundDlg}
      isOpenDeletePayment={isOpenDeletePayment}
      handleTogglePaymentDlg={handleTogglePaymentDlg}
      handleTogglePaymentProceedDlg={handleTogglePaymentProceedDlg}
      handleToggleRefundDialog={handleToggleRefundDialog}
      handleToggleDeletePaymentDlg={handleToggleDeletePaymentDlg}
      handleAddPaymentRecord={handleAddPaymentRecord}
      handelUpdateWorkorderAssignees={handelUpdateWorkorderAssignees}
      handleCompletePayment={handleCompletePayment}
      handleIssueRefund={handleIssueRefund}
      handleDeletePaymentRecord={handleDeletePaymentRecord}
      downloadInvoice={downloadInvoice}
    />
  );
};

export default WorkorderController;
