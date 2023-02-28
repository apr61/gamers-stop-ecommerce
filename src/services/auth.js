import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { auth, db } from "../FirebaseConfig"

export const signUp = async(email,password) => {
    return await createUserWithEmailAndPassword(auth, email, password)
}

export const signIn = async(email, password) => {
    return await signInWithEmailAndPassword(auth, email, password)
}

export const logOut = async () => {
    return await signOut(auth)
}
