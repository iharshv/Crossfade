import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function SmoothScroll() {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: "vertical",
            gestureDirection: "vertical",
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Handle Anchor Links
        const handleClick = (e) => {
            const target = e.target.closest("a");
            if (!target) return;

            const href = target.getAttribute("href");
            if (!href) return;

            // Check if it's an anchor link on the same page
            if (href.startsWith("#") || (href.startsWith("/") && href.includes("#") && window.location.pathname === href.split("#")[0])) {
                const elementId = href.split("#")[1];
                const element = document.getElementById(elementId);

                if (element) {
                    e.preventDefault();
                    lenis.scrollTo(element);
                }
            }
        };

        document.addEventListener("click", handleClick);

        return () => {
            lenis.destroy();
            document.removeEventListener("click", handleClick);
        };
    }, []);

    return null;
}
