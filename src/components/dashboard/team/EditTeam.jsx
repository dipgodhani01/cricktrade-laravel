import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTeamById, updateTeam } from "../../../redux/slice/teamSlice";
import { useNavigate, useParams } from "react-router-dom";
import { EnglishConstant } from "../../../messages/message";
import { toast } from "react-toastify";
import { addTeam } from "../../../data/allMapingData";
import Formfields from "../../common/Formfields";
import SubmitButton from "../../common/SubmitButton";
import Chakra from "../../common/Chakra";

function EditTeam() {
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    teamPhoto: null,
    teamName: "",
  });
  const [error, setError] = useState({
    teamPhoto: null,
    teamName: "",
  });
  const { teamId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedTeam, teamLoading } = useSelector((state) => state.teams);

  useEffect(() => {
    dispatch(getTeamById(teamId));
  }, [teamId, dispatch]);

  useEffect(() => {
    if (selectedTeam) {
      setFormData({
        teamPhoto: null,
        teamName: selectedTeam?.team_name || "",
      });

      setImagePreview(selectedTeam?.team_logo || null);
    }
  }, [selectedTeam]);

  const onChangeField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (field === "teamPhoto" && value instanceof File) {
      setImagePreview(URL.createObjectURL(value));
    }

    if (value === "" || value === null) {
      setError((prev) => ({
        ...prev,
        [field]: EnglishConstant[field] || "Required",
      }));
    } else {
      setError((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();

    const newError = {};
    let hasError = false;

    Object.keys(formData).forEach((key) => {
      if (
        key !== "teamPhoto" &&
        (formData[key] === "" || formData[key] === null)
      ) {
        newError[key] = EnglishConstant[key] || "Required";
        hasError = true;
      } else {
        newError[key] = "";
      }
    });

    setError(newError);

    if (!hasError) {
      const data = new FormData();
      data.append("team_id", teamId);
      if (formData.teamPhoto) {
        data.append("team_logo", formData.teamPhoto);
      }
      data.append("_method", "PUT");
      data.append("team_name", formData.teamName);

      try {
        await dispatch(updateTeam(data)).unwrap();
        toast.success("Team updated successfully!");
        navigate(-1);
      } catch (err) {
        toast.error(err);
      }
    }
  };

  return (
    <div className="bg-[#FAF4E1] p-4 min-h-[calc(100vh-65px)]">
      <div className="p-4 md:p-12 flex items-center justify-center flex-col bg-[#FAF0E6] w-fit mx-auto shadow-lg">
        <h2 className="text-2xl md:text-3xl font-medium md:mb-12 mb-2 text-[#8E0505]">
          Edit Teams
        </h2>
        <form onSubmit={onFormSubmit}>
          <div className="grid grid-cols-1">
            {imagePreview && (
              <div className="mb-4">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-38 h-28 object-cover border rounded"
                />
              </div>
            )}
            {addTeam({ ...formData, error, onChangeField }).map((item) => (
              <Formfields
                key={item.id}
                type={item.type}
                label={item.label}
                placeholder={item.placeholder}
                options={item.options}
                name={item.name}
                value={
                  item.type === "file" ? undefined : formData[item.name] || ""
                }
                onChange={(e) =>
                  onChangeField(
                    item.name,
                    item.type === "file" ? e.target.files[0] : e.target.value
                  )
                }
                error={error[item.name]}
              />
            ))}
          </div>
          {!teamLoading ? (
            <SubmitButton green={true} title="Update Team" />
          ) : (
            <Chakra />
          )}
        </form>
      </div>
    </div>
  );
}

export default EditTeam;
