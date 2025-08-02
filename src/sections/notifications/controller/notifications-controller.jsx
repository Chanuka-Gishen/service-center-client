import useCustomer from 'src/hooks/useCustomer';
import { NotificationsView } from '../view/notifications-view';
import { useEffect } from 'react';
import usePagination from 'src/hooks/usePagination';

const NotificationsController = () => {
  const { smsLogs, smsCount, isLoadingSmsLogs, isLoadingSendBulkSms, sendBulkSms, fetchSmsLogs } =
    useCustomer();

  const pagination = usePagination();

  const query = { page: pagination.page, limit: pagination.limit };

  const handleConfirm = async (values) => {
    await sendBulkSms(values);
  };

  useEffect(() => {
    fetchSmsLogs(query);
  }, []);

  return (
    <NotificationsView
      smsLogs={smsLogs}
      smsCount={smsCount}
      pagination={pagination}
      isLoadingSmsLogs={isLoadingSmsLogs}
      isLoadingSendBulkSms={isLoadingSendBulkSms}
      handleConfirm={handleConfirm}
    />
  );
};

export default NotificationsController;
