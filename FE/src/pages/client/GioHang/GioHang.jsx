import { TrashIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { Button, Checkbox, Input, Popconfirm, Select } from "antd";
import axios from "./../../../api/axiosConfig";
import { useContext, useEffect, useState } from "react";
import ThongTinSPCT from "./component/ThongTinSPCT";
import LayANhTheoIDSp from "./../../admin/SanPham/Product/LayANhTheoIDSP";
import { toast, ToastContainer, Zoom } from "react-toastify";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../GlobalProvider";

export default function GioHang() {
  const [ListSPCT, setListSPCT] = useState([]);
  const [soLuong, setSoLuong] = useState(0); // State để lưu tổng số lượng
  const [thaydoiSoLuongMua, setThayDoiSoLuongMua] = useState(0);
  const [idSPCTDangChon, setIdSPCTDangChon] = useState();
  const [IdGH, setIdGH] = useState();
  const [soLuongTon, setSoLuongTon] = useState();
  const [IdGioHangChiTiet, setIdGioHangChiTiet] = useState(0);


  const { reload, setReload } = useContext(ThemeContext);


  const ApiLayDanhSachSPCT = `http://localhost:8080/api/giohang/laytatcagiohangchitiet`;
  const ApiCapNhatSoLuongMua = `http://localhost:8080/api/giohang/capnhatgiohangchitiet`;
  const ApiXoaSPKhoiGioHang = `http://localhost:8080/api/giohang/xoagiohangchitiet`;

  const LayDanhSachSP = async () => {
    try {
      const response = await axios.get(ApiLayDanhSachSPCT);
      setListSPCT(response.data.result);

      // Khởi tạo số lượng cho từng sản phẩm
      const initialSoLuong = {};
      response.data.result.forEach((item) => {
        initialSoLuong[item.idSanPhamChiTiet] = item.soLuong; // Giả sử idSanPhamChiTiet là duy nhất
      });
      setSoLuong(initialSoLuong);
    } catch (error) {
      console.log("Có lỗi xảy ra khi lấy dữ liệu:", error);
    }
  };

  const upDateSoLuongMua = async () => {
    const soLuong = await axios.get(
      `http://localhost:8080/api/sanphamchitiet/${idSPCTDangChon}`,
    );
    const slt = soLuong.data.result.soLuong;

    const soLuongMuaTruocDo = thaydoiSoLuongMua;

    try {
      if (thaydoiSoLuongMua > slt) {
        toast.warning(`Chúng tôi chỉ còn ${slt} sản phẩm`);
        return;
      }

      await axios.put(`${ApiCapNhatSoLuongMua}/${IdGH}`, {
        idSanPhamChiTiet: idSPCTDangChon,
        soLuong: thaydoiSoLuongMua,
      });

      const soLuongTonSauCapNhat = await axios.get(
        `http://localhost:8080/api/sanphamchitiet/${idSPCTDangChon}`,
      );

      const sltSauCapNhat = soLuong.data.result.soLuong;

      if (sltSauCapNhat === -1) {
        toast.error("Cập nhật không thành công, số lượng tồn không hợp lệ!");
        setThayDoiSoLuongMua(soLuongMuaTruocDo); // Khôi phục lại số lượng trước đó
        return; // Thoát khỏi hàm nếu điều kiện không hợp lệ
      }

      toast.success("Thay đổi số lượng thành công");
      LayDanhSachSP();
    } catch (error) {
      console.log(error);
    }
  };

  const Giamlen1 = async (idgh, newQuantity) => {
    try {
      await axios.put(`${ApiCapNhatSoLuongMua}/${idgh}`, {
        idSanPhamChiTiet: idSPCTDangChon,
        soLuong: newQuantity,
      });
      LayDanhSachSP();
      toast.success("Thay đổi số lượng thành công");
    } catch (error) {
      console.log(error);
      toast.error("Có lỗi xảy ra khi cập nhật số lượng");
    }
  };

  const tanglen1 = async (idgh, newQuantity) => {
    try {
      await axios.put(`${ApiCapNhatSoLuongMua}/${idgh}`, {
        idSanPhamChiTiet: idSPCTDangChon,
        soLuong: newQuantity,
      });
      LayDanhSachSP();
      toast.success("Thay đổi số lượng thành công");
    } catch (error) {
      console.log(error);
      toast.warning("Chúng tôi chỉ không còn sản phẩm này ");
    }
  };

  const XoaSPKhoiGioHang = async () => {
    try {
      await axios.delete(`${ApiXoaSPKhoiGioHang}/${IdGioHangChiTiet}`);
      toast.success("Đã xóa SP khỏi Giỏ hàng");
      LayDanhSachSP();
      setReload(!reload);
    } catch (error) {
      console.log(error);

      toast.success("Đã xóa SP khỏi Giỏ hàng");
    }
  };

  // hàm format lại định dạng khi gửi về be loai bo vnd
  const formatCurrencyToNumber = (value) => {
    return parseInt(value.replace(/[^\d]/g, ""));
  };

  //Them VND
  function formatTien(value) {
    // Loại bỏ dấu phân cách thập phân và chuyển thành số
    const parsedValue = parseFloat(value.toString().replace(",", "."));

    // Kiểm tra nếu không phải số hợp lệ
    if (isNaN(parsedValue)) {
      return "0 VNĐ"; // Giá trị mặc định nếu `value` không hợp lệ
    }

    // Định dạng số và thêm đơn vị VNĐ
    return parsedValue.toLocaleString("vi-VN") + " VNĐ";
  }

  useEffect(() => {
    LayDanhSachSP();
  }, []);

  //  state để lưu danh sách sản phẩm được chọn từ LocalStorage
  const [sanPhamChon, setSanPhamChon] = useState(() => {
    const storedData = localStorage.getItem("sanPhamChon");
    // Nếu có dữ liệu trong LocalStorage, parse nó thành mảng, nếu không thì khởi tạo là mảng rỗng
    return storedData ? JSON.parse(storedData) : [];
  });

  //  state để lưu tổng tiền
  const [tongTien, setTongTien] = useState(0);
  //  state để theo dõi trạng thái checkbox "Tất cả"
  const [tatCaChecked, setTatCaChecked] = useState(false);

  // Hàm để toggle trạng thái checkbox "Tất cả"
  const toggleTatCaCheckbox = () => {
    if (tatCaChecked) {
      // Nếu đang checked "Tất cả", bỏ chọn tất cả
      setSanPhamChon([]);
    } else {
      // Nếu chưa checked "Tất cả", chọn tất cả sản phẩm
      const allIds = ListSPCT.map((spct) => spct.id); // Lấy tất cả ID sản phẩm
      setSanPhamChon(allIds);
    }
    // Đảo trạng thái checkbox "Tất cả"
    setTatCaChecked(!tatCaChecked);
  };

  // Hàm để toggle trạng thái sản phẩm riêng lẻ
  const toggleSanPham = (id) => {
    setSanPhamChon(
      (prev) =>
        prev.includes(id)
          ? prev.filter((spId) => spId !== id) // Nếu đã chọn, bỏ chọn
          : [...prev, id], // Nếu chưa chọn, thêm vào danh sách
    );
  };

  // useEffect để cập nhật trạng thái checkbox "Tất cả" dựa trên danh sách sản phẩm được chọn
  useEffect(() => {
    setTatCaChecked(sanPhamChon.length === ListSPCT.length);
  }, [sanPhamChon, ListSPCT]);

  // useEffect để tính tổng tiền dựa trên danh sách sản phẩm được chọn
  useEffect(() => {
    const tong = ListSPCT.reduce((total, spct) => {
      if (sanPhamChon.includes(spct.id)) {
        return total + formatCurrencyToNumber(spct.donGia) * spct.soLuong;
      }
      return total;
    }, 0);
    setTongTien(tong);
  }, [sanPhamChon, ListSPCT]);

  // useEffect để lưu sản phẩm được chọn vào localStorage
  useEffect(() => {
    localStorage.setItem("sanPhamChon", JSON.stringify(sanPhamChon));
    // setTatCaChecked(false);
  }, [sanPhamChon]);

  return (
    <>
      <div className="container my-8 h-auto">
        <div className="mx-auto text-center">
          <h1 className="text-2xl font-bold">Giỏ Hàng</h1>
          <hr
            style={{ borderColor: "orange", width: "30%", margin: "0 auto" }}
          />
        </div>

        <div className="mx-36 flex gap-6">
          {/* Danh sach hang hoa */}
          <div className="h-auto w-2/3">
            <div className="my-5 flex border-b p-2 shadow drop-shadow-xl">
              <div className="w-10">
                <Checkbox
                  checked={tatCaChecked}
                  onChange={toggleTatCaCheckbox}
                />
              </div>
              <span className="ml-14">Hình ảnh</span>
              <span className="ml-20">Sản phẩm</span>
              <span className="ml-[360px]">Tổng cộng</span>
            </div>
            {/* Hang hoa */}
            <div>
              {ListSPCT.map((spct, index) => (
                <div
                  className="my-5 flex h-auto border-b p-2 shadow drop-shadow-xl"
                  key={index}
                  onMouseOver={() => {
                    setIdGioHangChiTiet(spct.id);
                    setThayDoiSoLuongMua(spct.soLuong);
                    setIdSPCTDangChon(spct.idSanPhamChiTiet);
                  }}
                >
                  <div className="flex w-10 items-center justify-center">
                    <Checkbox
                      checked={sanPhamChon.includes(spct.id)}
                      onChange={() => toggleSanPham(spct.id)}
                    />
                  </div>
                  {/* Anh san pham */}
                  <div className="ml-10 flex items-center justify-center">
                    <LayANhTheoIDSp
                      id={spct.idSanPhamChiTiet}
                      className="h-[100px] w-[100px]"
                    />
                  </div>
                  {/* Thong tin sna pham */}
                  <div className="ml-10 w-[400px]">
                    <div>
                      <ThongTinSPCT id={spct.idSanPhamChiTiet} />
                      <p className="mt-2">Giá: {spct.donGia}</p>
                      <p className="mt-2">
                        Số lượng:
                        <button
                          className="mx-3"
                          onMouseOver={() =>
                            setIdSPCTDangChon(spct.idSanPhamChiTiet)
                          }
                          onClick={() => {
                            if (thaydoiSoLuongMua > 1) {
                              setThayDoiSoLuongMua(thaydoiSoLuongMua - 1); // Giảm ngay trong giao diện
                              Giamlen1(spct.idGioHang, thaydoiSoLuongMua - 1); // Gửi API
                            } else {
                              toast.error("Số lượng không thể nhỏ hơn 1");
                            }
                          }}
                        >
                          -
                        </button>
                        <Input
                          type="text"
                          className="w-20 text-center"
                          min={1}
                          value={
                            idSPCTDangChon === spct.idSanPhamChiTiet
                              ? thaydoiSoLuongMua
                              : spct.soLuong
                          }
                          onClick={() => {
                            setIdSPCTDangChon(spct.idSanPhamChiTiet);
                            setThayDoiSoLuongMua(spct.soLuong);
                            setIdGH(spct.idGioHang);
                          }}
                          onInput={(e) => {
                            const currentValue = e.target.value.replace(
                              /[^0-9]/g,
                              "",
                            ); // Chỉ giữ lại số
                            if (
                              currentValue === "" ||
                              Number(currentValue) < 1
                            ) {
                              e.target.value = "1"; // Ngăn không cho giá trị nhỏ hơn 1
                            } else {
                              setThayDoiSoLuongMua(Number(currentValue));
                            }
                          }}
                          onChange={(e) => {
                            const value = Number(e.target.value);
                            if (value >= 1) {
                              setThayDoiSoLuongMua(value);
                            }
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              upDateSoLuongMua();
                            }
                          }}
                        />
                        <button
                          className="ml-3"
                          onMouseOver={() =>
                            setIdSPCTDangChon(spct.idSanPhamChiTiet)
                          }
                          onClick={() => {
                            setThayDoiSoLuongMua(thaydoiSoLuongMua + 1); // Tăng ngay trong giao diện
                            tanglen1(spct.idGioHang, thaydoiSoLuongMua + 1); // Gửi API
                          }}
                        >
                          +
                        </button>
                      </p>
                    </div>
                  </div>
                  {/* Tong cong */}
                  <div className="ml-14">
                    <div className="flex items-center justify-center"></div>
                    <div className="mt-3 flex items-center justify-center">
                      {/* Tong tien */}
                      {/* <p>200000</p> */}
                      <p>
                        {formatTien(
                          formatCurrencyToNumber(spct.donGia) * spct.soLuong,
                        )}
                      </p>
                    </div>
                    <div
                      className="mt-4 flex items-center justify-center hover:cursor-pointer"
                      onMouseOver={() => {
                        setIdGioHangChiTiet(spct.id);
                      }}
                      onMouseLeave={() => {
                        setIdGioHangChiTiet(0);
                      }}
                    >
                      <p>
                        <Popconfirm
                          title="Xóa khỏi giỏ hàng"
                          description="Bạn có chắc cahwns không?"
                          okText="Có"
                          cancelText="Hủy"
                          onConfirm={(e) => {
                            e.preventDefault();
                            XoaSPKhoiGioHang();
                          }}
                        >
                          <TrashIcon
                            className="w-6 text-red-600"
                            // onClick={XoaSPKhoiGioHang}
                          />
                        </Popconfirm>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Het 1 SP */}
          </div>
          {/* Tam tinh */}
          <div className="w-1/3">
            <div className="h-auto">
              <div className="p-3">
                {/* <div>
                  <hr
                    style={{
                      borderColor: "black",
                      width: "100%",
                      margin: "0 auto",
                    }}
                  />
                </div> */}
                {/* Thong tin thanh toan */}
                <div>
                  <div className="text-lg font-bold">
                    <div className="my-4 flex items-center justify-between">
                      <div>Tổng tiền: {formatTien(tongTien)}</div>
                    </div>
                  </div>
                </div>
                <hr
                  style={{
                    borderColor: "black",
                    width: "100%",
                    margin: "0 auto",
                  }}
                />
                {/* Nut thanh toan */}
                <div className="mt-3">
                  <Link to="/dathang">
                    <button
                      disabled={tongTien === 0}
                      className={`h-16 w-full rounded-lg border text-2xl font-semibold text-white transition duration-300 ease-in-out ${tongTien === 0 ? "cursor-not-allowed bg-gray-400" : "bg-orange-600 hover:bg-black"}`}
                    >
                      Tiếp tục mua hàng
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Zoom}
      /> */}
    </>
  );
}
