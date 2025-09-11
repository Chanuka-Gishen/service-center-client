import * as Yup from 'yup';

import { TIME_SLOTS } from 'src/constants/common-constants';

export const updateBookingSchema = Yup.object().shape({
  timeSlot: Yup.string().oneOf(TIME_SLOTS, 'Invalid time slot').required('Time slot required'),

  date: Yup.date()
    .required('Date required')
    .min(new Date(new Date().setHours(0, 0, 0, 0)), 'Date cannot be past.')
    .typeError('Invalid date format'),
});
