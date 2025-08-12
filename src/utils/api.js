import axios from "axios";

// Create Axios instance
const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});


// =================== Auth ===================

export const googleAuth = (code) =>
  api.get(`/api/auth/google-login?code=${code}`);
export const logoutApi = () => {
  return api.post(`/api/auth/logout`);
};
export const getUser = () => {
  return api.get(`/api/auth/user`);
};
// =================== Auction ===================

export const createAuctionApi = (formData) =>
  api.post("/api/auction/create-auction", formData);

export const getUserAuctionsApi = (user_id) =>
  api.get(`/api/auction/get/all?user_id=${user_id}`);

export const getAuctionByIdApi = (auctionId) =>
  api.get(`/api/auction/get-one/${auctionId}`);

export const deleteAuctionApi = (auctionId) =>
  api.delete(`/api/auction/delete/${auctionId}`);

export const updateAuctionApi = (formData) =>
  api.post(`/api/auction/update`, formData);

// =================== Player ===================

export const createPlayerApi = (formData) =>
  api.post("/api/player/create-player", formData);

export const getAllPlayersApi = (auction_id) =>
  api.get(`/api/player/get/all?auction_id=${auction_id}`);

export const getPlayersByTeamApi = (team_id) =>
  api.get(`/api/player/get-by-team?team_id=${team_id}`);

export const getPlayerByIdApi = (playerId) =>
  api.get(`/api/player/get-one/${playerId}`);

export const updatePlayerApi = (formData) =>
  api.post(`/api/player/update`, formData);

export const updateMinimumBidApi = (formData) =>
  api.post(`/api/player/update/minimum_bid`, formData);

export const deletePlayerApi = (playerId) =>
  api.delete(`/api/player/delete/${playerId}`);

export const soldPlayerApi = (formData) =>
  api.post(`/api/auction/sold-player`, formData);

export const unsoldPlayerApi = (formData) =>
  api.post(`/api/auction/unsold-player`, formData);

export const unsoldToSoldPlayerApi = (auction_id) =>
  api.post(`/api/auction/unsold-to-sold?auction_id=${auction_id}`);

// =================== Team ===================

export const createTeamApi = (formData) =>
  api.post("/api/team/create-team", formData);

export const getAllTeamsApi = (auction_id) =>
  api.get(`/api/team/get/all?auction_id=${auction_id}`);

export const getTeamByIdApi = (teamId) =>
  api.get(`/api/team/get-one/${teamId}`);

export const updateTeamApi = (formData) =>
  api.post(`/api/team/update`, formData);

export const deleteTeamApi = (teamId) =>
  api.delete(`/api/team/delete/${teamId}`);
