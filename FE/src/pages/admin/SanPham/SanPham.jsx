export default function SanPham() {
  return (
    <>
      <div className="ml-9">
        <span className="text-5xl">Danh sách sản phẩm</span>
        <div className="mt-4">
          <table className="border-slate-500 table-auto border-collapse border">
            <thead>
              <tr className="bg-gray-100 text-sm uppercase leading-normal text-gray-600">
                <th className="px-6 py-3 text-left">ID</th>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Age</th>
                <th className="px-6 py-3 text-left">Job</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-slate-600 border">
                <td className="border border-blue-gray-800">
                  The Sliding Mr. Bones (Next Stop, Pottersville)
                </td>
                <td className="border border-blue-gray-800">Malcolm Lockyer</td>
                <td className="border border-blue-gray-800">1961</td>
              </tr>
              <tr className="border-slate-600 border">
                <td>Witchy Woman</td>
                <td>The Eagles</td>
                <td>1972</td>
              </tr>
              <tr className="border-slate-600 border">
                <td>Shining Star</td>
                <td>Earth, Wind, and Fire</td>
                <td>1975</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
