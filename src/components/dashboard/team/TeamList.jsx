import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { teamListTableHeader } from "../../../data/allMapingData";
import { useNavigate, useParams } from "react-router-dom";
import Loader2 from "../../common/Loader2";
import { MdDelete, MdEdit } from "react-icons/md";
import { deleteTeam, getAllTeams } from "../../../redux/slice/teamSlice";
import { actBtn, th, tr, trImg } from "../../../helper/style";
import Thead from "../../common/Thead";
import DeletePopup from "../../common/DeletePopup";

function TeamList() {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedTeamId, setSelectedTeamId] = useState("");
  const { teams, teamLoading } = useSelector((state) => state.teams);
  const { auctionId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function confirmDelete(teamId) {
    setSelectedTeamId(teamId);
    setShowConfirmModal(true);
  }

  function handleDeleteTeamConfirmed() {
    if (selectedTeamId) {
      dispatch(deleteTeam({ teamId: selectedTeamId }));
      setShowConfirmModal(false);
      setSelectedTeamId("");
    }
  }

  useEffect(() => {
    dispatch(getAllTeams(auctionId));
  }, []);

  return (
    <div>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-2xl font-medium text-center mb-4">
          All Teams List
        </h2>
        <button
          className="bg-green-700 block text-white px-4 py-2 mt-4 rounded mx-auto"
          onClick={() => navigate(`/create-team/${auctionId}`)}
        >
          + Add Team
        </button>
        <br />
        {teamLoading ? (
          <Loader2 />
        ) : (
          <div className="mt-4 overflow-x-auto table-responsive">
            {teams && teams.length > 0 ? (
              <table className="border-collapse w-full border mb-3 md:w-[600px] border-black">
                <Thead data={teamListTableHeader} />
                <tbody>
                  {teams.map((data) => {
                    return (
                      <tr key={data.id}>
                        <td className="border border-gray-200 px-4 py-2">
                          <div className="flex gap-2 text-blue-800">
                            <button
                              className={actBtn}
                              onClick={() => navigate(`/edit-team/${data.id}`)}
                              title="Edit Team"
                            >
                              <MdEdit size={20} />
                            </button>
                            <button
                              className={actBtn}
                              onClick={() => confirmDelete(data.id)}
                              title="Delete Team"
                            >
                              <MdDelete size={20} />
                            </button>
                          </div>
                        </td>
                        <td className={tr}>
                          <img src={data?.team_logo} className={trImg} />
                        </td>
                        <td className={tr}>{data.team_name}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div className="p-4 text-center text-red-600 text-xl md:text-2xl font-medium">
                No Teams Available
              </div>
            )}
          </div>
        )}
      </div>

      {showConfirmModal && (
        <DeletePopup
          title="Are you sure you want to delete this team?"
          handleDeleteConfirmed={handleDeleteTeamConfirmed}
          setShowConfirmModal={setShowConfirmModal}
        />
      )}
    </div>
  );
}

export default TeamList;
