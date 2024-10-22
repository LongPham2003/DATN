import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Button, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useParams } from "react-router-dom";

export default function UpdateProductDetail() {
  const { id } = useParams();

  return (
    <>
      <div className="mx-10 font-mono">
        <div>
          <div className="my-5 flex justify-center">
            <span className="text-3xl font-bold">Thong tin san pham</span>
          </div>
          <div>
            <label>Ten San Pham</label>
            <Input size="large" />
          </div>
          <div>
            <label>Mo Ta</label>
            <TextArea size="large" />
          </div>
        </div>
        <div className="flex gap-9">
          <div>
            <div className="my-4">
              <label>Thuong Hieu:</label>
              <Select
                style={{
                  width: "500px",
                  marginLeft: "10px",
                }}
                size="large"
              />
            </div>
            <div className="my-4">
              <label htmlFor="">Chat Lieu:</label>
              <Select
                style={{
                  width: "500px",
                  marginLeft: "27px",
                }}
                size="large"
              />
            </div>
            <div className="my-4">
              <label htmlFor="">Mau Sac:</label>
              <Select
                style={{
                  width: "500px",
                  marginLeft: "43px",
                }}
                size="large"
              />
            </div>
          </div>
          <div>
            <div className="my-4">
              <label htmlFor="">Kich Thuoc:</label>
              <Select
                style={{
                  width: "500px",
                  marginLeft: "15px",
                }}
                size="large"
              />
            </div>
            <div className="my-4">
              <label htmlFor="">De Giay:</label>
              <Select
                style={{
                  width: "500px",
                  marginLeft: "40px",
                }}
                size="large"
              />
            </div>
            <div className="my-4">
              <label htmlFor="">Trang Thai:</label>
              <Select
                style={{
                  width: "500px",
                  marginLeft: "16px",
                }}
                size="large"
              />
            </div>
          </div>
        </div>
        <div className="h-[300px] bg-slate-100">
          <div className="my-5 flex justify-center">
            <span className="text-3xl font-bold">Anh San Pham</span>
          </div>
        </div>
        <div className="mt-5 flex justify-end gap-6">
          <Button type="primary">
            <CheckCircleOutlined /> Luu
          </Button>
          <Button color="danger" variant="solid">
            <CloseCircleOutlined /> Quay lai
          </Button>
        </div>
      </div>
    </>
  );
}
