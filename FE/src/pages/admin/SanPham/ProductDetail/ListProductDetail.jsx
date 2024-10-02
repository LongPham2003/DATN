import { useState } from "react";
import AddProductDetail from "./AddProductDetail";

export default function ListProductDetail() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div>
        <span className="text-xl font-medium">Bộ lọc sản phẩm chi tiết</span>
        <div className="ml-14 mt-4 grid grid-cols-2 gap-4">
          <div>
            <label className="mr-2">Sản phẩm:</label>
            <select className="w-[400px] rounded-md border-2 border-gray-300 p-2 outline-none transition-colors duration-300 hover:border-blue-500 focus:border-blue-500">
              <option value="">Chọn sản phẩm</option>
              {/* Add product options here */}
            </select>
          </div>
          <div>
            <label className="mr-6">Kích thước:</label>
            <select className="w-[400px] rounded-md border-2 border-gray-300 p-2 outline-none transition-colors duration-300 hover:border-blue-500 focus:border-blue-500">
              <option value="">Chọn kích thước</option>
              {/* Add size options here */}
            </select>
          </div>
          <div>
            <label className="mr-5">Màu sắc:</label>
            <select className="w-[400px] rounded-md border-2 border-gray-300 p-2 outline-none transition-colors duration-300 hover:border-blue-500 focus:border-blue-500">
              <option value="">Chọn màu sắc</option>
              {/* Add color options here */}
            </select>
          </div>
          <div>
            <label className="mr-9">Chất liệu:</label>
            <select className="w-[400px] rounded-md border-2 border-gray-300 p-2 outline-none transition-colors duration-300 hover:border-blue-500 focus:border-blue-500">
              <option value="">Chọn chất liệu</option>
              {/* Add material options here */}
            </select>
          </div>
          <div>
            <label className="mr-6">Đế giày:</label>
            <select className="w-[400px] rounded-md border-2 border-gray-300 p-2 outline-none transition-colors duration-300 hover:border-blue-500 focus:border-blue-500">
              <option value="">Chọn loại đế giày</option>
              {/* Add sole options here */}
            </select>
          </div>
          <div>
            <label className="mr-2">Thương hiệu:</label>
            <select className="w-[400px] rounded-md border-2 border-gray-300 p-2 outline-none transition-colors duration-300 hover:border-blue-500 focus:border-blue-500">
              <option value="">Chọn thương hiệu</option>
              {/* Add brand options here */}
            </select>
          </div>
          <div className="col-span-2 flex items-center justify-between">
            <div className="flex items-center">
              <label className="mr-3 text-xl">Trạng thái:</label>
              <label className="mr-4">
                <input type="radio" name="status" value="active" className="mr-2" />
                Đang kinh doanh
              </label>
              <label>
                <input type="radio" name="status" value="inactive" className="mr-2" />
                Ngừng kinh doanh
              </label>
            </div>
            <div className="flex items-center mr-52">
              <label className="mr-2">Khoảng giá:</label>
              <div className="flex items-center">
                <input
                  type="number"
                  placeholder="Từ"
                  className="w-[200px] rounded-md border-2 border-gray-300 p-2 outline-none transition-colors duration-300 hover:border-blue-500 focus:border-blue-500"
                />
                <span className="mx-2">-</span>
                <input
                  type="number"
                  placeholder="Đến"
                  className="w-[200px] rounded-md border-2 border-gray-300 p-2 outline-none transition-colors duration-300 hover:border-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            className="h-10 w-28 px-4 rounded-md bg-blue-500 font-semibold text-white transition-colors duration-300 hover:bg-white hover:text-black hover:border-2 hover:border-blue-500 focus:bg-blue-700 active:bg-blue-500"
          >
            Lọc
          </button>
        </div>
      </div>
      <hr className="my-5" />
      <div>
        <div className="flex justify-between items-center mb-4">
          <span className="text-3xl font-semibold uppercase">
            Danh sách sản phẩm Chi tiết
          </span>
          <button
            type="button"
            onClick={openModal}
            className="mr-16 h-10 px-4 rounded-md bg-green-500 font-semibold text-white transition-colors duration-300 hover:bg-green-600 focus:bg-green-700 active:bg-green-400"
          >
            Thêm sản phẩm
          </button>
        </div>
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full py-2">
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="bg-green-300 text-xl font-medium">
                    <tr>
                      <th className="px-6 py-4">#</th>
                      <th className="px-6 py-4">First</th>
                      <th className="px-6 py-4">Last</th>
                      <th className="px-6 py-4">Handle</th>
                      <th className="px-6 py-4">Action</th>
                      <th className="px-6 py-4">Action</th>
                      <th className="px-6 py-4">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-neutral-950 font-medium">
                      <td className="px-6 py-4">1</td>
                      <td className="px-6 py-4">Mark</td>
                      <td className="px-6 py-4">Otto</td>
                      <td className="px-6 py-4">@mdo</td>
                    </tr>
                    <tr className="border-b border-neutral-950 font-medium">
                      <td className="px-6 py-4">2</td>
                      <td className="px-6 py-4">Jacob</td>
                      <td className="px-6 py-4">Thornton</td>
                      <td className="px-6 py-4">@fat</td>
                    </tr>
                    <tr className="border-b border-neutral-950 font-medium">
                      <td className="px-6 py-4">3</td>
                      <td className="px-6 py-4">Larry</td>
                      <td className="px-6 py-4">Wild</td>
                      <td className="px-6 py-4">@twitter</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg">
            <AddProductDetail />
            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </>
  );
}
