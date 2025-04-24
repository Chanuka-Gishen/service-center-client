import * as Yup from 'yup';
import { USER_ROLE } from 'src/constants/user-role';

export const UserValidationSchema = Yup.object().shape({
  userFirstName: Yup.string()
    .required('First name is required')
    .max(50, 'First name cannot exceed 50 characters')
    .trim(),
  userLastName: Yup.string()
    .required('Last name is required')
    .max(50, 'Last name cannot exceed 50 characters')
    .trim(),

  userRole: Yup.string().oneOf(
    [USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN, USER_ROLE.STAFF],
    'User role must be one of Super Admin, Admin or Staff'
  ),
  userEmail: Yup.string().email('Invalid email format').required('User email is required'),
  userPassword: Yup.string()
    .min(6, 'Minimum of 6 characters is required')
    .required('Password is required'),
});
