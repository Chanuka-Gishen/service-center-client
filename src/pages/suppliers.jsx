import { Helmet } from 'react-helmet-async';
import { Suppliers } from 'src/sections/suppliers';

// ----------------------------------------------------------------------

export default function SupplierPage() {
  return (
    <>
      <Helmet>
        <title> Suppliers | WijayaAuto </title>
      </Helmet>

      <Suppliers />
    </>
  );
}
