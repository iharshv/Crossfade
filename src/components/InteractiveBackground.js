import React, { useEffect, useRef } from 'react';

const InteractiveBackground = () => {
    const canvasRef = useRef(null);
    const mousePos = useRef({ x: 0, y: 0 });
    const particles = useRef([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationFrameId;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        // Initialize particles in a grid
        const initParticles = () => {
            particles.current = [];
            const spacing = 50;
            const cols = Math.ceil(canvas.width / spacing);
            const rows = Math.ceil(canvas.height / spacing);

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    particles.current.push({
                        x: i * spacing,
                        y: j * spacing,
                        baseX: i * spacing,
                        baseY: j * spacing,
                        size: 2,
                    });
                }
            }
        };

        // Track mouse position
        const handleMouseMove = (e) => {
            mousePos.current = {
                x: e.clientX,
                y: e.clientY,
            };
        };

        // Animation loop
        const animate = () => {
            ctx.fillStyle = 'rgba(3, 0, 20, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particles.current.forEach((particle) => {
                // Calculate distance from mouse
                const dx = mousePos.current.x - particle.x;
                const dy = mousePos.current.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const maxDistance = 200;

                // Move particle away from mouse
                if (distance < maxDistance) {
                    const force = (maxDistance - distance) / maxDistance;
                    const angle = Math.atan2(dy, dx);
                    particle.x -= Math.cos(angle) * force * 20;
                    particle.y -= Math.sin(angle) * force * 20;
                } else {
                    // Return to base position
                    particle.x += (particle.baseX - particle.x) * 0.05;
                    particle.y += (particle.baseY - particle.y) * 0.05;
                }

                // Calculate opacity based on distance from mouse
                const opacity = distance < maxDistance ? 1 - (distance / maxDistance) * 0.5 : 0.3;

                // Create gradient effect
                const gradient = ctx.createRadialGradient(
                    particle.x, particle.y, 0,
                    particle.x, particle.y, particle.size * 2
                );

                if (distance < maxDistance) {
                    gradient.addColorStop(0, `rgba(0, 194, 255, ${opacity})`);
                    gradient.addColorStop(1, `rgba(112, 0, 255, ${opacity * 0.5})`);
                } else {
                    gradient.addColorStop(0, `rgba(112, 0, 255, ${opacity})`);
                    gradient.addColorStop(1, `rgba(112, 0, 255, 0)`);
                }

                // Draw particle
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fill();

                // Draw connections to nearby particles
                particles.current.forEach((otherParticle) => {
                    const dx2 = particle.x - otherParticle.x;
                    const dy2 = particle.y - otherParticle.y;
                    const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

                    if (distance2 < 80 && distance2 > 0) {
                        const lineOpacity = (1 - distance2 / 80) * 0.2;
                        ctx.strokeStyle = `rgba(112, 0, 255, ${lineOpacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.stroke();
                    }
                });
            });
        };

        // Initialize
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('mousemove', handleMouseMove);
        animate();

        // Cleanup
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="interactive-background"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                pointerEvents: 'none',
            }}
        />
    );
};

export default InteractiveBackground;
