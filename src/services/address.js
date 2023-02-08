import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore"
import { db } from "../FirebaseConfig"

export const addAddress = async (newAddress) => {
    return await addDoc(collection(db, 'addresses'), newAddress)
}

export const getAddresses = async () => {
    const querySnapshot = await getDocs(collection(db, 'addresses'))
    let addressesArray = []
    querySnapshot.forEach(doc => {
        return addressesArray.push({id: doc.id, ...doc.data()})
    })
    return addressesArray
}

export const updateAddress = async (updatedAddress, id) => {
    const existingAddress = doc(db, "addresses", id)
    await updateDoc(existingAddress, updatedAddress)
}

export const deleteAddressById = async (id) => {
    await deleteDoc(doc(db, "addresses", id))
}