import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { CustomerDetailsView } from '../view/customer-details-view';
import useCustomer from 'src/hooks/useCustomer';
import useWorkOrder from 'src/hooks/useWorkorder';

const CustomerDetailsController = () => {
  const location = useLocation();
  const { id } = location.state || {};

  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const [isOpenCreate, setIsOpenCreate] = useState(false);

  const { isLoadingCustomer, customer, fetchCustomer } = useCustomer();
  const { isLoadingCreate, createWorkOrder } = useWorkOrder();

  const handleToggleWorkOrderCreateDialog = (vehicle) => {
    setSelectedVehicle(vehicle);

    if (isOpenCreate) {
      setSelectedVehicle(false);
    }

    setIsOpenCreate(!isOpenCreate);
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
      isOpenCreate={isOpenCreate}
      isLoading={isLoadingCustomer}
      isLoadingCreate={isLoadingCreate}
      handleToggleWorkOrderCreateDialog={handleToggleWorkOrderCreateDialog}
      handleCreateWorkOrder={handleCreateWorkOrder}
    />
  );
};

export default CustomerDetailsController;
