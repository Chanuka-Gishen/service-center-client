import { useState } from 'react';
import axios from 'axios';
import { BACKEND_API } from 'src/axios/constant/backend-api';
import { backendAuthApi } from 'src/axios/instance/backend-axios-instance';
import responseUtil from 'src/utils/responseUtil';

const usePayroll = () => {
  const sourceToken = axios.CancelToken.source();

  const [empPayrollSchema, setEmpPayrollSchema] = useState(null);
  const [empSalaryHistory, setEmpSalaryHistory] = useState([]);
  const [empBonuses, setEmpBonuses] = useState([]);

  const [empSalaryHistoryCount, setEmpSalaryHistoryCount] = useState(0);
  const [empBonusesCount, setEmpBonuesCount] = useState(0);

  const [isLoadingCreatePayroll, setIsLoadingCreatePayroll] = useState(false);
  const [isLoadingUpdatePayroll, setIsLoadingUpdatePayroll] = useState(false);
  const [isLoadingEmpPayrollSchema, setIsLoadingEmpPayrollSchema] = useState(false);
  const [isLoadingChangeSalary, setIsLoadingChangeSalary] = useState(false);
  const [isLoadingAddBonus, setIsLoadingAddBonus] = useState(false);
  const [isLoadingDeleteBonus, setIsLoadingDeleteBonus] = useState(false);
  const [isLoadingSalaryHistory, setIsLoadingSalaryHistory] = useState(false);
  const [isLoadingBonuses, setIsLoadingBonuses] = useState(false);
  const [isLoadingSalaryReverse, setIsLoadingSalaryReverse] = useState(false);

  // Fetch employee payroll schema
  const fetchEmpPayrollSchema = async (id) => {
    let result = null;
    setIsLoadingEmpPayrollSchema(true);

    await backendAuthApi({
      url: BACKEND_API.EMP_SALARY_SCHEMA_GET,
      method: 'GET',
      cancelToken: sourceToken.token,
      params: { id },
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          setEmpPayrollSchema(res.data.responseData);
          result = res.data.responseData;
        }
      })
      .catch(() => {
        setIsLoadingEmpPayrollSchema(false);
      })
      .finally(() => {
        setIsLoadingEmpPayrollSchema(false);
      });

    return result;
  };

  // Create employee payroll schema
  const createEmpPayrollSchema = async (data) => {
    let isSuccess = false;

    setIsLoadingCreatePayroll(true);

    await backendAuthApi({
      url: BACKEND_API.EMP_SALARY_SCHEMA_CREATE,
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
        setIsLoadingCreatePayroll(false);
      })
      .finally(() => {
        setIsLoadingCreatePayroll(false);
      });

    return isSuccess;
  };

  // Udpate employee payroll schema
  const updateEmpPayrollSchema = async (data) => {
    let isSuccess = false;

    setIsLoadingUpdatePayroll(true);

    await backendAuthApi({
      url: BACKEND_API.EMP_SALARY_SCHEMA_UPDATE,
      method: 'PUT',
      cancelToken: sourceToken.token,
      data,
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          isSuccess = true;
        }
      })
      .catch(() => {
        setIsLoadingUpdatePayroll(false);
      })
      .finally(() => {
        setIsLoadingUpdatePayroll(false);
      });

    return isSuccess;
  };

  // Change employee salary
  const changeEmpSalary = async (data) => {
    let isSuccess = false;

    setIsLoadingChangeSalary(true);

    await backendAuthApi({
      url: BACKEND_API.EMP_SALARY_UPDATE,
      method: 'PUT',
      cancelToken: sourceToken.token,
      data,
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          isSuccess = true;
        }
      })
      .catch(() => {
        setIsLoadingChangeSalary(false);
      })
      .finally(() => {
        setIsLoadingChangeSalary(false);
      });

    return isSuccess;
  };

  // Add employee bonus
  const addEmployeeBonus = async (data) => {
    let isSuccess = false;

    setIsLoadingAddBonus(true);

    await backendAuthApi({
      url: BACKEND_API.EMP_SALARY_BONUS_ADD,
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
        setIsLoadingAddBonus(false);
      })
      .finally(() => {
        setIsLoadingAddBonus(false);
      });

    return isSuccess;
  };

  // Delete not processed employee bonus
  const deleteUnprocessedEmpBonus = async (id) => {
    let isSuccess = false;

    setIsLoadingDeleteBonus(true);

    await backendAuthApi({
      url: BACKEND_API.EMP_SALARY_BONUS_DELETE,
      method: 'DELETE',
      cancelToken: sourceToken.token,
      params: { id },
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          isSuccess = true;
        }
      })
      .catch(() => {
        setIsLoadingDeleteBonus(false);
      })
      .finally(() => {
        setIsLoadingDeleteBonus(false);
      });

    return isSuccess;
  };

  // Fetch emp salary change history
  const fetchEmpSalaryChangeHistory = async (params) => {
    setIsLoadingSalaryHistory(true);

    await backendAuthApi({
      url: BACKEND_API.EMP_SALARY_CHANGE_HISTORY,
      method: 'GET',
      cancelToken: sourceToken.token,
      params,
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          setEmpSalaryHistory(res.data.responseData.data);
          setEmpSalaryHistoryCount(res.data.responseData.count);
        }
      })
      .catch(() => {
        setIsLoadingSalaryHistory(false);
      })
      .finally(() => {
        setIsLoadingSalaryHistory(false);
      });
  };

  // Fetch emp bonuses
  const fetchEmpBonusesHistory = async (params) => {
    setIsLoadingBonuses(true);

    await backendAuthApi({
      url: BACKEND_API.EMP_BONUS_HISTORY,
      method: 'GET',
      cancelToken: sourceToken.token,
      params,
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          setEmpBonuses(res.data.responseData.data);
          setEmpBonuesCount(res.data.responseData.count);
        }
      })
      .catch(() => {
        setIsLoadingBonuses(false);
      })
      .finally(() => {
        setIsLoadingBonuses(false);
      });
  };

  // Reverse salary change
  const reverseSalaryChange = async (id) => {
    let isSuccess = false;

    setIsLoadingSalaryReverse(true);

    await backendAuthApi({
      url: BACKEND_API.EMP_UNDO_SALARY_CHANGE,
      method: 'DELETE',
      cancelToken: sourceToken.token,
      params: { id },
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          isSuccess = true;
        }
      })
      .catch(() => {
        setIsLoadingSalaryReverse(false);
      })
      .finally(() => {
        setIsLoadingSalaryReverse(false);
      });

    return isSuccess;
  };

  return {
    empPayrollSchema,
    empSalaryHistory,
    empBonuses,
    empSalaryHistoryCount,
    empBonusesCount,
    isLoadingCreatePayroll,
    isLoadingUpdatePayroll,
    isLoadingEmpPayrollSchema,
    isLoadingChangeSalary,
    isLoadingAddBonus,
    isLoadingDeleteBonus,
    isLoadingChangeSalary,
    isLoadingBonuses,
    isLoadingSalaryHistory,
    isLoadingSalaryReverse,
    fetchEmpPayrollSchema,
    createEmpPayrollSchema,
    updateEmpPayrollSchema,
    changeEmpSalary,
    addEmployeeBonus,
    deleteUnprocessedEmpBonus,
    fetchEmpBonusesHistory,
    fetchEmpSalaryChangeHistory,
    reverseSalaryChange,
  };
};

export default usePayroll;
