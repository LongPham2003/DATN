import axios from "axios";
import { useEffect, useState } from "react";

export default function MauSac() {
  const [listMauSac, setListMauSac] = useState([]);

  const [mauSacMoi, setMauSacMoi] = useState({
    ten: "",
    trangThai: true,
  });

  const loadMauSac = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/mausac/list`);
      setListMauSac(response.data.result.result);
    } catch (error) {
      console.error("Failed to fetch chat lieu data", error);
    }
  };

  useEffect(() => {
    loadMauSac();
  }, []);

  return (
    <>
      <div className="h-screen w-full overflow-auto">
        <div className="mb-4 rounded bg-white p-4 shadow">
          <h2 className="mb-2 text-xl font-bold">Thêm Màu Sắc Mới</h2>
          <form className="-mx-2 flex flex-wrap">
            <div className="mb-4 w-1/2 px-2">
              <label htmlFor="tenMauSac" className="mb-1 block">
                Tên Màu Sắc:
              </label>
              <input
                type="text"
                id="tenMauSac"
                className="w-full rounded border p-2"
                placeholder="Nhập tên màu sắc"
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
              <th className="border border-gray-300 p-2">STT</th>
              <th className="border border-gray-300 p-2">Tên</th>
              <th className="border border-gray-300 p-2">Trạng thái</th>
              <th className="border border-gray-300 p-2">Hành động</th>
              {/* Add more headers as needed */}
            </tr>
          </thead>
          <tbody>
            {listMauSac.map((item, index) => (
              <tr key={item.id}>
                <td className="border border-gray-300 p-2 text-center">
                  {index + 1}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {item.ten}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {item.trangThai ? "Kinh doanh" : "Ngừng kinh doanh"}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  <button className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
                    Xem chi tiết
                  </button>
                </td>
              </tr>
            ))}
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
    </>
  );
}
