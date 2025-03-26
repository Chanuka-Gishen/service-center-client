import * as Yup from 'yup';

export const RegisterCustomerSchema = Yup.object().shape({
  customerFullName: Yup.string().required('Full Name is required'),
  customerMobile: Yup.string()
    .matches(/^(\+?\d{1,3}[- ]?)?\d{10}$/, 'Invalid mobile number (10 digits required)')
    .required('Mobile number is required'),
  customerEmail: Yup.string().email('Invalid email format').nullable().notRequired(), 
});
