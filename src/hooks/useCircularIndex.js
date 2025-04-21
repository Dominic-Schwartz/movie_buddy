import { useState, useCallback } from "react";

export function useCircularIndex(totalSlides, initial = 0) {
    const [index, setIndex] = useState(initial);

    const prev = useCallback(() => {
        setIndex(i => (i - 1 + totalSlides) % totalSlides);
    }, [totalSlides]);

    const next = useCallback(() => {
        setIndex(i => (i + 1) % totalSlides);
    }, [totalSlides]);

    return { index, prev, next, setIndex };
}
