import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { BACKEND_API } from 'src/axios/constant/backend-api';
import { backendAuthApi } from 'src/axios/instance/backend-axios-instance';
import responseUtil from 'src/utils/responseUtil';

const usePayment = () => {
  const sourceToken = axios.CancelToken.source();
  const { enqueueSnackbar } = useSnackbar();

  const [isLoadingCreate, setIsLoadingCreate] = useState(false);

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

  return {
    isLoadingCreate,
    createPayment,
  };
};

export default usePayment;
