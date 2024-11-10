import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Card, Dropdown, Menu, Select } from "antd";
import Meta from "antd/es/card/Meta";
import axios from "./../../../api/axiosConfig";
import { useState } from "react";
import { useEffect } from "react";

export default function CacSanPham() {
  const [selectedChatLieu, setSelectedChatLieu] = useState(null);
  const [selectedChatLieuName, setSelectedChatLieuName] = useState(null);
  const [listChatLieu, setListChatLieu] = useState([]);

  let ApiChatLieu = `http://localhost:8080/api/chatlieu/getall`;

  const LayThuocTinh = async () => {
    const chatlieu = await axios.get(ApiChatLieu);
    setListChatLieu(chatlieu.data.result);
  };

  useEffect(() => {
    LayThuocTinh();
  }, []);

  // const ChatLieuItems = listChatLieu.map((cl) => ({
  //   key: cl.id,
  //   label: (
  //     <Button
  //       className={`border border-gray-300 ${
  //         selectedChatLieu === cl.id ? "bg-gray-200" : ""
  //       }`}
  //       onClick={() => {
  //         setSelectedChatLieu(cl.id);
  //         setSelectedChatLieuName(cl.ten);
  //       }}
  //     >
  //       {cl.ten}
  //     </Button>
  //   ),
  // }));

  return (
    <>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-3 mr-[60px] flex justify-center">
          <span className="text-3xl font-semibold">Bộ Lọc</span>
        </div>
        <div className="col-span-3 col-start-1 col-end-3 h-auto">
          {/* <Dropdown
            menu={{
              items: [
                {
                  key: "chat-lieu-options",
                  label: (
                    <div className="flex flex-wrap p-2">
                      {ChatLieuItems.map((item) => item.label)}
                    </div>
                  ),
                },
              ],
            }}
            trigger={["click"]}
          >
            <Button>
              {selectedChatLieuName
                ? `Chất liệu: ${selectedChatLieuName}`
                : "Chất liệu"}
            </Button>
          </Dropdown> */}
          <Select
            options={[
              { label: "Không chọn phiếu", value: "" }, // Option rỗng
              ...listChatLieu.map((cl, index) => ({
                label: `${cl.ten}`,
                value: cl.id,
                description: (
                  <>
                    <div className="flex gap-1">
                      <button>{cl.ten}</button>
                    </div>
                  </>
                ),
              })),
            ]}
          />
          <div className="my-2">
            <Card
              title="Loại"
              style={{
                width: 340,
              }}
              headStyle={{
                backgroundColor: "#f0f0f0",
                color: "black",
                fontSize: "20px",
              }}
            >
              <div className="grid grid-cols-3">
                <p className="m-1 flex h-9 w-20 items-center justify-center rounded-lg bg-red-200">
                  a
                </p>
                <p className="m-1 flex h-9 w-20 items-center justify-center rounded-lg bg-red-200">
                  b
                </p>
                <p className="m-1 flex h-9 w-20 items-center justify-center rounded-lg bg-red-200">
                  c
                </p>
                <p className="m-1 flex h-9 w-20 items-center justify-center rounded-lg bg-red-200">
                  c
                </p>
              </div>
            </Card>
          </div>
          <div className="my-2">
            <Card
              title="Thương Hiệu"
              style={{
                width: 340,
              }}
              headStyle={{
                backgroundColor: "#f0f0f0",
                color: "black",
                fontSize: "20px",
              }}
            >
              <div className="grid grid-cols-3">
                <p className="m-1 flex h-9 w-20 items-center justify-center rounded-lg bg-red-200">
                  a
                </p>
                <p className="m-1 flex h-9 w-20 items-center justify-center rounded-lg bg-red-200">
                  b
                </p>
                <p className="m-1 flex h-9 w-20 items-center justify-center rounded-lg bg-red-200">
                  c
                </p>
                <p className="m-1 flex h-9 w-20 items-center justify-center rounded-lg bg-red-200">
                  c
                </p>
              </div>
            </Card>
          </div>
          <div className="my-2">
            <Card
              title="Màu Sắc"
              style={{
                width: 340,
              }}
              headStyle={{
                backgroundColor: "#f0f0f0",
                color: "black",
                fontSize: "20px",
              }}
            >
              <div className="grid grid-cols-3">
                <p className="m-1 flex h-9 w-20 items-center justify-center rounded-lg bg-red-200">
                  a
                </p>
                <p className="m-1 flex h-9 w-20 items-center justify-center rounded-lg bg-red-200">
                  b
                </p>
                <p className="m-1 flex h-9 w-20 items-center justify-center rounded-lg bg-red-200">
                  c
                </p>
                <p className="m-1 flex h-9 w-20 items-center justify-center rounded-lg bg-red-200">
                  c
                </p>
              </div>
            </Card>
          </div>
          <div className="my-2">
            <Card
              title="Size"
              style={{
                width: 340,
              }}
              headStyle={{
                backgroundColor: "#f0f0f0",
                color: "black",
                fontSize: "20px",
              }}
            >
              <div className="grid grid-cols-3">
                <p className="m-1 flex h-9 w-20 items-center justify-center rounded-lg bg-red-200">
                  a
                </p>
                <p className="m-1 flex h-9 w-20 items-center justify-center rounded-lg bg-red-200">
                  b
                </p>
                <p className="m-1 flex h-9 w-20 items-center justify-center rounded-lg bg-red-200">
                  c
                </p>
                <p className="m-1 flex h-9 w-20 items-center justify-center rounded-lg bg-red-200">
                  c
                </p>
              </div>
            </Card>
          </div>
          <div className="my-2">
            <Card
              title="Đế Giày"
              style={{
                width: 340,
              }}
              headStyle={{
                backgroundColor: "#f0f0f0",
                color: "black",
                fontSize: "20px",
              }}
            >
              <div className="grid grid-cols-3">
                <p className="m-1 flex h-9 w-20 items-center justify-center rounded-lg bg-red-200">
                  a
                </p>
                <p className="m-1 flex h-9 w-20 items-center justify-center rounded-lg bg-red-200">
                  b
                </p>
                <p className="m-1 flex h-9 w-20 items-center justify-center rounded-lg bg-red-200">
                  c
                </p>
                <p className="m-1 flex h-9 w-20 items-center justify-center rounded-lg bg-red-200">
                  c
                </p>
              </div>
            </Card>
          </div>
          <div className="my-2">
            <Card
              title="Khoảng Giá"
              style={{
                width: 340,
              }}
              headStyle={{
                backgroundColor: "#f0f0f0",
                color: "black",
                fontSize: "20px",
              }}
            >
              <div className="grid grid-cols-3">
                <p className="m-1 flex h-9 w-20 items-center justify-center rounded-lg bg-red-200">
                  a
                </p>
                <p className="m-1 flex h-9 w-20 items-center justify-center rounded-lg bg-red-200">
                  b
                </p>
                <p className="m-1 flex h-9 w-20 items-center justify-center rounded-lg bg-red-200">
                  c
                </p>
                <p className="m-1 flex h-9 w-20 items-center justify-center rounded-lg bg-red-200">
                  c
                </p>
              </div>
            </Card>
          </div>
        </div>

        <div className="col-span-9 col-start-4 col-end-12 h-auto">
          <div className="flex justify-between gap-6">
            <Card
              hoverable
              style={{
                width: 300,
              }}
              className="col-start-2"
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                  className="transition-transform duration-300 ease-in-out hover:scale-110"
                />
              }
              actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
              ]}
            >
              <Meta
                avatar={
                  <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
                }
                title="Card title"
                description="This is the description"
              />
            </Card>
            <Card
              hoverable
              style={{
                width: 300,
              }}
              className="col-start-2"
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                  className="transition-transform duration-300 ease-in-out hover:scale-110"
                />
              }
              actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
              ]}
            >
              <Meta
                avatar={
                  <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
                }
                title="Card title"
                description="This is the description"
              />
            </Card>
            <Card
              hoverable
              style={{
                width: 300,
              }}
              className="col-start-2"
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                  className="transition-transform duration-300 ease-in-out hover:scale-110"
                />
              }
              actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
              ]}
            >
              <Meta
                avatar={
                  <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
                }
                title="Card title"
                description="This is the description"
              />
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
