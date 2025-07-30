import axios from "axios";

const token = localStorage.getItem("cricktrade-usertoken");

const api = axios.create({
  baseURL: `http://localhost:8000`,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const googleAuth = (code) => api.get(`/auth/google-login?code=${code}`);

export const createAuctionApi = (formData) =>
  api.post("/api/auction/create-auction", formData);

export const getUserAuctionsApi = (user_id) =>
  api.get(`/api/auction/get/all?user_id=${user_id}`);

export const getAuctionByIdApi = (auctionId) => {
  return api.get(`/api/auction/get-one/${auctionId}`);
};
export const deleteAuctionApi = (auctionId) => {
  return api.delete(`/api/auction/delete/${auctionId}`);
};
export const updateAuctionApi = (formData) => {
  return api.post(`/api/auction/update`,formData);
};

export const createPlayerApi = (formData) =>
  api.post("/api/player/create-player", formData);