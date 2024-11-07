import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";
import Meta from "antd/es/card/Meta";

export default function CacSanPham() {
  return (
    <>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-3 mr-[60px] flex justify-center">
          <span className="text-3xl font-semibold">Bộ Lọc</span>
        </div>
        <div className="col-span-3 col-start-1 col-end-3 h-auto">
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
