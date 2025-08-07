// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { deleteAuction, getUserAuctions } from "../redux/slice/auctionSlice";
// import { useEffect, useState } from "react";
// import { auctionListTableHeader } from "../data/allMapingData";
// import { formatDate, handleAmt } from "../helper/helper";
// import { MdDashboard, MdDelete, MdEdit, MdSummarize } from "react-icons/md";
// import { FaUser, FaUserGroup } from "react-icons/fa6";
// import Loader2 from "../components/common/Loader2";
// import { GrPowerReset } from "react-icons/gr";
// import { unsoldToSoldPlayerApi } from "../utils/api";
// import { toast } from "react-toastify";
// import { actBtn, tr, trImg } from "../helper/style";
// import Thead from "../components/common/Thead";
// import DeletePopup from "../components/common/DeletePopup";
// import celIcon from "../assets/cel.gif";
// import { FaCopy } from "react-icons/fa";

// function Dashboard() {
//   const [showConfirmModal, setShowConfirmModal] = useState(false);
//   const [openConfirmModal, setOpenConfirmModal] = useState(false);
//   const [selectedAuctionId, setSelectedAuctionId] = useState("");

//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const userId = useSelector((state) => state.user.user.user_id);
//   const { auctions, auctionLoading } = useSelector((state) => state.auctions);

//   function confirmDelete(auctionId) {
//     setSelectedAuctionId(auctionId);
//     setShowConfirmModal(true);
//   }
//   function confirmOpen(auctionId) {
//     setSelectedAuctionId(auctionId);
//     setOpenConfirmModal(true);
//   }

//   function handleDeleteAuctionConfirmed() {
//     if (selectedAuctionId) {
//       dispatch(deleteAuction({ auctionId: selectedAuctionId }));
//       setShowConfirmModal(false);
//       setSelectedAuctionId("");
//     }
//   }
//   function handleOpenAuctionConfirmed() {
//     if (selectedAuctionId) {
//       navigate(`/auction/${selectedAuctionId}`);
//       setOpenConfirmModal(false);
//       setSelectedAuctionId("");
//     }
//   }

//   async function unsoldToSold(auctionId) {
//     const auction_id = auctionId;

//     try {
//       const res = await unsoldToSoldPlayerApi(auction_id);
//       if (res.data.success === true) {
//         toast.success(res.data.message);
//       }
//     } catch (error) {
//       if (error.response && error.response.data) {
//         toast.info(error.response.data.message);
//       } else {
//         toast.error("Unexpected error occurred.");
//       }
//     }
//   }

//   useEffect(() => {
//     dispatch(getUserAuctions(userId));
//   }, []);

//   return (
//     <>
//       <div className="p-4 rounded shadow bg-[linear-gradient(127deg,_rgba(62,0,31,1)_1%,_rgba(62,0,31,1)_68%,_rgba(99,0,45,1)_100%)] text-white min-h-[calc(100vh-97px)]">
//         <h2 className="text-2xl font-medium text-center">My Auction List</h2>
//         <button
//           className="bg-green-700 block text-white px-4 py-2 mt-4 rounded mx-auto"
//           onClick={() => navigate("/create-auction")}
//         >
//           + Add Auction
//         </button>
//         <br />
//         {auctionLoading ? (
//           <Loader2 />
//         ) : (
//           <div className="mt-4 overflow-x-auto table-responsive">
//             {auctions && auctions.length > 0 ? (
//               <table className="border-collapse w-full border mb-3 min-w-[1280px] border-black">
//                 <Thead data={auctionListTableHeader} />
//                 <tbody>
//                   {auctions.map((data) => {
//                     return (
//                       <tr key={data.id}>
//                         <td className="border border-gray-200 px-4 py-2">
//                           <div className="flex gap-2 text-blue-800">
//                             <button
//                               className={actBtn}
//                               onClick={() =>
//                                 navigate(`/edit-auction/${data.id}`)
//                               }
//                               title="Edit Auction"
//                             >
//                               <MdEdit size={20} />
//                             </button>
//                             <button
//                               className={actBtn}
//                               onClick={() => confirmDelete(data.id)}
//                               title="Delete Auction"
//                             >
//                               <MdDelete size={20} />
//                             </button>
//                             <button
//                               className={actBtn}
//                               onClick={() => navigate(`/players/${data.id}`)}
//                               title="All Players"
//                             >
//                               <FaUser size={16} />
//                             </button>
//                             <button
//                               className={actBtn}
//                               onClick={() => navigate(`/teams/${data.id}`)}
//                               title="All Teams"
//                             >
//                               <FaUserGroup size={16} />
//                             </button>
//                             <button
//                               className={actBtn}
//                               onClick={() => confirmOpen(data.id)}
//                               title="Auction Dashboard"
//                             >
//                               <MdDashboard size={16} />
//                             </button>
//                             <button
//                               className={actBtn}
//                               onClick={() => unsoldToSold(data.id)}
//                               title="Mark all unsold player are available for auction"
//                             >
//                               <GrPowerReset size={16} />
//                             </button>
//                             <button
//                               className={actBtn}
//                               onClick={() =>
//                                 navigate(`/auction/summary/${data.id}`)
//                               }
//                               title="Auction summary"
//                             >
//                               <MdSummarize size={16} />
//                             </button>
//                             <button
//                               className={actBtn}
//                               onClick={() => {
//                                 const link = `${window.location.origin}/add-player/${data.id}`;
//                                 navigator.clipboard.writeText(link);
//                                 toast.success("Link copied!");
//                               }}
//                               title="Copy & share form link with players"
//                             >
//                               <FaCopy size={16} />
//                             </button>
//                           </div>
//                         </td>
//                         <td className={tr}>
//                           <img src={data?.auction_logo} className={trImg} />
//                         </td>
//                         <td className={tr}>{data.auction_name}</td>
//                         <td className={tr}>{data.sports_type}</td>
//                         <td className={tr}>{handleAmt(data.point_perteam)}</td>
//                         <td className={tr}>{handleAmt(data.minimum_bid)}</td>
//                         <td className={tr}>{handleAmt(data.bid_increment)}</td>
//                         <td className={tr}>{data.player_perteam}</td>
//                         <td className={tr}>{formatDate(data?.auction_date)}</td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             ) : (
//               <div className="p-4 text-center text-red-600 text-xl md:text-2xl font-medium">
//                 No Auction Available
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       {showConfirmModal && (
//         <DeletePopup
//           title="Are you sure you want to delete this auction?"
//           handleDeleteConfirmed={handleDeleteAuctionConfirmed}
//           setShowConfirmModal={setShowConfirmModal}
//         />
//       )}

//       {openConfirmModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-[#202040] via-[#202060] to-[#602080] rounded-lg shadow-md w-[90%] max-w-md relative min-h-[310px] flex flex-col justify-between">
//             <div className="relative">
//               <img
//                 src={celIcon}
//                 alt="Auction Icon"
//                 className="h-[240px] w-full object-cover rounded-md"
//               />
//               <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-md p-4">
//                 <h3 className="text-white text-lg md:text-3xl font-medium text-center px-2">
//                   Are you sure you want to start the auction?
//                 </h3>
//               </div>
//             </div>

//             <div className="flex justify-end gap-4 p-4 font-sans font-medium tracking-wide">
//               <button
//                 className="bg-gradient-to-r from-green-600 via-green-600 to-green-700 text-white px-4 py-2 min-w-20 rounded"
//                 onClick={handleOpenAuctionConfirmed}
//               >
//                 Yes, of course
//               </button>
//               <button
//                 className="bg-gradient-to-r from-red-500 via-red-700 to-red-700 text-white px-4 py-2 min-w-20 rounded"
//                 onClick={() => setOpenConfirmModal(false)}
//               >
//                 Not yet
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default Dashboard;

// import { useDispatch, useSelector } from "react-redux";
// import { Link, Outlet, useNavigate } from "react-router-dom";
// import { logout } from "../../redux/slice/userSlice";
// import { toggleSidebar } from "../../redux/slice/layoutSlice";
// import logo from "../../assets/icon2.png";
// import { LuLogOut } from "react-icons/lu";
// import { ImHammer2 } from "react-icons/im";
// import { RiMenuUnfold3Fill, RiMenuUnfold4Fill } from "react-icons/ri";
// import { FaUser } from "react-icons/fa";
// import { sidebarLink } from "../../helper/style";

// function DashboardLayout() {
//   const isSidebarOpen = useSelector((state) => state?.sidebar?.isSidebarOpen);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   function logoutUser() {
//     dispatch(logout());
//     navigate("/home");
//   }

//   function handleSidebarToggle() {
//     dispatch(toggleSidebar());
//   }

//   return (
//     <>
//       {/* Header */}
//       <div
//         // className={`h-[65px] fixed left-0 right-0 top-0 flex gap-2 text-white items-center p-2 md:p-4 transition-all ease-in-out duration-300 z-[40] bg-[linear-gradient(to_right,_#3e001f,_#4A0333,_#86023e)]`}
//         className={`h-[65px] fixed left-0 right-0 top-0 flex gap-2 text-white items-center p-2 md:p-4 transition-all ease-in-out duration-300 z-[40] bg-[linear-gradient(97deg,_#3e001f_1%,_#4A0333_79%,_#63002d_100%)]`}
//       >
//         <div className="flex items-center gap-2 md:w-[265px] w-[60px] cursor-pointer">
//           <img
//             src={logo}
//             alt="logo"
//             className="w-10 h-10"
//             onClick={() => navigate("/dashboard")}
//           />
//           <h1 className="text-2xl font-bold md:block">Cricktrade</h1>
//         </div>
//         <div className="flex items-center justify-end w-full lg:justify-between ">
//           <div className="items-center justify-center hidden gap-2 lg:flex">
//             <button className={`rounded-full`} onClick={handleSidebarToggle}>
//               {isSidebarOpen ? (
//                 <RiMenuUnfold3Fill size={24} />
//               ) : (
//                 <RiMenuUnfold4Fill size={24} />
//               )}
//             </button>
//           </div>
//           <div className="flex items-center gap-2 md:gap-3">
//             <button
//               className={`rounded-full  block lg:hidden`}
//               onClick={handleSidebarToggle}
//             >
//               {isSidebarOpen ? (
//                 <RiMenuUnfold4Fill size={24} />
//               ) : (
//                 <RiMenuUnfold3Fill size={24} />
//               )}
//             </button>
//             <button className="text-red-600" onClick={logoutUser}>
//               <LuLogOut size={20} />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div
//         className={`p-4 mt-[65px] min-h-[calc(100vh-65px)] w-full transition-all duration-300 ease-in-out bg-[#5C0A43] ${
//           isSidebarOpen ? "lg:w-[calc(100vw-260px)] lg:ml-[260px]" : "ml-0"
//         }`}
//       >
//         <Outlet />
//       </div>

//       {/* Sidebar */}
//       <div
//         className={`fixed h-[calc(100vh-65px)] top-[65px] bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-[#f11a7b] via-[#982176] to-[#3e001f] transition-all duration-300 ease-in-out overflow-hidden z-[40]  ${
//           isSidebarOpen ? "w-[260px]" : "w-0"
//         }`}
//       >
//         <div>
//           <ul className="p-2 pt-4 flex flex-col gap-2">
//             <li className="w-full">
//               <Link to="/dashboard" className={sidebarLink}>
//                 <span>
//                   <ImHammer2 />
//                 </span>
//                 My Auction
//               </Link>
//             </li>
//             <li className="w-full">
//               <Link to="/user-profile" className={sidebarLink}>
//                 <span>
//                   <FaUser size={16} />
//                 </span>
//                 Profile
//               </Link>
//             </li>
//           </ul>
//         </div>
//         <div className="text-center p-4">
//           <button
//             className="flex gap-1 items-center justify-center bg-red-600 p-1.5 w-fit px-4 rounded mx-auto text-white"
//             onClick={logoutUser}
//           >
//             <span>
//               <LuLogOut size={16} />
//             </span>
//             Logout
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }

// export default DashboardLayout;
