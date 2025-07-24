import * as Yup from 'yup';

const loginSchema = Yup.object().shape({
  userEmail: Yup.string().required('User email is required'),
  userPassword: Yup.string().required('Password is required'),
});

export default loginSchema;
