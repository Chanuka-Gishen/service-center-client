import { useCallback, useEffect, useState } from 'react';
import { LeavesTabView } from '../view/leaves-tab-view';
import useEmployee from 'src/hooks/useEmployee';
import usePagination from 'src/hooks/usePagination';
import {
  LEAVE_STS_APPROVED,
  LEAVE_STS_PENDING,
  LEAVE_STS_REJECTED,
} from 'src/constants/leave-constants';

const pendingColumns = [
  'Employee',
  'Emp ID',
  'From',
  'To',
  'Type',
  'Half Day Period',
  'Total Days',
  'Reason',
  'Created By',
  'Created At',
];

const approvedColumns = [
  'Employee',
  'Emp ID',
  'From',
  'To',
  'Type',
  'Half Day Period',
  'Total Days',
  'Reason',
  'Created By',
  'Approved By',
  'Created At',
  'Approved At',
];

const rejectedColumns = [
  'Employee',
  'Emp ID',
  'From',
  'To',
  'Type',
  'Half Day Period',
  'Total Days',
  'Reason',
  'Created By',
  'Approved By',
  'Rejected Reason',
  'Created At',
  'Approved At',
];

const LeavesTabController = () => {
  const {
    leaveRequests,
    setLeaveRequests,
    leaveRqstCount,
    empSelectables,
    isLoadingLeaveRqsts,
    isLoadingEmpSelect,
    isLoadingCreateLeaveRqst,
    isLoadingProcessLeaveRqst,
    fetchEmployeeForSelect,
    fetchLeaveRequests,
    createLeaveRequests,
    processLeaveRequest,
  } = useEmployee();

  const pendingPagination = usePagination();
  const processedPagination = usePagination();
  const rejectedPagination = usePagination();

  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const [isOpenAddRequest, setIsOpenAddRequest] = useState(false);
  const [isOpenProcessRequest, setIsOpenProcessRequest] = useState(false);

  const handleSelectTab = (event, newValue) => {
    setLeaveRequests([]);
    setSelectedTab(newValue);
  };

  const handleToggleAddRequest = () => {
    setIsOpenAddRequest(!isOpenAddRequest);
  };

  const handleToggleProcessRequest = (data = null) => {
    setSelectedRequest(data);

    setIsOpenProcessRequest(!isOpenProcessRequest);
  };

  const handleFetchLeaveRequests = async () => {
    let params = {};

    if (selectedTab === 0) {
      params = {
        page: pendingPagination.page,
        limit: pendingPagination.limit,
        status: LEAVE_STS_PENDING,
      };
    } else if (selectedTab === 1) {
      params = {
        page: processedPagination.page,
        limit: processedPagination.limit,
        status: LEAVE_STS_APPROVED,
      };
    } else {
      params = {
        page: rejectedPagination.page,
        limit: rejectedPagination.limit,
        status: LEAVE_STS_REJECTED,
      };
    }

    await fetchLeaveRequests(params);
  };

  const handleAddLeaveRequest = async (data) => {
    const isSuccess = await createLeaveRequests(data);

    if (isSuccess) {
      handleToggleAddRequest();
      handleFetchLeaveRequests();
    }
  };

  const handleProcessLeaveRequest = async (values) => {
    const data = {
      ...values,
      _id: selectedRequest._id,
    };

    console.log(data);
    

    const isSuccess = await processLeaveRequest(data);

    if (isSuccess) {
      handleToggleProcessRequest();
      handleFetchLeaveRequests();
    }
  };

  useEffect(() => {
    handleFetchLeaveRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    selectedTab,
    pendingPagination.page,
    pendingPagination.limit,
    processedPagination.page,
    processedPagination.limit,
    rejectedPagination.page,
    rejectedPagination.limit,
  ]);

  useEffect(() => {
    fetchEmployeeForSelect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LeavesTabView
      selectedTab={selectedTab}
      selectedRequest={selectedRequest}
      pendingColumns={pendingColumns}
      approvedColumns={approvedColumns}
      rejectedColumns={rejectedColumns}
      leaveRequests={leaveRequests}
      leaveRqstCount={leaveRqstCount}
      empSelectables={empSelectables}
      pendingPagination={pendingPagination}
      processedPagination={processedPagination}
      rejectedPagination={rejectedPagination}
      isOpenAddRequest={isOpenAddRequest}
      isOpenProcessRequest={isOpenProcessRequest}
      isLoadingLeaveRqsts={isLoadingLeaveRqsts}
      isLoadingEmpSelect={isLoadingEmpSelect}
      isLoadingCreateLeaveRqst={isLoadingCreateLeaveRqst}
      isLoadingProcessLeaveRqst={isLoadingProcessLeaveRqst}
      handleSelectTab={handleSelectTab}
      handleToggleAddRequest={handleToggleAddRequest}
      handleToggleProcessRequest={handleToggleProcessRequest}
      handleAddLeaveRequest={handleAddLeaveRequest}
      handleProcessLeaveRequest={handleProcessLeaveRequest}
    />
  );
};

export default LeavesTabController;
