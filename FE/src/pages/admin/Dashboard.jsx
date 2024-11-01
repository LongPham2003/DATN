import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ThongKe from "./ThongKe/ThongKe";
import MauSac from "./ThuocTinhSP/MauSac/MauSac";
import ChatLieu from "./ThuocTinhSP/ChatLieu/ChatLieu";
import DeGiay from "./ThuocTinhSP/DeGiay/DeGiay";
import KichThuoc from "./ThuocTinhSP/KichThuoc/KichThuoc";
import ThuongHieu from "./ThuocTinhSP/ThuongHieu/ThuongHieu";

export default function Dashboard() {
  return (
    <div className="flex overflow-hidden">
      <aside className="w-1/5 drop-shadow-2xl">
        <Sidebar />
      </aside>
      <main className="w-4/5">
        <div className="ml-[-30px] min-h-screen rounded bg-white drop-shadow-2xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
