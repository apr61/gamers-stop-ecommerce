import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
  query,
  where,
  getDoc,
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
  address: Address
): Promise<Address> => {
  const existingAddress = doc(db, "addresses", address.id);
  await updateDoc(existingAddress, address);
  return { ...address } as Address;
};

export const deleteAddressById = async (id: string) => {
  await deleteDoc(doc(db, "addresses", id));
};

export const getAddressForCurrentUserById = async (
  userId: string,
  addressId: string
) => {
  const docRef = doc(db, "addresses", addressId);
  const docSnap = await getDoc(docRef);
  let data;
  if (docSnap.data()) {
    data = { id: addressId, ...docSnap.data() } as Address;
    if (data.uid === userId) {
      return data;
    }
  }
  return null;
};
