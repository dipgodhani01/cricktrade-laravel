// const handleTeamClick = (team) => {
//   if (!selectedAuction || !randomPlayer) return;

//   const requiredAmount =
//     Number(team.player_remember) * Number(selectedAuction.minimum_bid);

//   const remainingBalance = Number(team.team_balance) - requiredAmount;
//   const newBid = Number(currentBid) + Number(selectedAuction.bid_increment);

//   if (newBid > remainingBalance) {
//     toast.warn("Low balance. Unable to place bid.");
//     return;
//   }

//   setCurrentBid(newBid);
//   setSelectedTeam(team);
// };
