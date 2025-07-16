import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { BACKEND_API } from 'src/axios/constant/backend-api';
import { backendAuthApi } from 'src/axios/instance/backend-axios-instance';
import responseUtil from 'src/utils/responseUtil';

const useEmployee = () => {
  const sourceToken = axios.CancelToken.source();
  const { enqueueSnackbar } = useSnackbar();

  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState(null);
  const [empJobs, setEmpJobs] = useState([]);
  const [attendences, setAttendences] = useState([]);
  const [empAttendences, setEmpAttendences] = useState([]);
  const [empSelectables, setEmpSelectables] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);

  const [employeesCount, setEmployeesCount] = useState(0);
  const [empJobsCount, setEmpJobsCount] = useState(0);
  const [attendenceCount, setAttendenceCount] = useState(0);
  const [empAttCount, setEmpAttCount] = useState(0);
  const [leaveRqstCount, setLeaveRqstCount] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingRegister, setIsLoadingRegister] = useState(false);
  const [isLoadingUpdateEmp, setIsLoadingUpdateEmp] = useState(false);
  const [isLoadingEmp, setIsLoadingEmp] = useState(true);
  const [isLoadingEmpJobs, setIsLoadingEmpJobs] = useState(true);
  const [isLoadingEmpSelect, setIsLoadingEmpSelect] = useState(false);
  const [isLoadingAttendences, setIsLoadingAttendences] = useState(false);
  const [isLoadingAddAttendences, setIsLoadingAddAttendences] = useState(false);
  const [isLoadingAddDailyAtt, setIsLoadingAddDailyAtt] = useState(false);
  const [isLoadingEmpAtt, setIsLoadingEmpAtt] = useState(true);
  const [isLoadingLeaveRqsts, setIsLoadingLeaveRqsts] = useState(true);
  const [isLoadingCreateLeaveRqst, setIsLoadingCreateLeaveRqst] = useState(false);
  const [isLoadingProcessLeaveRqst, setIsLoadingProcessLeaveRqst] = useState(false);

  // Register employee data
  const registerEmployee = async (data) => {
    if (isLoadingRegister) return;

    setIsLoadingRegister(true);

    let isSuccess = false;

    await backendAuthApi({
      url: BACKEND_API.EMP_REGISTER,
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
        setIsLoadingRegister(false);
      })
      .finally(() => {
        setIsLoadingRegister(false);
      });

    return isSuccess;
  };

  // Update employee data
  const updateEmployee = async (data) => {
    let isSuccess = false;
    setIsLoadingUpdateEmp(true);

    await backendAuthApi({
      url: BACKEND_API.EMP_UPDATE,
      method: 'PUT',
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
        setIsLoadingUpdateEmp(false);
      })
      .finally(() => {
        setIsLoadingUpdateEmp(false);
      });

    return isSuccess;
  };

  // Fetch all employees
  const fetchAllEmployees = async (params) => {
    if (isLoading) return;

    setIsLoading(true);

    await backendAuthApi({
      url: BACKEND_API.EMP_ALL,
      method: 'GET',
      cancelToken: sourceToken.token,
      params,
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          setEmployees(res.data.responseData.data);
          setEmployeesCount(res.data.responseData.count);
        }
      })
      .catch(() => {
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Fetch employee data
  const fetchEmployee = async (id) => {
    setIsLoadingEmp(true);

    await backendAuthApi({
      url: BACKEND_API.EMP_INFO,
      method: 'GET',
      cancelToken: sourceToken.token,
      params: {
        id,
      },
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          setEmployee(res.data.responseData);
        }
      })
      .catch(() => {
        setIsLoadingEmp(false);
      })
      .finally(() => {
        setIsLoadingEmp(false);
      });
  };

  // Fetch employees for select options
  const fetchEmployeeForSelect = async (params = null) => {
    if (isLoadingEmpSelect) return;

    setEmpSelectables([]);

    setIsLoadingEmpSelect(true);

    await backendAuthApi({
      url: BACKEND_API.EMP_SELECT,
      method: 'GET',
      cancelToken: sourceToken.token,
      params,
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          setEmpSelectables(res.data.responseData);
        }
      })
      .catch(() => {
        setIsLoadingEmpSelect(false);
      })
      .finally(() => {
        setIsLoadingEmpSelect(false);
      });
  };

  // Fetch employees attendences
  const fetchEmpAttendences = async (params) => {
    if (isLoadingAttendences) return;

    setIsLoadingAttendences(true);

    await backendAuthApi({
      url: BACKEND_API.EMP_ATT_GET,
      method: 'GET',
      cancelToken: sourceToken.token,
      params,
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          setAttendences(res.data.responseData.data);
          setAttendenceCount(res.data.responseData.count);
        }
      })
      .catch(() => {
        setIsLoadingAttendences(false);
      })
      .finally(() => {
        setIsLoadingAttendences(false);
      });
  };

  // Add attendence records
  const addAttendenceRecords = async (data) => {
    setIsLoadingAddAttendences(true);

    let isSuccess = false;

    await backendAuthApi({
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      url: BACKEND_API.EMP_ATT_BATCH_ADD,
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
        setIsLoadingAddAttendences(false);
      })
      .finally(() => {
        setIsLoadingAddAttendences(false);
      });

    return isSuccess;
  };

  // Add attendence seperatly
  const addAttendenceRecordsDaily = async (data) => {
    setIsLoadingAddDailyAtt(true);

    let isSuccess = false;

    await backendAuthApi({
      url: BACKEND_API.EMP_ATT_ADD,
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
        setIsLoadingAddDailyAtt(false);
      })
      .finally(() => {
        setIsLoadingAddDailyAtt(false);
      });

    return isSuccess;
  };

  // Employee Jobs
  const fetchEmpJobs = async (params) => {
    if (params?.id) {
      await backendAuthApi({
        url: BACKEND_API.EMP_WORKORDERS,
        method: 'GET',
        cancelToken: sourceToken.token,
        params,
      })
        .then((res) => {
          if (responseUtil.isResponseSuccess(res.data.responseCode)) {
            setEmpJobs(res.data.responseData.data);
            setEmpJobsCount(res.data.responseData.count);
          }
        })
        .catch(() => {
          setIsLoadingEmpJobs(false);
        })
        .finally(() => {
          setIsLoadingEmpJobs(false);
        });
    }
  };

  // Employee attendence records
  const fetchEmpAttendence = async (params) => {
    await backendAuthApi({
      url: BACKEND_API.EMP_ATT,
      method: 'GET',
      cancelToken: sourceToken.token,
      params,
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          setEmpAttendences(res.data.responseData.data);
          setEmpAttCount(res.data.responseData.count);
        }
      })
      .catch(() => {
        setIsLoadingEmpAtt(false);
      })
      .finally(() => {
        setIsLoadingEmpAtt(false);
      });
  };

  // Fetch leave requsts
  const fetchLeaveRequests = async (params) => {
    setLeaveRequests([]);
    setLeaveRqstCount(0);
    setIsLoadingLeaveRqsts(true);

    await backendAuthApi({
      url: BACKEND_API.EMP_LEAVE_RQSTS,
      method: 'GET',
      cancelToken: sourceToken.token,
      params,
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          setLeaveRequests(res.data.responseData.data);
          setLeaveRqstCount(res.data.responseData.count);
        }
      })
      .catch(() => {
        setIsLoadingLeaveRqsts(false);
      })
      .finally(() => {
        setIsLoadingLeaveRqsts(false);
      });
  };

  // Create leave requests
  const createLeaveRequests = async (data) => {
    let isSuccess = false;
    setIsLoadingCreateLeaveRqst(true);

    await backendAuthApi({
      url: BACKEND_API.EMP_LEAVE_RQSTS_ADD,
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
        setIsLoadingCreateLeaveRqst(false);
      })
      .finally(() => {
        setIsLoadingCreateLeaveRqst(false);
      });

    return isSuccess;
  };

  // Process leave requests
  const processLeaveRequest = async (data) => {
    let isSuccess = false;
    setIsLoadingProcessLeaveRqst(true);

    await backendAuthApi({
      url: BACKEND_API.EMP_LEAVE_RQSTS_PROCESS,
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
        setIsLoadingProcessLeaveRqst(false);
      })
      .finally(() => {
        setIsLoadingProcessLeaveRqst(false);
      });

    return isSuccess;
  };

  return {
    isLoading,
    isLoadingEmp,
    isLoadingEmpJobs,
    isLoadingRegister,
    isLoadingUpdateEmp,
    isLoadingEmpSelect,
    isLoadingAttendences,
    isLoadingAddAttendences,
    isLoadingAddDailyAtt,
    isLoadingEmpAtt,
    isLoadingLeaveRqsts,
    isLoadingCreateLeaveRqst,
    isLoadingProcessLeaveRqst,
    employee,
    employees,
    empJobs,
    empAttendences,
    empAttCount,
    empSelectables,
    employeesCount,
    empJobsCount,
    attendences,
    attendenceCount,
    leaveRequests,
    setLeaveRequests,
    leaveRqstCount,
    registerEmployee,
    updateEmployee,
    fetchAllEmployees,
    fetchEmployee,
    fetchEmployeeForSelect,
    fetchEmpAttendences,
    fetchEmpJobs,
    fetchEmpAttendence,
    fetchLeaveRequests,
    addAttendenceRecords,
    addAttendenceRecordsDaily,
    createLeaveRequests,
    processLeaveRequest,
  };
};

export default useEmployee;
