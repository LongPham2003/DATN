import { Button, Input, Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ThongTinCaNhan() {
  const [email, setEmail] = useState("");
  const [khachHang, setKhachHang] = useState({});
  const [role, setRole] = useState();

  useEffect(() => {
    const ten = localStorage.getItem("email");
    const r = localStorage.getItem("role");
    setEmail(ten);
    setRole(r);
  }, []);
  useEffect(() => {
    const ApiTimKhTheoEmail = `http://localhost:8080/client/khachhang/timtheoEmail?email=${email}`;
    const ApiTimNVquamail = `http://localhost:8080/api/nhanvien/email?email=${email}`;
    if (role === "ROLE_KHACHHANG") {
      async function fetchKhachHang() {
        try {
          const response = await axios.get(ApiTimKhTheoEmail);
          setKhachHang(response.data);
          console.log(response.data);
        } catch (error) {
          console.error("Error fetching customer data:", error);
        }
      }
      if (email) {
        fetchKhachHang();
      }
    } else {
      async function fetchKhachHang() {
        try {
          const response = await axios.get(ApiTimNVquamail);
          setKhachHang(response.data.result);
          console.log(response.data);
        } catch (error) {
          console.error("Error fetching customer data:", error);
        }
      }
      if (email) {
        fetchKhachHang();
      }
    }
  }, [email]);
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
            />
          </div>
          <div>
            <label>Gioi tinh</label>
            <Select
              placeholder="Select your gender"
              style={{ width: "100%" }}
              value={khachHang.gioiTinh || ""}
              size="large"
            >
              <Select.Option value="Nam">Nam</Select.Option>
              <Select.Option value="Nu">Nữ</Select.Option>
            </Select>
          </div>
          <div>
            <label>Ngay sinh</label>
            <Input
              placeholder="Enter your date of birth"
              value={khachHang.ngaySinh || ""}
              size="large"
            />
          </div>
          <div>
            <label>SDT</label>
            <Input
              placeholder="Enter your phone number"
              value={khachHang.sdt || ""}
              size="large"
            />
          </div>
          <div>
            <label>Email</label>
            <Input
              placeholder="Enter your email"
              value={khachHang.email || ""}
              size="large"
            />
          </div>
        </div>
      </div>
      <div className="my-3 flex justify-center">
        <Button style={{ width: "150px", height: "50px", fontSize: "18px" }}>
          Cap nhat
        </Button>
      </div>
      <div className="my-10 flex justify-center text-2xl font-semibold">
        {role === "ROLE_KHACHHANG" ? (
          <span>Danh sach dia chi giao hang</span>
        ) : (
          ""
        )}
      </div>
      <div></div>
    </>
  );
}
