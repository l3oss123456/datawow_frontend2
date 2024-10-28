import React from 'react'
import Cookies from 'js-cookie'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateGuardRoute: React.FC = () => {
    const access_token = Cookies.get('access_token')

    if (!access_token) {
        return <Navigate to="/login" state={{ from: {} }} />
    }

    return <Outlet />
}

export default PrivateGuardRoute
