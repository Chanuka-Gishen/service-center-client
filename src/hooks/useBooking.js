import axios from 'axios';
import { useState } from 'react';
import { BACKEND_API } from 'src/axios/constant/backend-api';
import { backendAuthApi } from 'src/axios/instance/backend-axios-instance';
import responseUtil from 'src/utils/responseUtil';

const useBooking = () => {
  const sourceToken = axios.CancelToken.source();

  const [bookings, setBookings] = useState([]);
  const [bookingsCount, setBookingsCount] = useState(0);

  const [totalBookingsCount, setTotalBookingsCount] = useState(0);
  const [totalPendingBookingsCount, setTotalPendingBookingsCount] = useState(0);
  const [totalTodayBookingsCount, setTotalTodayBookingsCount] = useState(0);

  const [isLoadingBookings, setIsLoadingBookings] = useState(false);
  const [isLoadingCreateBooking, setIsLoadingCreateBooking] = useState(false);
  const [isLoadingUpdateBooking, setIsLoadingUpdateBooking] = useState(false);
  const [isLoadingCompleteBooking, setIsLoadingCompleteBooking] = useState(false);
  const [isLoadingCancelBooking, setIsLoadingCancelBooking] = useState(false);
  const [isLoadingTotalBookingsCount, setIsLoadingTotalBookingsCount] = useState(false);
  const [isLoadingTotalPendingBookingCount, setIsLoadingTotalPendingBookingCount] = useState(false);
  const [isLoadingTodayBookingsCount, setIsLoadingTodayBookingsCount] = useState(false);

  // Fetch all bookings with filters
  const fetchBookings = async (params) => {
    setIsLoadingBookings(true);

    await backendAuthApi({
      url: BACKEND_API.BOOKINGS_GET,
      method: 'GET',
      cancelToken: sourceToken.token,
      params,
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          setBookings(res.data.responseData.data);
          setBookingsCount(res.data.responseData.count);
        }
      })
      .catch(() => setIsLoadingBookings(false))
      .finally(() => setIsLoadingBookings(false));
  };

  // Create booking
  const createBooking = async (data) => {
    let isSuccess = false;
    setIsLoadingCreateBooking(true);

    await backendAuthApi({
      url: BACKEND_API.BOOKINGS_CREATE,
      method: 'POST',
      cancelToken: sourceToken.token,
      data,
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          isSuccess = true;
        }
      })
      .catch(() => setIsLoadingCreateBooking(false))
      .finally(() => setIsLoadingCreateBooking(false));

    return isSuccess;
  };

  // Udpate booking data
  const updateBooking = async (data) => {
    let isSuccess = true;

    setIsLoadingUpdateBooking(true);

    await backendAuthApi({
      url: BACKEND_API.BOOKINGS_UPDATE,
      method: 'PUT',
      cancelToken: sourceToken.token,
      data,
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          isSuccess = true;
        }
      })
      .catch(() => setIsLoadingUpdateBooking(false))
      .finally(() => setIsLoadingUpdateBooking(false));

    return isSuccess;
  };

  // Complete booking
  const completeBooking = async (id) => {
    let isSuccess = false;
    setIsLoadingCompleteBooking(true);

    await backendAuthApi({
      url: BACKEND_API.BOOKINGS_PR_COMPLETE,
      method: 'PUT',
      cancelToken: sourceToken.token,
      params: { id },
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          isSuccess = true;
        }
      })
      .catch(() => setIsLoadingCompleteBooking(true))
      .finally(() => setIsLoadingCompleteBooking(true));

    return isSuccess;
  };

  // Cancel booking
  const cancelBooking = async (id) => {
    let isSuccess = false;

    setIsLoadingCancelBooking(true);

    await backendAuthApi({
      url: BACKEND_API.BOOKINGS_PR_CANCEL,
      method: 'PUT',
      cancelToken: sourceToken.token,
      params: { id },
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          isSuccess = true;
        }
      })
      .catch(() => {
        setIsLoadingCancelBooking(false);
      })
      .finally(() => {
        setIsLoadingCancelBooking(false);
      });

    return isSuccess;
  };

  // Total bookings count
  const getTotalBookingsCount = async () => {
    setIsLoadingTotalBookingsCount(true);

    await backendAuthApi({
      url: BACKEND_API.BOOKING_STAT_TOTAL,
      method: 'GET',
      cancelToken: sourceToken.token,
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          setTotalBookingsCount(res.data.responseData);
        }
      })
      .catch(() => {
        setIsLoadingTotalBookingsCount(false);
      })
      .finally(() => {
        setIsLoadingTotalBookingsCount(false);
      });
  };

  // Total pending bookings count
  const getTotalPendingBookingsCount = async () => {
    setIsLoadingTotalPendingBookingCount(true);

    await backendAuthApi({
      url: BACKEND_API.BOOKING_STAT_TOTAL_PENDING,
      method: 'GET',
      cancelToken: sourceToken.token,
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          setTotalPendingBookingsCount(res.data.responseData);
        }
      })
      .catch(() => {
        setIsLoadingTotalPendingBookingCount(false);
      })
      .finally(() => {
        setIsLoadingTotalPendingBookingCount(false);
      });
  };

  // Total today new bookings count
  const getTotalTodayBookingsCount = async () => {
    setIsLoadingTodayBookingsCount(true);

    await backendAuthApi({
      url: BACKEND_API.BOOKING_STAT_TOTAL_TODAY,
      method: 'GET',
      cancelToken: sourceToken.token,
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          setTotalTodayBookingsCount(res.data.responseData);
        }
      })
      .catch(() => {
        setIsLoadingTodayBookingsCount(false);
      })
      .finally(() => {
        setIsLoadingTodayBookingsCount(false);
      });
  };

  return {
    bookings,
    bookingsCount,
    totalBookingsCount,
    totalPendingBookingsCount,
    totalTodayBookingsCount,
    isLoadingBookings,
    isLoadingCreateBooking,
    isLoadingUpdateBooking,
    isLoadingCompleteBooking,
    isLoadingCancelBooking,
    isLoadingTotalBookingsCount,
    isLoadingTotalPendingBookingCount,
    isLoadingTodayBookingsCount,
    fetchBookings,
    createBooking,
    updateBooking,
    completeBooking,
    cancelBooking,
    getTotalBookingsCount,
    getTotalPendingBookingsCount,
    getTotalTodayBookingsCount,
  };
};

export default useBooking;
