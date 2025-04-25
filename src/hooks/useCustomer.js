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

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingAdd, setIsLoadingAdd] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [isLoadingCustomer, setIsLoadingCustomer] = useState(true);

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

    let isSuccess = false;

    await backendAuthApi({
      url: BACKEND_API.CUSTOMER_REGISTER,
      method: 'POST',
      cancelToken: sourceToken.token,
      data,
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
        setIsLoadingAdd(false);
      })
      .finally(() => {
        setIsLoadingAdd(false);
      });

    return isSuccess;
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

  return {
    customers,
    customersCount,
    customer,
    isLoading,
    isLoadingAdd,
    isLoadingUpdate,
    isLoadingCustomer,
    fetchCustomers,
    fetchCustomer,
    registerCustomer,
    updateCustomer,
  };
};

export default useCustomer;
