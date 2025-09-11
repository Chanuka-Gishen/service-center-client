import * as Yup from 'yup';
import { PAY_FREQUENCE } from 'src/constants/payroll-constants';

const updateEmpSalarySchema = Yup.object().shape({
  payFrequency: Yup.string()
    .required('Pay frequency is required')
    .oneOf(PAY_FREQUENCE, 'Invalid pay frequency'),

  epfEligible: Yup.boolean().default(false),
  etfEligible: Yup.boolean().default(false),

  recurringAllowances: Yup.array().of(
    Yup.object().shape({
      type: Yup.string().required('Allowance type is required'),
      amount: Yup.number()
        .required('Allowance amount is required')
        .positive('Amount must be positive'),
    })
  ),

  otherRecurringEarnings: Yup.array().of(
    Yup.object().shape({
      description: Yup.string(),
      amount: Yup.number().positive('Earnings amount must be positive'),
    })
  ),
});

export default updateEmpSalarySchema;
