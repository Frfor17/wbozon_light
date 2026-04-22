import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import "../styles/index.css";  // ← ЭТО ВСЁ! Tailwind + Figma дизайн

export default function App() {
  return <RouterProvider router={router} />;
}
