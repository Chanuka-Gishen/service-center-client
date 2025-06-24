import * as Yup from 'yup';

const stockItemSchema = Yup.object().shape({
  _id: Yup.string().required('Item ID is required'),
  itemName: Yup.string().required('Item name is required'),
  stockQuantity: Yup.number()
    .min(0.1, 'Quantity cannot be negative')
    .required('Quantity is required'),
  stockUnitPrice: Yup.number()
    .min(0, 'Unit price cannot be negative')
    .required('Unit price is required'),
});

export const addGrnSchema = Yup.object().shape({
  grnReceivedDate: Yup.date()
    .required('Received date required')
    .max(new Date(new Date().setHours(23, 59, 59, 999)), 'Received date cannot be in the future')
    .typeError('Invalid date format'),
  grnDiscountAmount: Yup.number()
    .min(0, 'Discount cannot be negative')
    .required('Discount is required'),
  grnItems: Yup.array()
    .of(stockItemSchema)
    .min(1, 'At least one stock item is required')
    .required('Stock items are required'),
});
