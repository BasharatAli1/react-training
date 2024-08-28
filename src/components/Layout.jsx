import React from 'react'
import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom'

const Layout = () => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated); // Adjust this line based on your auth state
    return (
        <>
        {isAuthenticated &&
            <nav style={{ display: "flex", padding: "16px", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                <Link to="/order">Order</Link>&nbsp;&nbsp;
                <Link to="/clinic">Clinic</Link>&nbsp;&nbsp;
                <Link to="/patient">Patient</Link>&nbsp;&nbsp;
                </div>
            </nav>
        }
        <div style={{ textAlign: "center", padding: "16px" }}>
            <Outlet />
        </div>
        </>
    )
}

export default Layout