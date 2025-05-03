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
  const [empSelectables, setEmpSelectables] = useState([]);

  const [employeesCount, setEmployeesCount] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingRegister, setIsLoadingRegister] = useState(false);
  const [isLoadingEmp, setIsLoadingEmp] = useState(false);
  const [isLoadingEmpSelect, setIsLoadingEmpSelect] = useState(false);

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
    if (isLoadingEmp) return;

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
  const fetchEmployeeForSelect = async () => {
    if (isLoadingEmpSelect) return;

    setIsLoadingEmpSelect(true);

    await backendAuthApi({
      url: BACKEND_API.EMP_SELECT,
      method: 'GET',
      cancelToken: sourceToken.token,
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

  return {
    isLoading,
    isLoadingEmp,
    isLoadingRegister,
    isLoadingEmpSelect,
    employee,
    employees,
    empSelectables,
    employeesCount,
    registerEmployee,
    fetchAllEmployees,
    fetchEmployee,
    fetchEmployeeForSelect,
  };
};

export default useEmployee;
