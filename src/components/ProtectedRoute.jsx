import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'; // Assuming you're storing the login state in Redux
import { API } from "../axios";
import { useEffect, useState } from "react";
import { setAuth } from '../slices/auth';

const apiCall = async () => {
    const result = await API.get('/profile/short');
    console.log('api call');
    return result;
};

const ProtectedRoute = ({ children }) => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const [loading, setLoading] = useState(true); // Track loading state

    useEffect(() => {
        if (!isAuthenticated) { // Only call API if not authenticated (hard refresh)
            const fetchProfile = async () => {
                console.log('useEffect Start');
                try {
                    const result = await apiCall();
                    console.log('Got Result', result);
                    if (result.data.status === "success") {
                        dispatch(setAuth(true)); // Set authentication to true if successful
                    }
                } catch (error) {
                    console.log('Error during API call', error);
                } finally {
                    setLoading(false); // API call is done, stop loading
                }
                console.log('useEffect End');
            };

            fetchProfile();
        } else {
            setLoading(false); // If already authenticated, no need to wait
        }
    }, [isAuthenticated, dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    // Redirect to login page if user is not authenticated after API call
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    // Render the child components (protected routes) if authenticated
    return children;
};

export default ProtectedRoute;
