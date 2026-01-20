import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (hash) {
            // Wait for render
            setTimeout(() => {
                const element = document.getElementById(hash.substring(1));
                if (element) {
                    // Instant scroll on load, let SmoothScroll handle clicks
                    element.scrollIntoView({ behavior: "auto" });
                }
            }, 100);
        } else {
            window.scrollTo(0, 0);
        }
    }, [pathname, hash]);

    return null;
}
