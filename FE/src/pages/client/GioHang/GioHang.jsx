import { TrashIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { Button, Checkbox, Input, Select } from "antd";

export default function GioHang() {
  return (
    <>
      <div className="container my-8 h-auto">
        <div className="mx-auto text-center">
          <h1 className="text-2xl font-bold">Giỏ Hàng</h1>
          <hr
            style={{ borderColor: "orange", width: "30%", margin: "0 auto" }}
          />
        </div>

        <div className="mx-36 flex gap-6">
          {/* Danh sach hang hoa */}
          <div className="h-auto w-2/3">
            <div className="my-5 flex border-b p-2 shadow drop-shadow-xl">
              <div className="w-10">
                <Checkbox />
              </div>
              <span className="ml-14">Hình ảnh</span>
              <span className="ml-20">Sản phẩm</span>
              <span className="ml-[360px]">Tổng cộng</span>
            </div>
            {/* Hang hoa */}
            <div>
              <div className="my-5 flex h-auto border-b p-2 shadow drop-shadow-xl">
                <div className="flex w-10 items-center justify-center">
                  <Checkbox />
                </div>
                {/* Anh san pham */}
                <div className="flex items-center justify-center">
                  <img
                    src="https://product.hstatic.net/1000230642/product/hsm007501xdl-1_1fd86fdd3f9242e289045bb3ab8192aa_large.jpg"
                    alt="Giày Chạy Nam Adidas"
                    className="ml-12 h-24 w-24"
                  />
                </div>
                {/* Thong tin sna pham */}
                <div className="ml-10">
                  <div>
                    <h2 className="mt-2 font-bold">Giày Chạy Nam Adidas</h2>
                    <p className="mt-2">Ultraboost Cc_1 Dna FZ2545 - [42]</p>
                    <p className="mt-2">Giá: 2.500.000 VND</p>
                    <p className="mt-2">
                      Số lượng:
                      <button className="mr-3">-</button>
                      <Input
                        type="text"
                        className="w-20"
                        onInput={(e) => {
                          e.target.value = e.target.value.replace(
                            /[^0-9]/g,
                            "",
                          ); // Loại bỏ ký tự không phải số
                        }}
                      />
                      <button className="ml-3">+</button>
                    </p>
                  </div>
                </div>
                {/* Tong cong */}
                <div className="ml-[190px]">
                  <div className="flex items-center justify-center">
                    <p>Con hang</p>
                  </div>
                  <div className="mt-3 flex items-center justify-center">
                    {/* Tong tien */}
                    <p>200000</p>
                  </div>
                  <div className="mt-4 flex items-center justify-center">
                    {/* Hanh dong */}
                    <p>
                      <TrashIcon className="w-6 text-red-600" />
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="my-5 flex h-auto border-b p-2 shadow drop-shadow-xl">
                <div className="flex w-10 items-center justify-center">
                  <Checkbox />
                </div>
                {/* Anh san pham */}
                <div className="flex items-center justify-center">
                  <img
                    src="https://product.hstatic.net/1000230642/product/hsm007501xdl-1_1fd86fdd3f9242e289045bb3ab8192aa_large.jpg"
                    alt="Giày Chạy Nam Adidas"
                    className="ml-12 h-24 w-24"
                  />
                </div>
                {/* Thong tin sna pham */}
                <div className="ml-10">
                  <div>
                    <h2 className="mt-2 font-bold">Giày Chạy Nam Adidas</h2>
                    <p className="mt-2">Ultraboost Cc_1 Dna FZ2545 - [42]</p>
                    <p className="mt-2">Giá: 2.500.000 VND</p>
                    <p className="mt-2">
                      Số lượng:
                      <button className="mr-3">-</button>
                      <Input
                        type="text"
                        className="w-20"
                        onInput={(e) => {
                          e.target.value = e.target.value.replace(
                            /[^0-9]/g,
                            "",
                          ); // Loại bỏ ký tự không phải số
                        }}
                      />
                      <button className="ml-3">+</button>
                    </p>
                  </div>
                </div>
                {/* Tong cong */}
                <div className="ml-[190px]">
                  <div className="flex items-center justify-center">
                    <p>Con hang</p>
                  </div>
                  <div className="mt-3 flex items-center justify-center">
                    {/* Tong tien */}
                    <p>200000</p>
                  </div>
                  <div className="mt-4 flex items-center justify-center">
                    {/* Hanh dong */}
                    <p>
                      <TrashIcon className="w-6 text-red-600" />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Tam tinh */}
          <div className="w-1/3">
            <div className="h-auto">
              <div className="p-3">
                <div>
                  <span className="ml-8 text-xl">Don hang</span>
                  <hr
                    style={{
                      borderColor: "black",
                      width: "100%",
                      margin: "0 auto",
                    }}
                  />
                </div>
                {/* Thong tin thanh toan */}
                <div>
                  <div className="text-lg font-bold">
                    {/* Mã giảm giá */}
                    <div className="my-4 flex items-center justify-between">
                      <div>Mã giảm giá</div>
                      <div className="flex items-center">
                        <Select
                          showSearch
                          style={{ width: 150, height: "35px" }}
                          placeholder="Chọn phiếu giảm giá"
                          optionLabelProp="label" // Chỉ hiển thị 'label' sau khi chọn
                        />

                        <Button
                          color="danger"
                          variant="solid"
                          className="ml-2 flex h-[35px] items-center justify-center" // Đặt chiều cao cho nút bằng với <Select />
                          // onClick={XoaPhieuGiamGiaKhoiHoaDon}
                        >
                          <XMarkIcon className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>

                    <div className="my-4 flex items-center justify-between">
                      <div>Tiền hàng</div>
                      <div> </div>
                    </div>

                    <div className="my-4 flex items-center justify-between">
                      <div>Tiền được giảm</div>
                      <div></div>
                    </div>

                    <div className="my-4 flex items-center justify-between">
                      <div>Thành tiền</div>
                      <div className="text-red-500">VND</div>
                    </div>
                  </div>
                </div>
                <hr
                  style={{
                    borderColor: "black",
                    width: "100%",
                    margin: "0 auto",
                  }}
                />
                {/* Nut thanh toan */}
                <div className="mt-3">
                  <button className="h-16 w-full rounded-lg border bg-orange-600 text-2xl font-semibold text-white transition duration-300 ease-in-out hover:bg-black">
                    Tiep tuc mua hang
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
