import { Helmet } from 'react-helmet-async';
import { SupplierDetails } from 'src/sections/supplier-details';

// ----------------------------------------------------------------------

export default function SupplierInfoPage() {
  return (
    <>
      <Helmet>
        <title> Suppliers Info | WijayaAuto </title>
      </Helmet>

      <SupplierDetails />
    </>
  );
}
