function Loader3D({ transparent }) {
  const bg = transparent ? "bg-transparent" : "bg-[#FAF4E1]";
  const txt = transparent ? "text-white" : "text-[#8E0505]";
  return (
    <div className={`flex justify-center items-center h-full p-4 ${bg}`}>
      <div className="relative flex justify-center items-center w-[120px] h-[120px]">
        <div className="absolute w-[140px] h-[140px] border border-transparent rounded-full border-b-[6px] border-b-pink-400 animate-[rotate1_2s_linear_infinite]"></div>
        <div className="absolute w-[140px] h-[140px] border border-transparent rounded-full border-b-[6px] border-b-rose-500 animate-[rotate2_2s_linear_infinite]"></div>
        <div className="absolute w-[140px] h-[140px] border border-transparent rounded-full border-b-[6px] border-b-cyan-400 animate-[rotate3_2s_linear_infinite]"></div>
        <div className="absolute w-[140px] h-[140px] border border-transparent rounded-full border-b-[6px] border-b-yellow-400 animate-[rotate4_2s_linear_infinite]"></div>
        {/* <div className={`${txt} text-xl absolute`}>loading</div> */}
      </div>
    </div>
  );
}

export default Loader3D;
