export default function ChonSizeVSMauSac({ id }) {
  return (
    <>
      <span className="text-[60px] font-normal">Ten SP</span>
      <div className="my-3">
        <span className="text-xl text-red-500">Gia tien</span>
      </div>

      <div className="my-3">
        <span>Chon kich thuoc</span>
      </div>

      <div className="my-3">
        <span>Chon size</span>
      </div>
      <div className="my-3">
        <span>Nhap so luong mua:</span>
      </div>
      <div className="flex gap-2">
        <button className="h-[50px] w-[250px] rounded bg-blue-500 px-4 py-2 text-xl text-white hover:bg-blue-600">
          Thêm vào giỏ hàng
        </button>
        <button className="h-[50px] w-[250px] rounded bg-orange-500 px-4 py-2 text-xl text-white hover:bg-orange-600">
          Mua ngay
        </button>
      </div>
    </>
  );
}
