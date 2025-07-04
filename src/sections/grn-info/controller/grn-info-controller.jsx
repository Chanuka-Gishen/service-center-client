import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { GrnInfoView } from '../view/grn-info-view';
import useSupplier from 'src/hooks/useSupplier';
import usePayment from 'src/hooks/usePayment';
import usePagination from 'src/hooks/usePagination';

const paymentColumns = ['Method', 'Amount', 'Date'];

const GrnInfoController = () => {
  const { supId, id } = useParams();

  const {
    grnInfo,
    isLoadingGrnInfo,
    isLoadingCreateReturns,
    fetchGrnInfo,
    createItemReturnRecord,
  } = useSupplier();
  const {
    grnPayments,
    isLoadingGrnPayments,
    isLoadingAddGrnPayment,
    fetchGrnPaymentRecords,
    createGrnPaymentRecord,
  } = usePayment();

  const [selectedStock, setSelectedStock] = useState(null);

  const [isOpenAddPayment, setIsOpenAddPayment] = useState(false);
  const [isOpenCreateReturn, setIsOpenCreateReturn] = useState(false);

  const handelToggleAddPayment = () => {
    setIsOpenAddPayment(!isOpenAddPayment);
  };

  const handleToggleCreateReturn = (item = null) => {
    setSelectedStock(item);
    setIsOpenCreateReturn(!isOpenCreateReturn);
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

  const handleCreateReturnRecord = async (values) => {
    const data = {
      grnId: grnInfo._id,
      grnItemId: selectedStock._id,
      ...values,
    };

    const isSuccess = await createItemReturnRecord(data);

    if (isSuccess) {
      handleToggleCreateReturn();
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
      isOpenCreateReturn={isOpenCreateReturn}
      isLoadingGrnInfo={isLoadingGrnInfo}
      isLoadingGrnPayments={isLoadingGrnPayments}
      isLoadingAddGrnPayment={isLoadingAddGrnPayment}
      isLoadingCreateReturns={isLoadingCreateReturns}
      handelToggleAddPayment={handelToggleAddPayment}
      handleToggleCreateReturn={handleToggleCreateReturn}
      handleAddPayment={handleAddPayment}
      handleCreateReturnRecord={handleCreateReturnRecord}
    />
  );
};

export default GrnInfoController;
