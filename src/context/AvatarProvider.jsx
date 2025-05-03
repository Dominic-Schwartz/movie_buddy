import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { AvatarContext } from "./AvatarContext.js";
import { useAuth } from "../hooks/useAuth";

export function AvatarProvider({ children }) {
    const { user } = useAuth();
    const username = user?.username;
    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        if (username) {
            const storedAvatar = localStorage.getItem(`avatar_${username}`);
            if (storedAvatar) {
                setAvatar(storedAvatar);
            }
        }
    }, [username]);

    const chooseAvatar = (avatarUrl) => {
        if (username) {
            localStorage.setItem(`avatar_${username}`, avatarUrl);
            setAvatar(avatarUrl);
        }
    };

    const removeAvatar = () => {
        if (username) {
            localStorage.removeItem(`avatar_${username}`);
            setAvatar(null);
        }
    };

    return (
        <AvatarContext.Provider value={{ avatar, chooseAvatar, removeAvatar }}>
            {children}
        </AvatarContext.Provider>
    );
}

AvatarProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
