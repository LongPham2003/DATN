import { Outlet } from "react-router-dom";
import Carousel from "../Carousel/Carousel";
import Footer from "../footer/footer";
import Header from "../Header/Header";
import LienHe from "../LienHe/LienHe";
import SanPham from "../SanPham/SanPham";
import TrangChu from "../TrangChu/TrangChu";
const HomePage = () => {
  return (
    <div id="root" className="overflow-auto">
      <div className="content-wrapper mx-auto max-w-screen-2xl font-mono text-base">
        <div>
          <Header />
        </div>
        <main className="mt-40">
          <div className="mt-4 h-auto">
            {/* <TrangChu /> */}
            {/* <SanPham /> */}
            {/* <LienHe /> */}
            <Outlet />
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
