import React from 'react';
import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import '../assets/css/layout.css';
import { ClinicIcon } from '../assets/icons/svg/clinicIcon.jsx'
import { OrdersIcon } from '../assets/icons/svg/ordersIcon.jsx'
import { PatientIcon } from '../assets/icons/svg/patientIcon.jsx'

const Layout = () => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated); // Adjust this line based on your auth state
    return (
        <>
        {isAuthenticated &&
            <nav className='nav-bar'>
                <div>
                    <Link className='nav-bar-link' to="/order">
                        <OrdersIcon /> Order
                    </Link>&nbsp;&nbsp;
                    <Link className='nav-bar-link' to="/clinic">
                        <ClinicIcon /> Clinic
                    </Link>&nbsp;&nbsp;
                    <Link className='nav-bar-link' to="/patient">
                        <PatientIcon /> Patient
                    </Link>&nbsp;&nbsp;
                    <button className='logout-button'>Logout</button>
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