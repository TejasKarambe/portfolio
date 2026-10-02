import React, { useEffect, useRef } from "react";

export function InteractiveBackground({ theme = "cyber" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Color palettes by theme
    const themeColors = {
      cyber: { r: 34, g: 211, b: 238, secR: 168, secG: 85, secB: 247 },
      matrix: { r: 16, g: 185, b: 129, secR: 52, secG: 211, secB: 153 },
      sunset: { r: 245, g: 158, b: 11, secR: 244, secG: 63, secB: 94 },
      sapphire: { r: 59, g: 130, b: 246, secR: 99, secG: 102, secB: 241 },
    };

    const currentPalette = themeColors[theme] || themeColors.cyber;

    const particleCount = Math.min(Math.floor((width * height) / 18000), 65);
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2 + 1,
        colorType: Math.random() > 0.4 ? "primary" : "secondary",
        alpha: Math.random() * 0.4 + 0.2,
      });
    }

    let mouse = { x: -1000, y: -1000, radius: 140 };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Connect particles
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Move
        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0) p1.x = width;
        if (p1.x > width) p1.x = 0;
        if (p1.y < 0) p1.y = height;
        if (p1.y > height) p1.y = 0;

        // Mouse interaction
        const dxM = mouse.x - p1.x;
        const dyM = mouse.y - p1.y;
        const distM = Math.sqrt(dxM * dxM + dyM * dyM);
        if (distM < mouse.radius) {
          const force = (mouse.radius - distM) / mouse.radius;
          p1.x -= (dxM / distM) * force * 2;
          p1.y -= (dyM / distM) * force * 2;
        }

        // Draw particle
        const c = p1.colorType === "primary"
          ? `${currentPalette.r}, ${currentPalette.g}, ${currentPalette.b}`
          : `${currentPalette.secR}, ${currentPalette.secG}, ${currentPalette.secB}`;

        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${c}, ${p1.alpha})`;
        ctx.fill();

        // Connect with nearby
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 115) {
            const lineAlpha = (1 - dist / 115) * 0.18;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${c}, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
      aria-hidden="true"
    />
  );
}
