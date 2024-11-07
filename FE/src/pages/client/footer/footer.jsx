export default function Footer() {
  return (
    <>
      <div className="py-10 text-black">
        <div className="container mx-auto flex justify-between">
          <div className="flex flex-col items-center">
            <img
              src="./logo/logopng.png"
              alt="Bee Shoes"
              className="w-[150px]"
            />
          </div>

          <div className="flex flex-col">
            <h3 className="mb-4 font-bold">SẢN PHẨM</h3>
            <ul>
              <li>Giày Thể Thao</li>
            </ul>
          </div>

          <div className="flex flex-col">
            <h3 className="mb-4 font-bold">ĐỊA CHỈ</h3>
            <ul>
              <li>Tòa nhà FPT Polytechnic</li>
              <li>13 P. Trịnh Văn Bô</li>
              <li>Xuân Phương, Nam Từ Liêm</li>
            </ul>
          </div>

          <div className="flex flex-col">
            <h3 className="mb-4 font-bold">LIÊN HỆ</h3>
            <ul>
              <li>Hotline: 0999 888 999</li>
              <li>ket noi voi chung toi: </li>
              <li className="flex gap-2">
                <img src="./logo/FB.png" alt="" className="h-10" />
                <img src="./logo/tiktok.jpg" alt="" className="h-8" />
                <img src="./logo/zalo.jpg" alt="" className="h-10" />
                <img src="./logo/ins.png" alt="" className="h-10" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
