function CountdownTimer() {
  return (
    <div className="relative w-[200px] h-[200px] rounded-full overflow-hidden bg-[radial-gradient(circle,rgba(255,255,255,0.05)_30%,transparent_70%)]">
      <div className="absolute inset-0 rounded-full border-t-[4px] border-t-white/60 border-transparent animate-spin"></div>

      <div
        className="absolute inset-[10%] rounded-full animate-[spinReverse_1.5s_linear_infinite] blur-[2px]"
        style={{
          background:
            "conic-gradient(from 90deg, rgba(255,255,255,0.2), transparent)",
        }}
      ></div>

      <div className="absolute top-1/2 left-1/2 w-[30px] h-[30px] bg-white/90 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.6)] animate-pulseDot"></div>

      <div className="absolute top-0 left-0 w-full h-full animate-orbitRotate">
        <div
          className="absolute top-1/2 left-1/2 w-2 h-2 bg-white/80 rounded-full"
          style={{ transform: "rotate(0deg) translate(60px)" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-2 h-2 bg-white/80 rounded-full"
          style={{ transform: "rotate(90deg) translate(60px)" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-2 h-2 bg-white/80 rounded-full"
          style={{ transform: "rotate(180deg) translate(60px)" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-2 h-2 bg-white/80 rounded-full"
          style={{ transform: "rotate(270deg) translate(60px)" }}
        ></div>
      </div>
    </div>
  );
}

export default CountdownTimer;
