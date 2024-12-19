import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { Modal, Upload, message } from "antd";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

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

  const handleDelete = async (file) => {
    try {
      await axios.delete(`http://localhost:8080/api/hinhanh/delete/${file.id}`);
      const updatedFileList = fileList.filter((item) => item.uid !== file.uid);
      setFileList(updatedFileList);
      toast.success("Xóa ảnh thành công!");
    } catch (error) {
      // console.error("Lỗi khi xóa ảnh:", error);
      toast.error("Lỗi khi xóa ảnh.");
    }
  };

  const handleChange = async ({ fileList: newFileList }) => {
    const updatedFileList = await Promise.all(
      newFileList.map(async (file) => {
        if (!file.duLieuAnhBase64 && file.originFileObj) {
          file.duLieuAnhBase64 = await getBase64(file.originFileObj);
        }
        return file;
      }),
    );
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
        beforeUpload={() => false}
        onRemove={(file) =>
          new Promise((resolve, reject) => {
            Modal.confirm({
              title: "Bạn có chắc chắn muốn xóa ảnh này?",
              onOk: () => {
                handleDelete(file);
                resolve(true);
              },
              onCancel: () => resolve(false),
              okText: "Xóa",
              cancelText: "Hủy",
            });
          })
        }
        itemRender={(originNode) => (
          <div style={{ cursor: "pointer" }}>{originNode}</div>
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
