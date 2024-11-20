import { useEffect } from "react";
import { useState } from "react";

export default function DatHang() {
  const [listIdGHCT, setListIdGHCT] = useState([]);

  useEffect(() => {
    setListIdGHCT(localStorage.getItem("sanPhamChon"));
  }, []);

  return (
    <>
      <div>Dat Hang</div>
      <div className="flex">
        <div className="w-2/3">
          <div className="flex justify-center">
            <span className="text-xl font-semibold">Danh Sach San Pham</span>
          </div>
          <div>
            <table className="w-full">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Anh</th>
                  <th>San Pham</th>
                  <th>Size</th>
                  <th>Mau sac</th>
                  <th>So luong</th>
                  <th>Don gia</th>
                  <th>Thanh tien</th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
        <div className="w-1/3">
          <div>
            <span>Chọn phiếu giảm giá và địa chỉ</span>
          </div>
        </div>
      </div>
    </>
  );
}
