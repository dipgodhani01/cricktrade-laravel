import React from "react";
import firecrackersIcon from "../../assets/firecrackers.gif";
function CelebrationScreen() {
  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center h-screen w-full">
      <img
        src={firecrackersIcon}
        alt="Celebration"
        className="w-full h-full object-cover"
      />
    </div>
  );
}

export default CelebrationScreen;
