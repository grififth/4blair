import { useEffect, useLayoutEffect } from "react";

const timeDiff = (date: Date) => {
    const now = new Date();
    const diff = Math.abs(now - date);
    const diffDays = Math.floor(diff / (1000 * 3600 * 24));
    const diffHours = Math.floor(diff / (1000 * 3600));
    const diffMinutes = Math.floor(diff / (1000 * 60));
    const diffSeconds = Math.floor(diff / 1000);

    if (diffDays > 0) {
        return `${diffDays}d`;
    } else if (diffHours > 0) {
        return `${diffHours}h`;
    } else if (diffMinutes > 0) {
        return `${diffMinutes}m`;
    } else if (diffSeconds > 0) {
        return `${diffSeconds}s`;
    } else {
        return "now";
    }
};

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default timeDiff;
export { useIsomorphicLayoutEffect };
