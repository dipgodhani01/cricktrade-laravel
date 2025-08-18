import { summaryTeamTableHeader } from "../../../data/allMapingData";
import Thead from "../../common/Thead";
import { getPlayersByTeam } from "../../../redux/slice/playerSlice";
import { useDispatch } from "react-redux";
import { handleAmt } from "../../../helper/helper";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { tr } from "../../../helper/style";

function TeamTable({ filteredTeams }) {
  const dispatch = useDispatch();
  return (
    <table className="w-full min-w-[1200px] border-collapse mt-4">
      <Thead data={summaryTeamTableHeader} />
      <tbody>
        {filteredTeams.map((team, i) => (
          <tr
            key={team.id}
            className="hover:bg-[#ffe1e1] cursor-pointer"
            onClick={() => dispatch(getPlayersByTeam(team.id))}
          >
            <td className={tr}>{i + 1}</td>
            <td className={tr}>
              <img
                src={team.team_logo}
                alt={`${team.team_name} logo`}
                className="w-16 h-14 object-cover rounded mx-auto"
              />
            </td>
            <td className={`${tr} font-medium`}>{team.team_name}</td>
            <td className={tr}>{team.player_buy}</td>
            <td className={tr}>{team.player_remember}</td>
            <td className={tr}>{handleAmt(team.team_balance)}</td>
            <td className={tr}>{handleAmt(team.remember_balance)}</td>
            <td className={tr}>{handleAmt(team.reserve_balance)}</td>
            <td className={tr}>
              {handleAmt(team.remember_balance - team.reserve_balance)}
            </td>
            <td
              className={`${tr} ${
                team.status === 1 ? "text-green-700" : "text-orange-500"
              } font-medium`}
            >
              {team.status === 1 ? "Completed" : "Pending"}
            </td>
            <td className="border border-[#3f230575] px-4 py-2 text-blue-500 hover:text-blue-700">
              <button className="flex items-center justify-center w-full h-full">
                <FaCloudDownloadAlt size={24} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TeamTable;
