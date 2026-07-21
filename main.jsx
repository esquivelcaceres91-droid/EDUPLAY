import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/global.css";
import "./styles/onboarding.css";
import "./styles/home.css";
const publicExplore = window.location.pathname === "/explore" || window.location.pathname.startsWith("/explore/");

const start = async () => {
  const { default: App } = await (publicExplore ? import("./PublicExploreApp.jsx") : import("./App.jsx"));
  createRoot(document.getElementById("root")).render(<StrictMode><App /></StrictMode>);
};

start();
