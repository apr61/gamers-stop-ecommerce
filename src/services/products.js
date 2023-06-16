import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../FirebaseConfig";

export const getProducts = async () => {
  let productsArray = [];
  const querySnapshot = await getDocs(collection(db, "products"));
  querySnapshot.forEach((doc) => {
    productsArray.push({ id: doc.id, ...doc.data() });
  });
  return productsArray;
};

export const getProductByIdService = async (id) => {
  const docRef = doc(db, "products", id);
  const docSnapshot = await getDoc(docRef);
  if (docSnapshot.exists()) {
    return { id, ...docSnapshot.data() };
  } else {
    return new Promise.reject("Product not Found");
  }
};

export const getCategoriesService = async () => {
  let categories = [];
  const querySnapshot = await getDocs(collection(db, "categories"));
  querySnapshot.forEach((doc) => {
    categories.push({ id: doc.id, ...doc.data() });
  });
  return categories;
};
