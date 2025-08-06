import { handleAmt } from "../../../helper/helper";

function PlayerCard({ player }) {
  return (
    <div className="w-full lg:w-[50%] text-white flex flex-col gap-4">
      <div className="w-full h-[350px] sm:h-[450px] md:h-[600px] overflow-hidden rounded-lg">
        <img
          src={player?.player_logo}
          alt="Player"
          className="w-full h-full object-cover rounded-md"
        />
      </div>

      <div className="p-4 bg-black">
        <p className="text-xl md:text-2xl lg:text-3xl font-semibold text-center">
          Base Price:{" "}
          <span className="text-orange-500">
            {handleAmt(player?.minimum_bid) || "0"}
          </span>
        </p>
      </div>

      <div className="p-4 bg-black rounded-lg shadow-md">
        <h2 className="text-2xl md:text-3xl font-medium mb-4 text-center">
          Player Details
        </h2>
        <div className="space-y-2">
          <p className="text-lg md:text-xl">
            Name :- {player?.player_name || "N/A"}
          </p>
          <p className="text-lg md:text-xl">
            Sports category :- {player?.category || "-"}
          </p>
          <p className="text-lg md:text-xl">
            Contact :- {"+91 " + player?.phone || "-"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PlayerCard;
