import { GoogleOAuthProvider } from "@react-oauth/google";
import Login from "./Login";

const GoogleOAuthWrapper = ({ setOpenModal }) => {
  return (
    <GoogleOAuthProvider clientId="472158839299-gvfqa9mj4933otnldk5t3934pvsq7qpd.apps.googleusercontent.com">
      <Login setOpenModal={setOpenModal} />
    </GoogleOAuthProvider>
  );
};

export default GoogleOAuthWrapper;
