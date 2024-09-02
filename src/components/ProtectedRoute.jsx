import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux'; // Assuming you're storing the login state in Redux

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    console.log('isAuthenticated', isAuthenticated);
    
    if (!isAuthenticated) {
        // Redirect to login page if user is not authenticated
        return <Navigate to="/login" />;
    }

    // Render the child components (protected routes)
    return children;
};

export default ProtectedRoute;
