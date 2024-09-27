import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./pages/client/auth/SignUp.jsx";
import Login from "./pages/client/auth/Login.jsx";
import ResetPass from "./pages/client/auth/ResetPass.jsx";
import DoiMatKhau from "./pages/client/auth/DoiMatKhau.jsx";

const router = createBrowserRouter([
  {
    path: "/signup",
    element: <SignUp></SignUp>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/resetpass",
    element: <ResetPass></ResetPass>,
  },
  {
    path: "/doimatkhau",
    element: <DoiMatKhau></DoiMatKhau>,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router}>
    <App />
  </RouterProvider>,
);
