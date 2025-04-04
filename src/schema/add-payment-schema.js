import { PAY_METHODS } from 'src/constants/paymentMethods';
import * as Yup from 'yup';

export const addPaymentSChema = Yup.object().shape({
  paymentAmount: Yup.number().min(0.1, 'Amount is not valid').required('Amount is required'),
  paymentMaymentMethod: Yup.string()
    .oneOf(PAY_METHODS, 'Invalid payment method')
    .required('Payment method is required'),
  paymentTransactionId: Yup.string().notRequired(),
  paymentNotes: Yup.string().notRequired(),
});
