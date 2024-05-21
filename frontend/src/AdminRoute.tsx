import { Navigate } from 'react-router-dom';
import { useAuth } from '../src/utils/useAuth';

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/" />;
    } else {
        const loggedUser = sessionStorage.getItem('userToken');
        if (loggedUser) {
            const user = JSON.parse(loggedUser);
            if (user.role !== "admin") {
                return <Navigate to="/" />;
            }
        }
    }

    return <>{children}</>;
};

export default AdminRoute;
