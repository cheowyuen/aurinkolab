import { Navigate } from 'react-router-dom';
import { useAuth } from '../src/utils/useAuth';

const AdminLoginRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        const loggedUser = sessionStorage.getItem('userToken');
        if (loggedUser) {
            const user = JSON.parse(loggedUser);
            if (user.role !== "admin") {
                return <Navigate to="/" />;
            } else {
                return <Navigate to="/admin-panel" />;
            }
        }
    }
    
    return <>{children}</>;
};

export default AdminLoginRoute;