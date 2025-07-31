import { lazy } from "react";

export const HomeRoutesPath = [
  {
    path: "/",
    component: lazy(() => import("../../pages/Home")),
    meta: { authRoute: false },
  },
  {
    path: "home",
    component: lazy(() => import("../../pages/Home")),
    meta: { authRoute: false },
  },

  {
    path: "about-us",
    component: lazy(() => import("../../pages/AboutUs")),
    meta: { authRoute: false },
  },
  {
    path: "privacy-policy",
    component: lazy(() => import("../../pages/PrivacyPolicy")),
    meta: { authRoute: false },
  },
  {
    path: "terms",
    component: lazy(() => import("../../pages/Terms")),
    meta: { authRoute: false },
  },
  {
    path: "refund-cancellation",
    component: lazy(() => import("../../pages/Refund")),
    meta: { authRoute: false },
  },
  {
    path: "contact",
    component: lazy(() => import("../../pages/ContactUs")),
    meta: { authRoute: false },
  },
];

export const DashboardRoutesPath = [
  {
    path: "/dashboard",
    component: lazy(() => import("../../pages/Dashboard")),
    meta: { authRoute: true },
  },
  {
    path: "/create-auction",
    component: lazy(() =>
      import("../../components/dashboard/auction/CreateAuction")
    ),
    meta: { authRoute: true },
  },
  {
    path: "/edit-auction/:auctionId",
    component: lazy(() =>
      import("../../components/dashboard/auction/EditAuction")
    ),
    meta: { authRoute: true },
  },
  {
    path: "/players/:auctionId",
    component: lazy(() =>
      import("../../components/dashboard/player/PlayerList")
    ),
    meta: { authRoute: true },
  },
  { 
    path: "/create-player/:auctionId",
    component: lazy(() =>
      import("../../components/dashboard/player/CreatePlayer")
    ),
    meta: { authRoute: true },
  },
  {
    path: "/edit-player/:playerId",
    component: lazy(() =>
      import("../../components/dashboard/player/EditPlayer")
    ),
    meta: { authRoute: true },
  },

   {
    path: "/teams/:auctionId",
    component: lazy(() =>
      import("../../components/dashboard/team/TeamList")
    ),
    meta: { authRoute: true },
  },
  { 
    path: "/create-team/:auctionId",
    component: lazy(() =>
      import("../../components/dashboard/team/CreateTeam")
    ),
    meta: { authRoute: true },
  },
  {
    path: "/edit-team/:teamId",
    component: lazy(() =>
      import("../../components/dashboard/team/EditTeam")
    ),
    meta: { authRoute: true },
  },
];
