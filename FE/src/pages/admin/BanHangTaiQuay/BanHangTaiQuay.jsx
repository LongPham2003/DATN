import { PlusCircleOutlined } from "@ant-design/icons";
import { PlusCircleIcon, PlusIcon } from "@heroicons/react/16/solid";
import { Button, Select, Switch, Tabs } from "antd";
import { useState } from "react";

export default function BanHangTaiQuay() {
  const [items, setItems] = useState([
    {
      key: "1",
      label: "Tab 1",
      children: "Content of Tab Pane 1",
    },
  ]);

  return (
    <>
      <div className="max-h-screen overflow-y-auto font-mono">
        <span className="text-2xl">Ban hang tai quay</span>
        <div className="h-auto bg-slate-200">
          {/* Chon hoa don, tao hoa don */}
          <div className="flex w-full items-center justify-between">
            <span className="text-xl">Danh sach hoa don</span>
            <div className="ml-auto mr-[20px] mt-3">
              <Button type="primary" size="large">
                <PlusCircleOutlined /> Tạo hóa đơn
              </Button>
            </div>
          </div>
          <Tabs>
            {items.map((tab) => (
              <Tabs.TabPane tab={tab.label} key={tab.key}></Tabs.TabPane>
            ))}
          </Tabs>
        </div>
        {/* Hien thi cac SP va thong tin don hang */}
        <div className="ml-[60px] mt-[30px]">
          <Button
            color="primary"
            variant="solid"
            style={{
              borderRadius: "30px",
              height: "35px",
              backgroundColor: "yellow",
              color: "black",
              fontWeight: "bold",
            }}
          >
            Chon san pham
          </Button>
        </div>
        <div className="mt-7">
          <h1>Giỏ hàng</h1>
          <div className="h-[500px] bg-slate-200">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="bg-blue-700 text-xl font-medium text-white">
                <tr>
                  <th className="w-10 px-6 py-4">STT</th>
                  <th className="w-[250px] px-6 py-4">Anh</th>
                  <th className="w-52 px-6 py-4">Ten</th>
                  <th className="w-52 px-6 py-4">SO luong </th>
                  <th className="w-52 px-6 py-4">Thành tiền</th>
                  <th className="px-6 py-4">Hanh DOng</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
        </div>
        <hr />
        <div className="mx-auto mt-5 flex w-11/12 gap-2">
          <div className="h-[100px] w-2/3 bg-slate-100">Khach hang</div>
          <div className="w-1/3 bg-slate-200 text-lg font-bold">
            <span>Thong tin hoa don</span>
            {/* Ma giam gia */}
            <div className="my-4 flex items-center justify-between">
              <div>Mã giảm giá</div>
              <div>
                <Select
                  showSearch
                  style={{
                    width: 330,
                  }}
                  placeholder="Search to Select"
                  options={[
                    {
                      value: "1",
                      label: "Not Identified",
                    },
                    {
                      value: "2",
                      label: "Closed",
                    },
                  ]}
                />
              </div>
            </div>
            <div className="my-4 flex items-center justify-between">
              <div>Tien Hang</div>
              <div>0 VND</div>
            </div>
            <div className="my-4 flex items-center justify-between">
              <div>Giam gia</div>
              <div>0 VND</div>
            </div>
            <div className="my-4 flex gap-4">
              <div>Giao hang</div>
              <div>
                <Switch />
              </div>
            </div>
            <div className="my-4 flex items-center justify-between">
              <div>Thanh tien</div>
              <div className="text-red-500">0 VND</div>
            </div>
            <div>
              <div className="my-2">
                <Button
                  style={{
                    height: "50px",
                    width: "450px",
                  }}
                  className="ml-[10px] border-2 border-green-500 text-lg font-medium text-green-500"
                >
                  Tiền mặt
                </Button>
              </div>
              <div>
                <Button
                  style={{
                    height: "50px",
                    width: "450px",
                  }}
                  className="ml-[10px] border-2 border-yellow-500 text-lg font-medium text-yellow-500"
                >
                  Chuyển khoản
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
