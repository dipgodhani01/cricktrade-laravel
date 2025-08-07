import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { logout } from "../../redux/slice/userSlice";
import { toggleSidebar } from "../../redux/slice/layoutSlice";
import logo from "../../assets/icon2.png";
import { LuLogOut } from "react-icons/lu";
import { ImHammer2 } from "react-icons/im";
import { RiMenuUnfold3Fill, RiMenuUnfold4Fill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { actBtn, sidebarLink } from "../../helper/style";

function DashboardLayout() {
  const isSidebarOpen = useSelector((state) => state?.sidebar?.isSidebarOpen);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function logoutUser() {
    dispatch(logout());
    navigate("/home");
  }

  function handleSidebarToggle() {
    dispatch(toggleSidebar());
  }

  return (
    <>
      {/* Header */}
      <div
        className={`h-[65px] fixed left-0 right-0 top-0 flex gap-2 text-[#A40000] items-center p-2 md:p-4 transition-all ease-in-out duration-300 z-[40] bg-[#FFD3B6]`}
      >
        <div className="flex items-center gap-2 md:w-[265px] w-[60px] cursor-pointer">
          <img
            src={logo}
            alt="logo"
            className="w-10 h-10"
            onClick={() => navigate("/dashboard")}
          />
          <h1 className="text-2xl font-bold md:block">Cricktrade</h1>
        </div>
        <div className="flex items-center justify-end w-full lg:justify-between">
          <div className="items-center justify-center hidden gap-2 lg:flex">
            <button className={`rounded-full`} onClick={handleSidebarToggle}>
              {isSidebarOpen ? (
                <RiMenuUnfold3Fill size={24} />
              ) : (
                <RiMenuUnfold4Fill size={24} />
              )}
            </button>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <button
              className={`rounded-full  block lg:hidden`}
              onClick={handleSidebarToggle}
            >
              {isSidebarOpen ? (
                <RiMenuUnfold4Fill size={24} />
              ) : (
                <RiMenuUnfold3Fill size={24} />
              )}
            </button>
            <button className={actBtn} onClick={logoutUser}>
              <LuLogOut size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`mt-[65px] min-h-[calc(100vh-65px)] w-full transition-all duration-300 ease-in-out bg-[#85161F] ${
          isSidebarOpen ? "lg:w-[calc(100vw-260px)] lg:ml-[260px]" : "ml-0"
        }`}
      >
        <Outlet />
      </div>

      {/* Sidebar */}
      <div
        className={`fixed h-[calc(100vh-65px)] top-[65px] bg-[#FFD3B6] transition-all duration-300 ease-in-out overflow-hidden border-t border-[#A42937] z-[40] ${
          isSidebarOpen ? "w-[260px]" : "w-0"
        }`}
      >
        <div>
          <ul className="p-2 pt-4 flex flex-col gap-2">
            <li className="w-full">
              <Link to="/dashboard" className={sidebarLink}>
                <span>
                  <ImHammer2 />
                </span>
                My Auction
              </Link>
            </li>
            <li className="w-full">
              <Link to="/user-profile" className={sidebarLink}>
                <span>
                  <FaUser size={16} />
                </span>
                Profile
              </Link>
            </li>
          </ul>
        </div>
        <div className="text-center p-4">
          <button
            className="flex gap-1 items-center justify-center bg-red-600 p-1.5 w-fit px-4 rounded mx-auto text-white"
            onClick={logoutUser}
          >
            <span>
              <LuLogOut size={16} />
            </span>
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default DashboardLayout;
