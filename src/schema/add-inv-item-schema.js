import * as Yup from 'yup';

export const AddInventoryItemSchema = Yup.object().shape({
  itemTitle: Yup.string().required('Item title is required'),
  itemDescription: Yup.string().nullable().notRequired(),
  itemQuantity: Yup.number()
    .min(0, 'Quantity should be above 0')
    .required('Item quantity is required'),
  itemCostPrice: Yup.number()
    .min(0, 'Cost price should be above 0')
    .required('Cost price is required'),
  itemSellingPrice: Yup.number()
    .min(0, 'Selling price should be above 0')
    .required('Selling price is required'),
});
