import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import './layout.css';
import { ClinicIcon } from '../../assets/icons/svg/clinicIcon.jsx'
import { OrdersIcon } from '../../assets/icons/svg/ordersIcon.jsx'
import { PatientIcon } from '../../assets/icons/svg/patientIcon.jsx'
import { eraseAccessToken } from '../../utils/helper.js';
import { setAuth } from '../../slices/auth.js';

const Layout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        eraseAccessToken();
        dispatch(setAuth(false));
        navigate('/login');
    }
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated); // Adjust this line based on your auth state
    return (
        <>
        {isAuthenticated && (
            <nav className='nav-bar'>
                <div className="nav-links">
                    <Link className='nav-bar-link' to="/order">
                        <OrdersIcon /> &nbsp; Order
                    </Link>
                    <Link className='nav-bar-link' to="/clinic">
                        <ClinicIcon /> &nbsp; Clinic
                    </Link>
                    <Link className='nav-bar-link' to="/patient">
                        <PatientIcon /> &nbsp; Patient
                    </Link>
                </div>
                <div className="nav-logout">
                    <button className='logout-button' onClick={handleLogout}>Logout</button>
                </div>
            </nav>
        )}
        <div style={{ textAlign: "center", padding: "16px" }}>
            <Outlet />
        </div>
        </>
    )
}

export default Layout;