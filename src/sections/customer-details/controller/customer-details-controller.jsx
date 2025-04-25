import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { CustomerDetailsView } from '../view/customer-details-view';
import useCustomer from 'src/hooks/useCustomer';
import useWorkOrder from 'src/hooks/useWorkorder';
import { VEHICLE_TYPE_PETROL } from 'src/constants/vehicle-type';
import { CUS_TYPE_INDIVIDUAL } from 'src/constants/customer-type';
import useVehicle from 'src/hooks/useVehicle';

const CustomerDetailsController = () => {
  const location = useLocation();
  const { id } = location.state || {};

  const [optionsAnchorEl, setOptionsAnchorEl] = useState(null);
  const isOpenOptions = Boolean(optionsAnchorEl);

  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const [customerInitialValues, setCustomerInitialValues] = useState({});
  const [vehicleInitialValues, setVehicleInitialValues] = useState({});

  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [isOpenUpdateCustomer, setIsOpenUpdateCustomer] = useState(false);
  const [isOpenAddVehicle, setIsOpenAddVehicle] = useState(false);
  const [isOpenUpdateVehicle, setIsOpenUpdateVehicle] = useState(false);

  const { isLoadingCustomer, isLoadingUpdate, customer, fetchCustomer, updateCustomer } =
    useCustomer();
  const { isLoadingCreate, createWorkOrder } = useWorkOrder();
  const {
    isLoadingAddVehicle,
    isLoadingUpdateVehicle,
    addVehicleController,
    updateVehicleController,
  } = useVehicle();

  const handleClickOptions = (event, vehicle) => {
    setOptionsAnchorEl(event.currentTarget);
    setSelectedVehicle(vehicle);
  };

  const handleCloseOptions = () => {
    setOptionsAnchorEl(null);
  };

  const handleToggleWorkOrderCreateDialog = () => {
    if (isOpenCreate) {
      setSelectedVehicle(false);
    } else {
      handleCloseOptions();
    }

    setIsOpenCreate(!isOpenCreate);
  };

  const handleToggleUpdateCustomerDialog = () => {
    if (!isOpenUpdateCustomer) {
      setCustomerInitialValues({
        customerPrefix: customer.customerPrefix ?? CUSTOMER_PREFIX[0],
        customerName: customer.customerName,
        customerType: customer.customerType ?? CUS_TYPE_INDIVIDUAL,
        customerMobile: customer.customerMobile,
        customerEmail: customer.customerEmail,
      });
    } else {
      setCustomerInitialValues({});
    }
    setIsOpenUpdateCustomer(!isOpenUpdateCustomer);
  };

  const handleToggleAddVehicleDialog = () => {
    if (isOpenAddVehicle) {
      setSelectedVehicle(null);
      setCustomerInitialValues({});
    } else {
      setVehicleInitialValues({
        vehicleNumber: '',
        vehicleManufacturer: '',
        vehicleModel: '',
        vehicleType: VEHICLE_TYPE_PETROL,
      });
      handleCloseOptions();
    }

    setIsOpenAddVehicle(!isOpenAddVehicle);
  };

  const handleToggleUpdateVehicleDialog = () => {
    if (isOpenUpdateVehicle) {
      setSelectedVehicle(null);
      setCustomerInitialValues({});
    } else {
      setVehicleInitialValues({
        vehicleNumber: selectedVehicle.vehicleNumber,
        vehicleManufacturer: selectedVehicle.vehicleManufacturer,
        vehicleModel: selectedVehicle.vehicleModel,
        vehicleType: selectedVehicle.vehicleType ?? VEHICLE_TYPE_PETROL,
      });
      handleCloseOptions();
    }

    setIsOpenUpdateVehicle(!isOpenUpdateVehicle);
  };

  const handleUpdateCustomer = async (values) => {
    const isSuccess = await updateCustomer(customer._id, values);

    if (isSuccess) {
      handleToggleUpdateCustomerDialog();
      fetchCustomer(customer._id)
    }
  };

  const handleAddVehicle = async (values) => {
    const isSuccess = await addVehicleController(customer._id, values);

    if (isSuccess) {
      handleCloseOptions();
      handleToggleAddVehicleDialog();
      fetchCustomer(customer._id);
    }
  };

  const handleUpdateVehicle = async (values) => {
    const isSuccess = await updateVehicleController(selectedVehicle._id, values);

    if (isSuccess) {
      handleCloseOptions();
      handleToggleUpdateVehicleDialog();
      fetchCustomer(customer._id);
    }
  };

  const handleCreateWorkOrder = async (values) => {
    const data = {
      workOrderCustomer: customer._id,
      workOrderVehicle: selectedVehicle._id,
      ...values,
    };

    const isSuccess = await createWorkOrder(data);

    if (isSuccess) {
      handleToggleWorkOrderCreateDialog();
    }
  };

  useEffect(() => {
    if (id) {
      fetchCustomer(id);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <CustomerDetailsView
      data={customer}
      selectedVehicle={selectedVehicle}
      customerInitialValues={customerInitialValues}
      vehicleInitialValues={vehicleInitialValues}
      isOpenCreate={isOpenCreate}
      isOpenUpdateCustomer={isOpenUpdateCustomer}
      isOpenAddVehicle={isOpenAddVehicle}
      isOpenUpdateVehicle={isOpenUpdateVehicle}
      isLoading={isLoadingCustomer}
      isLoadingCreate={isLoadingCreate}
      isLoadingUpdate={isLoadingUpdate}
      isLoadingUpdateVehicle={isLoadingUpdateVehicle}
      isLoadingAddVehicle={isLoadingAddVehicle}
      handleToggleWorkOrderCreateDialog={handleToggleWorkOrderCreateDialog}
      handleToggleUpdateCustomerDialog={handleToggleUpdateCustomerDialog}
      handleToggleAddVehicleDialog={handleToggleAddVehicleDialog}
      handleToggleUpdateVehicleDialog={handleToggleUpdateVehicleDialog}
      handleCreateWorkOrder={handleCreateWorkOrder}
      handleUpdateCustomer={handleUpdateCustomer}
      handleAddVehicle={handleAddVehicle}
      handleUpdateVehicle={handleUpdateVehicle}
      optionsAnchorEl={optionsAnchorEl}
      isOpenOptions={isOpenOptions}
      handleClickOptions={handleClickOptions}
      handleCloseOptions={handleCloseOptions}
    />
  );
};

export default CustomerDetailsController;
