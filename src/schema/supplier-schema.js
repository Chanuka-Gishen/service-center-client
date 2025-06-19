import * as Yup from 'yup';

export const supplierSchema = Yup.object({
  supplierName: Yup.string().required('Supplier name is required').trim(),

  supplierContactPerson: Yup.string().trim().notRequired().default(''),

  supplierPhone: Yup.string().trim().notRequired().default(''),

  // supplierProducts: Yup.array()
  //   .of(
  //     Yup.object({
  //       _id: Yup.string()
  //         .required('Product ID is required')
  //         .matches(/^[0-9a-fA-F]{24}$/, 'Invalid product ID format'),
  //       itemName: Yup.string().required('Product name is required'),
  //     })
  //   )
  //   .notRequired(),

  supplierNotes: Yup.string().trim().notRequired().default(''),

  supplierIsActive: Yup.boolean().default(true),
});
