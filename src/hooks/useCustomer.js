import { useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';

import { BACKEND_API } from 'src/axios/constant/backend-api.js';
import { backendAuthApi } from 'src/axios/instance/backend-axios-instance.js';
import responseUtil from 'src/utils/responseUtil.js';

const useCustomer = () => {
  const { enqueueSnackbar } = useSnackbar();
  const sourceToken = axios.CancelToken.source();

  const [customers, setCustomers] = useState([]);
  const [customersCount, setCustomersCount] = useState(0);
  const [customer, setCustomer] = useState(null);
  const [smsLogs, setSmsLogs] = useState([]);
  const [smsCount, setSmsCount] = useState(0);
  const [customerSmsLogs, setCustomerSmsLogs] = useState([]);
  const [customerSmsLogsCount, setCustomerSmsLogsCount] = useState(0);
  const [uniqueCustomersCount, setUniqueCustomersCount] = useState(0);
  const [repeatingCustomersCount, setRepeatingCustomersCount] = useState(0);
  const [newCustomersCount, setNewCustomersCount] = useState({
    currentMonthCount: 0,
    previousMonthCount: 0,
    percentageChange: 100.0,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingAdd, setIsLoadingAdd] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [isLoadingCustomer, setIsLoadingCustomer] = useState(true);
  const [isLoadingSmsLogs, setIsLoadingSmsLogs] = useState(false);
  const [isLoadingCustomerSmsLogs, setIsLoadingCustomerSmsLogs] = useState(false);
  const [isLoadingSendBulkSms, setIsLoadingSendBulkSms] = useState(false);
  const [isLoadingSendPaymentRemainder, setIsLoadingSendPaymentRemainder] = useState(false);
  const [isLoadingCustomersCount, setIsLoadingCustomersCount] = useState(false);
  const [isLoadingRepeatingCustomersCount, setIsLoadingRepeatingCustomersCount] = useState(false);
  const [isLoadingNewCustomersCount, setIsLoadingNewCustomersCount] = useState(false);

  // Fetch customers
  const fetchCustomers = async (data) => {
    setIsLoading(true);

    await backendAuthApi({
      url: BACKEND_API.CUSTOMERS,
      method: 'GET',
      cancelToken: sourceToken.token,
      params: data,
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          setCustomers(res.data.responseData.data);
          setCustomersCount(res.data.responseData.count);
        }
      })
      .catch(() => {
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Get customer from _id
  const fetchCustomer = async (id) => {
    setIsLoadingCustomer(true);

    await backendAuthApi({
      url: BACKEND_API.CUSTOMER,
      method: 'GET',
      cancelToken: sourceToken.token,
      params: {
        id,
      },
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          setCustomer(res.data.responseData);
        }
      })
      .catch(() => {
        setIsLoadingCustomer(false);
      })
      .finally(() => {
        setIsLoadingCustomer(false);
      });
  };

  // Register customer
  const registerCustomer = async (data) => {
    if (isLoadingAdd) return;

    setIsLoadingAdd(true);

    let response = null;

    await backendAuthApi({
      url: BACKEND_API.CUSTOMER_REGISTER,
      method: 'POST',
      cancelToken: sourceToken.token,
      data,
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          response = res.data.responseData;
        }
        enqueueSnackbar(res.data.responseMessage, {
          variant: responseUtil.findResponseType(res.data.responseCode),
        });
      })
      .catch(() => {
        setIsLoadingAdd(false);
      })
      .finally(() => {
        setIsLoadingAdd(false);
      });

    return response;
  };

  // Update customer
  const updateCustomer = async (id, data) => {
    if (isLoadingUpdate) return;

    let isSuccess = false;

    setIsLoadingUpdate(true);

    await backendAuthApi({
      url: BACKEND_API.CUSTOMER_EDIT,
      method: 'PUT',
      cancelToken: sourceToken.token,
      data,
      params: { id },
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          isSuccess = true;
        }

        enqueueSnackbar(res.data.responseMessage, {
          variant: responseUtil.findResponseType(res.data.responseCode),
        });
      })
      .catch(() => {
        setIsLoadingUpdate(false);
      })
      .finally(() => {
        setIsLoadingUpdate(false);
      });

    return isSuccess;
  };

  // Fetch SMS logs
  const fetchSmsLogs = async (params) => {
    setIsLoadingSmsLogs(true);

    await backendAuthApi({
      url: BACKEND_API.CUSTOMERS_NOTIFICATIONS,
      method: 'GET',
      cancelToken: sourceToken.token,
      params,
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          setSmsLogs(res.data.responseData.data);
          setSmsCount(res.data.responseData.count);
        }
      })
      .catch(() => {
        setIsLoadingSmsLogs(false);
      })
      .finally(() => {
        setIsLoadingSmsLogs(false);
      });
  };

  // Fetch customer SMS logs
  const fetchCustomerSmsLogs = async (params) => {
    setIsLoadingCustomerSmsLogs(true);

    await backendAuthApi({
      url: BACKEND_API.CUSTOMER_NOTIFICATIONS,
      method: 'GET',
      cancelToken: sourceToken.token,
      params,
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          setCustomerSmsLogs(res.data.responseData.data);
          setCustomerSmsLogsCount(res.data.responseData.count);
        }
      })
      .catch(() => {
        setIsLoadingCustomerSmsLogs(false);
      })
      .finally(() => {
        setIsLoadingCustomerSmsLogs(false);
      });
  };

  // Send bulk sms (Greetings/Offers)
  const sendBulkSms = async (data) => {
    setIsLoadingSendBulkSms(true);

    await backendAuthApi({
      url: BACKEND_API.CUSTOMER_BULK_SMS,
      method: 'POST',
      cancelToken: sourceToken.token,
      data,
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          enqueueSnackbar(res.data.responseMessage, {
            variant: responseUtil.findResponseType(res.data.responseCode),
          });
        }
      })
      .catch(() => {
        setIsLoadingSendBulkSms(false);
      })
      .finally(() => {
        setIsLoadingSendBulkSms(false);
      });
  };

  // Send customer payment remainders
  const sendCustomerPaymentRemainder = async (id) => {
    setIsLoadingSendPaymentRemainder(true);

    await backendAuthApi({
      url: BACKEND_API.CUSTOMER_PAY_REMAINDER,
      method: 'GET',
      cancelToken: sourceToken.token,
      params: { id },
    })
      .then((res) => {
        if (responseUtil.findResponseType(res.data.responseCode)) {
          enqueueSnackbar(res.data.responseMessage, {
            variant: responseUtil.findResponseType(res.data.responseCode),
          });
        }
      })
      .catch(() => {
        setIsLoadingSendPaymentRemainder(false);
      })
      .finally(() => {
        setIsLoadingSendPaymentRemainder(false);
      });
  };

  // Stats - Customers Count
  const getUniqueCustomersCount = async () => {
    setIsLoadingCustomersCount(true);

    await backendAuthApi({
      url: BACKEND_API.CUSTOMER_STAT_CUSTOMERS_COUNT,
      method: 'GET',
      cancelToken: sourceToken.token,
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          setUniqueCustomersCount(res.data.responseData);
        }
      })
      .catch(() => {
        setIsLoadingCustomersCount(false);
      })
      .finally(() => {
        setIsLoadingCustomersCount(false);
      });
  };

  // Stats - Repeating Customers
  const getRepeatingCustomersCount = async () => {
    setIsLoadingRepeatingCustomersCount(true);

    await backendAuthApi({
      url: BACKEND_API.CUSTOMER_STAT_REPEATING_CUSTOMERS,
      method: 'GET',
      cancelToken: sourceToken.token,
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          setRepeatingCustomersCount(res.data.responseData);
        }
      })
      .catch(() => {
        setIsLoadingRepeatingCustomersCount(false);
      })
      .finally(() => {
        setIsLoadingRepeatingCustomersCount(false);
      });
  };

  // Stats - New Customers Count
  const getNewCustomersCount = async () => {
    setIsLoadingNewCustomersCount(true);

    await backendAuthApi({
      url: BACKEND_API.CUSTOMER_STAT_NEW_CUSTOMRES,
      method: 'GET',
      cancelToken: sourceToken.token,
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          setNewCustomersCount(res.data.responseData);
        }
      })
      .catch(() => {
        setIsLoadingNewCustomersCount(false);
      })
      .finally(() => {
        setIsLoadingNewCustomersCount(false);
      });
  };

  return {
    customers,
    customersCount,
    customer,
    smsLogs,
    customerSmsLogs,
    smsCount,
    customerSmsLogsCount,
    uniqueCustomersCount,
    repeatingCustomersCount,
    newCustomersCount,
    isLoading,
    isLoadingAdd,
    isLoadingUpdate,
    isLoadingCustomer,
    isLoadingSmsLogs,
    isLoadingCustomerSmsLogs,
    isLoadingSendBulkSms,
    isLoadingSendPaymentRemainder,
    isLoadingCustomersCount,
    isLoadingRepeatingCustomersCount,
    isLoadingNewCustomersCount,
    fetchCustomers,
    fetchCustomer,
    registerCustomer,
    updateCustomer,
    fetchSmsLogs,
    fetchCustomerSmsLogs,
    sendBulkSms,
    sendCustomerPaymentRemainder,
    getUniqueCustomersCount,
    getRepeatingCustomersCount,
    getNewCustomersCount,
  };
};

export default useCustomer;
