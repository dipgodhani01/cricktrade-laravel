import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Formfields from "../../common/Formfields";
import { addPlayer } from "../../../data/allMapingData";
import { toast } from "react-toastify";
import { initialPlayerData } from "../../../data/initialState";
import { getPlayerById, updatePlayer } from "../../../redux/slice/playerSlice";
import Loader3 from "../../common/Loader3";

function EditPlayer() {
  const [formData, setFormData] = useState(initialPlayerData);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState({});
  const { playerId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedPlayer, loading } = useSelector((state) => state.players);

  useEffect(() => {
    dispatch(getPlayerById(playerId));
  }, [playerId, dispatch]);

  useEffect(() => {
    if (selectedPlayer) {
      setFormData({
        playerPhoto: null,
        playerName: selectedPlayer?.player_name || "",
        sportCategory: selectedPlayer?.category || "",
        phone: selectedPlayer?.phone || "",
        tshirtSize: selectedPlayer?.tshirt_size || "",
        trouserSize: selectedPlayer?.trouser_size || "",
        tshirtName: selectedPlayer?.tshirt_name || "",
        tshirtNumber: selectedPlayer?.tshirt_number || "",
      });

      setImagePreview(selectedPlayer?.player_logo || null);
    }
  }, [selectedPlayer]);

  const onChangeField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (field === "playerPhoto" && value instanceof File) {
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
        key !== "playerPhoto" &&
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
      data.append("player_id", playerId);
      if (formData.logo) {
        data.append("player_logo", formData.playerPhoto);
      }
      data.append("_method", "PUT");
      data.append("player_name", formData.playerName);
      data.append("category", formData.sportCategory);
      data.append("phone", formData.phone);
      data.append("tshirt_size", formData.tshirtSize);
      data.append("trouser_size", formData.trouserSize);
      data.append("tshirt_name", formData.tshirtName);
      data.append("tshirt_number", formData.tshirtNumber);

      try {
        await dispatch(updatePlayer(data)).unwrap();
        toast.success("Player updated successfully!");
        navigate(-1);
      } catch (err) {
        toast.error(err);
      }
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Edit Player</h2>
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
          {addPlayer({ ...formData, error, onChangeField }).map((item) => (
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
        <div className="mt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            {!loading ? "Update Player" : <Loader3 />}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditPlayer;
