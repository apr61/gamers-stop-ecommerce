import StoreProducts from "@/features/products/components/StoreProducts";

function ProductsList() {
  document.title = "Store | Gamers Stop";

  return (
    <div className="min-h-[60vh] p-4">
      <StoreProducts />
    </div>
  );
}

export default ProductsList;
