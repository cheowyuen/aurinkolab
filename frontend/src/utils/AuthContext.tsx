import { createContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
    userRole: string;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!sessionStorage.getItem('userToken'));
    const [userRole, setUserRole] = useState("");

    useEffect(() => {
        const userToken = sessionStorage.getItem('userToken');
        if (userToken) {
            const loggedUser = JSON.parse(userToken);
            setUserRole(loggedUser.role);
            console.log('role',userRole)
        } else {
            console.log('No user token found');
        }
    }, [userRole]);


    const login = (user: string) => {
        sessionStorage.setItem('userToken', user);
        setIsAuthenticated(true);
        const loggedUserJSON = JSON.parse(user);
        setUserRole(loggedUserJSON.role);
    };

    const logout = () => {
        sessionStorage.removeItem('userToken');
        setIsAuthenticated(false);
        setUserRole("");
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, userRole }}>
            {children}
        </AuthContext.Provider>
    );
};
