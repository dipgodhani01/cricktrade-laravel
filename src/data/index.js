export const navLinks = [
  { name: "Home", link: "/home" },
  { name: "About", link: "/about-us" },
  { name: "Blog" },
  { name: "Contact Us", link: "/contact" },
];
export const createAccountFields = [
  {
    label: "Username",
    name: "username",
    type: "text",
    placeholder: "Enter username",
    required: true,
  },
  {
    label: "Email",
    name: "email",
    type: "email",
    placeholder: "Enter email",
    required: true,
  },
  {
    label: "Password",
    name: "password",
    type: "password",
    placeholder: "Enter password",
    required: true,
  },
];

export const homePageStepsData = [
  {
    id: 1,
    title: "Sign Up",
    desc: "You can use your google/facebook account to sign In on the platform.",
    icon: true,
  },
  {
    id: 2,
    title: "Create Auction",
    desc: "Fill a form to provide details and logo for the Auction.",
    icon: true,
  },
  {
    id: 3,
    title: "Add Teams",
    desc: "Add all the teams and their logos one by one by filling the form.",
    icon: true,
  },
  {
    id: 4,
    title: "Add Players",
    desc: "Share with players the registration form or add them yourself using bulk upload",
    icon: true,
  },
  {
    id: 5,
    title: "Do auction of players through auction dashboard.",
    desc: "The auction dashboard screen selects random players and allows you to place bid on it.",
    icon: true,
  },
  {
    id: 6,
    title: "Share summary screen",
    desc: "Share summary screen with team owners and everyone else so that they can check the auction status live.",
    icon: false,
  },
];
