import * as Yup from 'yup';

export const UpdateWoItemSchema = Yup.object().shape({
  quantity: Yup.number().min(0.1, 'Quantity must be at least 0.1').required('Quantity is required'),
  unitPrice: Yup.number()
    .min(0, 'Unit price cannot be negative')
    .required('Unit price is required'),
});
