import { useContext } from "react";
import { AvatarContext } from "../context/AvatarContext";

export function useAvatar() {
    return useContext(AvatarContext);
}

