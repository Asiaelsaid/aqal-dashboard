import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "@store/index.ts";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId =
  "435636143697-h89nu0qsogcit0uo2t4vep05ch1nt3ek.apps.googleusercontent.com";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={clientId}>
        <App />
      </GoogleOAuthProvider>
    </Provider>
  </StrictMode>
);
