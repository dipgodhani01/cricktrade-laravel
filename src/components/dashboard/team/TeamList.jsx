import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { teamListTableHeader } from "../../../data/allMapingData";
import { useNavigate, useParams } from "react-router-dom";
import Loader2 from "../../common/Loader2";
import { MdDelete, MdEdit } from "react-icons/md";
import { deleteTeam, getAllTeams } from "../../../redux/slice/teamSlice";

function TeamList() {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedTeamId, setSelectedTeamId] = useState("");
  const { teams, loading } = useSelector((state) => state.teams);
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
        {loading ? (
          <Loader2 />
        ) : (
          <div className="mt-4 overflow-x-auto table-responsive">
            {teams && teams.length > 0 ? (
              <table className="border-collapse w-full border mb-3 md:w-[600px] border-black">
                <thead className="bg-gray-100">
                  <tr>
                    {teamListTableHeader?.map((li, i) => {
                      return (
                        <th
                          key={i}
                          className="border border-gray-200 px-4 py-2 text-left"
                        >
                          {li}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {teams.map((data) => {
                    return (
                      <tr key={data.id}>
                        <td className="border border-gray-200 px-4 py-2">
                          <div className="flex gap-2 text-blue-800">
                            <button
                              className="bg-gray-100 hover:bg-gray-200 transition h-8 w-8 flex items-center justify-center rounded-full"
                              onClick={() => navigate(`/edit-team/${data.id}`)}
                              title="Edit Player"
                            >
                              <MdEdit size={20} />
                            </button>
                            <button
                              className="bg-gray-100 hover:bg-gray-200 transition h-8 w-8 flex items-center justify-center rounded-full"
                              onClick={() => confirmDelete(data.id)}
                              title="Delete Player"
                            >
                              <MdDelete size={20} />
                            </button>
                          </div>
                        </td>
                        <td className="border border-gray-200 px-4 py-2">
                          <img
                            src={data?.team_logo}
                            alt="logo"
                            className="w-16 h-12 object-cover rounded"
                          />
                        </td>
                        <td className="border border-gray-200 px-4 py-2">
                          {data.team_name}
                        </td>
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md text-center w-[90%] max-w-md">
            <h3 className="text-2xl font-medium mb-4">
              Are you sure you want to delete this team?
            </h3>
            <div className="flex justify-end gap-4 pt-2">
              <button
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 min-w-20 rounded"
                onClick={handleDeleteTeamConfirmed}
              >
                Yes
              </button>
              <button
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 min-w-20 rounded"
                onClick={() => setShowConfirmModal(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeamList;
