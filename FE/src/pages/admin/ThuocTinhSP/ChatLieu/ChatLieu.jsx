// import axios from "axios";
import { useState } from "react";

export default function ChatLieu() {
  const [chatLieu, setChatLieu] = useState([]);

  // const loadChatLieu = async () => {
  //   const data = await axios.get(`http://localhost:8080/api/chatlieu/lis`);
  //   setChatLieu(data.data);
  // };

  return (
    <>
      <div className="h-screen w-full overflow-auto">
        <div className="mb-4 rounded bg-white p-4 shadow">
          <h2 className="mb-2 text-xl font-bold">Thêm Chất Liệu Mới</h2>
          <form className="-mx-2 flex flex-wrap">
            <div className="mb-4 w-1/2 px-2">
              <label htmlFor="maChatLieu" className="mb-1 block">
                Mã Chất Liệu:
              </label>
              <input
                type="text"
                id="maChatLieu"
                className="w-full rounded border p-2"
                placeholder="Nhập mã chất liệu"
              />
            </div>
            <div className="mb-4 w-1/2 px-2">
              <label htmlFor="tenChatLieu" className="mb-1 block">
                Tên Chất Liệu:
              </label>
              <input
                type="text"
                id="tenChatLieu"
                className="w-full rounded border p-2"
                placeholder="Nhập tên chất liệu"
              />
            </div>
            <div className="w-full px-2">
              <button
                type="submit"
                className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                Thêm Mới
              </button>
            </div>
          </form>
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">Header 1</th>
              <th className="border border-gray-300 p-2">Header 2</th>
              <th className="border border-gray-300 p-2">Header 3</th>
              {/* Add more headers as needed */}
            </tr>
          </thead>
          <tbody>
            <tr className="transition-colors duration-200 hover:bg-gray-100">
              <td className="border border-gray-300 p-2">Row 1, Cell 1</td>
              <td className="border border-gray-300 p-2">Row 1, Cell 2</td>
              <td className="border border-gray-300 p-2">Row 1, Cell 3</td>
            </tr>
            <tr className="transition-colors duration-200 hover:bg-gray-100">
              <td className="border border-gray-300 p-2">Row 2, Cell 1</td>
              <td className="border border-gray-300 p-2">Row 2, Cell 2</td>
              <td className="border border-gray-300 p-2">Row 2, Cell 3</td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
    </>
  );
}
