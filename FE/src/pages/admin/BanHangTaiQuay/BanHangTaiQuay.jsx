import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Select, Switch, Tabs, Modal } from "antd";
import { useEffect, useState } from "react";
import SanPhamBanTaiQuay from "./SanPhamBanHang";
import axios from "../../../api/axiosConfig";
import { Bounce, toast, ToastContainer } from "react-toastify";

export default function BanHangTaiQuay() {
  const [hoaDonFalse, setHoaDonFalse] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  let ApiTaoHoaDon = `http://localhost:8080/banhangtaiquay/taodon`;
  let ApiLayHoaDonFalse = `http://localhost:8080/api/hoadon/getall-false`;

  const LayHoaDonFalse = async () => {
    try {
      const response = await axios.get(ApiLayHoaDonFalse);
      setHoaDonFalse(response.data.result);
    } catch (error) {
      console.log("Lay Hoa Don loi:", error);
    }
  };

  const taoHoaDon = async () => {
    try {
      await axios.post(ApiTaoHoaDon);
      toast.success("Đã tạo hóa đơn mới");
      LayHoaDonFalse();
    } catch (error) {
      console.log("Co loi xay ra:", error);
      toast.error(" Tạo hóa đơn mới thất bại");
    }
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    LayHoaDonFalse();
  }, []);
  return (
    <>
      <div className="max-h-screen overflow-y-auto font-mono">
        <span className="text-2xl">Ban hang tai quay</span>
        <div className="h-auto bg-slate-200">
          <div className="flex h-[94px] w-full items-center justify-between">
            <span className="text-xl">Danh sach hoa don</span>
            <div className="ml-auto mr-[20px] mt-3">
              {hoaDonFalse.length < 7 ? (
                <Button
                  type="primary"
                  size="large"
                  onClick={() => {
                    taoHoaDon();
                  }}
                >
                  <PlusCircleOutlined /> Tạo hóa đơn
                </Button>
              ) : (
                ""
              )}
            </div>
          </div>
          <Tabs>
            {hoaDonFalse.map((tab) => (
              <Tabs.TabPane tab={tab.ma} key={tab.ids}></Tabs.TabPane>
            ))}
          </Tabs>
        </div>

        <div className="ml-[60px] mt-[30px]">
          <Button
            style={{
              borderRadius: "30px",
              height: "35px",
              backgroundColor: "yellow",
              color: "black",
              fontWeight: "bold",
            }}
            onClick={openModal}
          >
            Chọn sản phẩm
          </Button>
        </div>

        <div className="mt-7">
          <h1>Giỏ hàng</h1>
          <div className="h-[500px] bg-slate-200">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="bg-blue-700 text-xl font-medium text-white">
                <tr>
                  <th className="w-10 px-6 py-4">STT</th>
                  <th className="w-[250px] px-6 py-4">Ảnh</th>
                  <th className="w-52 px-6 py-4">Tên</th>
                  <th className="w-52 px-6 py-4">Số lượng</th>
                  <th className="w-52 px-6 py-4">Thành tiền</th>
                  <th className="px-6 py-4">Hành động</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
        </div>

        <hr />

        <div className="mx-auto mt-5 flex w-11/12 gap-2">
          <div className="h-[100px] w-2/3 bg-slate-100">Khách hàng</div>
          <div className="w-1/3 bg-slate-200 text-lg font-bold">
            <span>Thông tin hóa đơn</span>
            {/* Mã giảm giá */}
            <div className="my-4 flex items-center justify-between">
              <div>Mã giảm giá</div>
              <div>
                <Select
                  showSearch
                  style={{ width: 330 }}
                  placeholder="Search to Select"
                  options={[
                    { value: "1", label: "Not Identified" },
                    { value: "2", label: "Closed" },
                  ]}
                />
              </div>
            </div>

            <div className="my-4 flex items-center justify-between">
              <div>Tiền hàng</div>
              <div>0 VND</div>
            </div>

            <div className="my-4 flex items-center justify-between">
              <div>Giảm giá</div>
              <div>0 VND</div>
            </div>

            <div className="my-4 flex gap-4">
              <div>Giao hàng</div>
              <div>
                <Switch />
              </div>
            </div>

            <div className="my-4 flex items-center justify-between">
              <div>Thành tiền</div>
              <div className="text-red-500">0 VND</div>
            </div>

            <div>
              <div className="my-2">
                <Button
                  style={{ height: "50px", width: "450px" }}
                  className="ml-[10px] border-2 border-green-500 text-lg font-medium text-green-500"
                >
                  Tiền mặt
                </Button>
              </div>
              <div>
                <Button
                  style={{ height: "50px", width: "450px" }}
                  className="ml-[10px] border-2 border-yellow-500 text-lg font-medium text-yellow-500"
                >
                  Chuyển khoản
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal cho SanPhamBanTaiQuay */}
      <Modal
        title="Chọn sản phẩm"
        open={modalVisible}
        onCancel={closeModal}
        footer={null}
        width={1200} // Điều chỉnh chiều rộng modal
        // Điều chỉnh chiều cao
      >
        <SanPhamBanTaiQuay />
      </Modal>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}
