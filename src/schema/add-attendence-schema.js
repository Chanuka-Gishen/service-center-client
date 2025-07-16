import * as Yup from 'yup';

// Individual attendance record schema
const empIndividualAttSchema = Yup.object().shape({
  id: Yup.string().required('ID is required'),

  empId: Yup.string().required('Employee id is required'),

  empFullName: Yup.string().required('Employee name is required'),

  checkIn: Yup.date()
    .required('Check-in time is required')
    .typeError('Check-in must be a valid date/time')
    .test('is-valid-checkin', 'Check-in time must be valid', function (value) {
      return value instanceof Date && !isNaN(value.getTime());
    }),

  checkOut: Yup.date()
    .required('Check-out time is required')
    .typeError('Check-out must be a valid date/time')
    .test(
      'is-after-checkin',
      'Check-out must be after check-in unless both are 00:00',
      function (value) {
        const checkIn = this.parent.checkIn;

        // First validate that both dates are valid
        if (
          !(checkIn instanceof Date) ||
          isNaN(checkIn.getTime()) ||
          !(value instanceof Date) ||
          isNaN(value.getTime())
        ) {
          return true; // Let other validations handle invalid dates
        }

        // Check if dates are on the same day
        const sameDay =
          checkIn.getDate() === value.getDate() &&
          checkIn.getMonth() === value.getMonth() &&
          checkIn.getFullYear() === value.getFullYear();

        if (!sameDay) {
          return this.createError({
            message: 'Check-out must be on the same day as check-in',
          });
        }

        // Allow both to be midnight (00:00)
        const isBothMidnight =
          checkIn.getHours() === 0 &&
          checkIn.getMinutes() === 0 &&
          value.getHours() === 0 &&
          value.getMinutes() === 0;

        if (isBothMidnight) {
          return true;
        }

        // Otherwise checkOut must be after checkIn
        return value > checkIn;
      }
    ),
});

export const empAddAttendenceSchema = Yup.object().shape({
  date: Yup.date()
    .required('Date required')
    .max(new Date(new Date().setHours(23, 59, 59, 999)), 'Date cannot be in the future')
    .typeError('Invalid date format'),
  records: Yup.array()
    .of(empIndividualAttSchema)
    .min(1, 'At least one record is required')
    .required('Attendance records are required'),
});
