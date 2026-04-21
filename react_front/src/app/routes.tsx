import { createBrowserRouter } from "react-router";
import Root from "./components/Root";
import Dashboard from "./components/Dashboard";
import Chat from "./components/Chat";
import Products from "./components/Products";
import Analytics from "./components/Analytics";
import Settings from "./components/Settings";
import Table from "./components/Table";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Dashboard },
      { path: "chat", Component: Chat },
      { path: "products", Component: Products },
      { path: "analytics", Component: Analytics },
      { path: "settings", Component: Settings },
      { path: "table", Component: Table },
    ],
  },
]);
