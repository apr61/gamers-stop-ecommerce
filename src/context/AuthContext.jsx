import React, { createContext, useContext } from 'react'

const AuthContext = createContext()

export function useAuthContext() {
    return useContext(AuthContext)
}

function AuthProvider({ children }) {
    
    return (
        <AuthContext.Provider value={{}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider