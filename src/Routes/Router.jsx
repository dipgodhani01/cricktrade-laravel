import {
  Routes,
  Route,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";
import PageNotFound from "../pages/PageNotFound";
import Layout from "../layouts/Layout";
import {
  AuctionRoutesPath,
  DashboardRoutesPath,
  HomeRoutesPath,
} from "./routes";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import { useEffect } from "react";

// ✅ FinalRoute as a Component
const FinalRoute = ({ route }) => {
  const token = localStorage.getItem("cricktrade-usertoken");
  const navigate = useNavigate();

  useEffect(() => {
    if (token === null && route?.meta?.authRoute) {
      navigate("/home", { replace: true });
    }
  }, [token, route, navigate]);

  if (token === null && route?.meta?.authRoute) return null;

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
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default Router;
