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
  const [isLoadingCustomer, setIsLoadingCustomer] = useState(false);

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
  const fetchCustomer = async ({id}) => {
    if (isLoadingCustomer) return;

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

  return {
    customers,
    customersCount,
    customer,
    isLoading,
    isLoadingAdd,
    isLoadingCustomer,
    fetchCustomers,
    fetchCustomer,
    registerCustomer,
  };
};

export default useCustomer;
