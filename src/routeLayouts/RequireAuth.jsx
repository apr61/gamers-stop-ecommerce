import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'

function RequireAuth() {
    const location = useLocation()
    const {currentUser} = useAuthContext()
    return (
        currentUser ? <Outlet /> : <Navigate  to='/signin' state={{from:location}} replace/>
    )
}

export default RequireAuth