import * as Yup from 'yup';
import { RETURN_REASONS } from 'src/constants/return-reasons.js';

export const returnStockSchema = Yup.object().shape({
  returnQty: Yup.number()
    .min(1, 'Return amount cannot be negative')
    .required('Return amount is required')
    .typeError('Return amount must be a number'),

  returnReason: Yup.string()
    .oneOf(RETURN_REASONS, 'Invalid return reason')
    .required('Return reason required'),

  returnNote: Yup.string().nullable().notRequired(),
});
