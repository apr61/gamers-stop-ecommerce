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
import { Order, OrderData } from "../utils/types";

export const getAllOrdersByUserIdService = async (userId: string) : Promise<Order[]> => {
  const q = query(collection(db, "orders"), where("uid", "==", userId));
  let ordersArray: Order[] = [];
  const docRef = await getDocs(q);
  docRef.forEach((doc) => {
    return ordersArray.push({ id: doc.id ,...doc.data() } as Order);
  });
  return ordersArray;
};

export const createAnOrderService = async (order: OrderData) => {
  return await addDoc(collection(db, "orders"), order);
};

export const getOrderByIdService = async (orderId: string): Promise<Order | null> => {
  const docRef = doc(db, "orders", orderId);
  const docSnap = await getDoc(docRef);
  if(docSnap.data()){
    return { id: orderId, ...docSnap.data() } as Order;
  }
  return null
};
