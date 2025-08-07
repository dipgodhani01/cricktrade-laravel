import React from "react";

function Loader3D() {
  return (
    <div class="flex justify-center items-center h-full p-4 bg-[#3F0030]">
      <div class="relative flex justify-center items-center w-[120px] h-[120px]">
        <div class="absolute w-[140px] h-[140px] border border-transparent rounded-full border-b-[6px] border-b-pink-400 animate-[rotate1_2s_linear_infinite]"></div>
        <div class="absolute w-[140px] h-[140px] border border-transparent rounded-full border-b-[6px] border-b-rose-500 animate-[rotate2_2s_linear_infinite]"></div>
        <div class="absolute w-[140px] h-[140px] border border-transparent rounded-full border-b-[6px] border-b-cyan-400 animate-[rotate3_2s_linear_infinite]"></div>
        <div class="absolute w-[140px] h-[140px] border border-transparent rounded-full border-b-[6px] border-b-yellow-400 animate-[rotate4_2s_linear_infinite]"></div>
        <div class="text-white absolute">loading</div>
      </div>
    </div>
  );
}

export default Loader3D;
