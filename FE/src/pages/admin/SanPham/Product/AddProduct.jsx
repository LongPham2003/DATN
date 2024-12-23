import axios from "../../../../api/axiosConfig";
import { useEffect, useState } from "react";
import { Button, Input, Modal } from "antd";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { PlusCircleFilled } from "@ant-design/icons";

export default function AddProduct() {
  const [tenSanPham, settenSanPham] = useState("");
  const [idLoai, setidLoai] = useState(0);
  const [moTa, setmota] = useState("");
  const [loaiSelect, setLoaiSelect] = useState([]);
  const [errorTenSP, setErrorTenSP] = useState("");
  const [errorLoai, setErrorLoai] = useState("");
  const [danhSachTenSP, setDanhSachTenSP] = useState("");
  const [trangThai] = useState(true); // Sử dụng giá trị mặc định true cho trạng thái
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [tenloai, setTenloai] = useState("");
  const [loaiMoi, setloaiMoi] = useState({
    ten: "",
    trangThai: true,
  });
  const [errorTenLoai, setErrorTenLoai] = useState("");

  let ApiGetAllLoai = `http://localhost:8080/api/loai/getall`;
  let ApiAddSPMoi = `http://localhost:8080/api/sanpham/add`;
  let ApiGetAllten = `http://localhost:8080/api/sanpham/ten`;

  const getAllLoai = async () => {
    try {
      const data = await axios.get(ApiGetAllLoai);
      const SP = await axios.get(ApiGetAllten);
      setLoaiSelect(data.data.result);
      setDanhSachTenSP(SP.data);
    } catch (error) {
      console.log(error);
    }
  };
  const newProduct = {
    tenSanPham,
    idLoai,
    moTa,
    trangThai, // Mặc định true
  };

  const layTenloai = async () => {
    try {
      let response = await axios.get(`http://localhost:8080/api/loai/ten`);
      setTenloai(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const add = async (newProduct) => {
    try {
      await axios.post(ApiAddSPMoi, newProduct); // Gửi dữ liệu sản phẩm mới

      return true; // Trả về true khi thêm thành công
    } catch (error) {
      console.log(error);
      return false; // Trả về false khi có lỗi
    }
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setloaiMoi({ ...loaiMoi, [name]: value });

    if (name === "ten") {
      const input = value.trim();

      // Check trong
      if (input === "") {
        setErrorTenLoai("Tên loại không được để trống");
        return;
      } else if (!validateTenSanPhamtu3den50(input)) {
        setErrorTenLoai("Tên loại từ 2 đến 50 ký tự");
        return;
      } else if (!validateTenSanPhamkhongchuakytudacbiet(input)) {
        setErrorTenLoai("Tên loại không được chưa kí tự đặc biệt");
        return;
      } else {
        setErrorTenLoai("");
      }

      // Check ton tai
      const tenDaTonTai = tenloai.includes(input);
      if (tenDaTonTai) {
        setErrorTenLoai("Tên loại đã tồn tại");
        return;
      }

      setError("");
    }
  };

  const themloai = async () => {
    // Xác nhận người dùng có muốn thêm loại mới hay không
    Modal.confirm({
      title: "Xác nhận",
      content: "Bạn có chắc chắn muốn thêm loại mới?",
      onOk: async () => {
        try {
          // Gọi API để thêm loại mới
          await axios.post(`http://localhost:8080/api/loai/add`, loaiMoi);

          // Sau khi thêm thành công, gọi lại loadloai để cập nhật bảng
          // loadloai(trangHienTai);

          // Hiển thị thông báo thành công
          toast.success("Thêm loại mới thành công");
          handleCancel();
          // Reset form sau khi thêm mới thành công
          setloaiMoi({ ten: "", trangThai: true });

          // Đặt lại giá trị ô tìm kiếm
          const addInput = document.querySelector('input[type="text"]');
          if (addInput) {
            addInput.value = "";
          }
        } catch (error) {
          // Hiển thị thông báo lỗi nếu xảy ra lỗi trong quá trình thêm
          toast.error("Thêm mới thất bại");
        }
      },
    });
  };

  useEffect(() => {
    layTenloai();
    getAllLoai();
  }, []);

  const validateTenSanPhamtu3den50 = (ten) => {
    return ten.length >= 2 && ten.length <= 50; // Chỉ kiểm tra độ dài
  };

  const validateTenSanPhamkhongchuakytudacbiet = (ten) => {
    const regex = /^[\p{L}\p{M}\d\s]+$/u; // Cho phép tất cả các ký tự chữ (có dấu), số và khoảng trắng
    return regex.test(ten); // Kiểm tra ký tự đặc biệt
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (tenSanPham.trim() === "") {
        setErrorTenSP("Tên sản phẩm không được để trống");
        return;
      } else if (idLoai === 0) {
        setErrorLoai("Bạn phải chọn một loại sản phẩm");
        return;
      } else if (!validateTenSanPhamtu3den50(tenSanPham)) {
        setErrorTenSP("Tên sản phẩm phải từ 2-50 ký tự");
        return;
      } else if (!validateTenSanPhamkhongchuakytudacbiet(tenSanPham)) {
        setErrorTenSP("Tên sản phẩm không dược chưa ký tự đặc biệt");
        return;
      } else {
        setErrorTenSP("");
      }

      Modal.confirm({
        title: "Xác nhận thêm sản phẩm",
        content: "Bạn có chắc chắn muốn thêm sản phẩm này không?",
        okText: "Có",
        cancelText: "Không",
        onOk: async () => {
          try {
            const result = await add(newProduct); // Chờ kết quả từ hàm add
            // Hiển thị thông báo thành công
            if (result) {
              toast.success("Thêm sản phẩm mới thành công");
              // Load lại trang sau 1 giây
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            } else {
              throw new Error("Thêm mới thất bại");
            }
          } catch (error) {
            console.log(newProduct);
            console.log(error);

            toast.error("Thêm mới thất bại");
          }
        },
        onCancel() {
          console.log("Thao tác thêm sản phẩm đã bị hủy");
        },
      });
    } catch (error) {
      console.log(newProduct);
      toast.error("Thêm mới thất bại");
    }
  };

  const handelInput = (e) => {
    settenSanPham(e.target.value);
    const tenDaTonTai = danhSachTenSP.includes(e.target.value);
    if (tenDaTonTai) {
      setErrorTenSP("Ten Da Ton Tai");
    } else {
      setErrorTenSP("");
    }
  };

  // Function to show the modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Function to handle modal cancel
  const handleCancel = () => {
    setIsModalVisible(false);
    getAllLoai();
  };

  return (
    <div className="mx-auto mt-10 w-auto">
      <h1 className="mb-5 text-2xl font-bold">Thêm sản phẩm</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="tenSanPham" className="mb-1 block">
            Tên sản phẩm:
          </label>
          <input
            type="text"
            id="tenSanPham"
            value={tenSanPham}
            name="tenSanPham"
            onChange={handelInput}
            className="w-full rounded-md border px-3 py-2"
          />
          {errorTenSP && <p className="text-red-500">{errorTenSP}</p>}
        </div>
        <div>
          <label htmlFor="idLoai" className="mb-1 block">
            Loại:
          </label>
          <div className="flex">
            <select
              id="idLoai"
              onChange={(e) => {
                setidLoai(e.target.value), setErrorLoai("");
              }}
              value={idLoai}
              className="w-full rounded-md border px-3 py-2"
            >
              <option value="">Chọn danh mục</option>
              {loaiSelect.map((loai) => (
                <option value={loai.id} key={loai.id}>
                  {loai.ten}
                </option>
              ))}
            </select>
            <Button
              type="primary"
              className="ml-2 h-[41px]"
              title="Thêm loại mới"
              onClick={showModal} // Open modal on button click
            >
              <PlusCircleFilled />
            </Button>
          </div>
          {errorLoai && <p className="text-red-500">{errorLoai}</p>}
        </div>
        <div>
          <label htmlFor="moTa" className="mb-1 block">
            Mô tả:
          </label>
          <textarea
            id="moTa"
            value={moTa}
            name="moTa"
            onChange={(e) => setmota(e.target.value)}
            className="w-full rounded-md border px-3 py-2"
            rows="4"
          ></textarea>
        </div>
        {/* {error && <p className="text-red-500">{error}</p>} */}
        <button
          type="submit"
          className="w-full rounded-md bg-blue-500 py-2 text-white hover:bg-blue-600"
        >
          Thêm sản phẩm
        </button>
      </form>
      {/* <ToastContainer /> */}

      {/* Modal for adding new type */}
      <Modal
        title="Thêm loại mới"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null} // Customize footer as needed
      >
        {/* Content for adding new type goes here */}
        <p>Tên Loại:</p> <Input name="ten" onChange={onInputChange} />
        <Button onClick={themloai} type="primary" className="mt-2">
          Thêm mới
        </Button>
        {errorTenLoai && <p className="text-red-500">{errorTenLoai}</p>}
      </Modal>
    </div>
  );
}
