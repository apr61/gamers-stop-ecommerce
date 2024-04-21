import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../FirebaseConfig";
import { Category, Product } from "../utils/types";

export const getProducts = async () : Promise<Product[]> => {
  let productsArray: Product[] = [];
  const querySnapshot = await getDocs(collection(db, "products"));
  querySnapshot.forEach((doc) => {
    productsArray.push({ id: doc.id, ...doc.data() } as Product);
  });
  return productsArray;
};

export const getProductByIdService = async (id: string) : Promise<Product | null> => {
  const docRef = doc(db, "products", id);
  const docSnapshot = await getDoc(docRef);
  if (docSnapshot.exists()) {
    return { id, ...docSnapshot.data() } as Product;
  } 
  return null
};

export const getCategoriesService = async () => {
  let categories: Category[] = [];
  const querySnapshot = await getDocs(collection(db, "categories"));
  querySnapshot.forEach((doc) => {
    categories.push({ id: doc.id, ...doc.data() } as Category);
  });
  return categories;
};
