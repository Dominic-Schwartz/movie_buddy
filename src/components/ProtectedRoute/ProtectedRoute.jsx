import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ requiredRoles }) => {
    const { isAuthenticated, user } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    const hasRequiredRole =
        user?.roles && requiredRoles?.some((r) => user.roles.includes(r));

    if (requiredRoles?.length > 0 && !hasRequiredRole) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
};

ProtectedRoute.propTypes = {
    requiredRoles: PropTypes.arrayOf(PropTypes.string),
};

export default ProtectedRoute;
