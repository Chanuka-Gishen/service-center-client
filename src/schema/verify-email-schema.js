import * as Yup from 'yup';

const verifyEmailSchema = Yup.object().shape({
  email: Yup.string().required('Email is required'),
});

export default verifyEmailSchema;
