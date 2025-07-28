import axios from "axios";

export const googleAuth = (code) =>
 axios.get(`http://localhost:8000/auth/google-login?code=${code}`);

