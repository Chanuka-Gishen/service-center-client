import * as Yup from 'yup';
import { VEHICLE_TYPES } from 'src/constants/vehicle-type';

export const VehicleSchema = Yup.object().shape({
  vehicleNumber: Yup.string().required('Vehicle number is required'),
  vehicleManufacturer: Yup.string().required('Vehicle manufacturer is required'),
  vehicleModel: Yup.string().required('Vehicle model is required'),
  vehicleType: Yup.string()
    .oneOf(VEHICLE_TYPES, 'Invalid type')
    .required('Vehicle type is required'),
});
