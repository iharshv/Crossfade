import React, { useEffect, useRef } from 'react';

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const ringRef = useRef(null);
    const cursorPos = useRef({ x: 0, y: 0 });
    const ringPos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const updateCursorPosition = (e) => {
            cursorPos.current = { x: e.clientX, y: e.clientY };
        };

        const checkBackgroundLuminance = () => {
            if (!cursorRef.current) return;

            // Get element under the cursor (temporarily hiding cursor to get what's behind it)
            cursorRef.current.style.display = 'none';
            ringRef.current.style.display = 'none';
            const elementUnder = document.elementFromPoint(cursorPos.current.x, cursorPos.current.y);
            cursorRef.current.style.display = 'block';
            ringRef.current.style.display = 'block';

            if (elementUnder) {
                const bgColor = window.getComputedStyle(elementUnder).backgroundColor;
                const rgb = bgColor.match(/\d+/g);

                if (rgb && rgb.length >= 3) {
                    const r = parseInt(rgb[0]);
                    const g = parseInt(rgb[1]);
                    const b = parseInt(rgb[2]);

                    // Simple luminance formula
                    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

                    if (luminance > 0.6) {
                        cursorRef.current.classList.add('on-light');
                        ringRef.current.classList.add('on-light');
                    } else {
                        cursorRef.current.classList.remove('on-light');
                        ringRef.current.classList.remove('on-light');
                    }
                }
            }
        };

        const animateCursor = () => {
            if (cursorRef.current && ringRef.current) {
                // Cursor follows mouse instantly
                cursorRef.current.style.left = `${cursorPos.current.x}px`;
                cursorRef.current.style.top = `${cursorPos.current.y}px`;
                cursorRef.current.style.transform = 'translate(-50%, -50%)';

                // Ring follows with smooth delay
                const dx = cursorPos.current.x - ringPos.current.x;
                const dy = cursorPos.current.y - ringPos.current.y;
                ringPos.current.x += dx * 0.15;
                ringPos.current.y += dy * 0.15;

                ringRef.current.style.left = `${ringPos.current.x}px`;
                ringRef.current.style.top = `${ringPos.current.y}px`;
                ringRef.current.style.transform = 'translate(-50%, -50%)';

                checkBackgroundLuminance();
            }
            requestAnimationFrame(animateCursor);
        };

        const handleHoverStart = (e) => {
            const target = e.target;
            const isInteractive =
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.onclick ||
                target.classList.contains('clickable') ||
                window.getComputedStyle(target).cursor === 'pointer';

            if (isInteractive) {
                cursorRef.current?.classList.add('hover');
                ringRef.current?.classList.add('hover');
            }
        };

        const handleHoverEnd = () => {
            cursorRef.current?.classList.remove('hover');
            ringRef.current?.classList.remove('hover');
        };

        window.addEventListener('mousemove', updateCursorPosition);
        document.addEventListener('mouseover', handleHoverStart);
        document.addEventListener('mouseout', handleHoverEnd);

        const animation = requestAnimationFrame(animateCursor);

        return () => {
            window.removeEventListener('mousemove', updateCursorPosition);
            document.removeEventListener('mouseover', handleHoverStart);
            document.removeEventListener('mouseout', handleHoverEnd);
            cancelAnimationFrame(animation);
        };
    }, []);

    return (
        <>
            <div ref={cursorRef} className="custom-cursor" />
            <div ref={ringRef} className="custom-cursor-ring" />
        </>
    );
};

export default CustomCursor;
