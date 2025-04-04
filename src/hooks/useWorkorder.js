import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { BACKEND_API } from 'src/axios/constant/backend-api';
import { backendAuthApi } from 'src/axios/instance/backend-axios-instance';
import responseUtil from 'src/utils/responseUtil';

const useWorkOrder = () => {
  const sourceToken = axios.CancelToken.source();
  const { enqueueSnackbar } = useSnackbar();

  const [workOrders, setWorkOrders] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingJob, setIsLoadingJob] = useState(false);
  const [isLoadingCreate, setIsLoadingCreate] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
  const [isLoadingClosed, setIsLoadingClosed] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Fetch active work orders
  const fetchActiveWorkOrders = async () => {
    setIsLoading(true);

    await backendAuthApi({
      url: BACKEND_API.WO_ACTIVE,
      method: 'GET',
      cancelToken: sourceToken.token,
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          setWorkOrders(res.data.responseData);
        }
      })
      .catch(() => {
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Fetch work order info - ID
  const fetchWorkOrderInfo = async (id) => {
    setIsLoadingJob(true);

    let result = null;

    await backendAuthApi({
      url: BACKEND_API.WO_INFO,
      method: 'GET',
      cancelToken: sourceToken.token,
      params: {
        id,
      },
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          result = res.data.responseData;
        }
      })
      .catch(() => {
        setIsLoadingJob(false);
      })
      .finally(() => {
        setIsLoadingJob(false);
      });

    return result;
  };

  // Create work order
  const createWorkOrder = async (data) => {
    let isSuccess = false;

    setIsLoadingCreate(true);

    await backendAuthApi({
      url: BACKEND_API.WO_CREATE,
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
        setIsLoadingCreate(false);
      })
      .finally(() => {
        setIsLoadingCreate(false);
      });

    return isSuccess;
  };

  // Update work order
  const updateWorkOrder = async (data) => {
    let isSuccess = false;

    await backendAuthApi({
      url: BACKEND_API.WO_UPDATE,
      method: 'PUT',
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
        setIsLoadingUpdate(false);
      })
      .finally(() => {
        setIsLoadingUpdate(false);
      });

    return isSuccess;
  };

  // Update work order to complete status
  const updateWorkOrderToComplete = async (id) => {
    if (isLoadingComplete) return;

    let isSuccess = false;

    setIsLoadingComplete(true);

    await backendAuthApi({
      url: BACKEND_API.WO_UPDATE_COMPLETED,
      method: 'PUT',
      cancelToken: sourceToken.token,
      params: {
        id,
      },
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
        setIsLoadingComplete(false);
      })
      .finally(() => {
        setIsLoadingComplete(false);
      });

    return isSuccess;
  };

  // Update work order to closed status
  const updateWorkOrderToClosed = async (id) => {
    if (isLoadingClosed) return;

    let isSuccess = false;

    setIsLoadingClosed(true);

    await backendAuthApi({
      url: BACKEND_API.WO_UPDATE_CLOSED,
      method: 'PUT',
      cancelToken: sourceToken.token,
      params: {
        id,
      },
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
        setIsLoadingClosed(false);
      })
      .finally(() => {
        setIsLoadingClosed(false);
      });

    return isSuccess;
  };

  // Download invoice
  const downloadInvoice = async (data) => {
    if (isDownloading) return;

    setIsDownloading(true);

    await backendAuthApi({
      url: BACKEND_API.WO_DOWNLOAD_INVOICE,
      method: 'GET',
      cancelToken: sourceToken.token,
      params: {
        id: data._id,
      },
      responseType: 'blob',
    })
      .then((res) => {
        // Create a link element and trigger download
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${data.workOrderInvoiceNumber}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch(() => {
        setIsDownloading(false);
      })
      .finally(() => {
        setIsDownloading(false);
      });
  };

  return {
    workOrders,
    isLoading,
    isLoadingJob,
    isLoadingCreate,
    isLoadingUpdate,
    isLoadingComplete,
    isLoadingClosed,
    isDownloading,
    fetchActiveWorkOrders,
    fetchWorkOrderInfo,
    createWorkOrder,
    updateWorkOrder,
    updateWorkOrderToComplete,
    updateWorkOrderToClosed,
    downloadInvoice
  };
};

export default useWorkOrder;
