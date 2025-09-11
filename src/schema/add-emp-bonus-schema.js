import * as Yup from 'yup';

const empBonusSchema = Yup.object().shape({
  bonusDescription: Yup.string().required('Bonus description is required'),

  bonusAmount: Yup.number()
    .min(0, 'Bonus amount cannot be negative')
    .required('Bonus amount is required'),
});

export default empBonusSchema;
