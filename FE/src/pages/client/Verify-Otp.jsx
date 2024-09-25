import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const VerifyEmail = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const email = new URLSearchParams(location.search).get("email"); // Lấy email từ query params

  const handleVerify = (e) => {
    e.preventDefault();

    // Kiểm tra độ dài mã
    if (code.length !== 6) {
      setError("Mã xác minh phải gồm 6 số.");
      return;
    }

    // Gọi API xác minh mã
    fetch("http://localhost:8080/auth/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, code }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            throw new Error(errorData.message || "Xác minh không thành công");
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log("Xác minh thành công:", data);
        // Sau khi xác minh thành công, chuyển hướng đến trang đăng nhập
        navigate("/login");
      })
      .catch((error) => {
        console.error("Lỗi:", error.message);
        setError(error.message);
      });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h2 className="mb-4 text-2xl font-bold">Xác minh email</h2>
      <form onSubmit={handleVerify} className="flex w-1/3 flex-col">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Nhập mã xác minh (6 số)"
          maxLength="6" // Giới hạn độ dài nhập vào
          className="mb-4 border p-2"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="rounded bg-blue-500 p-2 text-white">
          Xác minh
        </button>
      </form>
    </div>
  );
};

export default VerifyEmail;
