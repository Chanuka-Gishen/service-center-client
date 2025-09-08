import * as Yup from 'yup';

export const payrollSchema = Yup.object().shape({
  selectedEmployees: Yup.array().min(1, 'Please select at least one employee'),
  selectAll: Yup.boolean(),
  fromDate: Yup.date()
    .required('From date is required')
    .max(Yup.ref('toDate'), 'From date must be before or equal to To date'),
  toDate: Yup.date()
    .required('To date is required')
    .min(Yup.ref('fromDate'), 'To date must be after or equal to From date'),
});
