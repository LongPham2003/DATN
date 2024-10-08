function DanhSachKhachHang() {
  // Giả sử chúng ta có một mảng dữ liệu khách hàng
  const customers = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      phone: "0123456789",
      email: "nguyenvana@example.com",
      address: "Hà Nội",
    },
    {
      id: 2,
      name: "Trần Thị B",
      phone: "0987654321",
      email: "tranthib@example.com",
      address: "Hồ Chí Minh",
    },
    // Thêm nhiều khách hàng khác nếu cần
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Danh sách khách hàng</h1>
      <div className="overflow-x-auto">
        <table className="w-full overflow-hidden rounded-lg bg-white shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600">
                Họ tên
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600">
                SDT
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600">
                Địa chỉ mặc định
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {customers.map(({ id, name, phone, email, address }) => (
              <tr key={id} className="hover:bg-gray-50">
                <td className="whitespace-nowrap px-6 py-4">{name}</td>
                <td className="whitespace-nowrap px-6 py-4">{phone}</td>
                <td className="whitespace-nowrap px-6 py-4">{email}</td>
                <td className="whitespace-nowrap px-6 py-4">{address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DanhSachKhachHang;
