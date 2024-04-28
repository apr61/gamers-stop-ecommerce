import {
  addDoc,
  collection,
  getCountFromServer,
  getDocs,
  limit,
  or,
  query,
  where,
} from "firebase/firestore";
import { db } from "../FirebaseConfig";
import { Category, FilterArgsType, Product } from "../utils/types";
import { dateFormatter } from "../utils/utils";

export const getProducts = async () => {
  let productsArray: Product[] = [];
  const collectionRef = collection(db, "products");
  const totalCountSnapshot = await getCountFromServer(collectionRef);
  const querySnapshot = await getDocs(collectionRef);
  querySnapshot.forEach((doc) => {
    productsArray.push({
      ...doc.data(),
      id: doc.id,
      dateadded: dateFormatter(new Date(doc.data().dateadded)),
    } as Product);
  });
  // return {
  //   products: productsArray,
  //   totalCount: totalCountSnapshot.data().count,
  // };
  return productsArray;
};

export const getFilteredProducts = async (filterArgs: FilterArgsType) => {
  let productsArray: Product[] = [];
  const docRef = collection(db, "products");
  const totalCountSnapshot = await getCountFromServer(docRef);
  let categoryWhere;
  let brandsWhere;
  let ratingWhere;
  let availabilityWhere;

  if (filterArgs.categoryIn) {
    categoryWhere = where("category", "==", filterArgs.categoryIn);
  }

  if (filterArgs.brands.length > 0) {
    brandsWhere = where("brand", "in", filterArgs.brands);
  }

  if (filterArgs.rating > 0) {
    ratingWhere = where("avgrating", "<=", filterArgs.rating);
  }

  if (filterArgs.availability === "inStock") {
    availabilityWhere = where("quantity", ">=", 1);
  }

  let q = query(
    docRef,
    or(
      where("quantity", ">=", 1),
      where("category", "==", filterArgs.categoryIn)
    )
  );

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    productsArray.push({
      ...doc.data(),
      id: doc.id,
      dateadded: dateFormatter(new Date(doc.data().dateadded)),
    } as Product);
  });
  const response = {
    products: productsArray,
    totalCount: totalCountSnapshot.data().count,
  };
  return response;
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
      product = {
        ...doc.data(),
        id: doc.id,
        dateadded: dateFormatter(new Date(doc.data().dateadded)),
      } as Product;
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

export const addNewProductService = async (data: any) => {
  const collectionRef = collection(db, "cities");
  const docRef = await addDoc(collectionRef, data);
  return {
    id: docRef.id,
    ...data,
  };
};
