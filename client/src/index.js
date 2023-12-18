import React from "react";
import ReactDOM from "react-dom/client";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import App from "./app.js";

//contexts
import { AuthContextProvider } from "./contexts/AuthContext";
import { NotificationProvider } from "./contexts/NotificationContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AuthContextProvider>
    <NotificationProvider>
      <App />
    </NotificationProvider>
  </AuthContextProvider>
);
