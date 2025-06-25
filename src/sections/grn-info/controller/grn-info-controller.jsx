import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { GrnInfoView } from '../view/grn-info-view';
import useSupplier from 'src/hooks/useSupplier';
import usePayment from 'src/hooks/usePayment';

const paymentColumns = ['Method', 'Amount', 'Date'];

const GrnInfoController = () => {
  const { supId, id } = useParams();

  const { grnInfo, isLoadingGrnInfo, fetchGrnInfo } = useSupplier();
  const {
    grnPayments,
    isLoadingGrnPayments,
    isLoadingAddGrnPayment,
    fetchGrnPaymentRecords,
    createGrnPaymentRecord,
  } = usePayment();

  const [isOpenAddPayment, setIsOpenAddPayment] = useState(false);

  const handelToggleAddPayment = () => {
    setIsOpenAddPayment(!isOpenAddPayment);
  };

  const handleAddPayment = async (values) => {
    const data = {
      paymentGrnId: grnInfo._id,
      ...values,
    };

    const isSuccess = await createGrnPaymentRecord(data);

    if (isSuccess) {
      handelToggleAddPayment();
      await handleFetchGrnInfo();
      await fetchGrnPaymentRecords(id);
    }
  };

  const handleFetchGrnInfo = async () => {
    await fetchGrnInfo(id);
  };

  useEffect(() => {
    handleFetchGrnInfo();
    fetchGrnPaymentRecords(id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <GrnInfoView
      paymentColumns={paymentColumns}
      supId={supId}
      grnInfo={grnInfo}
      grnPayments={grnPayments}
      isOpenAddPayment={isOpenAddPayment}
      isLoadingGrnInfo={isLoadingGrnInfo}
      isLoadingGrnPayments={isLoadingGrnPayments}
      isLoadingAddGrnPayment={isLoadingAddGrnPayment}
      handelToggleAddPayment={handelToggleAddPayment}
      handleAddPayment={handleAddPayment}
    />
  );
};

export default GrnInfoController;
