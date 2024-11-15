import { Outlet } from "react-router-dom";
import Carousel from "../Carousel/Carousel";
import Footer from "../footer/footer";
import Header from "../Header/Header";
import LienHe from "../LienHe/LienHe";
import SanPham from "../SanPham/SanPham";
import TrangChu from "../TrangChu/TrangChu";
import GioHang from "../GioHang/GioHang";
import { useEffect, useState } from "react";
import { Spin } from "antd";

const HomePage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Giả lập thời gian tải nội dung khoảng 1 giây
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="root" className="overflow-auto">
      <div className="content-wrapper mx-auto max-w-screen-2xl font-mono text-base">
        <div>
          <Header />
        </div>
        <main className="mt-40">
          <div className="mt-4 h-auto">
            {loading ? (
              <div className="flex h-40 items-center justify-center">
                <Spin size="large" />
              </div>
            ) : (
              <Outlet />
            )}
          </div>
        </main>
      </div>
      <hr />
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default HomePage;
