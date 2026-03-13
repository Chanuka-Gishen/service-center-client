import * as Yup from 'yup';
import { BRAND_STATUS } from 'src/constants/common-constants';

export const brandSchema = Yup.object().shape({
  brandName: Yup.string()
    .required('Brand name is required')
    .max(100, 'Brand name cannot exceed 100 characters')
    .trim(),
  brandDescription: Yup.string()
    .optional()
    .max(100, 'Brand description cannot exceed 100 characters')
    .trim(),
  brandManufacturer: Yup.string()
    .optional()
    .max(100, 'Brand Manufacturer cannot exceed 100 characters')
    .trim(),
  brandIsActive: Yup.boolean().required('Brand status is required'),
});
