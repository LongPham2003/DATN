import React from "react";
import { Form, Input, Button } from "antd";
export default function LienHe() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Form submitted:", values);
  };

  return (
    <div className="ml-20">
      <div className="w-[500px] bg-white p-6">
        <h2 className="mb-2 text-2xl font-bold">LIÊN HỆ VỚI CHÚNG TÔI</h2>
        <p className="mb-1">Bạn đang nghĩ gì?</p>
        <p className="mb-4 text-sm text-gray-600">
          Hãy để lại lời nhắn, chúng tôi sẽ phản hồi bạn sớm nhé!
        </p>

        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Tên"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên của bạn" }]}
          >
            <Input placeholder="Tên" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email của bạn" },
              { type: "email", message: "Email không hợp lệ" },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
          >
            <Input placeholder="Số điện thoại" />
          </Form.Item>

          <Form.Item
            label="Lời nhắn"
            name="message"
            rules={[{ required: true, message: "Vui lòng nhập lời nhắn" }]}
          >
            <Input.TextArea rows={4} placeholder="Lời nhắn" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-black hover:bg-gray-800"
            >
              GỬI
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
