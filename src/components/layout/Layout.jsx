import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
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
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    const navLinkStyle = ({ isActive }) => ({
        // display: 'flex',
        // alignItems: 'center',
        padding: '10px',
        borderRadius: '6px',
        border: isActive ? '2px solid #2196F3' : '2px solid transparent',  // Change border when active
    });

    return (
        <>
            {isAuthenticated && (
                <nav className="nav-bar">
                    <div className="nav-links">
                        <NavLink className="nav-bar-link" to="/order" style={navLinkStyle}>
                            <OrdersIcon /> Order
                        </NavLink>&nbsp;&nbsp;
                        <NavLink className="nav-bar-link" to="/clinic" style={navLinkStyle}>
                            <ClinicIcon /> Clinic
                        </NavLink>&nbsp;&nbsp;
                        <NavLink className="nav-bar-link" to="/patient" style={navLinkStyle}>
                            <PatientIcon /> Patient
                        </NavLink>&nbsp;&nbsp;
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
    );
};

export default Layout;