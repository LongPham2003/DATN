/* eslint-disable react/prop-types */
const ThongTinKhachHang = ({ hoaDon }) => {
  return (
    <div>
      <div>
        <h3 className="text-[20px] font-bold text-pink-500">
          Thông Tin Khách Hàng
        </h3>
        <div className="mx-4 flex gap-10 text-lg">
          {/* Cột trái */}
          <div className="w-1/2 space-y-4 border-r pr-4">
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-600">Tên khách hàng:</span>
              <h3 className="font-semibold text-gray-800">
                {hoaDon.tenKhachHang}
              </h3>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-600">Số điện thoại:</span>
              <h3 className="font-semibold text-gray-800">
                {hoaDon.soDienThoai}
              </h3>
            </div>
          </div>

          {/* Cột phải */}
          <div className="w-1/2 space-y-4 pl-4">
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-600">
                Địa chỉ giao hàng:
              </span>
              <h3 className="font-semibold text-gray-800">
                {hoaDon.diaChiGiaoHang || "Không có"}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ThongTinKhachHang;
