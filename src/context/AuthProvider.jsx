import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import client from '../api/client';
import { ACCESS_TOKEN_KEY } from '../constants/storageKeys';
import { AuthContext } from './AuthContext.js';

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() =>
        localStorage.getItem(ACCESS_TOKEN_KEY)
    );
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (!token) {
            localStorage.removeItem(ACCESS_TOKEN_KEY);
            setUser(null);
            return;
        }
        localStorage.setItem(ACCESS_TOKEN_KEY, token);
    }, [token]);


    const login = async (username, password) => {
        try {
            const res = await client.post('/api/auth/signin', { username, password });

            const { accessToken, roles, id, email } = res.data;

            setToken(accessToken);

            setUser({
                id,
                email,
                roles,
                expiresAt: Date.now() + (60 * 60 * 1000),
            });

            localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);

            return { success: true };
        } catch (err) {
            console.error("❌ Login error:", err);
            return {
                success: false,
                message: err.response?.data?.message ?? 'Login failed',
            };
        }
    };

    const logout = () => {
        setToken(null);
    };

    const isAuthenticated = Boolean(user && user.expiresAt > Date.now());

    return (
        <AuthContext.Provider
            value={{ user, token, isAuthenticated, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
