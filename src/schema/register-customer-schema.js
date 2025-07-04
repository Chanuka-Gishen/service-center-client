import * as Yup from 'yup';
import { CUSTOMER_PREFIX } from 'src/constants/customer-prefix';
import { CUSTOMER_TYPES } from 'src/constants/customer-type';
import { VEHICLE_TYPES } from 'src/constants/vehicle-type';

export const RegisterCustomerSchema = Yup.object().shape({
  customerPrefix: Yup.string()
    .oneOf(CUSTOMER_PREFIX, 'Invalid prefix')
    .required('Prefix is required'),
  customerName: Yup.string().required('Full Name is required'),
  customerType: Yup.string()
    .oneOf(CUSTOMER_TYPES, 'Invalid type')
    .required('Customer type is required'),
  customerMobile: Yup.string()
    .matches(/^(\+?\d{1,3}[- ]?)?\d{10}$/, 'Invalid mobile number (10 digits required)')
    .required('Mobile number is required'),
  customerSecondaryMobile: Yup.string()
    .matches(/^(\+?\d{1,3}[- ]?)?\d{10}$/, 'Invalid secondary mobile number (10 digits required)')
    .nullable()
    .notRequired(),
  customerEmail: Yup.string().email('Invalid email format').nullable().notRequired(),
  vehicleNumber: Yup.string().required('Vehicle number is required'),
  vehicleManufacturer: Yup.string().required('Vehicle manufacturer is required'),
  vehicleModel: Yup.string().required('Vehicle model is required'),
  vehicleType: Yup.string()
    .oneOf(VEHICLE_TYPES, 'Invalid type')
    .required('Vehicle type is required'),
});
