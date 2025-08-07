import React from "react";
import { summaryPlayerTableHeader } from "../../../data/allMapingData";
import Thead from "../../common/Thead";
import { handleAmt } from "../../../helper/helper";
import { tr } from "../../../helper/style";

function PlayerTable({ filteredPlayers }) {
  return (
    <table className="w-full min-w-[1200px] border-collapse">
      <Thead data={summaryPlayerTableHeader} />
      <tbody>
        {filteredPlayers.map((player) => (
          <tr key={player.id}>
            <td className={tr}>{player.index}</td>
            <td className={tr}>
              <img
                src={player.player_logo}
                className="w-16 h-14 object-cover rounded mx-auto"
              />
            </td>
            <td className={tr}>{player.player_name}</td>
            <td className={tr}>{player.category}</td>
            <td className={tr}>{player.status}</td>
            <td className={tr}>{player.sold_team}</td>
            <td className={tr}>{handleAmt(player.final_bid)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default PlayerTable;
