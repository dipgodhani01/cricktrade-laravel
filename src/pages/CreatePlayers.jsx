import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { initialPlayerData } from "../data/initialState";
import { createPlayer } from "../redux/slice/playerSlice";
import Formfields from "../components/common/Formfields";
import { addPlayer } from "../data/allMapingData";
import SubmitButton from "../components/common/SubmitButton";
import { EnglishConstant } from "../messages/message";
import Chakra from "../components/common/Chakra";

function CreatePlayers() {
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState(initialPlayerData);
  const [error, setError] = useState(
    Object.keys(initialPlayerData).reduce((acc, key) => {
      acc[key] = "";
      return acc;
    }, {})
  );
  const { auctionId } = useParams();
  const dispatch = useDispatch();

  const { playerLoading } = useSelector((state) => state.players);

  const onChangeField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (field === "playerPhoto" && value instanceof File) {
      setImagePreview(URL.createObjectURL(value));
    }

    if ((value === "" || value === null) && field !== "trouserSize") {
      setError((prev) => ({
        ...prev,
        [field]: EnglishConstant[field] || "Required!",
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
        (formData[key] === "" || formData[key] === null) &&
        key !== "trouserSize"
      ) {
        newError[key] = EnglishConstant[key] || "Required!";
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
        setFormData(initialPlayerData);
        setImagePreview(null);
        setError(
          Object.keys(initialPlayerData).reduce((acc, key) => {
            acc[key] = "";
            return acc;
          }, {})
        );
        toast.success("Player created successfully!");
      } catch (err) {
        toast.error(err);
      }
    }
  };

  return (
    <div className="p-4 bg-white rounded container mx-auto">
      <form
        onSubmit={onFormSubmit}
        className="p-6 border shadow lg:w-[70%] mx-auto"
      >
        <h2 className="text-2xl font-medium">Add Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
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
        <SubmitButton
          green={false}
          title={!playerLoading ? "Add Player" : <Chakra />}
        />
      </form>
    </div>
  );
}

export default CreatePlayers;
