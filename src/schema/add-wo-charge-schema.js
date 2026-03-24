import * as Yup from 'yup';

export const AddWoChargeSchema = Yup.object().shape({
  chargeName: Yup.string().required('Custom charge name is required'),
  chargeAmount: Yup.number()
    .min(0.1, 'Charge amount should be above 0')
    .required('Charge amount is required'),
});
