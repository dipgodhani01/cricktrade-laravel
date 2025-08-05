import axios from "axios";

const token = localStorage.getItem("cricktrade-usertoken");

const api = axios.create({
  baseURL: `http://localhost:8000`,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const googleAuth = (code) => api.get(`/auth/google-login?code=${code}`);

// Auction
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
  return api.post(`/api/auction/update`, formData);
};

// Player
export const createPlayerApi = (formData) =>
  api.post("/api/player/create-player", formData);
export const getAllPlayersApi = (auction_id) =>
  api.get(`/api/player/get/all?auction_id=${auction_id}`);
export const getPlayersByTeamApi = (team_id) =>
  api.get(`/api/player/get-by-team?team_id=${team_id}`);
export const getPlayerByIdApi = (playerId) => {
  return api.get(`/api/player/get-one/${playerId}`);
};
export const updatePlayerApi = (formData) => {
  return api.post(`/api/player/update`, formData);
};
export const updateMinimumBidApi = (formData) => {
  return api.post(`/api/player/update/minimum_bid?playerId`, formData);
};
export const deletePlayerApi = (playerId) => {
  return api.delete(`/api/player/delete/${playerId}`);
};
export const soldPlayerApi = (formData) => {
  return api.post(`/api/auction/sold-player`, formData);
};
export const unsoldPlayerApi = (formData) => {
  return api.post(`/api/auction/unsold-player`, formData);
};
export const unsoldToSoldPlayerApi = (auction_id) => {
  return api.post(`/api/auction/unsold-to-sold?auction_id=${auction_id}`);
};

// Team
export const createTeamApi = (formData) =>
  api.post("/api/team/create-team", formData);
export const getAllTeamsApi = (auction_id) =>
  api.get(`/api/team/get/all?auction_id=${auction_id}`);
export const getTeamByIdApi = (teamId) => {
  return api.get(`/api/team/get-one/${teamId}`);
};
export const updateTeamApi = (formData) => {
  return api.post(`/api/team/update`, formData);
};
export const deleteTeamApi = (teamId) => {
 return api.delete(`/api/team/delete/${teamId}`);
};
