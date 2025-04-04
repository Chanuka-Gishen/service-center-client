import * as Yup from 'yup';

export const createWorkOrderSchema = Yup.object().shape({
  workOrderMileage: Yup.number()
    .min(0, 'Mileage cannot be negative')
    .required('Mileage is required'),
});
