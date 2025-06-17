import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import Slide from '@mui/material/Slide';

import UploadIcon from '@mui/icons-material/Upload';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export const EmpAttendenceDialog = ({
  open,
  selectedFile,
  isLoading,
  handleOpenClose,
  handleFileChange,
  handleUpload,
}) => {
  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      slots={{
        transition: Transition,
      }}
    >
      <DialogTitle id="alert-dialog-title">Upload Attendence Records</DialogTitle>

      <DialogContent dividers>
        <input
          accept=".xlsx"
          style={{ display: 'none' }}
          id="excel-upload"
          type="file"
          onChange={handleFileChange}
        />

        <label htmlFor="excel-upload">
          <Button
            variant="contained"
            component="span"
            startIcon={<UploadIcon />}
            fullWidth
            sx={{ mb: 2 }}
          >
            Choose File
          </Button>
        </label>

        {selectedFile && (
          <Typography variant="body2" gutterBottom>
            Selected file: {selectedFile.name}
          </Typography>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleOpenClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button
          onClick={handleUpload}
          color="primary"
          variant="contained"
          loading={isLoading}
          disabled={!selectedFile || isLoading}
        >
          {isLoading ? 'Uploading...' : 'Upload'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
