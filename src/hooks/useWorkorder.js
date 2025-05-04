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
  const [jobs, setJobs] = useState([]);
  const [customerJobs, setCustomerJobs] = useState([]);
  const [customerPaymentStats, setCustomerPaymentStats] = useState(null);
  const [chartTotalRevenueData, setChartTotalRevenueData] = useState([]);
  const [charTotalJobsData, setChartTotalJobsData] = useState([]);
  const [activeJobsCount, setActiveJobsCount] = useState(0);
  const [todayRevenue, setTodayRevenue] = useState(0);
  const [totalReceivables, setTotalReveivables] = useState(0);

  const [jobsCount, setJobsCount] = useState(0);
  const [customerJobsCount, setCustomerJobsCount] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingJobs, setIsLoadingJobs] = useState(true);
  const [isLoadingCustomerJobs, setIsLoadingCustomerJobs] = useState(false);
  const [isLoadingCustomerPayStats, setIsLoadingCustomerPayStats] = useState(false);
  const [isLoadingJob, setIsLoadingJob] = useState(false);
  const [isLoadingCreate, setIsLoadingCreate] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [isLoadingUpdateAssignee, setIsLoadingUpdateAssignee] = useState(false);
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
  const [isLoadingClosed, setIsLoadingClosed] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isLoadingChartRevenueData, setIsLoadingChartRevenueData] = useState(false);
  const [isLoadingChartTotalJobs, setIsLoadingChartTotalJobs] = useState(false);
  const [isLoadingActiveJobsCount, setIsLoadingActiveJobsCount] = useState(false);
  const [isLoadingTodayRevenue, setIsLoadingTodayRevenue] = useState(false);
  const [isLoadingReceivables, setIsLoadingReceivables] = useState(false);

  // Fetch all work orders
  const fetchWorkOrders = async (params) => {
    await backendAuthApi({
      url: BACKEND_API.WO_ALL,
      method: 'GET',
      cancelToken: sourceToken.token,
      params,
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          setJobs(res.data.responseData.data);
          setJobsCount(res.data.responseData.count);
        }
      })
      .catch(() => {
        setIsLoadingJobs(false);
      })
      .finally(() => {
        setIsLoadingJobs(false);
      });
  };

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

  // Fetch customer workorders
  const fetchCustomerWorkorders = async (id) => {
    if (isLoadingCustomerJobs) return;

    setIsLoadingCustomerJobs(true);

    await backendAuthApi({
      url: BACKEND_API.WO_CUSTOMER,
      method: 'GET',
      cancelToken: sourceToken.token,
      params: { id },
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          setCustomerJobs(res.data.responseData.data);
          setCustomerJobsCount(res.data.responseData.count);
        }
      })
      .catch(() => {
        setIsLoadingCustomerJobs(false);
      })
      .finally(() => {
        setIsLoadingCustomerJobs(false);
      });
  };

  // Fetch customer workorders payment status
  const fetchCustomerPaymentStatus = async (id) => {
    if (isLoadingCustomerPayStats) return;

    setIsLoadingCustomerPayStats(true);

    await backendAuthApi({
      url: BACKEND_API.WO_CUSTOMER_PAYMENT_STATUS,
      method: 'GET',
      cancelToken: sourceToken.token,
      params: { id },
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          setCustomerPaymentStats(res.data.responseData);
        }
      })
      .catch(() => {
        setIsLoadingCustomerPayStats(false);
      })
      .finally(() => {
        setIsLoadingCustomerPayStats(false);
      });
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

  // Update workorder assignees
  const updateWorkorderAssignees = async (id, data) => {
    if (isLoadingUpdateAssignee) return;

    setIsLoadingUpdateAssignee(true);

    let isSuccess = false;

    await backendAuthApi({
      url: BACKEND_API.WO_ASSIGNEES,
      method: 'PUT',
      cancelToken: sourceToken.token,
      params: {
        id,
      },
      data,
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          isSuccess = true;
        }
      })
      .catch(() => {
        setIsLoadingUpdateAssignee(false);
      })
      .finally(() => {
        setIsLoadingUpdateAssignee(false);
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

  // Total revenue chart data
  const fetchTotalRevenueChartData = async () => {
    if (isLoadingChartRevenueData) return;

    setIsLoadingChartRevenueData(true);

    await backendAuthApi({
      url: BACKEND_API.WO_CHART_REVENUE,
      method: 'GET',
      cancelToken: sourceToken.token,
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          setChartTotalRevenueData(res.data.responseData);
        }
      })
      .catch(() => {
        setIsLoadingChartRevenueData(false);
      })
      .finally(() => {
        setIsLoadingChartRevenueData(false);
      });
  };

  // Total Jobs count chart data
  const fetchTotalJobsCountChartData = async () => {
    if (isLoadingChartTotalJobs) return;

    setIsLoadingChartTotalJobs(true);

    await backendAuthApi({
      url: BACKEND_API.WO_CHART_TOTAL_JOBS,
      method: 'GET',
      cancelToken: sourceToken.token,
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          setChartTotalJobsData(res.data.responseData);
        }
      })
      .catch(() => {
        setIsLoadingChartTotalJobs(false);
      })
      .finally(() => {
        setIsLoadingChartTotalJobs(false);
      });
  };

  // Active jobs count
  const fetchActiveJobsCount = async () => {
    if (isLoadingActiveJobsCount) return;

    setIsLoadingActiveJobsCount(true);

    await backendAuthApi({
      url: BACKEND_API.WO_ACTIVE_JOBS_COUNT,
      method: 'GET',
      cancelToken: sourceToken.token,
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          setActiveJobsCount(res.data.responseData);
        }
      })
      .catch(() => {
        setIsLoadingActiveJobsCount(false);
      })
      .finally(() => {
        setIsLoadingActiveJobsCount(false);
      });
  };

  // Today total revenue
  const fetchTodayTotalRevenue = async () => {
    if (isLoadingTodayRevenue) return;

    setIsLoadingTodayRevenue(true);

    await backendAuthApi({
      url: BACKEND_API.WO_TODAY_REVENUE,
      method: 'GET',
      cancelToken: sourceToken.token,
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          setTodayRevenue(res.data.responseData);
        }
      })
      .catch(() => {
        setIsLoadingTodayRevenue(false);
      })
      .finally(() => {
        setIsLoadingTodayRevenue(false);
      });
  };

  // Total receivables
  const fetchTotalReceivables = async () => {
    if (isLoadingReceivables) return;

    setIsLoadingReceivables(true);

    await backendAuthApi({
      url: BACKEND_API.WO_TOTAL_RECEIVABLES,
      method: 'GET',
      cancelToken: sourceToken.token,
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          setTotalReveivables(res.data.responseData);
        }
      })
      .catch(() => {
        setIsLoadingReceivables(false);
      })
      .finally(() => {
        setIsLoadingReceivables(false);
      });
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
    jobs,
    customerJobs,
    customerPaymentStats,
    jobsCount,
    customerJobsCount,
    chartTotalRevenueData,
    charTotalJobsData,
    activeJobsCount,
    todayRevenue,
    totalReceivables,
    isLoading,
    isLoadingJobs,
    isLoadingJob,
    isLoadingCreate,
    isLoadingUpdate,
    isLoadingUpdateAssignee,
    isLoadingComplete,
    isLoadingClosed,
    isDownloading,
    isLoadingCustomerJobs,
    isLoadingCustomerPayStats,
    isLoadingChartRevenueData,
    isLoadingChartTotalJobs,
    isLoadingActiveJobsCount,
    isLoadingTodayRevenue,
    isLoadingReceivables,
    fetchWorkOrders,
    fetchActiveWorkOrders,
    fetchWorkOrderInfo,
    fetchCustomerWorkorders,
    fetchCustomerPaymentStatus,
    fetchTotalRevenueChartData,
    fetchTotalJobsCountChartData,
    fetchActiveJobsCount,
    fetchTodayTotalRevenue,
    fetchTotalReceivables,
    createWorkOrder,
    updateWorkOrder,
    updateWorkorderAssignees,
    updateWorkOrderToComplete,
    updateWorkOrderToClosed,
    downloadInvoice,
  };
};

export default useWorkOrder;
