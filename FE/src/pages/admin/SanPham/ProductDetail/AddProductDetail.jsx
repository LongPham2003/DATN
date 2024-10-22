import {
  PlusCircleOutlined,
  SettingOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { TrashIcon } from "@heroicons/react/16/solid";
import {
  Button,
  Checkbox,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Select,
  Upload,
} from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import ImageUpload from "./UploadAnh";

export default function AddProductDetail() {
  let { id } = useParams();
  const [tenSP, SetTenSP] = useState("");
  const [listMauSac, setListMauSac] = useState([]);
  const [listDeGiay, setListDeGiay] = useState([]);
  const [listChatLieu, setListChatLieu] = useState([]);
  const [listKichThuoc, setListKichThuoc] = useState([]);
  const [listThuongHieu, setListThuongHieu] = useState([]);
  const [getIdDeGiay, setGetIdDeGiay] = useState(0);
  const [getIdThuongHieu, setGetIdThuongHieu] = useState(0);
  const [getIdChatLieu, setGetIdChatLieu] = useState(0);
  const [getIdMauSac, setGetIdMauSac] = useState([]);
  const [getIdKichThuoc, setGetIdKichThuoc] = useState([]);
  const [listSPCT, setListSPCT] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]); // Lưu trữ các sản phẩm được chọn
  const [open, setOpen] = useState(false);

  const [selectAll, setSelectAll] = useState(false);
  const navigate = useNavigate();

  // Các API URLs
  let ApiGetSPById = `http://localhost:8080/api/sanpham/${id}`;
  let ApiGetAllDeGiay = `http://localhost:8080/api/degiay/getall`;
  let ApiGetAllMauSac = `http://localhost:8080/api/mausac/getall`;
  let ApiGetAllChatLieu = `http://localhost:8080/api/chatlieu/getall`;
  let ApiGetAllKichThuoc = `http://localhost:8080/api/kichthuoc/getall`;
  let ApiGetAllThuongHieu = `http://localhost:8080/api/thuonghieu/getall`;
  let ApiAddSPCT = `http://localhost:8080/api/sanphamchitiet/add`;

  //Modal Sua So Luong va Gia Tien
  const showModal = () => {
    if (selectedRows.length > 0) {
      setOpen(true); // Mở Modal nếu có sản phẩm được chọn
    } else {
      alert("Vui lòng chọn ít nhất một sản phẩm để chỉnh sửa.");
    }
  };

  const handleOk = () => {
    const updatedListSPCT = listSPCT.map((SPCT) => {
      const selectedProduct = selectedRows.find((item) => item.id === SPCT.id);
      if (selectedProduct) {
        return {
          ...SPCT,
          soLuong: selectedProduct.soLuong,
          donGia: selectedProduct.donGia,
        };
      }
      return SPCT;
    });

    setListSPCT(updatedListSPCT); // Cập nhật danh sách sản phẩm
    setOpen(false); // Đóng Modal
    setSelectedRows([]); // Clear các sản phẩm đã chọn
    setSelectAll(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  // Lấy dữ liệu sản phẩm
  const layTenSP = async () => {
    const response = await axios.get(ApiGetSPById);
    SetTenSP(response.data.result.tenSanPham);
  };

  const layMauSac = async () => {
    let response = await axios.get(ApiGetAllMauSac);
    setListMauSac(response.data.result);
  };

  const layThuongHieu = async () => {
    let response = await axios.get(ApiGetAllThuongHieu);
    setListThuongHieu(response.data.result);
  };

  const layChatLieu = async () => {
    let response = await axios.get(ApiGetAllChatLieu);
    setListChatLieu(response.data.result);
  };

  const layKichThuoc = async () => {
    let response = await axios.get(ApiGetAllKichThuoc);
    setListKichThuoc(response.data.result);
  };

  const layDeGiay = async () => {
    let response = await axios.get(ApiGetAllDeGiay);
    setListDeGiay(response.data.result);
  };
  // Xử lý render danh sách sản phẩm chi tiết khi chọn kích thước và màu sắc
  useEffect(() => {
    // Kiểm tra nếu danh sách kích thước và màu sắc đều có dữ liệu
    if (getIdKichThuoc.length > 0 && getIdMauSac.length > 0) {
      const listSPCTForAdd = [];

      // Lặp qua từng kích thước
      getIdKichThuoc.forEach((kt) => {
        // Lặp qua từng màu sắc cho mỗi kích thước
        getIdMauSac.forEach((ms) => {
          // Tạo và thêm đối tượng sản phẩm chi tiết vào danh sách
          listSPCTForAdd.push({
            id: Date.now() + Math.random(), // Tạo ID duy nhất dựa trên thời gian và số ngẫu nhiên
            mauSac: ms, // Gán màu sắc sản phẩm
            kichThuoc: kt, // Gán kích thước sản phẩm
            soLuong: 1, // Đặt số lượng mặc định là 1
            donGia: 1000, // Đặt giá đơn vị mặc định là 1000
            fileList: [], // Khởi tạo danh sách file (dùng cho ảnh sản phẩm)
          });
        });
      });

      // Cập nhật danh sách sản phẩm chi tiết
      setListSPCT(listSPCTForAdd);
    } else {
      // Nếu không có kích thước hoặc màu sắc, danh sách sản phẩm chi tiết sẽ trống
      setListSPCT([]);
    }
    // Hủy bỏ các checkbox đã chọn khi danh sách kích thước hoặc màu sắc thay đổi
    setSelectedRows([]);
    setSelectAll(false);
  }, [getIdKichThuoc, getIdMauSac]); // Chỉ chạy khi danh sách kích thước hoặc màu sắc thay đổi

  // Hàm xử lý khi thay đổi số lượng sản phẩm chi tiết
  const handleChangeSoLuongSPCT = (id, value) => {
    // Cập nhật số lượng của sản phẩm chi tiết theo ID
    setListSPCT((prevList) =>
      prevList.map((item) =>
        // Nếu ID trùng khớp, thay đổi số lượng, ngược lại giữ nguyên
        item.id === id ? { ...item, soLuong: value || 0 } : item,
      ),
    );
  };

  // Hàm xử lý khi thay đổi giá bán của sản phẩm chi tiết
  const handleChangeGiaBanSPCT = (id, value) => {
    // Cập nhật giá bán của sản phẩm chi tiết theo ID
    setListSPCT((prevList) =>
      prevList.map((item) =>
        // Nếu ID trùng khớp, thay đổi giá bán, ngược lại giữ nguyên
        item.id === id ? { ...item, donGia: value || 0 } : item,
      ),
    );
  };

  // Hàm xử lý khi xóa sản phẩm chi tiết khỏi danh sách
  const handleRemoveRenderSPCT = (id) => {
    // Lọc và loại bỏ sản phẩm chi tiết có ID trùng khớp
    setListSPCT((prevList) => prevList.filter((item) => item.id !== id));
  };

  // Hàm xử lý khi thay đổi danh sách file (ảnh sản phẩm) của sản phẩm chi tiết
  const handleFileListChange = (id, newFileList) => {
    // Cập nhật danh sách file của sản phẩm chi tiết theo ID
    setListSPCT((prevList) =>
      prevList.map((item) =>
        // Nếu ID trùng khớp, thay đổi danh sách file, ngược lại giữ nguyên
        item.id === id ? { ...item, fileList: newFileList } : item,
      ),
    );
  };

  const handleCheckboxChange = (SPCT) => {
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.includes(SPCT)) {
        return prevSelectedRows.filter((item) => item.id !== SPCT.id);
      } else {
        return [...prevSelectedRows, SPCT];
      }
    });
  };

  // Hàm để kiểm soát chọn tất cả checkbox
  const handleSelectAll = () => {
    setSelectAll(!selectAll); // Đảo ngược trạng thái
    if (!selectAll) {
      // Nếu trước đó chưa chọn tất cả, thì chọn tất cả
      setSelectedRows(listSPCT);
    } else {
      // Nếu trước đó đã chọn tất cả, thì bỏ chọn
      setSelectedRows([]);
    }
  };

  // Hàm xử lý thêm sản phẩm chi tiết (SPCT)
  const AddSPCT = async (e) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của sự kiện submit form
    //kiem tra chon du thuoc tinh chua
    if (getIdDeGiay === 0 || getIdThuongHieu === 0 || getIdChatLieu === 0) {
      toast.error("Vui lòng chọn đầy đủ đế giày, thương hiệu, và chất liệu.", {
        position: "top-right",
        autoClose: 2000, // Toast đóng sau 2 giây
        hideProgressBar: false,
        newestOnTop: false,
        closeOnClick: true,
        rtl: false,
        pauseOnFocusLoss: true,
        draggable: true,
        pauseOnHover: true,
        theme: "light",
      });
      return; // Ngừng thực thi nếu validate không thành công
    }
    let thumbUrls = []; // Biến lưu trữ danh sách URL của các ảnh thu nhỏ (thumbUrl)

    // Tạo mảng các request từ danh sách sản phẩm chi tiết (listSPCT)
    let request = listSPCT.map((item) => {
      // Lấy ra các thumbUrl từ danh sách fileList của sản phẩm
      thumbUrls = item.fileList
        .map((file) => file.thumbUrl) // Lấy thumbUrl từ mỗi file
        .filter((url) => url); // Chỉ giữ lại những URL không rỗng

      // Nếu không có ảnh nào được upload, không tạo request cho sản phẩm này
      if (thumbUrls.length === 0) {
        return false;
      }

      // Tạo đối tượng sản phẩm chi tiết mới (newSPCT)
      const newSPCT = {
        idSanPham: id, // ID của sản phẩm chính
        idChatLieu: getIdChatLieu, // ID chất liệu sản phẩm
        idMauSac: item.mauSac.value, // ID màu sắc sản phẩm
        idKichThuoc: item.kichThuoc.value, // ID kích thước sản phẩm
        idThuongHieu: getIdThuongHieu, // ID thương hiệu sản phẩm
        idDeGiay: getIdDeGiay, // ID đế giày sản phẩm
        donGia: item.donGia, // Đơn giá sản phẩm
        soLuong: item.soLuong, // Số lượng sản phẩm
        trangThai: true, // Trạng thái của sản phẩm (đang hoạt động)
      };

      // Gửi request POST để thêm sản phẩm chi tiết
      return axios.post(`${ApiAddSPCT}`, newSPCT);
    });

    try {
      // Chờ tất cả các request hoàn thành
      const res = await Promise.all(request);

      // Hiển thị thông báo thành công
      toast.success("Thêm sản phẩm mới thành công", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        newestOnTop: false,
        closeOnClick: true,
        rtl: false,
        pauseOnFocusLoss: true,
        draggable: true,
        pauseOnHover: true,
        theme: "light",
        transition: Bounce,
      });

      // Duyệt qua kết quả trả về từ các request thêm SPCT
      res.map((item) => {
        // Duyệt qua từng thumbUrl và gửi request POST để thêm ảnh vào hệ thống
        thumbUrls.map((thumb) => {
          const newAnh = {
            tenAnh: item.data.result.tenSanPham, // Tên ảnh là tên của sản phẩm
            idSanPhamChiTiet: item.data.result.id, // ID sản phẩm chi tiết
            duLieuAnhBase64: thumb, // Dữ liệu ảnh (base64)
            trangThai: true, // Trạng thái ảnh (đang hoạt động)
          };

          // Gửi request POST để thêm ảnh
          axios.post("http://localhost:8080/api/hinhanh/add", newAnh);
        });
      });
      // Chuyển hướng về trang quản lý sản phẩm sau khi thành công
      setTimeout(() => {
        navigate("/admin/sanpham"); // Chuyển hướng về trang quản lý sản phẩm
      }, 1500); // Thời gian chờ là 1000ms tương đương với thời gian autoClose của toast
    } catch (error) {
      // Xử lý lỗi khi request thất bại
      console.log(error);
      toast.error(error.message || "Thêm mới thất bại", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  // Gọi API khi component được render lần đầu
  useEffect(() => {
    layTenSP();
    layChatLieu();
    layDeGiay();
    layKichThuoc();
    layMauSac();
    layThuongHieu();
  }, []);

  return (
    <>
      <div className="rounded-lg font-mono">
        <div>
          <div className="mx-auto my-2 h-[420px] w-[1000px] rounded-sm">
            <div className="mt-5 text-center">
              <span className="mt-3 text-2xl font-bold">
                Thêm sản phẩm chi tiết
              </span>
            </div>
            <div className="h-[300px] rounded-lg shadow drop-shadow-2xl">
              <div className="mx-5 mt-9">
                <div className="mt-5 grid grid-cols-2 gap-6">
                  <div>
                    <span className="mb-9 text-xl font-semibold text-blue-500">
                      Sản Phẩm
                    </span>
                    <Input
                      className="h-[38px] w-[384px]"
                      prefix={<UserOutlined />}
                      size="large"
                      value={tenSP}
                      disabled
                    />
                  </div>
                  <div>
                    <span className="mb-9 text-xl font-semibold text-blue-500">
                      Thương hiệu
                    </span>
                    <Select
                      className="h-[38px] w-[384px]"
                      placeholder="Chọn thương hiệu"
                      size="large"
                      options={listThuongHieu.map((item) => ({
                        label: item.ten,
                        value: item.id,
                      }))}
                      onChange={(value) => setGetIdThuongHieu(value)}
                    />
                  </div>
                </div>
                <div className="mt-10 grid grid-cols-2 gap-6">
                  <div>
                    <div>
                      <span className="mb-9 text-xl font-semibold text-blue-500">
                        Chất liệu
                      </span>
                    </div>
                    <Select
                      className="h-[38px] w-[384px]"
                      placeholder="Chọn chất liệu"
                      size="large"
                      options={listChatLieu.map((item) => ({
                        label: item.ten,
                        value: item.id,
                      }))}
                      onChange={(value) => setGetIdChatLieu(value)}
                    />
                  </div>
                  <div>
                    <div>
                      <span className="mb-9 text-xl font-semibold text-blue-500">
                        Đế Giày
                      </span>
                    </div>
                    <Select
                      className="h-[38px] w-[384px]"
                      placeholder="Chọn đế giày"
                      size="large"
                      options={listDeGiay.map((item) => ({
                        label: item.ten,
                        value: item.id,
                      }))}
                      onChange={(value) => setGetIdDeGiay(value)}
                    />
                  </div>
                </div>
                <div className="mb-10 mt-10 grid grid-cols-2 gap-6">
                  <div>
                    <span className="mb-9 text-xl font-semibold text-blue-500">
                      Kích Thước
                    </span>
                    <Select
                      mode="multiple"
                      className="h-[38px] w-[384px]"
                      placeholder="Chọn kích thước"
                      size="large"
                      options={listKichThuoc.map((item) => ({
                        label: item.kichThuoc,
                        value: item.id,
                      }))}
                      onChange={(value, option) => {
                        setGetIdKichThuoc(option);
                      }}
                    />
                  </div>
                  <div>
                    <div>
                      <span className="mb-9 text-xl font-semibold text-blue-500">
                        Màu Sắc
                      </span>
                    </div>
                    <Select
                      mode="multiple"
                      className="h-[38px] w-[384px]"
                      placeholder="Chọn màu sắc"
                      size="large"
                      options={listMauSac.map((item) => ({
                        label: item.ten,
                        value: item.id,
                      }))}
                      onChange={(value, option) => setGetIdMauSac(option)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Render danh sách sản phẩm chi tiết dưới dạng bảng */}
        <div className="h-[500px] rounded-lg p-4">
          <div className="max-h-[400px] overflow-y-auto">
            {listSPCT.length > 0 ? (
              <>
                <div className="mb-4 mr-10 flex justify-end gap-5">
                  <Popconfirm
                    title="Thêm sản phẩm"
                    description="Bạn có chắc chắn muốn thêm sản phẩm này không?"
                    okText="Thêm"
                    cancelText="Không"
                    onConfirm={AddSPCT}
                  >
                    <Button
                      className="h-[40px] w-[100px] text-xl"
                      type="primary"
                    >
                      Thêm
                    </Button>
                  </Popconfirm>
                  <Button
                    size="large"
                    variant="outlined"
                    color="primary"
                    onClick={showModal}
                  >
                    <SettingOutlined /> Sửa chung
                  </Button>
                </div>

                <table className="min-w-full table-auto">
                  <thead>
                    <tr className="h-[60px] bg-orange-500 text-2xl text-white">
                      <th className="w-[20px] px-4 py-2">
                        <div className="flex gap-1">
                          <Checkbox
                            checked={selectAll}
                            onChange={handleSelectAll}
                          />{" "}
                          #
                        </div>
                      </th>
                      <th className="w-[280px] px-4 py-2">Tên Sản Phẩm</th>
                      <th className="w-[150px] px-4 py-2">Số Lượng</th>
                      <th className="w-[150px] px-4 py-2">Giá Bán</th>
                      <th className="w-[250px] px-4 py-2">Hành động</th>
                      <th className="px-4 py-2">Ảnh Sản Phẩm</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listSPCT.map((SPCT, index) => (
                      <tr key={index} className="text-center">
                        <td className="px-4 py-2">
                          <div className="flex gap-1">
                            {index + 1}
                            <Checkbox
                              checked={selectedRows.some(
                                (row) => row.id === SPCT.id,
                              )} // Kiểm tra xem SPCT có nằm trong danh sách selectedRows hay không
                              onClick={() => handleCheckboxChange(SPCT)} // Truyền SPCT để thêm/xóa vào danh sách selectedRows
                            />
                          </div>
                        </td>
                        <td className="px-4 py-2">
                          {tenSP +
                            " " +
                            [
                              "[" +
                                " " +
                                SPCT.kichThuoc.label +
                                "-" +
                                SPCT.mauSac.label +
                                " " +
                                "]",
                            ]}
                        </td>
                        <td className="px-4 py-2">
                          <InputNumber
                            value={SPCT.soLuong}
                            className="w-[150px]"
                            min="1"
                            onChange={(value) =>
                              handleChangeSoLuongSPCT(SPCT.id, value)
                            } // Nhận trực tiếp giá trị
                          />
                        </td>
                        <td className="px-4 py-2">
                          <InputNumber
                            value={SPCT.donGia}
                            className="w-[150px]"
                            min="1000"
                            onChange={(value) =>
                              handleChangeGiaBanSPCT(SPCT.id, value)
                            } // Nhận trực tiếp giá trị
                          />
                        </td>

                        <td className="px-4 py-2">
                          <div className="flex items-center justify-center">
                            <Popconfirm
                              title="Xóa sản phẩm"
                              description="Bạn có chắc chắn muốn xóa sản phẩm này không?"
                              okText="Xóa"
                              cancelText="Không"
                              onConfirm={() => handleRemoveRenderSPCT(SPCT.id)}
                            >
                              <TrashIcon className="h-[20px] text-red-500 hover:cursor-pointer" />
                            </Popconfirm>
                          </div>
                        </td>
                        <td>
                          <ImageUpload
                            fileList={SPCT.fileList}
                            setFileList={(newFileList) =>
                              handleFileListChange(SPCT.id, newFileList)
                            }
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            ) : (
              <div className="flex justify-center text-2xl font-semibold">
                <p>Bạn chưa chọn kích thước và màu sắc</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Modal
        open={open}
        title={
          <span className="text-2xl font-bold text-gray-900">
            Sửa số lượng và giá tiền cho các sản phẩm được chọn
          </span>
        }
        onOk={handleOk}
        onCancel={handleCancel}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <CancelBtn />
            <OkBtn />
          </>
        )}
      >
        <div className="my-4">
          <label className="text-xl">Số Lượng</label>
          <InputNumber
            placeholder="Nhập Số Lượng"
            size="large"
            min="1"
            value={selectedRows[0]?.soLuong} // Hiển thị giá trị của sản phẩm đầu tiên
            style={{ width: "470px" }}
            onChange={(value) =>
              setSelectedRows((prev) =>
                prev.map((item) => ({ ...item, soLuong: value })),
              )
            } // Cập nhật số lượng cho tất cả các sản phẩm được chọn
          />
        </div>
        <div className="my-4">
          <label className="text-xl">Giá Tiền</label>
          <InputNumber
            placeholder="Nhập Giá Tiền"
            size="large"
            min="1000"
            value={selectedRows[0]?.donGia} // Hiển thị giá trị của sản phẩm đầu tiên
            style={{ width: "470px" }}
            onChange={(value) =>
              setSelectedRows((prev) =>
                prev.map((item) => ({ ...item, donGia: value })),
              )
            } // Cập nhật giá tiền cho tất cả các sản phẩm được chọn
          />
        </div>
      </Modal>

      <ToastContainer />
    </>
  );
}
