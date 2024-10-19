import { UserOutlined } from "@ant-design/icons";
import { Input, Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function AddProductDetail() {
  let { id } = useParams();
  const [tenSP, SetTenSP] = useState("");

  let APIGetSPById = `http://localhost:8080/api/sanpham/${id}`;
  const layTenSP = async () => {
    const response = await axios.get(APIGetSPById);
    SetTenSP(response.data.result.tenSanPham);
    // console.log(response.data.result.tenSanPham);
    // console.log(response.data.result.id);
  };

  useEffect(() => {
    layTenSP();
  }, []);

  return (
    <>
      <div className="h-auto overflow-y-auto rounded-lg">
        <div>
          <div className="mx-auto my-2 h-[420px] w-[1000px] rounded-sm">
            <div className="mt-5 text-center">
              <span className="mt-3 font-mono text-2xl font-bold">
                Thêm sản phẩm chi tiết
              </span>
            </div>
            <div className="h-[300px] rounded-lg shadow drop-shadow-2xl">
              <div className="mx-5 mt-9">
                <div className="mt-5 grid grid-cols-2 gap-6">
                  <div className="">
                    <span className="mb-9 text-xl font-semibold text-blue-500">
                      San Pham
                    </span>
                    <Input
                      className="h-[38px] w-[384px]"
                      placeholder="large size"
                      prefix={<UserOutlined />}
                      value={tenSP}
                      disabled
                    />
                  </div>
                  <div>
                    <span className="mb-9 text-xl font-semibold text-blue-500">
                      Thuong hieu
                    </span>
                    <Select
                      className="h-[38px] w-[384px]"
                      defaultValue={["lucy"]}
                      placeholder="Outlined"
                      style={{
                        flex: 1,
                      }}
                      options={[
                        {
                          value: "jack",
                          label: "Jack",
                        },
                        {
                          value: "lucy",
                          label: "Lucy",
                        },
                        {
                          value: "Yiminghe",
                          label: "yiminghe",
                        },
                      ]}
                    />
                  </div>
                </div>
                <div className="mt-10 grid grid-cols-2 gap-6">
                  <div className="">
                    <div>
                      <span className="mb-9 text-xl font-semibold text-blue-500">
                        Chat lieu
                      </span>
                    </div>
                    <Select
                      className="h-[38px] w-[384px]"
                      defaultValue={["lucy"]}
                      placeholder="Outlined"
                      style={{
                        flex: 1,
                      }}
                      options={[
                        {
                          value: "jack",
                          label: "Jack",
                        },
                        {
                          value: "lucy",
                          label: "Lucy",
                        },
                        {
                          value: "Yiminghe",
                          label: "yiminghe",
                        },
                      ]}
                    />
                  </div>
                  <div>
                    <div>
                      <span className="mb-9 text-xl font-semibold text-blue-500">
                        De Giay
                      </span>
                    </div>
                    <Select
                      className="h-[38px] w-[384px]"
                      defaultValue={["lucy"]}
                      placeholder="Outlined"
                      style={{
                        flex: 1,
                      }}
                      options={[
                        {
                          value: "jack",
                          label: "Jack",
                        },
                        {
                          value: "lucy",
                          label: "Lucy",
                        },
                        {
                          value: "Yiminghe",
                          label: "yiminghe",
                        },
                      ]}
                    />
                  </div>
                </div>
                <div className="mb-10 mt-10 grid grid-cols-2 gap-6">
                  <div className="">
                    <div>
                      <span className="mb-9 text-xl font-semibold text-blue-500">
                        Kich Thuoc
                      </span>
                    </div>
                    <Select
                      className="h-[38px] w-[384px]"
                      mode="multiple"
                      defaultValue={["lucy"]}
                      placeholder="Outlined"
                      style={{
                        flex: 1,
                      }}
                      options={[
                        {
                          value: "jack",
                          label: "Jack",
                        },
                        {
                          value: "lucy",
                          label: "Lucy",
                        },
                        {
                          value: "Yiminghe",
                          label: "yiminghe",
                        },
                      ]}
                    />
                  </div>
                  <div>
                    <div>
                      <span className="mb-9 text-xl font-semibold text-blue-500">
                        Mau Sac
                      </span>
                    </div>
                    <Select
                      className="h-[38px] w-[384px]"
                      mode="multiple"
                      defaultValue={["lucy"]}
                      placeholder="Outlined"
                      style={{
                        flex: 1,
                      }}
                      options={[
                        {
                          value: "jack",
                          label: "Jack",
                        },
                        {
                          value: "lucy",
                          label: "Lucy",
                        },
                        {
                          value: "Yiminghe",
                          label: "yiminghe",
                        },
                      ]}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[500px] rounded-lg bg-orange-500">render</div>
      </div>
    </>
  );
}
