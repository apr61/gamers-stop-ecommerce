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
import { dateFormatter } from "../utils/utils";

export const getAllOrdersByUserIdService = async (
  userId: string
): Promise<Order[]> => {
  const q = query(collection(db, "orders"), where("uid", "==", userId));
  let ordersArray: Order[] = [];
  const docRef = await getDocs(q);
  docRef.forEach((doc) => {
    return ordersArray.push({
      ...doc.data(),
      id: doc.id,
      orderedDate: dateFormatter(new Date(doc.data().orderedDate)),
    } as Order);
  });
  return ordersArray;
};

export const createAnOrderService = async (order: OrderData) => {
  return await addDoc(collection(db, "orders"), order);
};

export const getOrderByIdService = async (
  orderId: string
): Promise<Order | null> => {
  const docRef = doc(db, "orders", orderId);
  const docSnap = await getDoc(docRef);
  if (docSnap.data()) {
    return {
      ...docSnap.data(),
      id: orderId,
      orderedDate: dateFormatter(
        new Date(docSnap.data()!.orderedDate.seconds * 1000)
      ),
    } as Order;
  }
  return null;
};

export const updateOrderByIdService = async (order: Order) => {};

export const deleteOrderByIdService = async (orderId: string) => {};
