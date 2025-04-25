import * as Yup from 'yup';
import { CUSTOMER_PREFIX } from 'src/constants/customer-prefix';
import { CUSTOMER_TYPES } from 'src/constants/customer-type';

export const UpdateCustomerSchema = Yup.object().shape({
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
  customerEmail: Yup.string().email('Invalid email format').nullable().notRequired(),
});
