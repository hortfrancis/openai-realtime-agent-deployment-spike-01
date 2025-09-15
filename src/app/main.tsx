import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

// <StrictMode> will cause two simultaneous voice connections, so best to avoid that..
createRoot(document.getElementById("root")!).render(
  <App />
);
