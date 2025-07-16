import * as Yup from 'yup';
import {
  LEAVE_CAT,
  LEAVE_PERIODS,
  LEAVE_TYP_FULL,
  LEAVE_TYP_HALF,
  LEAVE_TYPES,
} from 'src/constants/leave-constants';

export const addLeaveRequestSchema = Yup.object().shape({
  leaveRequestEmp: Yup.string()
    .required('Employee reference is required')
    .test('not-empty', 'Employee reference cannot be empty', (value) => value?.trim() !== ''),

  leaveRequestCategory: Yup.string()
    .required('Leave category is required')
    .oneOf(LEAVE_CAT, 'Leave category must be either vacation, sick or personal'),

  leaveRequestStartDate: Yup.date()
    .required('Start date is required')
    .min(new Date(), 'Start date cannot be in the past')
    .typeError('Invalid date format'),

  leaveRequestEndDate: Yup.date()
    .when('leaveRequestType', (leaveRequestType, schema) => {
      return leaveRequestType === LEAVE_TYP_FULL
        ? schema
            .required('End date is required for full-day leave')
            .min(Yup.ref('leaveRequestStartDate'), 'End date must be after start date')
        : schema.nullable();
    })
    .typeError('Invalid date format'),

  leaveRequestType: Yup.string()
    .required('Leave type is required')
    .oneOf(LEAVE_TYPES, 'Leave type must be either full or half'),

  leaveRequestHalfDayPeriod: Yup.string().when('leaveRequestType', (leaveRequestType, schema) => {
    return leaveRequestType === LEAVE_TYP_HALF
      ? schema
          .required('Half-day period is required')
          .oneOf(LEAVE_PERIODS, 'Half-day period must be morning or afternoon')
      : schema.nullable();
  }),

  leaveRequestReason: Yup.string()
    .max(500, 'Reason cannot exceed 500 characters')
    .required('Reason is required for leave')
    .test('not-empty', 'Reason cannot be empty', (value) => value?.trim() !== ''),
});
