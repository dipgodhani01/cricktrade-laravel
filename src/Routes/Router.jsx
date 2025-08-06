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

const FinalRoute = ({ route }) => {
  const token = localStorage.getItem("cricktrade-usertoken");

  if (token === null && route?.meta?.authRoute) {
    return <Navigate to="/home" replace={true} />;
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
