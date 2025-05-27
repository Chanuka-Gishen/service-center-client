import { useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';

import { BACKEND_API } from 'src/axios/constant/backend-api';
import { backendAuthApi } from 'src/axios/instance/backend-axios-instance';
import responseUtil from 'src/utils/responseUtil';

const usePayment = () => {
  const sourceToken = axios.CancelToken.source();
  const { enqueueSnackbar } = useSnackbar();

  const [payments, setPayments] = useState([]);
  const [pendingPayments, setPendingPayments] = useState([]);
  const [woPayments, setWoPayments] = useState([]);
  const [accSummary, setAccSummary] = useState([]);
  const [finSummary, setFinSummary] = useState({ incomeData: [], expenseData: [] });
  const [expSummary, setExpSummary] = useState({
    period: {
      start: new Date(),
      end: new Date(),
      range: '7Days',
    },
    grandTotal: 0,
    categories: [],
  });

  const [paymentsCount, setPaymentsCount] = useState(0);

  const [isLoadingPayments, setIsLoadingPayments] = useState(true);
  const [isLoadingPendingPayments, setIsLoadingPendingPayments] = useState(false);
  const [isLoadingCreate, setIsLoadingCreate] = useState(false);
  const [isLoadingCreateExp, setIsLoadingCreateExp] = useState(false);
  const [isLoadingCreateInc, setIsLoadingCreateInc] = useState(false);
  const [isLoadingPaymentComplete, setIsLoadingPaymentComplete] = useState(false);
  const [isLoadingWoPayments, setIsLoadingWoPayments] = useState(false);
  const [isLoadingAccSummary, setIsLoadingAccSummary] = useState(true);
  const [isLoadingFinSummary, setIsLoadingFinSummary] = useState(true);
  const [isLoadingExpenseSummary, setIsLoadingExpenseSummary] = useState(true);
  const [isLoadingFinReportDownload, setIsLoadingFinReportDownload] = useState(false);

  // Fetch all payments
  const fetchPayments = async (params) => {
    setIsLoadingPayments(true);

    await backendAuthApi({
      url: BACKEND_API.PAYMENTS,
      method: 'GET',
      cancelToken: sourceToken.token,
      params,
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          setPayments(res.data.responseData.data);
          setPaymentsCount(res.data.responseData.count);
        }
      })
      .catch(() => {
        setIsLoadingPayments(false);
      })
      .finally(() => {
        setIsLoadingPayments(false);
      });
  };

  // Fetch pending payments - cheques
  const fetchPendingPayments = async () => {
    setIsLoadingPendingPayments(true);

    await backendAuthApi({
      url: BACKEND_API.PAYMENTS_PENDING,
      method: 'GET',
      cancelToken: sourceToken.token,
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          setPendingPayments(res.data.responseData);
        }
      })
      .catch(() => {
        setIsLoadingPendingPayments(false);
      })
      .finally(() => {
        setIsLoadingPendingPayments(false);
      });
  };

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

  // Create expenses payment
  const createExpensesPayment = async (data) => {
    if (isLoadingCreateExp) return;

    let isSuccess = false;

    setIsLoadingCreateExp(true);

    await backendAuthApi({
      url: BACKEND_API.PAYMENT_CREATE_EXP,
      method: 'POST',
      cancelToken: sourceToken.token,
      data,
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          isSuccess = true;
        }
      })
      .catch(() => {
        setIsLoadingCreateExp(false);
      })
      .finally(() => {
        setIsLoadingCreateExp(false);
      });

    return isSuccess;
  };

  // Create income record
  const createIncomePayment = async (data) => {
    if (isLoadingCreateInc) return;

    let isSuccess = false;

    setIsLoadingCreateInc(true);

    await backendAuthApi({
      url: BACKEND_API.PAYMENT_CREATE_INC,
      method: 'POST',
      cancelToken: sourceToken.token,
      data,
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          isSuccess = true;
        }
      })
      .catch(() => {
        setIsLoadingCreateInc(false);
      })
      .finally(() => {
        setIsLoadingCreateInc(false);
      });

    return isSuccess;
  };

  // Process payment record - Cheques
  const processPaymentRecord = async (id) => {
    let isSuccess = false;

    setIsLoadingPaymentComplete(true);

    await backendAuthApi({
      url: BACKEND_API.PAYMENT_COMPLETE_RECORD,
      method: 'PUT',
      cancelToken: sourceToken.token,
      params: {
        id,
      },
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          isSuccess = true;
        }
      })
      .catch(() => {
        setIsLoadingPaymentComplete(false);
      })
      .finally(() => {
        setIsLoadingPaymentComplete(false);
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

  // Fetch accounts summary
  const fetchAccountsSummary = async () => {
    setIsLoadingAccSummary(true);

    await backendAuthApi({
      url: BACKEND_API.PAYMENT_SUMMARY,
      method: 'GET',
      cancelToken: sourceToken.token,
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          setAccSummary(res.data.responseData);
        }
      })
      .catch(() => {
        setIsLoadingAccSummary(false);
      })
      .finally(() => {
        setIsLoadingAccSummary(false);
      });
  };

  // Fetch financial summary
  const fetchFinancialSummary = async () => {
    setIsLoadingFinSummary(true);

    await backendAuthApi({
      url: BACKEND_API.PAYMENT_FIN_SUMMARY,
      method: 'GET',
      cancelToken: sourceToken.token,
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          setFinSummary(res.data.responseData);
        }
      })
      .catch(() => {
        setIsLoadingFinSummary(false);
      })
      .finally(() => {
        setIsLoadingFinSummary(false);
      });
  };

  // Fetch expense summary
  const fetchExpenseSummary = async () => {
    setIsLoadingExpenseSummary(true);

    await backendAuthApi({
      url: BACKEND_API.PAYMENT_EXPENSES_SUMMARY,
      method: 'GET',
      cancelToken: sourceToken.token,
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          setExpSummary(res.data.responseData);
        }
      })
      .catch(() => {
        setIsLoadingExpenseSummary(false);
      })
      .finally(() => {
        setIsLoadingExpenseSummary(false);
      });
  };

  // Download financial report
  const downloadFinancialReport = async (params) => {
    setIsLoadingFinReportDownload(true);

    await backendAuthApi({
      url: BACKEND_API.PAYMENT_FINANCIAL_REPORT,
      method: 'GET',
      cancelToken: sourceToken.token,
      params,
      responseType: 'blob',
    })
      .then((res) => {
        // Create a link element and trigger download
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `wijaya-auto-financial-report.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch(() => {
        setIsLoadingFinReportDownload(false);
      })
      .finally(() => {
        setIsLoadingFinReportDownload(false);
      });
  };

  return {
    payments,
    paymentsCount,
    pendingPayments,
    woPayments,
    accSummary,
    finSummary,
    expSummary,
    isLoadingPayments,
    isLoadingPendingPayments,
    isLoadingCreate,
    isLoadingCreateExp,
    isLoadingCreateInc,
    isLoadingPaymentComplete,
    isLoadingWoPayments,
    isLoadingAccSummary,
    isLoadingFinSummary,
    isLoadingFinSummary,
    isLoadingExpenseSummary,
    isLoadingFinReportDownload,
    fetchPayments,
    fetchPendingPayments,
    createPayment,
    createExpensesPayment,
    createIncomePayment,
    processPaymentRecord,
    fetchWorkorderPayments,
    fetchAccountsSummary,
    fetchFinancialSummary,
    fetchExpenseSummary,
    downloadFinancialReport,
  };
};

export default usePayment;
