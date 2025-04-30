import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { AvatarContext } from "./AvatarContext.js";
import { useAuth } from "../hooks/useAuth";

export function AvatarProvider({ children }) {
    const { user } = useAuth();
    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        if (user?.id) {
            const storedAvatar = localStorage.getItem(`avatar-${user.id}`);
            if (storedAvatar) {
                setAvatar(storedAvatar);
            }
        }
    }, [user?.id]);

    const chooseAvatar = (avatarUrl) => {
        if (user?.id) {
            localStorage.setItem(`avatar-${user.id}`, avatarUrl);
            setAvatar(avatarUrl);
        }
    };

    const removeAvatar = () => {
        if (user?.id) {
            localStorage.removeItem(`avatar-${user.id}`);
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
