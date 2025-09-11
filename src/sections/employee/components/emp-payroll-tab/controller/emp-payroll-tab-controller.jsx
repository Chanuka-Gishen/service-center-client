import { useEffect, useState } from 'react';
import { EmpPayrollTabView } from '../view/emp-payroll-tab-view';
import usePayroll from 'src/hooks/usePayroll';
import { PAY_FREQ_MONTHLY } from 'src/constants/payroll-constants';
import usePagination from 'src/hooks/usePagination';
import usePayment from 'src/hooks/usePayment';

const bonusTableHeaders = ['Description', 'Amount', 'Status', 'Entered By', 'Created At'];

const salaryTableHeaders = [
  'Type',
  'Reason',
  'Previous Amount',
  'New Amount',
  'Difference',
  'Difference Percentage',
  'Status',
  'Changed By',
  'Effective From',
];

const EmpPayrollTabController = ({ id }) => {
  const {
    empPayrollSchema,
    empBonuses,
    empSalaryHistory,
    empBonusesCount,
    empSalaryHistoryCount,
    isLoadingEmpPayrollSchema,
    isLoadingCreatePayroll,
    isLoadingUpdatePayroll,
    isLoadingAddBonus,
    isLoadingChangeSalary,
    isLoadingBonuses,
    isLoadingDeleteBonus,
    isLoadingSalaryHistory,
    isLoadingSalaryReverse,
    fetchEmpPayrollSchema,
    createEmpPayrollSchema,
    updateEmpPayrollSchema,
    addEmployeeBonus,
    changeEmpSalary,
    deleteUnprocessedEmpBonus,
    fetchEmpBonusesHistory,
    fetchEmpSalaryChangeHistory,
    reverseSalaryChange,
  } = usePayroll();

  const { isLoadingCreateExpEmp, createEmpAdvancePayments } = usePayment();

  const bonusesPagination = usePagination();
  const salaryPagination = usePagination();

  const [selectedBonusRecord, setSelectedBonusRecord] = useState(null);

  const [isOpenSchemaDialog, setIsOpenSchemaDialog] = useState(false);
  const [isOpenUpdateSalaryDialog, setIsOpenUpdateSalaryDialog] = useState(false);
  const [isOpenAddBonusDialog, setIsOpenAddBonusDialog] = useState(false);
  const [isOpenDeleteBonusDialog, setIsOpenDeleteBonusDialog] = useState(false);
  const [isOpenSalaryRevertDialog, setIsOpenSalaryRevertDialog] = useState(false);
  const [isOpenCreateEmpExp, setIsOpenCreateEmpExp] = useState(false);

  const [initialValues, setInitialValues] = useState({
    baseSalary: 0,
    payFrequency: PAY_FREQ_MONTHLY,
    epfEligible: true,
    etfEligible: true,
    recurringAllowances: [],
    otherRecurringEarnings: [],
  });

  // ----------------------------------------

  const bonusQuery = { id, page: bonusesPagination.page, limit: bonusesPagination.limit };
  const salaryQuery = { id, page: salaryPagination.page, limit: salaryPagination.limit };

  // ----------------------------------------

  const handleToggleSchemaDialog = () => {
    setIsOpenSchemaDialog(!isOpenSchemaDialog);
  };

  const handleToggleUpdateSalaryDialog = () => {
    setIsOpenUpdateSalaryDialog(!isOpenUpdateSalaryDialog);
  };

  const handleToggleAddBonusDialog = () => {
    setIsOpenAddBonusDialog(!isOpenAddBonusDialog);
  };

  const handleToggleDeleteBonusDialog = (recordId) => {
    if (!isOpenAddBonusDialog) {
      setSelectedBonusRecord(recordId);
    } else {
      setSelectedBonusRecord(null);
    }
    setIsOpenDeleteBonusDialog(!isOpenDeleteBonusDialog);
  };

  const handleToggleRevertSalaryDialog = () => {
    setIsOpenSalaryRevertDialog(!isOpenSalaryRevertDialog);
  };

  const handleToggleCreateEmpExpDialog = () => {
    setIsOpenCreateEmpExp(!isOpenCreateEmpExp);
  };

  const handleSubmitSchema = async (values) => {
    let data;
    let isSuccess = false;

    if (empPayrollSchema) {
      data = {
        ...values,
        _id: empPayrollSchema._id,
      };
    } else {
      data = {
        ...values,
        employeeId: id,
      };
    }

    if (empPayrollSchema) {
      isSuccess = await updateEmpPayrollSchema(data);
    } else {
      isSuccess = await createEmpPayrollSchema(data);
    }

    if (isSuccess) {
      handleToggleSchemaDialog();
      handleFetchEmpPayrollSchema();
    }
  };

  const handleSalaryChange = async (values) => {
    const data = {
      employee: id,
      ...values,
    };

    const isSuccess = await changeEmpSalary(data);

    if (isSuccess) {
      handleToggleUpdateSalaryDialog();
      handleFetchEmpPayrollSchema();
      handleFetchEmpSalaryChanges();
    }
  };

  const handleAddBonus = async (values) => {
    const data = {
      bonusEmp: id,
      ...values,
    };

    const isSuccess = await addEmployeeBonus(data);

    if (isSuccess) {
      handleToggleAddBonusDialog();
      handleFetchEmpBonuses();
    }
  };

  const handleFetchEmpPayrollSchema = async () => {
    const result = await fetchEmpPayrollSchema(id);

    if (result) {
      setInitialValues({
        payFrequency: result.payFrequency,
        epfEligible: result.epfEligible,
        etfEligible: result.etfEligible,
        recurringAllowances: result.recurringAllowances,
        otherRecurringEarnings: result.otherRecurringEarnings,
      });
    }
  };

  const handleFetchEmpSalaryChanges = async () => {
    await fetchEmpSalaryChangeHistory(salaryQuery);
  };

  const handleDeleteEmpBonus = async () => {
    const isSuccess = await deleteUnprocessedEmpBonus(selectedBonusRecord);

    if (isSuccess) {
      handleToggleDeleteBonusDialog();
      handleFetchEmpBonuses();
    }
  };

  const handleReverseSalaryChange = async () => {
    const isSuccess = await reverseSalaryChange(id);

    if (isSuccess) {
      handleToggleRevertSalaryDialog();
      handleFetchEmpPayrollSchema();
      handleFetchEmpSalaryChanges();
    }
  };

  const handleCreateEmpAdvancePayment = async (values) => {
    const data = {
      empId: id,
      ...values,
    };

    const isSuccess = await createEmpAdvancePayments(data);

    if (isSuccess) {
      handleToggleCreateEmpExpDialog();
    }
  };

  const handleFetchEmpBonuses = async () => {
    await fetchEmpBonusesHistory(bonusQuery);
  };

  useEffect(() => {
    handleFetchEmpPayrollSchema();
    handleFetchEmpBonuses();
    handleFetchEmpSalaryChanges();
  }, []);

  return (
    <EmpPayrollTabView
      bonusTableHeaders={bonusTableHeaders}
      salaryTableHeaders={salaryTableHeaders}
      initialValues={initialValues}
      empPayrollSchema={empPayrollSchema}
      empBonuses={empBonuses}
      empSalaryHistory={empSalaryHistory}
      empBonusesCount={empBonusesCount}
      empSalaryHistoryCount={empSalaryHistoryCount}
      bonusesPagination={bonusesPagination}
      salaryPagination={salaryPagination}
      isOpenSchemaDialog={isOpenSchemaDialog}
      isOpenUpdateSalaryDialog={isOpenUpdateSalaryDialog}
      isOpenAddBonusDialog={isOpenAddBonusDialog}
      isOpenDeleteBonusDialog={isOpenDeleteBonusDialog}
      isOpenSalaryRevertDialog={isOpenSalaryRevertDialog}
      isOpenCreateEmpExp={isOpenCreateEmpExp}
      isLoadingEmpPayrollSchema={isLoadingEmpPayrollSchema}
      isLoadingCreatePayroll={isLoadingCreatePayroll}
      isLoadingUpdatePayroll={isLoadingUpdatePayroll}
      isLoadingAddBonus={isLoadingAddBonus}
      isLoadingChangeSalary={isLoadingChangeSalary}
      isLoadingBonuses={isLoadingBonuses}
      isLoadingDeleteBonus={isLoadingDeleteBonus}
      isLoadingSalaryHistory={isLoadingSalaryHistory}
      isLoadingSalaryReverse={isLoadingSalaryReverse}
      isLoadingCreateExpEmp={isLoadingCreateExpEmp}
      handleToggleSchemaDialog={handleToggleSchemaDialog}
      handleToggleUpdateSalaryDialog={handleToggleUpdateSalaryDialog}
      handleToggleAddBonusDialog={handleToggleAddBonusDialog}
      handleToggleDeleteBonusDialog={handleToggleDeleteBonusDialog}
      handleToggleRevertSalaryDialog={handleToggleRevertSalaryDialog}
      handleToggleCreateEmpExpDialog={handleToggleCreateEmpExpDialog}
      handleSubmitSchema={handleSubmitSchema}
      handleSalaryChange={handleSalaryChange}
      handleAddBonus={handleAddBonus}
      handleCreateEmpAdvancePayment={handleCreateEmpAdvancePayment}
      handleDeleteEmpBonus={handleDeleteEmpBonus}
      handleReverseSalaryChange={handleReverseSalaryChange}
    />
  );
};

export default EmpPayrollTabController;
