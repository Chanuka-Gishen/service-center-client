import * as Yup from 'yup';

export const updateUserSchema = Yup.object().shape({
  userFirstName: Yup.string()
    .required('First name is required')
    .max(50, 'First name cannot exceed 50 characters')
    .trim(),
  userLastName: Yup.string()
    .required('Last name is required')
    .max(50, 'Last name cannot exceed 50 characters')
    .trim(),
  userEmail: Yup.string().email('Invalid email format').required('User email is required'),
  userIsActive: Yup.boolean().default(true).typeError('Active status must be true or false'),
  isUserFirstLogin: Yup.boolean().typeError('Reset password approval must be true or false'),
});
