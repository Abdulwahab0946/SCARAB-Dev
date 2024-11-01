import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ReduxProvider from "./redux/provider.tsx";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import "./index.css";
import { Toaster } from "@comp/ui/toaster.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReduxProvider>
      <BrowserRouter>
        <>
          <App />
          <Toaster />
        </>
      </BrowserRouter>
    </ReduxProvider>
  </StrictMode>
);
