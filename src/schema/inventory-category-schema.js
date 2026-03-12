import * as Yup from 'yup';

export const inventoryCategorySchema = Yup.object().shape({
  categoryTitle: Yup.string()
    .required('Category title is required')
    .max(50, 'Category title cannot exceed 50 characters')
    .trim(),
  isActive: Yup.boolean().default(true).typeError('Active status must be true or false'),
});
