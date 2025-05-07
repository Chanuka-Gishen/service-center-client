import * as Yup from 'yup';

import { STOCK_MV_TYPES } from 'src/constants/stock-movement-types';

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
  stockSupplier: Yup.object().shape({
    _id: Yup.string().required(),
    supplierName: Yup.string().required('Supplier name required'),
  }),
  stockNotes: Yup.string().nullable().notRequired(),
});
