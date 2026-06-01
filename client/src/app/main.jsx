import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../styles/index.css";
import "../styles/theme.css";
import App from "./App";

import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </StrictMode>
);
