import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getAuctionById,
  updateAuction,
} from "../../../redux/slice/auctionSlice";
import Formfields from "../../common/Formfields";
import { addAuction } from "../../../data/allMapingData";
import { toast } from "react-toastify";

function EditAuction() {
  const [formData, setFormData] = useState({
    logo: null,
    name: "",
    date: "",
    typeOfSports: "",
    pointPerTeam: "",
    minimumBid: "",
    bidIncrement: "",
    playersPerTeam: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState({});
  const { auctionId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedAuction } = useSelector((state) => state.auctions);

  useEffect(() => {
    dispatch(getAuctionById(auctionId));
  }, [auctionId, dispatch]);

  useEffect(() => {
    if (selectedAuction) {
      setFormData({
        logo: null,
        name: selectedAuction?.auction_name || "",
        date: selectedAuction?.auction_date || "",
        typeOfSports: selectedAuction?.sports_type || "",
        pointPerTeam: selectedAuction?.point_perteam || "",
        minimumBid: selectedAuction?.minimum_bid || "",
        bidIncrement: selectedAuction?.bid_increment || "",
        playersPerTeam: selectedAuction?.player_perteam || "",
      });

      setImagePreview(selectedAuction?.auction_logo || null);
    }
  }, [selectedAuction]);

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
      if (key !== "logo" && (formData[key] === "" || formData[key] === null)) {
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
      if (formData.logo) {
        data.append("auction_logo", formData.logo);
      }
      data.append("_method", "PUT");
      data.append("auction_name", formData.name);
      data.append("auction_date", formData.date);
      data.append("sports_type", formData.typeOfSports);
      data.append("point_perteam", formData.pointPerTeam);
      data.append("minimum_bid", formData.minimumBid);
      data.append("bid_increment", formData.bidIncrement);
      data.append("player_perteam", formData.playersPerTeam);

      try {
        await dispatch(updateAuction(data)).unwrap();
        toast.success("Auction updated successfully!");
        navigate(-1);
      } catch (err) {
        console.log(err);

        toast.error(err);
      }
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Edit Auction</h2>
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
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Update Auction
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditAuction;
