export default function DetailProduct(sp) {
  return (
    <>
      <div className="mb-4">
        <label htmlFor="tenSanPham" className="mb-1 block">
          Tên San Phẩm:
        </label>
        <input
          type="text"
          className="w-[400px] rounded-md border-2 border-gray-300 p-2 outline-none transition-colors duration-300 hover:border-blue-500 focus:border-blue-500"
          value={sp.tenSanPham}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="loai" className="mb-1 block">
          Loại:
        </label>
        <input
          type="text"
          value={sp.tenLoai}
          className="w-[400px] rounded-md border-2 border-gray-300 p-2 outline-none transition-colors duration-300 hover:border-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="ngayTao" className="mb-1 block">
          Ngày tạo:
        </label>
        <input
          type="text"
          value={sp.ngayTao}
          className="w-[400px] rounded-md border-2 border-gray-300 p-2 outline-none transition-colors duration-300 hover:border-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="moTa" className="mb-1 block">
          Mô tả:
        </label>
        <textarea
          value={sp.moTa}
          className="w-[400px] rounded-md border-2 border-gray-300 p-2 outline-none transition-colors duration-300 hover:border-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="trangThai" className="mb-1 block">
          Trạng thái:
        </label>
        <input
          type="radio"
          name="radio-2"
          className="radio radio-primary"
          defaultChecked
        />
        Kinh doanh
        <input
          type="radio"
          name="radio-2"
          className="radio radio-primary ml-10"
        />{" "}
        Ngừng kinh doanh
      </div>
    </>
  );
}
