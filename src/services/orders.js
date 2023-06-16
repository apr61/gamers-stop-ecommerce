import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../FirebaseConfig";

export const getAllOrdersByUserIdService = async (userId) => {
  const q = query(collection(db, "orders"), where("uid", "==", userId));

  let ordersArray = [];
  const docRef = await getDocs(q);
  docRef.forEach((doc) => {
    return ordersArray.push({ id: doc.id, ...doc.data() });
  });
  return ordersArray;
};

export const createAnOrderService = async (order) => {
  return await addDoc(collection(db, "orders"), order);
};

export const getOrderByIdService = async (orderId) => {
  const docRef = doc(db, "orders", orderId);
  const docSnap = await getDoc(docRef);
  return { id: orderId, ...docSnap.data() };
};
