"use client";
import { useRef, useState, type ReactNode, type CSSProperties } from "react";

export default function Card3D({ children, style = {}, intensity = 10 }: { children: ReactNode; style?: CSSProperties; intensity?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [rot, setRot] = useState({ x: 0, y: 0 });
  const [hov, setHov] = useState(false);
  const [shine, setShine] = useState({ x: 50, y: 50 });
  const onMove = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width;
    const ny = (e.clientY - r.top) / r.height;
    setRot({ x: (ny - 0.5) * -intensity, y: (nx - 0.5) * intensity });
    setShine({ x: nx * 100, y: ny * 100 });
  };
  return (
    <div ref={ref} onMouseMove={onMove} onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setHov(false); setRot({ x: 0, y: 0 }); }}
      style={{
        ...style, position: "relative", overflow: "hidden",
        transform: `perspective(1000px) rotateX(${rot.x}deg) rotateY(${rot.y}deg) scale(${hov ? 1.03 : 1})`,
        transition: hov ? "transform .08s linear" : "transform .6s cubic-bezier(.23,1,.32,1)",
        willChange: "transform",
      }}>
      {hov && <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(255,255,255,0.07) 0%, transparent 60%)`, pointerEvents: "none", zIndex: 1, borderRadius: "inherit" }} />}
      <div style={{ position: "relative", zIndex: 2 }}>{children}</div>
    </div>
  );
}
