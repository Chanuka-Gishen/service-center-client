import { PAY_METHODS } from 'src/constants/payment-methods';
import * as Yup from 'yup';

const stockItemSchema = Yup.object().shape({
  _id: Yup.string().required('Item ID is required'),
  itemName: Yup.string().required('Item name is required'),
  stockQuantity: Yup.number()
    .min(0, 'Quantity cannot be negative')
    .required('Quantity is required'),
  stockTotalValue: Yup.number()
    .min(0, 'Total value cannot be negative')
    .required('Total value is required'),
  stockPaymentPaidAmount: Yup.number()
    .min(0, 'Paid amount cannot be negative')
    .when('stockTotalValue', (stockTotalValue, schema) => {
      return schema.test({
        test: (value) => value <= stockTotalValue,
        message: `Paid amount cannot exceed Rs. ${stockTotalValue}`,
      });
    })
    .required('Paid amount is required'),
});

export const addBulkStockSchema = Yup.object().shape({
  stockPaymentMethod: Yup.string()
    .oneOf(PAY_METHODS, 'Invalid payment method')
    .required('Payment method is required'),
  stockNotes: Yup.string().nullable().notRequired(),
  stockItems: Yup.array()
    .of(stockItemSchema)
    .min(1, 'At least one stock item is required')
    .required('Stock items are required'),
});
