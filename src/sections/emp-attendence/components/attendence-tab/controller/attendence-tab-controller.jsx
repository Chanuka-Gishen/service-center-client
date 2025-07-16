import { useEffect, useState } from 'react';

import usePagination from 'src/hooks/usePagination';
import useEmployee from 'src/hooks/useEmployee';
import { AttendenceTabView } from '../view/attendence-tab-view';

const tableHeaders = [
  'Emp Name',
  'Emp ID',
  'Date',
  'Check-In',
  'Check-Out',
  'Worked Hours',
  'Status',
];

const AttendenceTabController = () => {
  const pagination = usePagination();

  const {
    empSelectables,
    attendences,
    attendenceCount,
    isLoadingAttendences,
    isLoadingEmpSelect,
    isLoadingAddAttendences,
    isLoadingAddDailyAtt,
    fetchEmpAttendences,
    fetchEmployeeForSelect,
    addAttendenceRecords,
    addAttendenceRecordsDaily,
  } = useEmployee();

  const [anchorEl, setAnchorEl] = useState(null);
  const openOptions = Boolean(anchorEl);

  const [selectedFile, setSelectedFile] = useState(null);

  const [initialValues, setInitialValues] = useState({
    date: new Date(),
    records: [],
  });

  const [isOpenUploadDlg, setIsOpenUploadDialog] = useState(false);
  const [isOpenAddDlg, setIsOpenAddDlg] = useState(false);

  const [searchParams, setSearchParams] = useState({
    empId: '',
    name: '',
    date: null,
  });

  const queryParams = { page: pagination.page, limit: pagination.limit, ...searchParams };

  const handleChangeSearchParam = (event) => {
    setSearchParams({
      ...searchParams,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeSearchParamDate = (date) => {
    setSearchParams({
      ...searchParams,
      date: date,
    });
  };

  const handleDeleteSearchParam = (filterName) => {
    setSearchParams((prevFilters) => ({
      ...prevFilters,
      [filterName]: filterName === 'date' ? null : '',
    }));
  };

  const handleClickOptions = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseOptions = () => {
    setAnchorEl(null);
  };

  const handleToggleUploadDialog = () => {
    if (isOpenUploadDlg) {
      setSelectedFile(null);
    } else {
      handleCloseOptions();
    }

    setIsOpenUploadDialog(!isOpenUploadDlg);
  };

  const handleToggleAddDialog = async () => {
    if (!isOpenAddDlg) {
      handleCloseOptions();
      await handleFetchEmployees();
    }

    setIsOpenAddDlg(!isOpenAddDlg);
  };

  const handleSelectFile = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleFetchEmployees = async () => {
    const addedRecords = [];
    empSelectables.map((emp) => {
      const newRecord = {
        id: emp._id,
        empId: emp.empId,
        empFullName: emp.empFullName,
        checkIn: new Date(),
        checkOut: new Date(),
      };
      newRecord.checkIn.setHours(0, 0, 0, 0);
      newRecord.checkOut.setHours(0, 0, 0, 0);

      addedRecords.push(newRecord);
    });

    setInitialValues((prev) => ({
      ...prev,
      records: addedRecords,
    }));
  };

  const handleAddAttendenceRecords = async (values) => {
    const isSuccess = await addAttendenceRecordsDaily(values);

    if (isSuccess) {
      handleToggleAddDialog();
      fetchEmpAttendences(queryParams);
    }
  };

  const handleUploadAttendenceRecords = async () => {
    if (!selectedFile) return;

    const formdata = new FormData();
    formdata.append('file', selectedFile);

    const isSuccess = await addAttendenceRecords(formdata);

    if (isSuccess) {
      handleToggleUploadDialog();
      fetchEmpAttendences(queryParams);
    }
  };

  useEffect(() => {
    fetchEmpAttendences(queryParams);

    const params = { isIdRequired: true };
    fetchEmployeeForSelect(params);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.page, pagination.limit, searchParams]);

  return (
    <AttendenceTabView
      tableHeaders={tableHeaders}
      pagination={pagination}
      anchorEl={anchorEl}
      searchParams={searchParams}
      openOptions={openOptions}
      initialValues={initialValues}
      attendences={attendences}
      attendenceCount={attendenceCount}
      empSelectables={empSelectables}
      isOpenUploadDlg={isOpenUploadDlg}
      isOpenAddDlg={isOpenAddDlg}
      selectedFile={selectedFile}
      isLoadingAttendences={isLoadingAttendences}
      isLoadingAddAttendences={isLoadingAddAttendences}
      isLoadingEmpSelect={isLoadingEmpSelect}
      isLoadingAddDailyAtt={isLoadingAddDailyAtt}
      fetchEmpAttendences={fetchEmpAttendences}
      handleChangeSearchParam={handleChangeSearchParam}
      handleChangeSearchParamDate={handleChangeSearchParamDate}
      handleDeleteSearchParam={handleDeleteSearchParam}
      handleClickOptions={handleClickOptions}
      handleCloseOptions={handleCloseOptions}
      handleToggleUploadDialog={handleToggleUploadDialog}
      handleToggleAddDialog={handleToggleAddDialog}
      handleSelectFile={handleSelectFile}
      handleAddAttendenceRecords={handleAddAttendenceRecords}
      handleUploadAttendenceRecords={handleUploadAttendenceRecords}
    />
  );
};

export default AttendenceTabController;
