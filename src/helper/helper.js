export const formatDate = (isoDate) => {
    if(!isoDate) return null;
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export function handleAmt(price) {
  const number = Number(price);
  if (isNaN(number)) return String(price);
  return number.toLocaleString("en-IN").toString();
}


export const filterTeams = (teams, searchTerm) => {
  if (!searchTerm.trim()) return teams || [];
  const lowerSearch = searchTerm.toLowerCase();
  return teams?.filter((team) =>
    team.team_name.toLowerCase().includes(lowerSearch)
  );
};

export const filterPlayers = (players, searchTerm) => {
  if (!searchTerm.trim()) return players || [];
  const lowerSearch = searchTerm.toLowerCase();
  return players?.filter((player) =>
    player.player_name.toLowerCase().includes(lowerSearch)
  );
};