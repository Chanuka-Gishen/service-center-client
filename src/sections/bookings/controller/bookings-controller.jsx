import { useEffect, useState } from 'react';
import { BookingsView } from '../view/bookings-view';
import useBooking from 'src/hooks/useBooking';
import usePagination from 'src/hooks/usePagination';
import { STATUS_CREATED, STATUS_PENDING } from 'src/constants/common-constants';

const BookingsController = () => {
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [isOpenComplete, setIsOpenComplete] = useState(false);
  const [isOpenCancel, setIsOpenCancel] = useState(false);

  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [initialValues, setInitialValues] = useState({
    date: new Date(),
    timeSlot: '',
  });

  const {
    bookings,
    bookingsCount,
    totalBookingsCount,
    totalPendingBookingsCount,
    totalTodayBookingsCount,
    isLoadingBookings,
    isLoadingUpdateBooking,
    isLoadingCompleteBooking,
    isLoadingCancelBooking,
    isLoadingTotalBookingsCount,
    isLoadingTotalPendingBookingCount,
    isLoadingTodayBookingsCount,
    fetchBookings,
    updateBooking,
    completeBooking,
    cancelBooking,
    getTotalBookingsCount,
    getTotalPendingBookingsCount,
    getTotalTodayBookingsCount,
  } = useBooking();

  const pendingPagination = usePagination();
  const processedPagination = usePagination();

  const handleSelectTab = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleToggleUpdateDialog = () => {
    setIsOpenUpdate(!isOpenUpdate);
  };

  const handleToggleCompleteDialog = () => {
    setIsOpenComplete(!isOpenComplete);
  };

  const handleToggleCancelDialog = () => {
    setIsOpenCancel(!isOpenCancel);
  };

  const handleSelectRow = (value) => {
    if (selectedBooking?._id != value._id) {
      setSelectedBooking(value);
      setInitialValues({ date: value.date, timeSlot: value.timeSlot });
    } else {
      setSelectedBooking(null);
      setInitialValues({ date: new Date(), timeSlot: '' });
    }
  };

  const handleUpdateBooking = async (values) => {
    const data = {
      id: selectedBooking._id,
      ...values,
    };
    const isSuccess = await updateBooking(data);

    if (isSuccess) {
      setSelectedBooking(null);
      handleFetchBookings();
      handleToggleUpdateDialog();
    }
  };

  const handleCompleteBooking = async () => {
    if (selectedBooking) {
      const isSuccess = await completeBooking(selectedBooking._id);

      if (isSuccess) {
        setSelectedBooking(null);
        handleFetchBookings();
        handleToggleCompleteDialog();
      }
    }
  };

  const handleCancelBooking = async () => {
    if (selectedBooking) {
      const isSuccess = await cancelBooking(selectedBooking._id);

      if (isSuccess) {
        setSelectedBooking(null);
        handleFetchBookings();
        handleToggleCancelDialog();
      }
    }
  };

  const handleFetchBookings = async () => {
    setSelectedBooking(null);

    const params = {
      page: selectedTab === 0 ? pendingPagination.page : processedPagination.page,
      limit: selectedTab === 0 ? pendingPagination.limit : processedPagination.limit,
      status: selectedTab === 0 ? STATUS_CREATED : STATUS_PENDING,
    };

    await fetchBookings(params);
  };

  useEffect(() => {
    if (selectedTab === 0) handleFetchBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTab, pendingPagination.page, pendingPagination.limit]);

  useEffect(() => {
    if (selectedTab === 1) handleFetchBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTab, processedPagination.page, processedPagination.limit]);

  useEffect(() => {
    getTotalBookingsCount();
    getTotalPendingBookingsCount();
    getTotalTodayBookingsCount();
  }, []);

  return (
    <BookingsView
      selectedTab={selectedTab}
      selectedBooking={selectedBooking}
      initialValues={initialValues}
      bookings={bookings}
      bookingsCount={bookingsCount}
      totalBookingsCount={totalBookingsCount}
      totalPendingBookingsCount={totalPendingBookingsCount}
      totalTodayBookingsCount={totalTodayBookingsCount}
      pendingPagination={pendingPagination}
      processedPagination={processedPagination}
      isOpenUpdate={isOpenUpdate}
      isOpenComplete={isOpenComplete}
      isOpenCancel={isOpenCancel}
      isLoadingBookings={isLoadingBookings}
      isLoadingUpdateBooking={isLoadingUpdateBooking}
      isLoadingCompleteBooking={isLoadingCompleteBooking}
      isLoadingCancelBooking={isLoadingCancelBooking}
      isLoadingTotalBookingsCount={isLoadingTotalBookingsCount}
      isLoadingTotalPendingBookingCount={isLoadingTotalPendingBookingCount}
      isLoadingTodayBookingsCount={isLoadingTodayBookingsCount}
      handleSelectTab={handleSelectTab}
      handleToggleUpdateDialog={handleToggleUpdateDialog}
      handleToggleCompleteDialog={handleToggleCompleteDialog}
      handleToggleCancelDialog={handleToggleCancelDialog}
      handleSelectRow={handleSelectRow}
      handleUpdateBooking={handleUpdateBooking}
      handleCompleteBooking={handleCompleteBooking}
      handleCancelBooking={handleCancelBooking}
    />
  );
};

export default BookingsController;
