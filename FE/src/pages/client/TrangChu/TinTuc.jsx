export default function TinTuc() {
  return (
    <>
      <div className="mt-[30px] grid grid-cols-1 gap-8 p-8 md:grid-cols-2">
        {/* <!-- Black & Black Section --> */}
        <div className="relative transition duration-300 ease-in-out hover:scale-110 hover:cursor-pointer">
          <img
            src="https://intphcm.com/data/upload/poster-giay-ad.jpg"
            alt="Black & Black"
            className="h-[330px] w-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center"></div>
          <div className="mt-4">
            <h3 className="text-xl font-bold">BLACK & BLACK</h3>
            <p>
              Mặc dù được ứng dụng rất nhiều, nhưng sắc đen lúc nào cũng toát
              lên một vẻ huyền bí không nhàm chán.
            </p>
          </div>
        </div>

        {/* <!-- Bền bỉ --> */}
        <div className="relative transition duration-300 ease-in-out hover:scale-110 hover:cursor-pointer">
          <img
            src="https://intphcm.com/data/upload/poster-giay-ben.jpg"
            className="h-[330px] w-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center"></div>
          <div className="mt-4">
            <h3 className="text-xl font-bold">BỀN BỈ</h3>
            <p>Tất cả những sản phẩm đều bền bỉ, bất chấp mọi thời tiết</p>
          </div>
        </div>
      </div>
      ;
    </>
  );
}
