import React, { useState } from 'react';

export default function TheMoiNhanVien() {
  const [formData, setFormData] = useState({
    hoTen: '',
    sdt: '',
    ngaySinh: '',
    gioiTinh: '',
    chucVu: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý logic gửi dữ liệu form ở đây
    console.log(formData);
  };

  return (
    <div className="flex justify-center items-center h-auto bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Thêm Mới Nhân Viên</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="hoTen" className="block mb-1">Họ Tên:</label>
            <input
              type="text"
              id="hoTen"
              name="hoTen"
              value={formData.hoTen}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="sdt" className="block mb-1">Số Điện Thoại:</label>
            <input
              type="tel"
              id="sdt"
              name="sdt"
              value={formData.sdt}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="ngaySinh" className="block mb-1">Ngày Sinh:</label>
            <input
              type="date"
              id="ngaySinh"
              name="ngaySinh"
              value={formData.ngaySinh}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="gioiTinh" className="block mb-1">Giới Tính:</label>
            <select
              id="gioiTinh"
              name="gioiTinh"
              value={formData.gioiTinh}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Chọn giới tính</option>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
              <option value="Khác">Khác</option>
            </select>
          </div>
          <div>
            <label htmlFor="chucVu" className="block mb-1">Chức Vụ:</label>
            <select
              id="chucVu"
              name="chucVu"
              value={formData.chucVu}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Chọn chức vụ</option>
              <option value="Nhân viên">Nhân viên</option>
              <option value="Quản lý">Quản lý</option>
              <option value="Giám đốc">Giám đốc</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Thêm Mới Nhân Viên
          </button>
        </form>
      </div>
    </div>
  );
}
