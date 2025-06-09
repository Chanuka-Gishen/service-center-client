import * as Yup from 'yup';

export const WorkOrderUpdateSchema = Yup.object().shape({
  workOrderMileage: Yup.number()
    .min(0, 'Mileage cannot be negative')
    .required('Mileage is required'),

  workOrderServiceItems: Yup.array()
    .of(
      Yup.object().shape({
        inventoryItem: Yup.string().required('Inventory item ID is required'),
        inventoryItemName: Yup.string().required('Inventory item name is required'),
        quantity: Yup.number()
          .min(0.1, 'Quantity must be at least 0.1')
          .required('Quantity is required'),
        unitPrice: Yup.number()
          .min(0, 'Unit price cannot be negative')
          .required('Unit price is required'),
        totalPrice: Yup.number()
          .min(0, 'Total price cannot be negative')
          .required('Total price is required'),
      })
    )
    .required('Service items are required'),

  workOrderCustomItems: Yup.array()
    .of(
      Yup.object().shape({
        inventoryItemName: Yup.string().required('Custom item name is required'),
        quantity: Yup.number()
          .min(0.1, 'Quantity must be at least 0.1')
          .required('Quantity is required'),
        unitPrice: Yup.number()
          .min(0, 'Unit price cannot be negative')
          .required('Unit price is required'),
        totalPrice: Yup.number()
          .min(0, 'Total price cannot be negative')
          .required('Total price is required'),
      })
    )
    .required('Custom items are required'),

  workOrderServiceCharge: Yup.number()
    .min(0, 'Service charge cannot be negative')
    .required('Service charge is required'),

  workOrderOtherChargers: Yup.number()
    .min(0, 'Other charges cannot be negative')
    .required('Other charges are required'),

  workOrderNotes: Yup.string().notRequired(),

  workOrderDiscountPercentage: Yup.number()
    .min(0, 'Discount percentage cannot be negative')
    .max(100, 'Discount percentage cannot exceed 100')
    .required('Discount percentage is required'),

  workOrderDiscountCash: Yup.number()
    .min(0, 'Cash discount cannot be negative')
    .required('Cash discount is required'),
});
