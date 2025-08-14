import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useRouter } from 'src/routes/hooks';
import { EmployeeView } from '../view/employee-view';
import useEmployee from 'src/hooks/useEmployee';
import usePagination from 'src/hooks/usePagination';

const jobHeaders = ['Vehicle Number', 'Type', 'Mileage', 'Invoice No', 'Status', 'Created At'];
const attHeaders = ['Date', 'Check-In', 'Check-Out', 'Worked Hours', 'Status'];

const EmployeeController = () => {
  const { id } = useParams();
  const router = useRouter();

  const {
    employee,
    empJobs,
    empAttendences,
    empJobsCount,
    empAttCount,
    isLoadingEmp,
    isLoadingEmpJobs,
    isLoadingEmpAtt,
    isLoadingUpdateEmp,
    fetchEmployee,
    fetchEmpJobs,
    fetchEmpAttendence,
    updateEmployee,
  } = useEmployee();

  const jobsPagination = usePagination();
  const attPagination = usePagination();

  const [selectedTab, setSelectedTab] = useState(0);

  const [isOpenUpdateDlg, setIsOpenUpdateDlg] = useState(false);

  const jobsParams = { page: jobsPagination.page, limit: jobsPagination.limit, id };
  const attParams = { page: attPagination.page, limit: attPagination.limit, id };

  const handleSelectTab = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleOnClickBreadCrumb = (path) => {
    router.push(path);
  };

  const handleToggleUpdateDlg = () => {
    setIsOpenUpdateDlg(!isOpenUpdateDlg);
  };

  const handleUpdateEmpInfo = async (data) => {
    const isSuccess = await updateEmployee(data);

    if (isSuccess) {
      handleToggleUpdateDlg();
      await fetchEmployee(id);
    }
  };

  useEffect(() => {
    if (selectedTab === 0) fetchEmployee(id);

    if (selectedTab === 1) fetchEmpJobs(jobsParams);

    if (selectedTab === 2) fetchEmpAttendence(attParams);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    selectedTab,
    jobsPagination.page,
    jobsPagination.limit,
    attPagination.page,
    attPagination.limit,
  ]);

  return (
    <EmployeeView
      empId={id}
      jobHeaders={jobHeaders}
      attHeaders={attHeaders}
      employee={employee}
      empJobs={empJobs}
      empAttendences={empAttendences}
      empJobsCount={empJobsCount}
      empAttCount={empAttCount}
      selectedTab={selectedTab}
      jobsPagination={jobsPagination}
      attPagination={attPagination}
      isOpenUpdateDlg={isOpenUpdateDlg}
      isLoadingEmp={isLoadingEmp}
      isLoadingEmpJobs={isLoadingEmpJobs}
      isLoadingEmpAtt={isLoadingEmpAtt}
      isLoadingUpdateEmp={isLoadingUpdateEmp}
      handleSelectTab={handleSelectTab}
      handleOnClickBreadCrumb={handleOnClickBreadCrumb}
      handleToggleUpdateDlg={handleToggleUpdateDlg}
      handleUpdateEmpInfo={handleUpdateEmpInfo}
    />
  );
};

export default EmployeeController;
