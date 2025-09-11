import * as Yup from 'yup';

import {
  PAY_METHOD_BACK_TRN,
  PAY_METHOD_CARD,
  PAY_METHOD_CASH,
  PAY_METHOD_CHEQUE,
} from 'src/constants/payment-methods';

export const empAdvancePaySchema = Yup.object().shape({
  paymentAmount: Yup.number()
    .min(0.1, 'Amount should be valid')
    .required('Amount is required')
    .typeError('Amount must be a number'),

  paymentMethod: Yup.string()
    .oneOf(
      [PAY_METHOD_CASH, PAY_METHOD_CARD, PAY_METHOD_BACK_TRN, PAY_METHOD_CHEQUE],
      'Invalid payment method'
    )
    .required('Payment method required'),

  paymentTransactionId: Yup.string().nullable().notRequired(),

  paymentDate: Yup.date()
    .required('Payment date required')
    .max(new Date(new Date().setHours(23, 59, 59, 999)), 'Payment date cannot be in the future')
    .typeError('Invalid date format'),
});
