import { useState } from "react";
import { Button, ButtonGroup, Radio } from "@material-tailwind/react";
import AddProduct from "../Product/AddProduct";

export default function ListProduct() {
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
        <span className="text-xl font-medium">Tìm kiếm sản phẩm</span>
        <div className="ml-96">
          <div className="w-auto">
            <label className="mr-2">Tên Sản Phẩm:</label>
            <input
              type="text"
              placeholder="Nhập tên Sản Phẩm"
              className="w-[500px] rounded-md border-2 border-gray-300 p-2 outline-none transition-colors duration-300 hover:border-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        <div className="mt-7 flex">
          <div className="items-center justify-start">
            <label htmlFor="">Danh mục:</label>
            <select className="ml-9 h-[44px] w-[500px] rounded-md border-2 border-gray-300 p-2 outline-none transition-colors duration-300 hover:border-blue-500 focus:border-yellow-500">
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
              <option value="option4">Option 4</option>
            </select>
          </div>
          <div className="ml-72 justify-center">
            <label className="mr-3 text-xl">Trạng thái:</label>
            Đang kinh doanh
            <Radio name="color" className="mr-14" />
            Ngừng kinh doanh
            <Radio name="color" />
          </div>
        </div>
        <div className="flex justify-center">
        <button
          type="button"
          className="mt-10 h-10 w-32 rounded-md bg-blue-400 font-semibold text-black transition-colors duration-300 hover:bg-blue-600 focus:bg-blue-700 active:bg-blue-300"
        >
          Tìm kiếm
        </button>
        </div>
      </div>
      <hr className="my-5" />
      <div>
        <div className="flex justify-between items-center mb-4">
          <span className="text-3xl font-semibold uppercase">
            Danh sách sản phẩm
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
            <AddProduct />
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
