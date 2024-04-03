import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticate } = useSelector(state => state.authState);

    

    if (!isAuthenticate) {
        return <Navigate to="/login" />; // Redirect to login page if user is not authenticated
    }

    

    // If user is authenticated and is either admin or not an admin
    return children;
}

export default ProtectedRoute;
