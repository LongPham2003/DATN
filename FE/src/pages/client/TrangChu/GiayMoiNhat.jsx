import axios from "axios";
import { useEffect, useState } from "react";
import LayANhTheoIdSPCT from "./../../admin/SanPham/Product/LayANhTheoIDSP";
import Meta from "antd/es/card/Meta";
import { Link } from "react-router-dom";
import { Card } from "antd";
const GiayMoiNhat = () => {
  const [sanPham, setSanPham] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/sanpham/trangchu")
      .then(async (res) => {
        const sp = res.data.slice(0, 4);
        setSanPham(sp);
        console.log([sanPham]);
      })
      .catch((error) => {
        console.error("Lỗi" + error);
      });
  }, []);
  function formatTien(value) {
    if (typeof value !== "number" || isNaN(value)) {
      return "0 VNĐ"; // Giá trị mặc định nếu `value` không hợp lệ
    }
    return value.toLocaleString("vi-VN") + " VNĐ";
  }
  return (
    <>
      <div>
        <div className="my-5 flex">
          <div className="mx-auto">
            <p className="mt-3 text-center font-mono text-[30px] font-bold">
              Giày mới nhất
            </p>
            <p className="mt-3 text-center leading-8">
              Khám phá bộ sưu tập giày mới nhất của chúng tôi - kết hợp thời
              trang <br /> và chức năng cho mọi bước đi của bạn.
            </p>
          </div>
        </div>
      </div>
      <div className="grid w-full grid-cols-4 gap-8">
        {sanPham.map((spct, index) => (
          <Card
            key={index}
            hoverable
            className="h-[360px]"
            cover={
              <Link to={`/chitiet/${spct.idSP}`}>
                <div className="transition-transform duration-300 hover:scale-110">
                  <LayANhTheoIdSPCT
                    id={spct.idSPCT}
                    className="h-[250px] w-auto justify-center object-cover"
                  />
                </div>
              </Link>
            }
          >
            <Meta
              title={spct.tenSanPham}
              description={
                <div className="text-red-500">{formatTien(spct.donGia)}</div>
              }
              className="text-lg"
            />
          </Card>
        ))}
      </div>
      <div className="my-5">
        <div>
          <div className="my-5 flex">
            <div className="mx-auto">
              <p className="mt-3 text-center font-mono text-[30px] font-bold">
                Blog của chúng tôi
              </p>
              <p className="mt-3 text-center leading-8">
                Chào mừng đến với Blog của BeeShoes, nơi thời trang gặp gỡ hiểu
                biết <br /> sâu sắc, và mỗi bước đi là một câu chuyện chờ được
                kể.
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-5">
          <div className="flex w-[500px] flex-col rounded-2xl bg-[#ffffff] shadow-xl">
            {/* Image Section */}
            <figure className="flex items-center justify-center rounded-2xl">
              <img
                src="https://chuphinhquangcao.net/wp-content/uploads/2021/07/ANH-1-3.jpg"
                alt="Card Preview"
                className="rounded-t-2xl"
              />
            </figure>

            {/* Text Section */}
            <div className="flex flex-col p-8">
              <div className="pb-6 text-2xl font-bold text-[#374151]">
                Thời trang
              </div>
              <div className="text-lg text-[#374151]">
                Từ giày thể thao đến giày cao gót: Khám phá những phong cách
                giày biểu tượng
              </div>

              {/* Button Section */}
              <div className="flex justify-end pt-6">
                <button className="w-full transform rounded-lg bg-[#7e22ce] p-3 text-base font-bold text-[#ffffff] transition-transform hover:bg-purple-800 active:scale-95">
                  Chi tiết
                </button>
              </div>
            </div>
          </div>
          <div className="flex w-[500px] flex-col rounded-2xl bg-[#ffffff] shadow-xl">
            {/* Image Section */}
            <figure className="flex items-center justify-center rounded-2xl">
              <img
                src="https://yeuchaybo.com/wp-content/uploads/2015/10/adidas-futurecraft-3d-1000x666.jpg"
                alt="Card Preview"
                className="rounded-t-2xl"
              />
            </figure>

            {/* Text Section */}
            <div className="flex flex-col p-8">
              <div className="pb-6 text-2xl font-bold text-[#374151]">
                Tiêu Điểm Thương Hiệu
              </div>
              <div className="text-lg text-[#374151]">
                Bước vào phong cách: Hướng dẫn của bạn để có đôi giày hoàn hảo
              </div>

              {/* Button Section */}
              <div className="flex justify-end pt-6">
                <button className="w-full transform rounded-lg bg-[#7e22ce] p-3 text-base font-bold text-[#ffffff] transition-transform hover:bg-purple-800 active:scale-95">
                  Chi tiết
                </button>
              </div>
            </div>
          </div>
          <div className="flex w-[500px] flex-col rounded-2xl bg-[#ffffff] shadow-xl">
            {/* Image Section */}
            <figure className="flex items-center justify-center rounded-2xl">
              <img
                src="https://indochinapost.com/wp-content/uploads/order-sneaker-nam-bieu-tuong-nike-air-jordan-1-elle-man.jpg"
                alt="Card Preview"
                className="rounded-t-2xl"
              />
            </figure>

            {/* Text Section */}
            <div className="flex flex-col p-8">
              <div className="pb-6 text-2xl font-bold text-[#374151]">
                Chăm sóc giày
              </div>
              <div className="text-lg text-[#374151]">
                Trendy Steps: Bật mí những đôi giày phải có theo mùa
              </div>

              {/* Button Section */}
              <div className="flex justify-end pt-6">
                <button className="w-full transform rounded-lg bg-[#7e22ce] p-3 text-base font-bold text-[#ffffff] transition-transform hover:bg-purple-800 active:scale-95">
                  Chi tiết
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default GiayMoiNhat;
