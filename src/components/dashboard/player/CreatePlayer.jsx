import { useParams } from "react-router-dom";
import { addPlayer } from "../../../data/allMapingData";
import Formfields from "../../common/Formfields";
import { useState } from "react";
import { EnglishConstant } from "../../../messages/message";
import { createPlayer } from "../../../redux/slice/playerSlice";
import { toast } from "react-toastify";

const initialFormData = {
  playerPhoto: null,
  playerName: "",
  sportCategory: "",
  phone: "",
  tshirtSize: "",
  trouserSize: "",
  tshirtName: "",
  tshirtNumber: "",
};

function CreatePlayer() {
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState(
    Object.keys(initialFormData).reduce((acc, key) => {
      acc[key] = "";
      return acc;
    }, {})
  );
  const { auctionId } = useParams();

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
    console.log(auctionId);

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
      data.append("player_logo", formData.playerPhoto);
      data.append("player_name", formData.playerName);
      data.append("category", formData.sportCategory);
      data.append("phone", formData.phone);
      data.append("tshirt_size", formData.tshirtSize);
      data.append("trouser_size", formData.trouserSize);
      data.append("tshirt_name", formData.tshirtName);
      data.append("tshirt_number", formData.tshirtNumber);

      try {
        await dispatch(createPlayer(data)).unwrap();
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
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Create Player
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatePlayer;
