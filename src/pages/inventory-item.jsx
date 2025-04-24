import { Helmet } from 'react-helmet-async';
import { InventoryItem } from 'src/sections/inventory-item';

// ----------------------------------------------------------------------

export default function InventoryItemPage() {
  return (
    <>
      <Helmet>
        <title> Inventory Item | WijayaAuto </title>
      </Helmet>

      <InventoryItem />
    </>
  );
}
