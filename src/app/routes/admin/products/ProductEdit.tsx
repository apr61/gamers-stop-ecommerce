import ProductsForm from "@/features/products/components/ProductForm";
import { addProduct, editProduct, selectProdcutsCurrentItem } from "@/features/products/productSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ProductFormValues } from "@/types/api";
import UrlToFileList from "@/utils/urlToFileList";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export const ProductEdit = () => {
  const { record } = useAppSelector(selectProdcutsCurrentItem);
  
  const [productValues, setProductValues] = useState<
  ProductFormValues | undefined
  >(undefined);
  const [loading, setLoading] = useState(true)
  const dispatch = useAppDispatch();
  
  if (record === null) return <Navigate to="/admin/products" />;

  useEffect(() => {
    const initializeForm = async () => {
      const fileList = await UrlToFileList(record.images);
      const values: ProductFormValues = {
        name: record.name,
        price: record.price,
        description: record.description,
        quantity: record.quantity,
        category_id: record.category_id,
        images: fileList,
        brand_id: record.brand?.id!,
        specifications: record.specifications,
        slug_url: record.slug_url
      };
      setProductValues(values);
      setLoading(false)      
    };
    initializeForm();
  }, []);

  const handleSubmit = async (data: ProductFormValues) => {
    await dispatch(editProduct({ formData: data, id: record.id }))
  }

  if(loading) return <h1>Loading...</h1>
  
  return <ProductsForm product={productValues} images={record.images} saveFn={handleSubmit} title={"Edit product"}/>;
};

