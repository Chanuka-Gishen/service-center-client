import { useEffect, useState } from 'react';

import usePagination from 'src/hooks/usePagination';
import { EmpAttendenceView } from '../view/emp-attendence-view';
import useEmployee from 'src/hooks/useEmployee';

const tableHeaders = [
  'Emp Name',
  'Emp ID',
  'Date',
  'Check-In',
  'Check-Out',
  'Worked Hours',
  'Status',
];

const EmpAttendenceController = () => {
  const pagination = usePagination();

  const {
    attendences,
    attendenceCount,
    isLoadingAttendences,
    isLoadingAddAttendences,
    fetchEmpAttendences,
    addAttendenceRecords,
  } = useEmployee();

  const [selectedFile, setSelectedFile] = useState(null);

  const [isOpenUploadDlg, setIsOpenUploadDialog] = useState(false);

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

  const handleToggleUploadDialog = () => {
    if (isOpenUploadDlg) setSelectedFile(null);

    setIsOpenUploadDialog(!isOpenUploadDlg);
  };

  const handleSelectFile = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleAddAttendenceRecords = async () => {
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.page, pagination.limit, searchParams]);

  return (
    <EmpAttendenceView
      tableHeaders={tableHeaders}
      pagination={pagination}
      searchParams={searchParams}
      attendences={attendences}
      attendenceCount={attendenceCount}
      isOpenUploadDlg={isOpenUploadDlg}
      selectedFile={selectedFile}
      isLoadingAttendences={isLoadingAttendences}
      isLoadingAddAttendences={isLoadingAddAttendences}
      fetchEmpAttendences={fetchEmpAttendences}
      handleChangeSearchParam={handleChangeSearchParam}
      handleChangeSearchParamDate={handleChangeSearchParamDate}
      handleDeleteSearchParam={handleDeleteSearchParam}
      handleToggleUploadDialog={handleToggleUploadDialog}
      handleSelectFile={handleSelectFile}
      handleAddAttendenceRecords={handleAddAttendenceRecords}
    />
  );
};

export default EmpAttendenceController;
