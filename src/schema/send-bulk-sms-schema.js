import * as Yup from 'yup';
import {
  NOTIFICATION_TITLE_GREETINGS,
  NOTIFICATION_TITLE_OFFERS,
} from 'src/constants/common-constants';

const SendBulkSmsSchema = Yup.object().shape({
  messageType: Yup.string()
    .required('Message type is required')
    .oneOf(
      [NOTIFICATION_TITLE_GREETINGS, NOTIFICATION_TITLE_OFFERS],
      'Message type must be one of the given options'
    ),
  messageContent: Yup.string().max(1600).required('Message content is required'),
});

export default SendBulkSmsSchema;
