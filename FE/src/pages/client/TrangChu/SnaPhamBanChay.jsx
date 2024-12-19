import {
  EditOutlined,
  EllipsisOutlined,
  HeartFilled,
  HeartOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";
import Meta from "antd/es/card/Meta";
export default function SnaPhamBanChay() {
  return (
    <>
      <div>
        <div className="flex justify-center gap-4 text-xl">
          <HeartOutlined className="mt-1 text-red-600" />
          <span className="text-2xl font-semibold text-red-600">
            Sản Phẩm Bán Chạy
          </span>
          <HeartOutlined className="mt-1 text-red-600" />
        </div>
        <div className="grid-flow-col-1 my-10 grid justify-items-center lg:grid-cols-7">
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
                className="transition duration-300 ease-in-out hover:scale-110"
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
            cover={
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                className="transition duration-300 ease-in-out hover:scale-110"
              />
            }
            className="col-start-4"
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
            cover={
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                className="transition duration-300 ease-in-out hover:scale-110"
              />
            }
            className="col-start-6"
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
    </>
  );
}
