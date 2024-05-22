import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../src/utils/useAuth';

const AdminDashboard = () => {
    const { logout } = useAuth();

    return (
        <div className="flex min-h-screen">
            <aside className="w-full p-6 sm:w-60 dark:bg-gray-50 dark:text-gray-800 mt-30">
                <nav className="space-y-8 text-sm">
                    <div className="space-y-2">
                        <h2 className="text-sm font-semibold tracking-widest uppercase dark:text-gray-600">Tutor</h2>
                        <div className="flex flex-col space-y-1">
                            <Link to="/admin-panel/approve-tutor">Approve Tutor</Link>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-sm font-semibold tracking-widest uppercase dark:text-gray-600">News</h2>
                        <div className="flex flex-col space-y-1">
                            <Link to="/admin-panel/news/add">Add News</Link>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-sm font-semibold tracking-widest uppercase dark:text-gray-600">
                            <Link to="/admin" onClick={logout}>Logout</Link>
                        </h2>
                    </div>
                </nav>
            </aside>

            <div className="flex-1 justify-center items-center">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminDashboard;