import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'; // Assuming you're storing the login state in Redux
import { API } from "../axios";
import { useEffect } from "react";
import { setAuth } from '../slices/auth';

const apiCall = async () => {
    const result = await API.get('/profile/short');
    console.log('api call');
    return result;
};

const ProtectedRoute = ({ children }) => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    useEffect(() => {
        if (!isAuthenticated) { // Conditionally run useEffect only if not authenticated
            const fetchProfile = async () => {
                console.log('useEffect Start');
                const result = await apiCall();
                console.log('Got Result', result);
                if (result.data.status === "success") {
                    dispatch(setAuth(true));
                }
                console.log('useEffect End');
            };

            fetchProfile();
        }
    }, [isAuthenticated, dispatch]); // Add isAuthenticated as a dependency

    console.log('isAuthenticated ...', isAuthenticated);

    if (!isAuthenticated) {
        // Redirect to login page if user is not authenticated
        return <Navigate to="/login" />;
    }

    // Render the child components (protected routes)
    return children;
};

export default ProtectedRoute;
