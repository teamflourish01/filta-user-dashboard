import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { User } from "./context/userDetails";
import { Auth0Provider } from "@auth0/auth0-react";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Auth0Provider
    domain="dev-jsd0a64f3hdbhuk2.us.auth0.com"
    clientId="MJLLW8UZlvJ714A8gjmdMQPV6OLJn3pv"
    redirectUri={window.location.origin}
  >
      <GoogleOAuthProvider
      clientId="970941117362-5llk95jqea8a5343ej8bstehsg1llgt0.apps.googleusercontent.com"
    >
      <User>
        <App />
      </User>
      </GoogleOAuthProvider>
    </Auth0Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
