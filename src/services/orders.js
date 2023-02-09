import { addDoc, collection, getDocs } from "firebase/firestore"
import { db } from "../FirebaseConfig"


export const getAllOrders = async () => {
    let ordersArray = []
    const docRef = await getDocs(collection(db, "orders"))
    docRef.forEach(doc => {
        ordersArray.push({id: doc.id, ...doc.data()})
    })
    return ordersArray
}

export const createAnOrder = async (order) => {
    return await addDoc(collection(db, "orders"), order)
}