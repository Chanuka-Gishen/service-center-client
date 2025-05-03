import React, { useEffect, useState } from 'react';
import { EditAssigneeButtonView } from '../view/edit-assignee-button-view';
import useEmployee from 'src/hooks/useEmployee';

const EditAssigneeButtonController = ({ isLoading, handleAssign, assignees }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { empSelectables, isLoadingEmpSelect, fetchEmployeeForSelect } = useEmployee();

  const handleToggleDialog = () => {
    setIsOpen(!isOpen);
  };

  const handleAssignEmployees = async (values) => {
    await handleAssign(values);

    handleToggleDialog();
  };

  useEffect(() => {
    fetchEmployeeForSelect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <EditAssigneeButtonView
      options={empSelectables}
      assignees={assignees}
      isOpen={isOpen}
      isLoading={isLoading}
      isLoadingEmpSelect={isLoadingEmpSelect}
      handleToggleDialog={handleToggleDialog}
      handleAssign={handleAssignEmployees}
    />
  );
};

export default EditAssigneeButtonController;
