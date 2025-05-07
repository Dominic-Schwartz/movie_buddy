import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { AvatarContext } from "./AvatarContext.js";
import { useAuth } from "../hooks/useAuth";

export function AvatarProvider({ children }) {
    const { user } = useAuth();
    const username = user?.username;
    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        if (!username) {
            setAvatar(null);
            return;
        }

        const stored = localStorage.getItem(`avatar_${username}`);
        setAvatar(stored || null);
    }, [username]);

    const chooseAvatar = (avatarUrl) => {
        if (!username) return;
        localStorage.setItem(`avatar_${username}`, avatarUrl);
        setAvatar(avatarUrl);
    };

    const removeAvatar = () => {
        if (!username) return;
        localStorage.removeItem(`avatar_${username}`);
        setAvatar(null);
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
