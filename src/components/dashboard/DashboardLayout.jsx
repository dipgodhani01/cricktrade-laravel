import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { logout } from "../../redux/slice/userSlice";
import { toggleSidebar } from "../../redux/slice/layoutSlice";
import logo from "../../assets/icon2.png";
import { LuLogOut } from "react-icons/lu";
import { RiMenuUnfold3Fill, RiMenuUnfold4Fill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { actBtn, sidebarLink } from "../../helper/style";
import { IoIosTennisball } from "react-icons/io";

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
      <div className="h-[65px] fixed left-0 right-0 top-0 flex gap-2 text-[#A40000] items-center p-2 md:p-4 transition-all ease-in-out duration-300 z-[40] bg-[#FFD3B6]">
        <div className="flex items-center gap-2 md:w-[265px] w-[60px] cursor-pointer">
          <img
            src={logo}
            alt="logo"
            className="w-10 h-10"
            onClick={() => navigate("/dashboard")}
          />
          <h1 className="text-2xl font-bold font-sans tracking-wider md:block">
            Cricktrade
          </h1>
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
              className="block lg:hidden rounded-full"
              onClick={handleSidebarToggle}
            >
              {isSidebarOpen ? (
                <RiMenuUnfold4Fill size={24} />
              ) : (
                <RiMenuUnfold3Fill size={24} />
              )}
            </button>
            <button className={actBtn} onClick={logoutUser}>
              <LuLogOut size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`mt-[65px] min-h-[calc(100vh-65px)] w-full transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "lg:w-[calc(100vw-260px)] lg:ml-[260px]" : "ml-0"
        }`}
      >
        <Outlet />
      </div>

      {/* Sidebar */}
      <div
        className={`fixed h-[calc(100vh-65px)] top-[65px] bg-[#FFD3B6] transition-all duration-300 ease-in-out overflow-hidden z-[40] border-t border-[#FAF4E1] ${
          isSidebarOpen ? "w-[260px]" : "w-0"
        }`}
      >
        <div>
          <ul className="p-2 pt-4 flex flex-col gap-2">
            <li className="w-full">
              <Link to="/dashboard" className={sidebarLink}>
                <span>
                  <IoIosTennisball size={18} />
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
        <div className="text-center px-2">
          <button className={sidebarLink} onClick={logoutUser}>
            <span>
              <LuLogOut size={18} />
            </span>
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default DashboardLayout;
