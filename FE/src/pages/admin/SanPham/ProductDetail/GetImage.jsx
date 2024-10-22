import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { Modal, Upload, Popconfirm } from "antd";
import { useState } from "react";
import axios from "axios";

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const GetImage = ({ fileList, setFileList }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    );
  };

  const handleDelete = async (id) => {
    try {
      // Gửi yêu cầu DELETE đến API để xóa ảnh khỏi cơ sở dữ liệu
      await axios.delete(`http://localhost:8080/api/hinhanh/delete/${id}`);
      // Xóa ảnh khỏi danh sách file
      const updatedFileList = fileList.filter((file) => file.id !== id);
      setFileList(updatedFileList);
    } catch (error) {
      console.error("Lỗi khi xóa ảnh:", error);
    }
  };

  const handleChange = async ({ fileList: newFileList }) => {
    // Duyệt qua từng file và nếu nó không có base64, thì chuyển đổi nó
    const updatedFileList = await Promise.all(
      newFileList.map(async (file) => {
        if (!file.duLieuAnhBase64 && file.originFileObj) {
          // Nếu ảnh chưa có base64, chuyển đổi nó
          file.duLieuAnhBase64 = await getBase64(file.originFileObj);
        }
        return file;
      }),
    );

    // Cập nhật danh sách file sau khi chuyển đổi base64
    setFileList(updatedFileList);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <Upload
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        beforeUpload={() => false} // Không tải ảnh lên server ngay lập tức
        multiple
        itemRender={(originNode, file) => (
          <div style={{ position: "relative" }}>
            {originNode}
            <Popconfirm
              title="Xóa ảnh"
              description="Bạn có chắc chắn muốn xóa ảnh này?"
              okText="Xóa"
              cancelText="Hủy"
              onConfirm={() => handleDelete(file.id)} // Gọi hàm xóa ảnh
            >
              <DeleteOutlined
                style={{
                  position: "absolute",
                  top: "5px",
                  right: "5px",
                  fontSize: "18px",
                  color: "red",
                  cursor: "pointer",
                }}
              />
            </Popconfirm>
          </div>
        )}
      >
        {fileList.length >= 5 ? null : uploadButton}
      </Upload>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
};

export default GetImage;
