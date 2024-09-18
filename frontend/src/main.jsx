import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App.jsx";
import "./index.css";
import { RecoilRoot } from "recoil";
import { ClerkProvider } from "@clerk/clerk-react";
import { ThemeProvider } from "./providers/theme-provider";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RecoilRoot>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </ClerkProvider>
    </RecoilRoot>
  </StrictMode>
);
