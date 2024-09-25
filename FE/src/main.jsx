import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./pages/client/SignUp.jsx";
import Login from "./pages/client/Login.jsx";
import ResetPass from "./pages/client/ResetPass.jsx";

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
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router}>
    <App />
  </RouterProvider>,
);
