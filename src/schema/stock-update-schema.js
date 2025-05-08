import * as Yup from 'yup';

import { STOCK_MV_TYPES } from 'src/constants/stock-movement-types';
import { PAY_METHODS } from 'src/constants/payment-methods';

export const StockUpdateSchema = Yup.object().shape({
  stockMovementType: Yup.string()
    .oneOf(STOCK_MV_TYPES, 'Invalid movement type')
    .required('Movement type is required'),
  stockQuantity: Yup.number()
    .min(0, 'Quantity cannot be negative')
    .required('Quantity is required'),
  stockTotalValue: Yup.number()
    .min(0, 'Stock price cannot be negative')
    .required('Stock price is required'),
  stockPaymentPaidAmount: Yup.number()
    .min(0, 'Paid amount cannot be negative')
    .when('stockTotalValue', (stockTotalValue, schema) => {
      return schema.test({
        test: (value) => value <= stockTotalValue,
        message: `Paid amount cannot exceed Rs. ${stockTotalValue}`,
      });
    })
    .required('Paid amount is required'),
  stockPaymentMethod: Yup.string()
    .oneOf(PAY_METHODS, 'Invalid payment method')
    .required('Payment method is required'),
  stockSupplier: Yup.object().shape({
    _id: Yup.string().required(),
    supplierName: Yup.string().required('Supplier name required'),
  }),
  stockNotes: Yup.string().nullable().notRequired(),
});
