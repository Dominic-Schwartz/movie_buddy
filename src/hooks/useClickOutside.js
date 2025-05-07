import { useEffect } from "react";

export const useClickOutside = (refs = [], onClickOutside) => {
    useEffect(() => {
        const handleClick = (e) => {
            const clickedOutside = refs.every(ref => ref.current && !ref.current.contains(e.target));
            if (clickedOutside) onClickOutside();
        };
        window.addEventListener("mousedown", handleClick);
        return () => window.removeEventListener("mousedown", handleClick);
    }, [refs, onClickOutside]);
};
