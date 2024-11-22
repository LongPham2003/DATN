import CacSanPham from "./../TrangChu/CacSanPham";
export default function SanPham() {
  return (
    <>
      <div className="container">
        <div className="flex justify-center text-3xl font-bold">
          <span>Tất cả các sản phâm của chúng tôi</span>
        </div>
        <CacSanPham />
      </div>
    </>
  );
}
