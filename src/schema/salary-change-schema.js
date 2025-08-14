import * as Yup from 'yup';
import { SAL_CHANGE_TYP_ADJUSTMENT, SAL_CHANGE_TYPES } from 'src/constants/payroll-constants';

const salaryChangeSchema = Yup.object().shape({
  newSalary: Yup.number()
    .min(0, 'New salary cannot be negative')
    .required('New salary is required'),
  changeType: Yup.string()
    .oneOf(SAL_CHANGE_TYPES, 'Invalid change type')
    .default(SAL_CHANGE_TYP_ADJUSTMENT),
  reason: Yup.string().default(''),
});

export default salaryChangeSchema;
