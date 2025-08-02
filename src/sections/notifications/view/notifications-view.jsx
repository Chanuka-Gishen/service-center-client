import {
  Box,
  Button,
  Card,
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Formik } from 'formik';
import { CustomTable } from 'src/components/custom-table/custom-table';
import {
  NOTIFICATION_TITLE_GREETINGS,
  NOTIFICATION_TITLE_OFFERS,
} from 'src/constants/common-constants';
import SendBulkSmsSchema from 'src/schema/send-bulk-sms-schema';
import { NotificationsRow } from '../components/notification-row';

export const NotificationsView = ({
  smsLogs,
  smsCount,
  pagination,
  isLoadingSmsLogs,
  isLoadingSendBulkSms,
  handleConfirm,
}) => {
  return (
    <Container sx={{ marginTop: '10px' }}>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h5">Send Promotional/Greetings SMS Portal</Typography>
            <Formik
              initialValues={{
                messageType: NOTIFICATION_TITLE_OFFERS,
                messageContent: '',
              }}
              validationSchema={SendBulkSmsSchema}
              onSubmit={(values) => {
                handleConfirm(values);
              }}
            >
              {({
                values,
                errors,
                touched,
                resetForm,
                handleChange,
                handleBlur,
                handleSubmit,
                getFieldProps,
              }) => (
                <form onSubmit={handleSubmit}>
                  <Stack spacing={2}>
                    <FormControl fullWidth required>
                      <InputLabel id="select-label">Message Type</InputLabel>
                      <Select
                        labelId="select-label"
                        id="simple-select"
                        label="Message Type"
                        name="messageType"
                        required
                        fullWidth
                        value={values.messageType || ''}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <MenuItem value={NOTIFICATION_TITLE_OFFERS}>
                          {NOTIFICATION_TITLE_OFFERS}
                        </MenuItem>
                        <MenuItem value={NOTIFICATION_TITLE_GREETINGS}>
                          {NOTIFICATION_TITLE_GREETINGS}
                        </MenuItem>
                      </Select>
                      <FormHelperText error={touched.messageType && errors.messageType}>
                        {touched.messageType && errors.messageType}
                      </FormHelperText>
                    </FormControl>
                    <TextField
                      label="Message Content"
                      name="messageContent"
                      required
                      fullWidth
                      multiline
                      rows={4}
                      autoComplete="off"
                      variant="outlined"
                      {...getFieldProps('messageContent')}
                      error={touched.messageContent && Boolean(errors.messageContent)}
                      helperText={touched.messageContent && errors.messageContent}
                    />
                    <Stack direction="row" spacing={2}>
                      <Button
                        fullWidth
                        variant="outlined"
                        disabled={isLoadingSendBulkSms}
                        onClick={resetForm}
                      >
                        Cancel
                      </Button>
                      <Button
                        fullWidth
                        variant="contained"
                        type="submit"
                        disabled={isLoadingSendBulkSms}
                      >
                        Send
                      </Button>
                    </Stack>
                  </Stack>
                </form>
              )}
            </Formik>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h5" textAlign="center">
              Promotion/Notification/Remainders History
            </Typography>
            <Card>
              <Paper elevation={0}>
                <CustomTable
                  keys={['Type', 'Title', 'Content', 'Send At']}
                  dataLength={smsLogs.length}
                  isLoading={isLoadingSmsLogs}
                  documentCount={smsCount}
                  page={pagination.page}
                  limit={pagination.limit}
                  handleChangePage={pagination.handleChangePage}
                  handleChangeRowsPerPage={pagination.handleChangeRowsPerPage}
                  tableBody={<NotificationsRow data={smsLogs} />}
                />
              </Paper>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
