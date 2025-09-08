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
  const [deletedPayments, setDeletedPayments] = useState([]);
  const [pendingPayments, setPendingPayments] = useState([]);
  const [woPayments, setWoPayments] = useState([]);
  const [grnPayments, setGrnPayments] = useState([]);
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
  const [deletedPaymentsCount, setDeletedPaymentsCount] = useState(0);

  const [isLoadingPayments, setIsLoadingPayments] = useState(true);
  const [isLoadingDeletedPayments, setIsLoadingDeletedPayments] = useState(true);
  const [isLoadingPendingPayments, setIsLoadingPendingPayments] = useState(false);
  const [isLoadingCreate, setIsLoadingCreate] = useState(false);
  const [isLoadingDeleteWoPay, setIsLoadingDeleteWoPay] = useState(false);
  const [isLoadingCreateExp, setIsLoadingCreateExp] = useState(false);
  const [isLoadingCreateInc, setIsLoadingCreateInc] = useState(false);
  const [isLoadingRefund, setIsLoadingRefund] = useState(false);
  const [isLoadingAddGrnPayment, setIsLoadingAddGrnPayment] = useState(false);
  const [isLoadingGrnPayments, setIsLoadingGrnPayments] = useState(false);
  const [isLoadingPaymentComplete, setIsLoadingPaymentComplete] = useState(false);
  const [isLoadingWoPayments, setIsLoadingWoPayments] = useState(false);
  const [isLoadingAccSummary, setIsLoadingAccSummary] = useState(true);
  const [isLoadingFinSummary, setIsLoadingFinSummary] = useState(true);
  const [isLoadingExpenseSummary, setIsLoadingExpenseSummary] = useState(true);
  const [isLoadingFinReportDownload, setIsLoadingFinReportDownload] = useState(false);
  const [isLoadingDeleteManPayment, setIsLoadingDeleteManPayment] = useState(false);
  const [isLoadingCreateExpEmp, setIsLoadingCreateExpEmp] = useState(false);

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

  const fetchDeletedPayments = async (params) => {
    setIsLoadingDeletedPayments(true);

    await backendAuthApi({
      url: BACKEND_API.PAYMENTS,
      method: 'GET',
      cancelToken: sourceToken.token,
      params: {
        ...params,
        isDeleted: true,
      },
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          setDeletedPayments(res.data.responseData.data);
          setDeletedPaymentsCount(res.data.responseData.count);
        }
      })
      .catch(() => {
        setIsLoadingDeletedPayments(false);
      })
      .finally(() => {
        setIsLoadingDeletedPayments(false);
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

  // Delete payment record - manually created
  const deleteManualPayment = async (id) => {
    let isSuccess = false;

    if (id) {
      setIsLoadingDeleteManPayment(true);

      await backendAuthApi({
        url: BACKEND_API.PAYMENT_DELETE,
        method: 'DELETE',
        cancelToken: sourceToken.token,
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
          setIsLoadingDeleteManPayment(false);
        })
        .finally(() => {
          setIsLoadingDeleteManPayment(false);
        });
    }

    return isSuccess;
  };

  // Delete WO payment
  const deleteWoPayment = async (id) => {
    let isSuccess = false;
    if (id) {
      setIsLoadingDeleteWoPay(true);

      await backendAuthApi({
        url: BACKEND_API.PAYMENT_WO_DELETE,
        method: 'DELETE',
        cancelToken: sourceToken.token,
        params: { id },
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
          setIsLoadingDeleteWoPay(false);
        })
        .finally(() => {
          setIsLoadingDeleteWoPay(false);
        });
    }
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

  // Create refund record
  const createRefoundRecord = async (data) => {
    let isSuccess = false;

    setIsLoadingRefund(true);

    await backendAuthApi({
      url: BACKEND_API.PAYMENT_CREATE_REFUND,
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
        setIsLoadingRefund(false);
      })
      .finally(() => {
        setIsLoadingRefund(false);
      });

    return isSuccess;
  };

  // Create GRN payment record
  const createGrnPaymentRecord = async (data) => {
    let isSuccess = false;
    setIsLoadingAddGrnPayment(true);

    await backendAuthApi({
      url: BACKEND_API.PAYMENT_CREATE_GRN,
      method: 'POST',
      cancelToken: sourceToken.token,
      data,
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          isSuccess = true;
        }

        enqueueSnackbar(res.data.responseData, {
          variant: responseUtil.findResponseType(res.data.responseCode),
        });
      })
      .catch(() => {
        setIsLoadingAddGrnPayment(false);
      })
      .finally(() => {
        setIsLoadingAddGrnPayment(false);
      });

    return isSuccess;
  };

  // Create employee advance payments
  const createEmpAdvancePayments = async (data) => {
    let isSuccess = false;

    setIsLoadingCreateExpEmp(true);

    await backendAuthApi({
      url: BACKEND_API.PAYMENT_CREATE_EXP_EMP,
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
        setIsLoadingCreateExpEmp(false);
      })
      .finally(() => {
        setIsLoadingCreateExpEmp(false);
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

  // Fetch GRN payment records
  const fetchGrnPaymentRecords = async (id) => {
    setIsLoadingGrnPayments(true);

    await backendAuthApi({
      url: BACKEND_API.PAYMENT_GRN,
      method: 'GET',
      cancelToken: sourceToken.token,
      params: { id },
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          setGrnPayments(res.data.responseData);
        }
      })
      .catch(() => {
        setIsLoadingGrnPayments(false);
      })
      .finally(() => {
        setIsLoadingGrnPayments(false);
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
    deletedPayments,
    paymentsCount,
    deletedPaymentsCount,
    pendingPayments,
    woPayments,
    grnPayments,
    accSummary,
    finSummary,
    expSummary,
    isLoadingPayments,
    isLoadingDeletedPayments,
    isLoadingPendingPayments,
    isLoadingCreate,
    isLoadingDeleteManPayment,
    isLoadingDeleteWoPay,
    isLoadingCreateExp,
    isLoadingCreateInc,
    isLoadingRefund,
    isLoadingAddGrnPayment,
    isLoadingPaymentComplete,
    isLoadingWoPayments,
    isLoadingGrnPayments,
    isLoadingAccSummary,
    isLoadingFinSummary,
    isLoadingFinSummary,
    isLoadingExpenseSummary,
    isLoadingFinReportDownload,
    isLoadingCreateExpEmp,
    fetchPayments,
    fetchDeletedPayments,
    fetchPendingPayments,
    createPayment,
    deleteManualPayment,
    deleteWoPayment,
    createExpensesPayment,
    createIncomePayment,
    createRefoundRecord,
    createGrnPaymentRecord,
    createEmpAdvancePayments,
    processPaymentRecord,
    fetchWorkorderPayments,
    fetchGrnPaymentRecords,
    fetchAccountsSummary,
    fetchFinancialSummary,
    fetchExpenseSummary,
    downloadFinancialReport,
  };
};

export default usePayment;
