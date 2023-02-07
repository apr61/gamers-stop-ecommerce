import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../FirebaseConfig'

const AuthContext = createContext()

export function useAuthContext() {
    return useContext(AuthContext)
}

function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState({})


    function signUp (email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function signIn(email,password){
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logOut(){
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user)
        })
        return () => unsubscribe
    }, [])

    return (
        <AuthContext.Provider value={{currentUser, signUp, signIn, logOut}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider