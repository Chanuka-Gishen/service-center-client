import * as Yup from 'yup';

import { PAY_SC_INCOME } from 'src/constants/payment-source';
import {
  PAY_METHOD_BACK_TRN,
  PAY_METHOD_CARD,
  PAY_METHOD_CASH,
  PAY_METHOD_CHEQUE,
} from 'src/constants/payment-methods';

export const incomePaymentSchema = Yup.object().shape({
  paymentAmount: Yup.number()
    .min(0.1, 'Amount should be valid')
    .required('Amount is required')
    .typeError('Amount must be a number'),

  paymentSource: Yup.string()
    .oneOf(PAY_SC_INCOME, 'Invalid payment source')
    .required('Payment source required'),

  paymentMethod: Yup.string()
    .oneOf(
      [PAY_METHOD_CASH, PAY_METHOD_CARD, PAY_METHOD_BACK_TRN, PAY_METHOD_CHEQUE],
      'Invalid payment method'
    )
    .required('Payment method required'),

  paymentTransactionId: Yup.string().nullable().notRequired(),

  paymentNotes: Yup.string().nullable().notRequired(),

  paymentDate: Yup.date()
    .required('Payment date required')
    .max(new Date(new Date().setHours(23, 59, 59, 999)), 'Payment date cannot be in the future')
    .typeError('Invalid date format'),
});
