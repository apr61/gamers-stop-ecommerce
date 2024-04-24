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
import { Address, AddressData } from "../utils/types";

export const addAddressService = async (
  newAddress: AddressData
): Promise<Address> => {
  const docRef = await addDoc(collection(db, "addresses"), newAddress);
  return { id: docRef.id, ...newAddress };
};

export const getAddressesService = async (userId: string) => {
  const q = query(collection(db, "addresses"), where("uid", "==", userId));
  const querySnapshot = await getDocs(q);
  let addressesArray: Address[] = [];
  querySnapshot.forEach((doc) => {
    return addressesArray.push({ id: doc.id, ...doc.data() } as Address);
  });
  return addressesArray;
};

export const updateAddressByIdService = async (
  updatedAddress: AddressData,
  id: string
): Promise<Address> => {
  const existingAddress = doc(db, "addresses", id);
  await updateDoc(existingAddress, updatedAddress);
  return { id: id, ...updatedAddress } as Address;
};

export const deleteAddressById = async (id: string) => {
  await deleteDoc(doc(db, "addresses", id));
};
