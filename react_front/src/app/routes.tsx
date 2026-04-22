// src/app/routes.tsx
import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import AuthPage from "./components/AuthPage";
import Root from "./components/Root";
import Dashboard from "./components/Dashboard";
import Chat from "./components/Chat";
import Products from "./components/Products";
import Analytics from "./components/Analytics";
import Settings from "./components/Settings";
import Table from "./components/Table";

export const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/auth", element: <AuthPage /> },

  // пока выключаем внутреннюю часть
  {
    path: "/app",
    element: <Root />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "chat", element: <Chat /> },
      { path: "products", element: <Products /> },
      { path: "analytics", element: <Analytics /> },
      { path: "settings", element: <Settings /> },
      { path: "table", element: <Table /> },
    ],
  },
]);