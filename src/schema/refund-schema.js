import { PAY_METHODS } from 'src/constants/payment-methods';
import * as Yup from 'yup';

export const refundSchema = Yup.object().shape({
  paymentMethod: Yup.string()
    .oneOf(PAY_METHODS, 'Invalid payment method')
    .required('Payment method is required'),
  paymentTransactionId: Yup.string().notRequired(),
  paymentNotes: Yup.string().notRequired(),
  paymentDate: Yup.date()
    .required('Payment date required')
    .max(new Date(), 'Payment date cannot be in the future')
    .typeError('Invalid date format'),
});
