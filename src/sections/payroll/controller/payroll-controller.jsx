import { useEffect, useState } from 'react';
import { PayrollView } from '../view/payroll-view';
import usePagination from 'src/hooks/usePagination';
import useEmployee from 'src/hooks/useEmployee';

const PayrollController = () => {
  const { empSelectables, isLoadingEmpSelect, fetchEmployeeForSelect } = useEmployee();

  const pagination = usePagination();

  const [selectedTab, setSelectedTab] = useState(0);

  const [isOpenPayrollDialog, setIsOpenPayrollDialog] = useState(false);

  const handleSelectTab = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleTogglePayrollDialog = () => {
    setIsOpenPayrollDialog(!isOpenPayrollDialog);
  };

  const handleGeneratePayroll = (values) => {
    console.log(values);
    
  };

  useEffect(() => {
    fetchEmployeeForSelect();
  }, []);

  return (
    <PayrollView
      selectedTab={selectedTab}
      empSelection={empSelectables}
      pagination={pagination}
      isOpenPayrollDialog={isOpenPayrollDialog}
      isLoadingEmpSelect={isLoadingEmpSelect}
      handleSelectTab={handleSelectTab}
      handleTogglePayrollDialog={handleTogglePayrollDialog}
      handleGeneratePayroll={handleGeneratePayroll}
    />
  );
};

export default PayrollController;
