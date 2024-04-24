import {
  collection,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";
import { db } from "../FirebaseConfig";
import { Category, Product } from "../utils/types";

export const getProducts = async (): Promise<Product[]> => {
  let productsArray: Product[] = [];
  const querySnapshot = await getDocs(collection(db, "products"));
  querySnapshot.forEach((doc) => {
    productsArray.push({ id: doc.id, ...doc.data() } as Product);
  });
  return productsArray;
};

export const getProductBySlugService = async (
  slugurl: string
): Promise<Product | null> => {
  const q = query(
    collection(db, "products"),
    where("slugurl", "==", slugurl),
    limit(1)
  );
  const querySnapshot = await getDocs(q);
  let product: Product | null = null;
  if (querySnapshot.empty === false) {
    querySnapshot.forEach((doc) => {
      product = { id: doc.id, ...doc.data() } as Product;
    });
  }
  return product;
};

export const getCategoriesService = async () => {
  let categories: Category[] = [];
  const querySnapshot = await getDocs(collection(db, "categories"));
  querySnapshot.forEach((doc) => {
    categories.push({ id: doc.id, ...doc.data() } as Category);
  });
  return categories;
};
