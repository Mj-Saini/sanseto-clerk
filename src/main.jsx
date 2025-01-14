import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter } from "react-router-dom";
import { ContextProvider } from "./context/ContextProvider.jsx";


const PUBLISHABLE_KEY = "pk_test_ZmFpdGhmdWwtY2xhbS00Mi5jbGVyay5hY2NvdW50cy5kZXYk"

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContextProvider>
    <BrowserRouter>
      <ClerkProvider
        publishableKey={PUBLISHABLE_KEY}
      >
        <App />
      </ClerkProvider>
    </BrowserRouter>
    </ContextProvider>
  </StrictMode>
);
