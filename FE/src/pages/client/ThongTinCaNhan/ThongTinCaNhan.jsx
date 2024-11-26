import { Input, Select, Button, Modal } from "antd"; // Thêm Button từ antd
import axios from "axios";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function ThongTinCaNhan() {
  const [email, setEmail] = useState("");
  const [khachHang, setKhachHang] = useState({});
  const [idKH, setIdKH] = useState();
  const [loading, setLoading] = useState(false); // Thêm loading để quản lý trạng thái

  useEffect(() => {
    const ten = localStorage.getItem("email");
    setEmail(ten);
  }, []);

  useEffect(() => {
    const ApiTimKhTheoEmail = `http://localhost:8080/client/khachhang/timtheoEmail?email=${email}`;
    async function fetchKhachHang() {
      try {
        const response = await axios.get(ApiTimKhTheoEmail);
        setKhachHang(response.data);
        setIdKH(response.data.id);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    }
    if (email) {
      fetchKhachHang();
    }
  }, [email]);

  const convertToDate = (dateString) => {
    const [day, month, year] = dateString.split("/");
    return new Date(year, month - 1, day); // month - 1 vì tháng trong JavaScript bắt đầu từ 0
  };

  const handleUpdate = async () => {
    const ApiUpdate = `http://localhost:8080/api/khachhang/update/${idKH}`;
    setLoading(true); // Bắt đầu loading

    // Hiển thị hộp thoại xác nhận
    Modal.confirm({
      title: "Xác nhận cập nhật",
      content: "Bạn có chắc chắn muốn cập nhật thông tin này không?",
      onOk: async () => {
        try {
          await axios.post(ApiUpdate, {
            hoTen: khachHang.hoTen,
            gioiTinh: khachHang.gioiTinh,
            ngaySinh: khachHang.ngaySinh, // Chuyển đổi ngày sinh
            sdt: khachHang.sdt,
            email: khachHang.email,
          });
          // console.log("Cập nhật thành công");
          toast.success("Cap nhat thanh cong");
          setTimeout(() => {
            window.location.reload();
          }, 500);
        } catch (error) {
          console.error("Error updating customer data:", error);
        } finally {
          setLoading(false); // Kết thúc loading
        }
      },
      onCancel() {
        setLoading(false); // Kết thúc loading nếu người dùng hủy
      },
    });
  };

  return (
    <>
      <div>
        <div className="my-10 flex justify-center text-2xl font-semibold">
          <span>Thông tin cá nhân</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>Ho ten</label>
            <Input
              placeholder="Enter your name"
              value={khachHang.hoTen || ""}
              size="large"
              onChange={(e) =>
                setKhachHang({ ...khachHang, hoTen: e.target.value })
              }
            />
          </div>
          <div>
            <label>Gioi tinh</label>
            <Select
              placeholder="Select your gender"
              style={{ width: "100%" }}
              value={khachHang.gioiTinh || ""}
              size="large"
              onChange={(value) =>
                setKhachHang({ ...khachHang, gioiTinh: value })
              }
            >
              <Select.Option value="Nam">Nam</Select.Option>
              <Select.Option value="Nu">Nữ</Select.Option>
            </Select>
          </div>
          <div>
            <label>Ngay sinh</label>
            <Input
              type="date"
              value={khachHang.ngaySinh || ""}
              size="large"
              onChange={(e) =>
                setKhachHang({ ...khachHang, ngaySinh: e.target.value })
              }
            />
          </div>
          <div>
            <label>SDT</label>
            <Input
              placeholder="Enter your phone number"
              value={khachHang.sdt || ""}
              size="large"
              onChange={(e) =>
                setKhachHang({ ...khachHang, sdt: e.target.value })
              }
            />
          </div>
          <div>
            <label>Email</label>
            <Input
              placeholder="Enter your email"
              value={khachHang.email || ""}
              size="large"
              onChange={(e) =>
                setKhachHang({ ...khachHang, email: e.target.value })
              }
            />
          </div>
        </div>
        <div className="my-10 flex justify-center">
          <Button type="primary" loading={loading} onClick={handleUpdate}>
            Cập nhật
          </Button>
        </div>
      </div>
      <div className="my-10 flex justify-center text-2xl font-semibold">
        <span>Danh sach dia chi giao hang</span>
      </div>
      <div></div>
      <ToastContainer autoClose={1000} position="top-center" />
    </>
  );
}
