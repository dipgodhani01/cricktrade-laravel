import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { teamListTableHeader } from "../../../data/allMapingData";
import { useNavigate, useParams } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";
import { deleteTeam, getAllTeams } from "../../../redux/slice/teamSlice";
import { actBtn, tr, trImg } from "../../../helper/style";
import Thead from "../../common/Thead";
import DeletePopup from "../../common/DeletePopup";
import { RxCross2 } from "react-icons/rx";
import { FaImage } from "react-icons/fa";
import Loader1 from "../../common/Loader1";

function TeamList() {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedTeamId, setSelectedTeamId] = useState("");
  const [imagePopupOpen, setImagePopupOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
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
      <div className="bg-[#FAF4E1] p-4 min-h-[calc(100vh-65px)] rounded shadow">
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
          <Loader1 />
        ) : (
          <div className="mt-4 overflow-x-auto table-responsive">
            {teams && teams.length > 0 ? (
              <table className="border-collapse w-full border mb-3 md:w-[600px] border-black">
                <Thead data={teamListTableHeader} />
                <tbody className="font-medium text-lg">
                  {teams.map((data) => {
                    return (
                      <tr key={data.id}>
                        <td className="border border-[#3f230575] px-4 py-2">
                          <div className="flex gap-2">
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
                            >
                              <MdDelete size={20} />
                            </button>
                            <button
                              className={actBtn}
                              title="View Team Logo"
                              onClick={() => {
                                setSelectedImage(data?.team_logo);
                                setImagePopupOpen(true);
                              }}
                            >
                              <FaImage size={16} />
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
      {imagePopupOpen && selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 transition-opacity duration-300"
          onClick={() => setImagePopupOpen(false)}
        >
          <div className="w-[90%] max-w-xl bg-transparent rounded-lg shadow-lg overflow-hidden p-4">
            <button
              onClick={() => setImagePopupOpen(false)}
              className="text-white bg-[#AA2B1D] hover:bg-red-700 w-10 h-10 rounded-full flex items-center justify-center text-xl p-2 ml-auto mb-2"
            >
              <RxCross2 />
            </button>
            <img
              src={selectedImage}
              alt="Auction Logo"
              className="w-full h-auto object-contain rounded"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default TeamList;
