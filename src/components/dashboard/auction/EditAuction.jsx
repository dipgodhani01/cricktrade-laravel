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
import { initialAuctionData } from "../../../data/initialState";
import { EnglishConstant } from "../../../messages/message";
import Loader3 from "../../common/Loader3";
import SubmitButton from "../../common/SubmitButton";

function EditAuction() {
  const [formData, setFormData] = useState(initialAuctionData);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState({});
  const { auctionId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedAuction, auctionLoading } = useSelector(
    (state) => state.auctions
  );

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

    const today = new Date();
    const auctionDate = new Date(formData.date);
    today.setHours(0, 0, 0, 0);

    if (auctionDate <= today) {
      setError((prev) => ({
        ...prev,
        date: "Auction cannot be scheduled for today or a past date.",
      }));
      return;
    }

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
        <SubmitButton
          green={true}
          title={!auctionLoading ? "Update Auction" : <Loader3 />}
        />
      </form>
    </div>
  );
}

export default EditAuction;
