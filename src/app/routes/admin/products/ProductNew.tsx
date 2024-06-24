import ProductsForm from "@/features/products/components/ProductForm";
import { addProduct } from "@/features/products/productSlice";
import { useAppDispatch } from "@/store/hooks";
import { ProductFormValues } from "@/types/api";

export const ProductNew = () => {
  const dispatch = useAppDispatch();
  const handleSubmit = async (data: ProductFormValues) => {
    await dispatch(addProduct({ formData: data }))
  }
  return <ProductsForm saveFn={handleSubmit} title={"Add product"}/>;
};
