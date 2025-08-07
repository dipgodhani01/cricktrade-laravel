function SummaryHead({ name, logo, totalTeams }) {
  return (
    <div className="gap-6 bg-[#FFEDC6] shadow-md rounded-2xl p-6 mb-6 text-[#A40000]">
      <div className="text-center text-lg md:text-2xl lg:text-2xl font-medium flex flex-col justify-center gap-2">
        <img
          src={logo}
          alt="Auction Logo"
          className="h-[100px] md:h-[140px] w-auto object-contain rounded-xl"
          loading="lazy"
        />
        <div>
          <p>{name}</p>
          <p className="text-base md:text-lg text-[#df4f4f]">
            A total of {totalTeams} teams have participated in this auction.
          </p>
        </div>
      </div>
    </div>
  );
}

export default SummaryHead;
