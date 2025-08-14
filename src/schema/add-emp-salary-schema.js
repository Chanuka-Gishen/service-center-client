import * as Yup from 'yup';
import { PAY_FREQUENCE } from 'src/constants/payroll-constants';

const addEmpSalarySchema = Yup.object().shape({
  baseSalary: Yup.number()
    .required('Base salary is required')
    .positive('Base salary must be positive'),

  payFrequency: Yup.string()
    .required('Pay frequency is required')
    .oneOf(PAY_FREQUENCE, 'Invalid pay frequency'),

  recurringAllowances: Yup.array().of(
    Yup.object().shape({
      type: Yup.string().required('Allowance type is required'),
      amount: Yup.number()
        .required('Allowance amount is required')
        .positive('Amount must be positive'),
    })
  ),

  epfEligible: Yup.boolean().default(false),
  etfEligible: Yup.boolean().default(false),

  otherRecurringEarnings: Yup.array().of(
    Yup.object().shape({
      description: Yup.string(),
      amount: Yup.number().positive('Earnings amount must be positive'),
    })
  ),
});

export default addEmpSalarySchema;
