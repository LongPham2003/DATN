import { useNavigate } from "react-router-dom";

const NotFound404 = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/home"); // Điều hướng người dùng về trang chủ
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#FDFAF5] text-gray-600">
      <h1 className="mb-6 text-center text-4xl font-bold">404 Error Page </h1>

      <div className="mt-10 text-center">
        <button
          className="rounded bg-[#de7e85] px-4 py-2 text-xs uppercase tracking-wider text-white transition-all hover:bg-[#c76e75]"
          onClick={handleGoHome}
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default NotFound404;
