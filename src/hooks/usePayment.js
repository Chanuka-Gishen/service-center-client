import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { BACKEND_API } from 'src/axios/constant/backend-api';
import { backendAuthApi } from 'src/axios/instance/backend-axios-instance';
import responseUtil from 'src/utils/responseUtil';

const usePayment = () => {
  const sourceToken = axios.CancelToken.source();
  const { enqueueSnackbar } = useSnackbar();

  const [woPayments, setWoPayments] = useState([]);

  const [isLoadingCreate, setIsLoadingCreate] = useState(false);
  const [isLoadingWoPayments, setIsLoadingWoPayments] = useState(false);

  // Create Payments
  const createPayment = async (data) => {
    if (isLoadingCreate) return;

    let isSuccess = false;

    setIsLoadingCreate(true);

    await backendAuthApi({
      url: BACKEND_API.PAYMENT_CREATE,
      method: 'POST',
      cancelToken: sourceToken.token,
      data,
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          isSuccess = true;
        } else {
          enqueueSnackbar(res.data.responseMessage, {
            variant: responseUtil.findResponseType(res.data.responseCode),
          });
        }
      })
      .catch(() => {
        setIsLoadingCreate(false);
      })
      .finally(() => {
        setIsLoadingCreate(false);
      });

    return isSuccess;
  };

  // Fetch Workorder Payments
  const fetchWorkorderPayments = async (id) => {
    if (!id) return;

    setIsLoadingWoPayments(true);

    await backendAuthApi({
      url: BACKEND_API.PAYMENT_WO,
      method: 'GET',
      cancelToken: sourceToken.token,
      params: {
        id,
      },
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          setWoPayments(res.data.responseData);
        }
      })
      .catch(() => {
        setIsLoadingWoPayments(false);
      })
      .finally(() => {
        setIsLoadingWoPayments(false);
      });
  };

  return {
    woPayments,
    isLoadingCreate,
    isLoadingWoPayments,
    createPayment,
    fetchWorkorderPayments
  };
};

export default usePayment;
