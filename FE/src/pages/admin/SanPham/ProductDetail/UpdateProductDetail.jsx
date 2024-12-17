import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Button, Input, Popconfirm, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "../../../../api/axiosConfig.js";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import ImageUpload from "./UploadAnh";
import GetImage from "./GetImage";

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

  const [hinhAnh, setHinhAnh] = useState([]);
  const [anhMoi, setAnhMoi] = useState([]);

  const getSPCTById = `http://localhost:8080/api/sanphamchitiet/getspctdetail/${id}`;
  const getSPById = `http://localhost:8080/api/sanpham`;
  const getHinhAnh = `http://localhost:8080/api/hinhanh/tatcathinhanh`;

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
      const haRes = await axios.get(`${getHinhAnh}/${id}`);
      const imageList = haRes.data.result.map((image) => ({
        id: image.id,
        name: image.tenAnh,
        url: image.duLieuAnhBase64,
      }));
      setHinhAnh(imageList);
      // console.log(haRes.data.result);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu:", error);
    }
  };

  const UpdateProductDetail = async (e) => {
    e.preventDefault();

    // Kiểm tra nếu không có ảnh
    if (!hinhAnh || hinhAnh.length === 0) {
      toast.error("Vui lòng thêm ít nhất một ảnh sản phẩm", {
        autoClose: 1000,
      });
      return;
    }

    // Đối tượng chi tiết sản phẩm mới cần cập nhật
    const newProductDetail = {
      idSanPham: SPCT.idSanPham,
      idChatLieu: SPCT.idChatLieu,
      idMauSac: SPCT.idMauSac,
      idKichThuoc: SPCT.idKichThuoc,
      idThuongHieu: SPCT.idThuongHieu,
      idDeGiay: SPCT.idDeGiay,
      soLuong: SPCT.soLuong,
      donGia: SPCT.donGia.replace(/\D/g, ""),
      trangThai: SPCT.trangThai,
    };

    try {
      // Kiểm tra xem có ảnh nào bị null hoặc undefined không
      const hasInvalidImage = hinhAnh.some(
        (anh) => !anh.url && !anh.duLieuAnhBase64,
      );

      if (hasInvalidImage) {
        toast.error("Có ảnh không hợp lệ, vui lòng kiểm tra lại", {
          autoClose: 1000,
        });
        return;
      }

      await axios.put(
        `http://localhost:8080/api/sanphamchitiet/update/${id}`,
        newProductDetail,
      );

      // Xử lý ảnh: cả ảnh cũ và ảnh mới đều được gửi lại
      await Promise.all(
        hinhAnh.map(async (anh) => {
          const newAnh = {
            id: anh.id,
            tenAnh: SP.tenSanPham,
            idSanPhamChiTiet: id,
            duLieuAnhBase64: anh.url || anh.duLieuAnhBase64,
            trangThai: true,
          };

          // Kiểm tra nếu ảnh đã có ID, tức là ảnh cũ => cập nhật
          if (anh.id) {
            // console.log("Cập nhật ảnh cũ:", newAnh);
            return axios.put(
              `http://localhost:8080/api/hinhanh/update/${anh.id}`,
              newAnh,
            );
          }
          // Nếu không có ID, tức là ảnh mới => tạo mới
          else {
            // console.log("Tạo ảnh mới:", newAnh);
            return axios.post(`http://localhost:8080/api/hinhanh/add`, newAnh);
          }
        }),
      );

      toast.success("Cập nhật thành công", { autoClose: 700 });
      setTimeout(() => {
        navigate(`/admin/chitietsanpham/${SPCT.idSanPham}`);
      }, 1200);
    } catch (error) {
      toast.error("Cập nhật thất bại", { autoClose: 1000 });
      console.error(error);
    }
  };

  useEffect(() => {
    getData(); // lay dữ liệu\
    console.log(hinhAnh);
  }, []);

  return (
    <>
      <div className="mx-10 font-mono">
        <div>
          <div className="my-5 flex justify-center">
            <span className="text-3xl font-bold">Thông tin sản phẩm</span>
          </div>
          <div>
            <label>Tên sản phẩm</label>
            <Input size="large" value={SP.tenSanPham} disabled />
          </div>
          <div>
            <label>Mô tả</label>
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
                  const rawValue = e.target.value.replace(/\D/g, ""); // Loại bỏ tất cả ký tự không phải số
                  const formattedValue = new Intl.NumberFormat("vi-VN").format(
                    rawValue,
                  ); // Định dạng số theo kiểu Việt Nam
                  setSPCT({ ...SPCT, donGia: formattedValue }); // Cập nhật giá trị đã định dạng vào state SPCT
                }}
              />
            </div>
            <div className="my-4">
              <label>Thương hiệu:</label>
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
                disabled
              />
            </div>
            <div className="my-4">
              <label htmlFor="">Chất liệu:</label>
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
              <label htmlFor="">Màu sắc:</label>
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
                  const rawValue = e.target.value.replace(/\D/g, ""); // Loại bỏ ký tự không phải số
                  if (!isNaN(rawValue) && Number(rawValue) >= 0) {
                    setSPCT({ ...SPCT, soLuong: rawValue }); // Cập nhật nếu giá trị >= 0
                  }
                }}
              />
            </div>
            <div className="my-4">
              <label htmlFor="">Kích thước:</label>
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
              <label htmlFor="">Đế giày:</label>
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
              <label htmlFor="">Trạng thái:</label>
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
        <div className="h-[200px]">
          <div className="my-5 flex justify-start gap-5">
            <div>
              <span className="text-3xl font-bold">Ảnh sản phẩm:</span>
            </div>
            <div>
              <GetImage fileList={hinhAnh} setFileList={setHinhAnh} />
            </div>
          </div>
        </div>
        <div className="mr-10 mt-5 flex justify-end gap-6">
          <Popconfirm
            title="Sửa sản phẩm"
            description="Bạn có chắc chắn muốn sửa sản phẩm này không?"
            okText="Sửa"
            cancelText="Không"
            onConfirm={UpdateProductDetail}
          >
            <Button type="primary">
              <CheckCircleOutlined /> Lưu
            </Button>
          </Popconfirm>
          <Button
            color="danger"
            variant="solid"
            onClick={(e) => {
              // Kiểm tra nếu không có ảnh
              if (!hinhAnh || hinhAnh.length === 0) {
                toast.error("Vui lòng thêm ít nhất một ảnh sản phẩm trước khi quay lại", {
                  autoClose: 1000,
                });
                return; // Ngăn không cho quay lại
              }
              navigate(`/admin/chitietsanpham/${SPCT.idSanPham}`);
            }}
          >
            <CloseCircleOutlined /> Quay lại
          </Button>
        </div>
      </div>
      {/* <ToastContainer /> */}
    </>
  );
}
