import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import client from '../api/client';
import { ACCESS_TOKEN_KEY } from '../constants/storageKeys';
import { AuthContext } from './AuthContext.js';

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() =>
        localStorage.getItem(ACCESS_TOKEN_KEY)
    );
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem("user");
        return stored ? JSON.parse(stored) : null;
    });

    useEffect(() => {
        if (!token) {
            localStorage.removeItem(ACCESS_TOKEN_KEY);
            localStorage.removeItem("user");
            setUser(null);
            return;
        }

        localStorage.setItem(ACCESS_TOKEN_KEY, token);

        if (!user) {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        }
    }, [token, user]);

    useEffect(() => {
        if (!user?.expiresAt) return;

        const now = Date.now();
        const timeout = user.expiresAt - now;

        if (timeout <= 0) {
            logout();
            return;
        }

        const timer = setTimeout(() => {
            logout();
        }, timeout);

        return () => clearTimeout(timer);
    }, [user]);

    const login = async (username, password) => {
        try {
            const res = await client.post('/api/auth/signin', { username, password });

            const { accessToken, roles, id, email } = res.data;

            // 🔧 Workaround: handmatig admin toevoegen voor specifiek account
            const fixedRoles = (email === "adminbuddy@moviebuddy.nl")
                ? ["ROLE_USER", "ROLE_ADMIN"]
                : roles;

            const userObj = {
                id,
                email,
                username,
                roles: fixedRoles,
                expiresAt: Date.now() + (60 * 60 * 1000),
            };

            setToken(accessToken);
            setUser(userObj);

            localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
            localStorage.setItem("user", JSON.stringify(userObj));

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
        localStorage.removeItem("user");
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
