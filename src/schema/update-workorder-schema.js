import * as Yup from 'yup';

export const WorkOrderUpdateSchema = Yup.object().shape({
  workorderMileage: Yup.number()
    .min(0, 'Mileage cannot be negative')
    .required('Mileage is required'),

  workorderNotes: Yup.string().notRequired(),

  workorderDiscountPercentage: Yup.number()
    .min(0, 'Discount percentage cannot be negative')
    .max(100, 'Discount percentage cannot exceed 100')
    .required('Discount percentage is required'),

  workorderDiscountCash: Yup.number()
    .min(0, 'Cash discount cannot be negative')
    .required('Cash discount is required'),
});
