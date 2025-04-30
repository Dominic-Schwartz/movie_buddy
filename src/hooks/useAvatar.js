import { useContext } from "react";
import { AvatarContext } from "../context/AvatarContext.js";

export function useAvatar() {
    return useContext(AvatarContext);
}

