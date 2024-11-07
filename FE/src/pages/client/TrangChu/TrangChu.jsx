import {
  EditOutlined,
  EllipsisOutlined,
  HeartFilled,
  HeartOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";
import Meta from "antd/es/card/Meta";
import Carousel from "../Carousel/Carousel";
import CacSanPham from "./CacSanPham";

export default function TrangChu() {
  return (
    <>
      <div className="container">
        <Carousel />
        {/* San Pham ban chay */}
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
        <div className="flex justify-center text-3xl font-bold">
          <span>------- Các Sản Phẩm khác -------</span>
        </div>

        <div className="mb-7">
          <CacSanPham />
        </div>

        <div className="flex justify-center text-3xl font-bold">
          <span>------- Tin tức nổi bật -------</span>
        </div>

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
      </div>
    </>
  );
}
