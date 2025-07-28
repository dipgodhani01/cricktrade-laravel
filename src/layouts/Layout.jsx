import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet, useLocation } from "react-router-dom";

function Layout() {
  const location = useLocation();
  const { pathname } = location;
  const shouldRenderNavbar = [
    "/login",
    "/register",
    "/verification",
    "/forgot_password",
  ].includes(pathname);
  return (
    <>
      {!shouldRenderNavbar && <Navbar />}
      <Outlet />
      {!shouldRenderNavbar && <Footer />}
    </>
  );
}

export default Layout;
