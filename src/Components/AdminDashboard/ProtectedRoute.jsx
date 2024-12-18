import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
    // Get user role from localStorage (or your state management solution)
    const userRole = localStorage.getItem('role');

    // Check if the user's role matches the required role
    if (userRole !== requiredRole) {
        return <Navigate to="/" replace />; // Redirect non-admin users to home
    }

    return children; // Render the child component if the role matches
};

export default ProtectedRoute;
