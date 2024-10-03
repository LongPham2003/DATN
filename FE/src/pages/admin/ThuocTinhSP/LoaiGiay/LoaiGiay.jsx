export default function LoaiGiay() {
  return (
    <>
      <div className="w-full h-screen overflow-auto">
        <div className="mb-4 p-4 bg-white rounded shadow">
          <h2 className="text-xl font-bold mb-2">Thêm Loại Giày Mới</h2>
          <form className="flex flex-wrap -mx-2">
            <div className="w-1/2 px-2 mb-4">
              <label htmlFor="maLoaiGiay" className="block mb-1">Mã Loại Giày:</label>
              <input
                type="text"
                id="maLoaiGiay"
                className="w-full p-2 border rounded"
                placeholder="Nhập mã loại giày"
              />
            </div>
            <div className="w-1/2 px-2 mb-4">
              <label htmlFor="tenLoaiGiay" className="block mb-1">Tên Loại Giày:</label>
              <input
                type="text"
                id="tenLoaiGiay"
                className="w-full p-2 border rounded"
                placeholder="Nhập tên loại giày"
              />
            </div>
            <div className="w-full px-2">
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
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
            <tr className="hover:bg-gray-100 transition-colors duration-200">
              <td className="border border-gray-300 p-2">Row 1, Cell 1</td>
              <td className="border border-gray-300 p-2">Row 1, Cell 2</td>
              <td className="border border-gray-300 p-2">Row 1, Cell 3</td>
            </tr>
            <tr className="hover:bg-gray-100 transition-colors duration-200">
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
