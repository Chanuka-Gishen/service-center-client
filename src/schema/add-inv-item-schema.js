import * as Yup from 'yup';
import { ITEM_CATEGORIES_LABELS } from 'src/constants/itemCategories';


export const AddInventoryItemSchema = Yup.object().shape({
  itemName: Yup.string().required('Item name is required'),
  itemCategory: Yup.string()
    .oneOf(ITEM_CATEGORIES_LABELS, 'Invalid category')
    .required('Category is required'),
  itemDescription: Yup.string().nullable().notRequired(),
  itemQuantity: Yup.number().min(0, 'Quantity cannot be negative').required('Quantity is required'),
  itemUnit: Yup.string().default('Pieces'),
  itemBuyingPrice: Yup.number()
    .min(0, 'Buying price cannot be negative')
    .required('Buying price is required'),
  itemSellingPrice: Yup.number()
    .min(0, 'Selling price cannot be negative')
    .required('Selling price is required')
    .test('is-greater', 'Selling price must be greater than buying price', function (value) {
      return value >= this.parent.itemBuyingPrice;
    }),
  itemSupplier: Yup.string().nullable().notRequired(),
  itemThreshold: Yup.number()
    .min(0, 'Threshold cannot be negative')
    .required('Threshold is required'),
});
