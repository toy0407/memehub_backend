import { auth } from "express-openid-connect";

const authConfig = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH_SECRET,
  baseURL: "http://localhost:5001",
  clientID: "qhEmjxPrQCLf2LPHHFstuJl3T9a3TWVD",
  issuerBaseURL: "https://dev-qj642mrfwv1mbc43.us.auth0.com",
};

const Auth0Connect = auth(authConfig);

export default Auth0Connect;
