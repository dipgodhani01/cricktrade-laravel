// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { getAllTeams } from "../../redux/slice/teamsSlice";
// import { getRandomPlayer } from "../../redux/slice/playerSlice";
// import Loader from "../common/Loader";

// function AuctionDashboard() {
//   const { auctionId } = useParams();
//   const dispatch = useDispatch();
//   const { teams, loading } = useSelector((state) => state.teams);
//   const { randomPlayer } = useSelector((state) => state.players);

//   useEffect(() => {
//     dispatch(getAllTeams(auctionId));
//     dispatch(getRandomPlayer(auctionId));
//   }, [auctionId]);

//   console.log(randomPlayer);

//   return (
//     <div>
//       {loading ? (
//         <Loader />
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 h-screen w-screen space_bg">
//           <div className="flex flex-col items-center justify-between">
//             <div>
//               <img
//                 src={randomPlayer?.logo}
//                 alt="Player Photo"
//                 className="h-full w-full object-contain"
//               />
//             </div>
//             <div>
//               <div className="flex flex-wrap justify-center gap-4 mt-6">
//                 {teams && teams?.length > 0 ? (
//                   teams?.map((team, i) => (
//                     <button
//                       key={i}
//                       className="py-2 px-6 w-[300px] bg-purple-800 text-white text-lg font-semibold rounded shadow hover:bg-purple-700 transition"
//                     >
//                       {team.name}
//                     </button>
//                   ))
//                 ) : (
//                   <p className="text-white text-lg mt-4">
//                     No player available.
//                   </p>
//                 )}
//               </div>
//               <div className="mt-4">
{
  /* sold button  */
}
{
  /* unsold button  */
}
{
  /* reset button  */
}
{
  /* next player (player always come to random flow)  */
}
{
  /* unsold players ko fir se auction me kese laye and usme bhi jo unsold ho usko fir se lana pade to kese laye unsold ki cycle unlimited honi  chahiye */
}
{
  /* kitni api hogi backend me kitna kam idhar front se hi hoga in sbka step by step code kar ke do */
}
{
  /* mene players,teams and auction ke saprate model create kar ke work kiya hai  */
}
//               </div>
//             </div>
//           </div>

//           <div className="flex items-center justify-center">
//             <div>{/* <img src="" alt="" /> */}</div>
//             <p className="text-white text-2xl">Right panel content</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default AuctionDashboard;
