import React, { useState } from 'react';
import TheMoiNhanVien from './TheMoiNhanVien';

export default function DanhSachNhanVien() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Quản Lý Nhân Viên</h1>
      
      {/* Nút thêm mới nhân viên */}
      <div className="mb-4">
        <button
          onClick={openModal}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Thêm Mới Nhân Viên
        </button>
      </div>
      
      {/* Modal Thêm Mới Nhân Viên */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg w-full max-w-md relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-red-500 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <TheMoiNhanVien button={closeModal} />
          </div>
        </div>
      )}
      
      {/* Ô tìm kiếm tách biệt */}
      <div className="mb-6 p-4 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Tìm Kiếm Nhân Viên</h2>
        <input
          type="text"
          placeholder="Nhập tên hoặc mã nhân viên..."
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      {/* Danh sách nhân viên */}
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-xl font-semibold mb-4">Danh Sách Nhân Viên</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b">STT</th>
                <th className="py-2 px-4 border-b">Họ tên</th>
                <th className="py-2 px-4 border-b">Ngày Sinh</th>
                <th className="py-2 px-4 border-b">Giới Tính</th>
                <th className="py-2 px-4 border-b">Ngày Tạo</th>
                <th className="py-2 px-4 border-b">Ngày Cập nhật</th>
                <th className="py-2 px-4 border-b">Chức Vụ</th>
                <th className="py-2 px-4 border-b">Trạng Thái</th>
                <th className="py-2 px-4 border-b">Hành Động</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {/* Dữ liệu mẫu - thay thế bằng dữ liệu thực tế sau */}
              <tr>
                <td className="py-2 px-4 border-b">1</td>
                <td className="py-2 px-4 border-b">Nguyễn Văn A</td>
                <td className="py-2 px-4 border-b">01/01/1990</td>
                <td className="py-2 px-4 border-b">Nam</td>
                <td className="py-2 px-4 border-b">01/01/2023</td>
                <td className="py-2 px-4 border-b">01/06/2023</td>
                <td className="py-2 px-4 border-b">Nhân viên bán hàng</td>
                <td className="py-2 px-4 border-b">Đang làm việc</td>
                <td className="py-2 px-4 border-b">
                  {/* Thêm các nút hành động ở đây nếu cần */}
                </td>
              </tr>
              {/* Thêm các hàng dữ liệu khác tại đây */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
