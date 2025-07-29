import axios from "axios";

const token = localStorage.getItem("cricktrade-usertoken");

const api = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const googleAuth = (code) => api.get(`/auth/google-login?code=${code}`);

export const createAuctionApi = (formData) =>
  api.post("/api/auction/create-auction", formData);
