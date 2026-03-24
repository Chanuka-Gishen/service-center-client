import { WO_TYPES } from 'src/constants/workorder-types';
import * as Yup from 'yup';

export const createWorkOrderSchema = Yup.object().shape({
  workorderMileage: Yup.number()
    .min(0, 'Mileage cannot be negative')
    .required('Mileage is required'),
  workorderType: Yup.string()
    .oneOf(WO_TYPES, 'Invalid type')
    .required('Workorder type is required'),
});
