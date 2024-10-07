import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Bounce, toast, ToastContainer } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed!");
      }

      const data = await response.json();
      if (data.result) {
        setError("");
        toast.success("Đăng nhập thành công");

        setTimeout(() => {
          navigate("/home");
        }, 500);
      } else {
        throw new Error("Login failed!");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div>
        <form
          onSubmit={handleSubmit}
          className="w-96 rounded-lg bg-white p-8 shadow-lg"
        >
          <h2 className="mb-6 text-center text-2xl font-bold">Đăng nhập</h2>

          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-2 w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-2 w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-500 py-2 text-white transition duration-200 hover:bg-blue-600"
          >
            Đăng nhập
          </button>
          <div className="mb-3">
            <Link to={"/signup"}>
              <button
                type="button"
                className="mt-3 w-full rounded-lg bg-blue-500 py-2 text-white transition duration-200 hover:bg-blue-600"
              >
                Đăng ký
              </button>
            </Link>
          </div>
          <Link className="font-bold" to={"/resetpass"}>
            Quên mật khẩu?
          </Link>
        </form>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
      </div>
    </div>
  );
};

export default Login;
