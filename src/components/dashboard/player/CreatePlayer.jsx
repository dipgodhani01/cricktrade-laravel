import { useNavigate, useParams } from "react-router-dom";
import { addPlayer } from "../../../data/allMapingData";
import Formfields from "../../common/Formfields";
import { useState } from "react";
import { createPlayer } from "../../../redux/slice/playerSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { initialPlayerData } from "../../../data/initialState";
import { EnglishConstant } from "../../../messages/message";
import SubmitButton from "../../common/SubmitButton";
import Chakra from "../../common/Chakra";

function CreatePlayer() {
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
  const navigate = useNavigate();
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
          Create Players
        </h2>
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
          {!playerLoading ? (
            <SubmitButton green={false} title="Create Player" />
          ) : (
            <Chakra />
          )}
        </form>
      </div>
    </div>
  );
}

export default CreatePlayer;
