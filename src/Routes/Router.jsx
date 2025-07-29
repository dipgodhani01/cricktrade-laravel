import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import PageNotFound from "../pages/PageNotFound";
import Layout from "../layouts/Layout";
import { DashboardRoutesPath, HomeRoutesPath } from "./routes";
import DashboardLayout from "../components/dashboard/DashboardLayout";

const Router = () => {
  const location = useLocation();
  const token = localStorage.getItem("cricktrade-usertoken");

  const FinalRoute = (props) => {
    const route = props?.route;
    if (token === null && route?.meta?.authRoute) {
      return (
        <Navigate
          to="/home"
          replace={true}
          state={{ path: location?.pathname }}
        />
      );
    } else {
      return <route.component {...props} />;
    }
  };

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
      <Route exact path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default Router;
