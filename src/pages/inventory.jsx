import { Helmet } from 'react-helmet-async';
import { Inventory } from 'src/sections/inventory';

// ----------------------------------------------------------------------

export default function InventoryPage() {
  return (
    <>
      <Helmet>
        <title> Inventory | WijayaAuto </title>
      </Helmet>

      <Inventory />
    </>
  );
}
