import { PAY_METHODS } from 'src/constants/payment-methods';
import * as Yup from 'yup';

export const addPaymentSChema = Yup.object().shape({
  paymentAmount: Yup.number().min(0.1, 'Amount is not valid').required('Amount is required'),
  paymentMethod: Yup.string()
    .oneOf(PAY_METHODS, 'Invalid payment method')
    .required('Payment method is required'),
  paymentTransactionId: Yup.string().notRequired(),
  paymentNotes: Yup.string().notRequired(),
});
