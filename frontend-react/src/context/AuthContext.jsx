import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Cek token saat komponen mount
        const checkToken = () => {
            const token = Cookies.get('token');
            setIsAuthenticated(!!token);
        };

        checkToken();

        // Optional: Tambahkan polling / interval jika perlu pantau cookies
        const interval = setInterval(() => {
            checkToken();
        }, 3000); // setiap 3 detik (bisa diatur sesuai kebutuhan)

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};
