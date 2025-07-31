import { useState } from "react";
import { addAuction } from "../../../data/allMapingData";
import Formfields from "../../common/Formfields";
import { EnglishConstant } from "../../../messages/message";
import { useDispatch, useSelector } from "react-redux";
import { createAuction } from "../../../redux/slice/auctionSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { initialAuctionData } from "../../../data/initialState";

function CreateAuction() {
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState(initialAuctionData);
  const user_id = useSelector((state) => state.user.user.user_id);
  const { loading } = useSelector((state) => state.auctions);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState(
    Object.keys(initialAuctionData).reduce((acc, key) => {
      acc[key] = "";
      return acc;
    }, {})
  );

  const onChangeField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (field === "logo" && value instanceof File) {
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
      data.append("user_id", user_id);
      data.append("auction_logo", formData.logo);
      data.append("auction_name", formData.name);
      data.append("auction_date", formData.date);
      data.append("sports_type", formData.typeOfSports);
      data.append("point_perteam", formData.pointPerTeam);
      data.append("minimum_bid", formData.minimumBid);
      data.append("bid_increment", formData.bidIncrement);
      data.append("player_perteam", formData.playersPerTeam);

      try {
        await dispatch(createAuction(data)).unwrap();
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
          {addAuction({ ...formData, error, onChangeField }).map((item) => (
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
            {!loading ? (
              "Add Auction"
            ) : (
              <div className="text-white flex justify-center items-center font-medium text-xl">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                &nbsp;
              </div>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateAuction;
