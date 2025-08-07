import { handleAmt } from "../../../helper/helper";
import { mdText } from "../../../helper/style";

function PlayerCard({ player }) {
  return (
    <div className="w-full lg:w-[50%] text-white bg-black/30 rounded-lg flex flex-col gap-4 p-4">
      <div className="w-full h-[400px] sm:h-[500px] md:h-[650px] overflow-hidden rounded-lg">
        <img
          src={player?.player_logo}
          alt="Player"
          className="w-full h-full object-fill rounded-md"
        />
      </div>

      <div className="p-4 rounded-lg shadow-md text-center">
        <div className="space-y-3">
          <p className={mdText}>Name : {player?.player_name || "N/A"}</p>
          <p className={mdText}>Sports category : {player?.category || "-"}</p>
          <p className={mdText}>
            Base Price :{" "}
            <span className="text-orange-400">
              {handleAmt(player?.minimum_bid) || "0"}
            </span>
          </p>
          <p className={mdText}>Contact : {"+91 " + player?.phone || "-"}</p>
        </div>
      </div>
    </div>
  );
}

export default PlayerCard;
