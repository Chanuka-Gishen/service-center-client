import React, { useEffect, useState } from 'react';
import { WorkorderView } from '../view/workorder-details-view';
import { useLocation } from 'react-router-dom';
import useWorkOrder from 'src/hooks/useWorkorder';
import usePayment from 'src/hooks/usePayment';

const WorkorderController = () => {
  const location = useLocation();

  const { id } = location.state || {};

  const { fetchWorkOrderInfo, isLoadingJob, isDownloading, downloadInvoice } = useWorkOrder();
  const { woPayments, isLoadingWoPayments, isLoadingCreate, createPayment, fetchWorkorderPayments } = usePayment();

  const [job, setJob] = useState(null);

  const [isOpenPaymentDlg, setIsOpenPaymentDlg] = useState(false);

  const handleTogglePaymentDlg = () => {
    setIsOpenPaymentDlg(!isOpenPaymentDlg);
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
      isOpenPaymentDlg={isOpenPaymentDlg}
      handleTogglePaymentDlg={handleTogglePaymentDlg}
      handleAddPaymentRecord={handleAddPaymentRecord}
      downloadInvoice={downloadInvoice}
    />
  );
};

export default WorkorderController;
