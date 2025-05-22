import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import Slide from '@mui/material/Slide';
import { DateCalendar, DatePicker } from '@mui/x-date-pickers';
import { fDate } from 'src/utils/format-time';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export const DownloadReportDialog = ({ open, isLoading, handleOpenClose, handleConfirm }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleSubmit = () => {
    if (startDate && endDate) {
      const data = { startDate, endDate };
      handleConfirm(data);
    }
  };

  const handleReset = () => {
    setStartDate(new Date());
    setEndDate(new Date());
  };
  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      slots={{
        transition: Transition,
      }}
      maxWidth="md"
    >
      <DialogTitle id="alert-dialog-title">Download Financial Report</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
            <Stack spacing={2}>
              <Typography variant="subtitle1" gutterBottom>
                Start Date : {fDate(startDate)}
              </Typography>
              <DateCalendar
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
                renderInput={(params) => <TextField {...params} fullWidth />}
                maxDate={endDate || new Date()}
              />
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
            <Typography variant="subtitle1" gutterBottom>
              End Date : {fDate(endDate)}
            </Typography>
            <DateCalendar
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth />}
              minDate={startDate}
              maxDate={new Date()}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleReset} variant="outlined">
          Reset
        </Button>
        <Box sx={{ flex: 1 }} />

        <Button
          onClick={() => {
            handleOpenClose();
          }}
          disabled={isLoading}
          variant="outlined"
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          type="submit"
          disabled={isLoading}
          autoFocus
          onClick={handleSubmit}
        >
          Download
        </Button>
      </DialogActions>
    </Dialog>
  );
};
