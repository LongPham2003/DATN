import { ShoppingCartOutlined } from "@ant-design/icons";
import { Badge } from "antd";
import Search from "antd/es/input/Search";
import { Link } from "react-router-dom";
// import logo from "../../../../logo/"

export default function Header() {
  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50 bg-white shadow-md">
        <div className="flex h-[45px] justify-end space-x-4 bg-gray-800 p-2 text-sm text-white">
          <a
            href="#"
            className="flex items-center space-x-1 hover:text-gray-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <span>Tra cứu đơn hàng</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-1 hover:text-gray-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.864 4.243A7.5 7.5 0 0 1 19.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 0 0 4.5 10.5a7.464 7.464 0 0 1-1.15 3.993m1.989 3.559A11.209 11.209 0 0 0 8.25 10.5a3.75 3.75 0 1 1 7.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 0 1-3.6 9.75m6.633-4.596a18.666 18.666 0 0 1-2.485 5.33"
              />
            </svg>
            <span>Đăng nhập</span>
          </a>
          <a
            href="#"
            className="mt-1 flex items-center space-x-1 hover:text-gray-400"
          >
            <div className="mt-1 flex items-center space-x-2">
              <Link to="/GioHang">
                <Badge count={1} size="small" offset={[5, -5]}>
                  <ShoppingCartOutlined
                    style={{ fontSize: "24px", color: "white" }}
                  />
                </Badge>
                <span className="">Giỏ hàng</span>
              </Link>
            </div>
          </a>
        </div>

        <div className="mx-9 flex h-[100px] items-center justify-between bg-white p-4">
          <div className="flex items-center space-x-4">
            <img
              src="../../../../logo/logo.jpg"
              className="h-[100px]"
              alt="Logo"
            />
          </div>

          <nav className="flex space-x-8 text-2xl font-bold text-black">
            <Link
              to="/"
              className="flex items-center rounded px-4 py-2 font-bold text-black transition duration-700 ease-in-out hover:scale-110 hover:text-orange-500 hover:underline"
            >
              Trang chủ
            </Link>
            <Link
              to="/SanPham"
              className="flex items-center rounded px-4 py-2 font-bold text-black transition duration-700 ease-in-out hover:scale-110 hover:text-orange-500 hover:underline"
            >
              Sản phẩm
            </Link>
            <a
              href="#"
              className="flex items-center rounded px-4 py-2 font-bold text-black transition duration-700 ease-in-out hover:scale-110 hover:text-orange-500 hover:underline"
            >
              Giới thiệu
            </a>
            <Link
              to="/LienHe"
              className="flex items-center rounded px-4 py-2 font-bold text-black transition duration-700 ease-in-out hover:scale-110 hover:text-orange-500 hover:underline"
            >
              Liên hệ
            </Link>
          </nav>

          {/* tìm kiếm */}
          <div className="relative">
            <Search
              placeholder="input search text"
              size="large"
              style={{
                width: 300,
              }}
            />
          </div>
        </div>
      </header>
    </>
  );
}
