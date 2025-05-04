import { Button } from '@mui/material';
import React from 'react';
import { EditAssigneeDialog } from '../component/edit-assignee-dialog';

export const EditAssigneeButtonView = ({
  options,
  assignees,
  isLoading,
  isLoadingEmpSelect,
  isOpen,
  handleToggleDialog,
  handleAssign,
}) => {
  return (
    <React.Fragment>
      <Button variant="contained" size="large" onClick={handleToggleDialog}>
        Update Assignees
      </Button>
      {isOpen && (
        <EditAssigneeDialog
          open={isOpen}
          options={options}
          assignees={assignees}
          handleClose={handleToggleDialog}
          values={assignees}
          isLoadingEmpSelect={isLoadingEmpSelect}
          isLoading={isLoading}
          handleConfirm={handleAssign}
        />
      )}
    </React.Fragment>
  );
};
