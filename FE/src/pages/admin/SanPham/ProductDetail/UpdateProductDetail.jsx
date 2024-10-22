import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Button, Input, Popconfirm, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function UpdateProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [idSanPham, setIdSanPham] = useState();
  const [SPCT, setSPCT] = useState({});
  const [SP, setSP] = useState({});
  const [hangs, setHangs] = useState([]);
  const [mauSacs, setMauSacs] = useState([]);
  const [chatLieus, setChatLieus] = useState([]);
  const [kichThuocs, setKichThuocs] = useState([]);
  const [deGiays, setDeGiays] = useState([]);

  const [trangThai, setTrangThai] = useState(null);

  const getSPCTById = `http://localhost:8080/api/sanphamchitiet/getSPCTDetail/${id}`;
  const getSPById = `http://localhost:8080/api/sanpham`;

  const getData = async () => {
    try {
      // Thực hiện tất cả các yêu cầu API cùng lúc
      const [
        spctRes,
        hangRes,
        mauSacRes,
        chatLieuRes,
        kichThuocRes,
        deGiayRes,
      ] = await Promise.all([
        axios.get(getSPCTById),
        axios.get("http://localhost:8080/api/thuonghieu/getall"),
        axios.get("http://localhost:8080/api/mausac/getall"),
        axios.get("http://localhost:8080/api/chatlieu/getall"),
        axios.get("http://localhost:8080/api/kichthuoc/getall"),
        axios.get("http://localhost:8080/api/degiay/getall"),
      ]);

      const spctData = spctRes.data.result;
      setSPCT(spctData);
      setIdSanPham(spctData.idSP);
      setHangs(hangRes.data.result);
      setMauSacs(mauSacRes.data.result);
      setChatLieus(chatLieuRes.data.result);
      setKichThuocs(kichThuocRes.data.result);
      setDeGiays(deGiayRes.data.result);
      // console.log(spctRes.data.result);

      // Sau khi lấy thông tin sản phẩm chi tiết, lấy thêm thông tin sản phẩm
      const spRes = await axios.get(`${getSPById}/${spctData.idSanPham}`);
      setSP(spRes.data.result);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu:", error);
    }
  };

  const UpdateProductDetail = async (e) => {
    e.preventDefault();
    const newProductDetail = {
      idSanPham: SPCT.idSanPham,
      idChatLieu: SPCT.idChatLieu,
      idMauSac: SPCT.idMauSac,
      idKichThuoc: SPCT.idKichThuoc,
      idThuongHieu: SPCT.idThuongHieu,
      idDeGiay: SPCT.idDeGiay,
      soLuong: SPCT.soLuong,
      donGia: SPCT.donGia,
      trangThai: SPCT.trangThai,
    };
    try {
      await axios.put(
        `http://localhost:8080/api/sanphamchitiet/update/${id}`,
        newProductDetail,
      );
      toast.success("Sửa thành công", { autoClose: 1000 });
      setTimeout(() => {
        navigate(`/admin/chitietsanpham/${SPCT.idSanPham}`); // Load lại trang sau 1 giây
      }, 1700);
    } catch (error) {
      toast.error("Sửa thất bại", { autoClose: 1000 });
      console.log(error);
    }
  };

  useEffect(() => {
    getData(); // lay dữ liệu
  }, []);

  return (
    <>
      <div className="mx-10 font-mono">
        <div>
          <div className="my-5 flex justify-center">
            <span className="text-3xl font-bold">Thong tin san pham</span>
          </div>
          <div>
            <label>Ten San Pham</label>
            <Input size="large" value={SP.tenSanPham} disabled />
          </div>
          <div>
            <label>Mo Ta</label>
            <TextArea size="large" value={SP.moTa} disabled />
          </div>
        </div>
        <div className="ml-20 flex gap-9">
          <div>
            <div className="my-4">
              <label>Ngày tạo:</label>
              <Input
                style={{
                  width: "500px",
                  marginLeft: "37px",
                }}
                size="large"
                value={SPCT.ngayTao}
                disabled
              />
            </div>
            <div className="my-4">
              <label htmlFor="">Giá bán:</label>
              <Input
                style={{
                  width: "500px",
                  marginLeft: "43px",
                }}
                size="large"
                value={SPCT.donGia}
                onChange={(e) => {
                  setSPCT({ ...SPCT, donGia: e.target.value }); // Sửa Dữ liệu trược tiếp vào Sate SPCT
                  // console.log(value);
                }}
              />
            </div>
            <div className="my-4">
              <label>Thuong Hieu:</label>
              <Select
                style={{
                  width: "500px",
                  marginLeft: "10px",
                }}
                size="large"
                value={SPCT.idThuongHieu}
                options={hangs.map((item) => ({
                  label: item.ten,
                  value: item.id,
                }))}
                onChange={(value) => {
                  setSPCT({ ...SPCT, idThuongHieu: value }); // Sửa Dữ liệu trược tiếp vào Sate SPCT
                  // console.log(value);
                }}
              />
            </div>
            <div className="my-4">
              <label htmlFor="">Chat Lieu:</label>
              <Select
                style={{
                  width: "500px",
                  marginLeft: "27px",
                }}
                size="large"
                value={SPCT.idChatLieu}
                options={chatLieus.map((item) => ({
                  label: item.ten,
                  value: item.id,
                }))}
                onChange={(value) => {
                  setSPCT({ ...SPCT, idChatLieu: value }); // Sửa Dữ liệu trược tiếp vào Sate SPCT
                  // console.log(value);
                }}
              />
            </div>
            <div className="my-4">
              <label htmlFor="">Mau Sac:</label>
              <Select
                style={{
                  width: "500px",
                  marginLeft: "43px",
                }}
                size="large"
                value={SPCT.idMauSac}
                options={mauSacs.map((item) => ({
                  label: item.ten,
                  value: item.id,
                }))}
                onChange={(value) => {
                  setSPCT({ ...SPCT, idMauSac: value }); // Sửa Dữ liệu trược tiếp vào Sate SPCT
                  // console.log(value);
                }}
              />
            </div>
          </div>
          <div>
            <div className="my-4">
              <label>Ngày cập nhật:</label>
              <Input
                style={{
                  width: "500px",
                  marginLeft: "7px",
                }}
                size="large"
                value={SPCT.ngayCapNhat}
                disabled
              />
            </div>
            <div className="my-4">
              <label htmlFor="">Số lượng:</label>
              <Input
                style={{
                  width: "500px",
                  marginLeft: "48px",
                }}
                size="large"
                value={SPCT.soLuong}
                onChange={(e) => {
                  setSPCT({ ...SPCT, soLuong: e.target.value }); // Sửa Dữ liệu trược tiếp vào Sate SPCT
                  // console.log(value);
                }}
              />
            </div>
            <div className="my-4">
              <label htmlFor="">Kich Thuoc:</label>
              <Select
                style={{
                  width: "500px",
                  marginLeft: "32px",
                }}
                size="large"
                value={SPCT.idKichThuoc}
                options={kichThuocs.map((item) => ({
                  label: item.kichThuoc,
                  value: item.id,
                }))}
                onChange={(value) => {
                  setSPCT({ ...SPCT, idKichThuoc: value }); // Sửa Dữ liệu trược tiếp vào Sate SPCT
                  // console.log(value);
                }}
              />
            </div>
            <div className="my-4">
              <label htmlFor="">De Giay:</label>
              <Select
                style={{
                  width: "500px",
                  marginLeft: "58px",
                }}
                size="large"
                value={SPCT.idDeGiay}
                options={deGiays.map((item) => ({
                  label: item.ten,
                  value: item.id,
                }))}
                onChange={(value) => {
                  setSPCT({ ...SPCT, idDeGiay: value }); // Sửa Dữ liệu trược tiếp vào Sate SPCT
                  // console.log(value);
                }}
              />
            </div>

            <div className="my-4">
              <label htmlFor="">Trang Thai:</label>
              <Select
                style={{
                  width: "500px",
                  marginLeft: "31px",
                }}
                size="large"
                value={SPCT.trangThai}
                options={[
                  {
                    value: true,
                    label: "Đang bán",
                  },
                  {
                    value: false,
                    label: "Ngừng Bán",
                  },
                ]}
                onChange={(value) => {
                  setSPCT({ ...SPCT, trangThai: value }); // Sửa Dữ liệu trược tiếp vào Sate SPCT
                  // console.log(value);
                }}
              />
            </div>
          </div>
        </div>
        <div className="h-[300px] bg-slate-100">
          <div className="my-5 flex justify-center">
            <span className="text-3xl font-bold">Anh San Pham</span>
          </div>
        </div>
        <div className="mt-5 flex justify-end gap-6">
          <Popconfirm
            title="Sửa sản phẩm"
            description="Bạn có chắc chắn muốn sửa sản phẩm này không?"
            okText="Sửa"
            cancelText="Không"
            onConfirm={UpdateProductDetail}
          >
            <Button type="primary">
              <CheckCircleOutlined /> Luu
            </Button>
          </Popconfirm>
          <Button
            color="danger"
            variant="solid"
            onClick={(e) => navigate(`/admin/chitietsanpham/${SPCT.idSanPham}`)}
          >
            <CloseCircleOutlined /> Quay lai
          </Button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
