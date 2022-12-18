import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const Private = ({
    children,
    redirect="/login",
}) => {
    const token = localStorage.getItem("authToken");
    if(!token) {
        return <Navigate to={redirect} />
    }
    return children ? children : <Outlet/>
}


export const Protect = ({
    children,
    redirectAdmin="/user",
}) => {
    const token = localStorage.getItem("authToken");
    if(token) {
        return <Navigate to={redirectAdmin} />
    }
    return children ? children : <Outlet/>
}


export default Private;