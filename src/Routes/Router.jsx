import { Routes, Route, Navigate } from "react-router-dom";
import PageNotFound from "../pages/PageNotFound";
import Layout from "../layouts/Layout";
import {
  AuctionRoutesPath,
  DashboardRoutesPath,
  HomeRoutesPath,
  publicRoutePath,
} from "./routes";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import { useSelector } from "react-redux";
import Loader1 from "../components/common/Loader1";

const FinalRoute = ({ route }) => {
  const { user, loading } = useSelector((state) => state.user);

  if (loading) {
    return (
      <div className="absolute bg-white flex items-center justify-center top-0 left-0 h-screen w-full z-[1000000]">
        <Loader1 />
      </div>
    );
  }
  // ✅ Agar ye home page hai aur user hai
  if (user && route.path === "/home") {
    return <Navigate to="/dashboard" replace />;
  }
  // Agar auth route hai aur user nahi hai
  if (!user && route?.meta?.authRoute) {
    return <Navigate to="/home" replace />;
  }

  const Component = route.component;
  return <Component />;
};

const Router = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        {HomeRoutesPath.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={<FinalRoute route={route} />}
          />
        ))}
      </Route>
      <Route element={<DashboardLayout />}>
        {DashboardRoutesPath.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={<FinalRoute route={route} />}
          />
        ))}
      </Route>
      {AuctionRoutesPath.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={<FinalRoute route={route} />}
        />
      ))}
      {publicRoutePath.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={<FinalRoute route={route} />}
        />
      ))}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default Router;
