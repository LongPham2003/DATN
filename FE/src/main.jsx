import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from "./pages/GlobalProvider.jsx";
import { Bounce, ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <App />
    <ToastContainer
      position="top-center"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      rtl={false}
      theme="light"
      transition={Bounce}
    />
  </ThemeProvider>,
);
