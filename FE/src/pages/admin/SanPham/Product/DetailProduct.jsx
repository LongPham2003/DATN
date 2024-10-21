import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import LayAnhTheoIdSP from "./LayANhTheoIDSP";
import { Select } from "antd";
import ReactPaginate from "react-paginate";

export default function DetailProduct() {
  const { id } = useParams();

  const [SPCTbyIdSP, setSPCTbyIdSP] = useState([]);
  const [hangs, setHangs] = useState([]);
  const [mauSacs, setMauSacs] = useState([]);
  const [chatLieus, setChatLieus] = useState([]);
  const [kichThuocs, setKichThuocs] = useState([]);
  const [deGiays, setDeGiays] = useState([]);

  const [trangThai, setTrangThai] = useState(null);

  const [selectedIdHang, setSelectedIdHang] = useState(null);
  const [selectedIdMauSac, setSelectedIdMauSac] = useState(null);
  const [selectedIdChatLieu, setSelectedIdChatLieu] = useState(null);
  const [selectedIdKichThuoc, setSelectedIdKichThuoc] = useState(null);
  const [selectedIdDeGiay, setSelectedIdDeGiay] = useState(null);
  const [minDonGia, setMinDonGia] = useState(0);
  const [maxDonGia, setMaxDonGia] = useState(10000000000);

  const [trangHienTai, setTrangHienTai] = useState(1);
  const [tongSoTrang, setTongSoTrang] = useState(0);

  const pageSize = 5;

  // let ApiLaySPCTTheoIdSP = `http://localhost:8080/api/sanphamchitiet/getidsanpham/${id}`;

  // const getByIdSP = async () => {
  //   const data = await axios.get(ApiLaySPCTTheoIdSP);
  //   setSPCTbyIdSP(data.data.result);
  //   console.log(data.data.result);
  // };

  // useEffect(() => {
  //   getByIdSP();
  //   // layAnh();
  // }, []);

  // lấy toàn bộ spct theo id sản phẩm
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/sanphamchitiet/list/${id}`, {
        params: {
          pageNumber: trangHienTai,
          idMauSac: selectedIdMauSac,
          idkichThuoc: selectedIdKichThuoc,
          idChatLieu: selectedIdChatLieu,
          idThuongHieu: selectedIdHang,
          idDeGiay: selectedIdDeGiay,
          minDonGia: minDonGia,
          maxDonGia: maxDonGia,
          trangThai: trangThai !== null ? trangThai : undefined, // Nếu trangThai là null, không gửi tham số
        },
      })
      .then(async (res) => {
        const data = res.data;
        setSPCTbyIdSP(data.result.result);
        setTongSoTrang(data.result.totalPages);
      })
      .catch((error) => {
        console.error("Lỗi" + error);
      });
  }, [
    id,
    selectedIdHang,
    trangThai,
    selectedIdMauSac,
    selectedIdChatLieu,
    selectedIdDeGiay,
    selectedIdKichThuoc,
    trangHienTai,
    maxDonGia,
    minDonGia,
  ]);

  const handlePageChange = (selectedPage) => {
    setTrangHienTai(selectedPage.selected + 1);
  };

  //lấy toàn bộ dữ liệu các thuộc tính
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/thuonghieu/getall")
      .then(async (response) => {
        setHangs(response.data.result);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy danh sách hãng:", error);
      });

    axios
      .get("http://localhost:8080/api/mausac/getall")
      .then((response) => {
        setMauSacs(response.data.result);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy danh sách màu sắc:", error);
      });
    axios
      .get("http://localhost:8080/api/chatlieu/getall")
      .then((response) => {
        setChatLieus(response.data.result);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy danh sách chất liệu:", error);
      });
    axios
      .get("http://localhost:8080/api/kichthuoc/getall")
      .then((response) => {
        setKichThuocs(response.data.result);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy danh sách kích thước:", error);
      });
    axios
      .get("http://localhost:8080/api/degiay/getall")
      .then((response) => {
        setDeGiays(response.data.result);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy danh sách đế giày:", error);
      });
  }, []);

  const handleResetSelectedChange = () => {
    setSelectedIdChatLieu(null);
    setSelectedIdDeGiay(null);
    setSelectedIdHang(null);
    setSelectedIdKichThuoc(null);
    setSelectedIdMauSac(null);
    setTrangThai(null);
  };

  return (
    <>
      <div className="bg-slate-300">
        <div className="flex justify-center gap-5">
          <div>
            <p className="font-bold">Hãng</p>
            <Select
              className="h-[38px] w-[250px]"
              placeholder="Chọn thương hiệu ..."
              size="large"
              value={selectedIdHang} // Liên kết giá trị với state
              options={hangs.map((item) => ({
                label: item.ten,
                value: item.id,
              }))}
              onChange={(value) => setSelectedIdHang(value)} // Gọi hàm khi có thay đổi
            />
          </div>
          <div>
            <p className="font-bold">Màu sắc</p>
            <Select
              className="h-[38px] w-[250px]"
              placeholder="Chọn màu sắc ..."
              size="large"
              value={selectedIdMauSac} // Liên kết giá trị với state
              options={mauSacs.map((item) => ({
                label: item.ten,
                value: item.id,
              }))}
              onChange={(value) => setSelectedIdMauSac(value)}
            />
          </div>
          <div>
            <p className="font-bold">Chất liệu</p>
            <Select
              className="h-[38px] w-[250px]"
              placeholder="Chọn chất liệu ..."
              size="large"
              value={selectedIdChatLieu}
              options={chatLieus.map((item) => ({
                label: item.ten,
                value: item.id,
              }))}
              onChange={(value) => setSelectedIdChatLieu(value)}
            />
          </div>
          <div>
            <p className="font-bold">Kích thước</p>
            <Select
              className="h-[38px] w-[250px]"
              placeholder="Chọn kích thước ..."
              size="large"
              value={selectedIdKichThuoc}
              options={kichThuocs.map((item) => ({
                label: item.kichThuoc,
                value: item.id,
              }))}
              onChange={(value) => setSelectedIdKichThuoc(value)}
            />
          </div>
        </div>
        <div className="flex justify-center gap-5 py-5">
          <div>
            <p className="font-bold">Đế giày</p>
            <Select
              className="h-[38px] w-[250px]"
              placeholder="Chọn đế giày ..."
              size="large"
              value={selectedIdDeGiay}
              options={deGiays.map((item) => ({
                label: item.ten,
                value: item.id,
              }))}
              onChange={(value) => setSelectedIdDeGiay(value)}
            />
          </div>
          <div>
            <p className="font-bold">Trạng thái</p>
            <select
              name="trangThai"
              id="trangThai"
              value={trangThai}
              className="h-[38px] w-[250px] rounded border border-gray-300 p-2"
              onChange={(e) => {
                const value =
                  e.target.value === "" ? null : e.target.value === "true";
                setTrangThai(value);
              }}
            >
              <option value="">Tất cả</option>
              <option value="true">Hoạt động</option>
              <option value="false">Không hoạt động</option>
            </select>
          </div>
          <div>
            <p className="font-bold">Giá min</p>
            <input
              className="h-[38px] w-[250px] rounded border border-gray-300 p-2"
              type="text"
              placeholder="Mời nhập giá thấp nhất...."
              onChange={(e) => setMinDonGia(e.target.value)}
            />
          </div>
          <div>
            <p className="font-bold">Giá max</p>
            <input
              className="h-[38px] w-[250px] rounded border border-gray-300 p-2"
              placeholder="Mời nhập giá cao nhất...."
              type="text"
              onChange={(e) => setMaxDonGia(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-center gap-8 py-3">
          <button
            className="rounded bg-blue-500 px-2 py-1 text-white"
            onClick={handleResetSelectedChange}
          >
            Reset tất cả
          </button>
        </div>
      </div>
      <div className="mx-5 my-5">
        <span className="mb-5 text-xl font-bold">
          Danh sách sản phẩm chi tiết của sản phẩm
        </span>
        <div className="flex justify-center">
          <div className="min-w-full">
            {/* Thêm max-height và overflow-y-auto để tạo thành cuộn */}
            <div className="max-h-[500px] overflow-y-auto">
              <table className="min-w-full border border-gray-300 bg-white">
                <thead>
                  <tr className="h-10 rounded-2xl border-b-2 text-base shadow-inner">
                    <th className="w-10">STT</th>
                    <th className="w-[100px] border-b">Ảnh</th>
                    <th className="w-[100px] border-b">Chất liệu</th>
                    <th className="w-[100px] border-b">Màu</th>
                    <th className="w-[100px] border-b">Kích thước</th>
                    <th className="w-[100px] border-b">Thương Hiệu</th>
                    <th className="w-[100px] border-b">Đế giày</th>
                    <th className="w-[100px] border-b">Đơn giá</th>
                    <th className="w-[100px] border-b">Số lượng</th>
                    <th className="w-[100px] border-b">Trạng thái</th>
                    <th className="w-[100px] border-b">Hành động</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {SPCTbyIdSP.map((item, index) => (
                    <tr key={item.id}>
                      <td className="border-b px-4 py-2">
                        {index + 1 + (trangHienTai - 1) * pageSize}
                      </td>
                      <td className="border-b-[1px] border-indigo-500">
                        <LayAnhTheoIdSP
                          id={item.id}
                          className="h-[50px] w-[50px]"
                        />
                      </td>
                      <td className="border-b-[1px] border-indigo-500">
                        {item.chatLieu}
                      </td>
                      <td className="border-b-[1px] border-indigo-500">
                        {item.mauSac}
                      </td>
                      <td className="border-b-[1px] border-indigo-500">
                        {item.kichThuoc}
                      </td>
                      <td className="border-b-[1px] border-indigo-500">
                        {item.thuongHieu}
                      </td>
                      <td className="border-b-[1px] border-indigo-500">
                        {item.deGiay}
                      </td>
                      <td className="border-b-[1px] border-indigo-500">
                        {item.donGia}
                      </td>
                      <td className="border-b-[1px] border-indigo-500">
                        {item.soLuong}
                      </td>
                      <td className="border-b-[1px] border-indigo-500">
                        {item.trangThai ? "ban" : "deo ban nua"}
                      </td>
                      <td className="border-b-[1px] border-indigo-500">1</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mr-14 mt-4 flex justify-center">
              <ReactPaginate
                previousLabel={"< Previous"}
                nextLabel={"Next >"}
                breakLabel={"..."}
                pageCount={tongSoTrang}
                marginPagesDisplayed={2}
                pageRangeDisplayed={2}
                onPageChange={handlePageChange}
                containerClassName={"flex"}
                previousClassName={"mx-1"}
                previousLinkClassName={
                  "px-3 py-1 border border-gray-300 rounded-full hover:bg-gray-200 transition duration-200"
                }
                nextClassName={"mx-1"}
                nextLinkClassName={
                  "px-3 py-1 border border-gray-300 rounded-full hover:bg-gray-200 transition duration-200"
                }
                breakClassName={"mx-1"}
                breakLinkClassName={
                  "px-3 py-1 border border-gray-300 rounded-full hover:bg-gray-200 transition duration-200"
                }
                pageClassName={"mx-1"}
                pageLinkClassName={
                  "px-3 py-1 border-b border-green-300 rounded-full hover:bg-green-500 transition duration-200"
                }
                activeClassName={"bg-green-500 rounded-full text-white"}
                activeLinkClassName={
                  "px-4 py-2 bg-green-500 text-white rounded-full"
                }
              />
            </div>
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
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
    </>
  );
}
