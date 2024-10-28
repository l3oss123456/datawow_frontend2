import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Cookies from 'js-cookie'

const LoginGuardRoute: React.FC = () => {
    const access_token = Cookies.get('access_token')

    if (!access_token) {
        return <Outlet />
    }

    return <Navigate to="/home" state={{ from: {} }} />
}

export default LoginGuardRoute
