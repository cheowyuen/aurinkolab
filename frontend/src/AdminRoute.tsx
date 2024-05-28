import { Navigate } from 'react-router-dom';
import { useAuth } from '../src/utils/useAuth';

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useAuth();

    /** redirect to homepage if user is not authenticated */
    if (!isAuthenticated) {
        return <Navigate to="/" />;
    } else {
        const loggedUser = sessionStorage.getItem('userToken');
        if (loggedUser) {
            const user = JSON.parse(loggedUser);

            /** redirect to homepage if user is not admin */
            if (user.role !== "admin") {
                return <Navigate to="/" />;
            }
        }
    }

    return <>{children}</>;
};

export default AdminRoute;
