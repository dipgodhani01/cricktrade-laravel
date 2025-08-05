import { useNavigate, useParams } from "react-router-dom";
import { addPlayer, addTeam } from "../../../data/allMapingData";
import Formfields from "../../common/Formfields";
import { useState } from "react";
import { createPlayer } from "../../../redux/slice/playerSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { EnglishConstant } from "../../../messages/message";
import Loader3 from "../../common/Loader3";
import { createTeam } from "../../../redux/slice/teamSlice";
import SubmitButton from "../../common/SubmitButton";

function CreateTeam() {
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    teamPhoto: null,
    teamName: "",
  });
  const [error, setError] = useState({
    teamPhoto: null,
    teamName: "",
  });
  const { auctionId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { teamLoading } = useSelector((state) => state.players);

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
      if (formData[key] === "" || formData[key] === null) {
        newError[key] = EnglishConstant[key] || "Required";
        hasError = true;
      } else {
        newError[key] = "";
      }
    });
    setError(newError);

    if (!hasError) {
      const data = new FormData();
      data.append("auction_id", auctionId);
      data.append("team_logo", formData.teamPhoto);
      data.append("team_name", formData.teamName);

      try {
        await dispatch(createTeam(data)).unwrap();
        navigate(-1);
      } catch (err) {
        toast.error(err);
      }
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <form onSubmit={onFormSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {imagePreview && (
            <div>
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
        <SubmitButton
          green={false}
          title={!teamLoading ? "Add Team" : <Loader3 />}
        />
      </form>
    </div>
  );
}

export default CreateTeam;
