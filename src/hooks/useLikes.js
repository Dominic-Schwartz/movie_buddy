import { useContext } from "react";
import { LikesContext } from "../context/LikesContext";

export const useLikes = () => {
    const context = useContext(LikesContext);

    if (!context) {
        throw new Error("useLikes moet binnen een LikesProvider worden gebruikt");
    }

    return context;
};
