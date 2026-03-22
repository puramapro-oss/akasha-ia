export default function GridBg() {
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(0,212,255,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,255,0.035) 1px,transparent 1px)",
        backgroundSize: "64px 64px",
        maskImage: "radial-gradient(ellipse 90% 70% at 50% 50%,black 30%,transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 90% 70% at 50% 50%,black 30%,transparent 100%)",
      }} />
    </div>
  );
}
