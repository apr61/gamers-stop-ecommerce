import supabase from "../../utils/supabase";
import {
  QueryType,
  ProductFormValues,
  Product,
  ProductFilterType,
} from "@/types/api";
import { uploadFiles, deleteFile } from "../api/fileUpload";

export const searchProductsAdmin = async (query: QueryType<Product>) => {
  const { count, error: countError } = await supabase()
    .from("products")
    .select("*", { count: "exact", head: true });

  if (countError) throw countError;

  const { data, error } = await supabase()
    .from("products")
    .select(
      `*, category:categories(id, category_name, category_image), brand:brands(id, brand_name)`
    )
    .ilike(`${query.search.query}`, `%${query.search.with}%`)
    .order("created_at", { ascending: false })
    .range(query.pagination.from, query.pagination.to);

  if (error) throw error;

  const response = {
    data: data ? data : [],
    count: count ? count : 0,
  };
  return response;
};

export const searchProducts = async (query: ProductFilterType) => {
  const { count, error: countError } = await supabase()
    .from("products")
    .select("*", { count: "exact", head: true });

  if (countError) throw countError;

  // Fetch the products based on the query
  let productQuery  = supabase()
    .from("products")
    .select(
      `*, category:categories(id, category_name, category_image), brand:brands(id, brand_name)`
    )
    .gte("quantity", query.stock === "inStock" ? 1 : 0)
    .order("price", { ascending: query.sort === "price_low_to_high" })
    .range(query.page.from, query.page.to);

  if(query.category){
    productQuery = productQuery.eq("category_id", query.category)
  }

  if(query.brand.length > 0){
    productQuery = productQuery.in("brand_id", query.brand)
  }

  const {data, error} = await productQuery;

  if (error) throw error;

  return {
    data: data || [],
    count: count || 0,
  };
};

export async function createProduct(values: ProductFormValues) {
  let imageUrls: string[] = [];

  if (values.images) {
    imageUrls = await uploadFiles(values.images, "product_images");
  }

  const { data, error } = await supabase()
    .from("products")
    .insert({
      name: values.name,
      description: values.description,
      price: values.price,
      quantity: values.quantity,
      category_id: values.category_id,
      images: imageUrls,
      brand_id: values.brand_id,
      slug_url: values.slug_url,
      specifications: values.specifications,
    })
    .select(
      `*, category:categories(id, category_name, category_image), brand:brands(id, brand_name)`
    )
    .single();

  if (error) throw error;

  return data;
}

export async function getProducts() {
  const { data, error } = await supabase()
    .from("products")
    .select("*, category:categories(*), brand:brands(id, brand_name)");

  if (error) throw error;

  return data;
}

export async function getProductById(id: number) {
  const { data, error } = await supabase()
    .from("products")
    .select("*, category:categories(*), brand:brands(id, brand_name)")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
}

export async function updateProduct(id: number, values: ProductFormValues) {
  let imageUrls: string[] = [];

  const { data: imagesData, error: imagesError } = await supabase()
    .from("products")
    .select("images")
    .eq("id", id)
    .single();

  if (imagesError) throw imagesError;

  if (imagesData) {
    await deleteFile(imagesData.images);
  }

  if (values.images) {
    imageUrls = await uploadFiles(values.images, "product_images");
  }

  const { data, error } = await supabase()
    .from("products")
    .update({
      name: values.name,
      description: values.description,
      price: values.price,
      quantity: values.quantity,
      category_id: values.category_id,
      images: imageUrls,
      brand_id: values.brand_id,
      specifications: values.specifications,
      slug_url: values.slug_url,
    })
    .eq("id", id)
    .select(
      `*, category:categories(id, category_name, category_image), brand:brands(id, brand_name)`
    )
    .single();

  if (error) throw error;

  return data;
}

export async function deleteProduct(id: number) {
  try {
    const { data: productData, error: fetchError } = await supabase()
      .from("products")
      .select("images")
      .eq("id", id)
      .single();

    if (fetchError) throw fetchError;

    const { error } = await supabase().from("products").delete().eq("id", id);

    if (error) throw error;

    if (productData && productData.images.length > 0) {
      await deleteFile(productData.images);
    }

    return id;
  } catch (error) {
    throw error;
  }
}

export async function getProductBySlugUrl(slugUrl: string) {
  const { data, error } = await supabase()
    .from("products")
    .select("*, category:categories(*), brand:brands(id, brand_name)")
    .eq("slug_url", slugUrl)
    .single();

  if (error) throw error;

  return data as Product;
}
