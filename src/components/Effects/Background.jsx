import { useEffect, useRef } from 'react';
import './Background.css';

export default function Background() {
  const canvasRef = useRef(null);
  const animRef   = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    let W = 0, H = 0;

    const resize = () => {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Particles
    const PARTICLES = [];
    const COUNT = 45;
    const rand = (a, b) => a + Math.random() * (b - a);

    class Particle {
      constructor() { this.reset(true); }
      reset(init = false) {
        this.x  = rand(0, W);
        this.y  = init ? rand(0, H) : H + 10;
        this.vx = rand(-0.12, 0.12);
        this.vy = rand(-0.35, -0.08);
        this.r  = rand(0.8, 2.2);
        this.a  = rand(0.06, 0.35);
        this.da = rand(-0.0015, 0.0015);
        this.hue = rand(195, 250);
      }
      update() {
        this.x += this.vx; this.y += this.vy;
        this.a += this.da;
        if (this.a < 0.04 || this.a > 0.4) this.da *= -1;
        if (this.y < -10) this.reset();
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue},70%,75%,${this.a})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < COUNT; i++) PARTICLES.push(new Particle());

    let t = 0;
    const tick = () => {
      ctx.clearRect(0, 0, W, H);
      t += 0.0025;

      // Animated blobs — Sonoma-inspired color palette
      const blobs = [
        { cx: W*(0.18+0.06*Math.sin(t*0.9)),  cy: H*(0.35+0.05*Math.cos(t*0.7)),  r: W*0.38, c:[20,60,180],  a:0.13 },
        { cx: W*(0.72+0.05*Math.cos(t*1.1)),  cy: H*(0.25+0.06*Math.sin(t*1.3)),  r: W*0.30, c:[100,30,170], a:0.10 },
        { cx: W*(0.50+0.04*Math.sin(t*0.7)),  cy: H*(0.68+0.04*Math.cos(t*0.9)),  r: W*0.26, c:[0,110,90],   a:0.08 },
        { cx: W*(0.85+0.04*Math.cos(t*1.4)),  cy: H*(0.55+0.05*Math.sin(t*0.6)),  r: W*0.22, c:[180,50,80],  a:0.07 },
      ];

      blobs.forEach(b => {
        const g = ctx.createRadialGradient(b.cx, b.cy, 0, b.cx, b.cy, b.r);
        g.addColorStop(0,   `rgba(${b.c[0]},${b.c[1]},${b.c[2]},${b.a})`);
        g.addColorStop(0.5, `rgba(${b.c[0]},${b.c[1]},${b.c[2]},${b.a*0.4})`);
        g.addColorStop(1,   `rgba(${b.c[0]},${b.c[1]},${b.c[2]},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      });

      // Subtle noise overlay via scanlines
      for (let y = 0; y < H; y += 3) {
        ctx.fillStyle = `rgba(0,0,0,0.012)`;
        ctx.fillRect(0, y, W, 1);
      }

      // Particles & connections
      for (let i = 0; i < PARTICLES.length; i++) {
        PARTICLES[i].update();
        PARTICLES[i].draw();
        for (let j = i + 1; j < PARTICLES.length; j++) {
          const dx = PARTICLES[i].x - PARTICLES[j].x;
          const dy = PARTICLES[i].y - PARTICLES[j].y;
          const d  = Math.sqrt(dx*dx + dy*dy);
          if (d < 80) {
            ctx.beginPath();
            ctx.moveTo(PARTICLES[i].x, PARTICLES[i].y);
            ctx.lineTo(PARTICLES[j].x, PARTICLES[j].y);
            ctx.strokeStyle = `rgba(120,170,255,${0.05*(1-d/80)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animRef.current = requestAnimationFrame(tick);
    };

    tick();
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <>
      {/* Sonoma base wallpaper via CSS — deep space gradient */}
      <div className="wallpaper" />
      {/* Animated canvas layer on top */}
      <canvas ref={canvasRef} className="wallpaper-canvas" />
    </>
  );
}
