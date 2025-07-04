import * as Yup from 'yup';

import { RETURN_TYP_CASH, RETURN_TYPS } from 'src/constants/return-Types';
import {
  PAY_METHOD_BACK_TRN,
  PAY_METHOD_CARD,
  PAY_METHOD_CASH,
  PAY_METHOD_CHEQUE,
  PAY_METHOD_MOBILE,
  PAY_METHOD_OTHER,
} from 'src/constants/payment-methods';

export const returnProcessSchema = Yup.object().shape({
  returnType: Yup.string()
    .oneOf(RETURN_TYPS, 'Invalid return type')
    .required('Return type required'),

  paymentMethod: Yup.string()
    .oneOf(
      [
        PAY_METHOD_CASH,
        PAY_METHOD_CARD,
        PAY_METHOD_BACK_TRN,
        PAY_METHOD_CHEQUE,
        PAY_METHOD_MOBILE,
        PAY_METHOD_OTHER,
      ],
      'Invalid payment method'
    )
    .when('returnType', (returnType, schema) => {
      return returnType === RETURN_TYP_CASH
        ? schema.required('Payment method is required for cash returns')
        : schema.notRequired().nullable();
    }),

  paymentTransactionId: Yup.string().nullable().notRequired(),
});
