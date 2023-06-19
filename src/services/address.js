import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../FirebaseConfig";

export const addAddressService = async (newAddress) => {
  return await addDoc(collection(db, "addresses"), newAddress);
};

export const getAddressesService = async (userId) => {
  const q = query(collection(db, "addresses"), where("uid", "==", userId));
  const querySnapshot = await getDocs(q);
  let addressesArray = [];
  querySnapshot.forEach((doc) => {
    return addressesArray.push({ id: doc.id, ...doc.data() });
  });
  return addressesArray;
};

export const updateAddressByIdService = async (updatedAddress, id) => {
  const existingAddress = doc(db, "addresses", id);
  await updateDoc(existingAddress, updatedAddress);
};

export const deleteAddressById = async (id) => {
  await deleteDoc(doc(db, "addresses", id));
};
