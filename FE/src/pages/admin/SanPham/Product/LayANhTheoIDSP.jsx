import axios from "../../../../api/axiosConfig";
import { useEffect, useState } from "react";

export default function LayAnhTheoIdSP({ id, className }) {
  const [anh, setAnh] = useState("");

  useEffect(() => {
    if (id) {
      const layAnh = async () => {
        try {
          const { data } = await axios.get(
            `http://localhost:8080/api/hinhanh/dai-dien/${id}`,
          );
          const base64Image = data.result.duLieuAnhBase64; // Dữ liệu đã có tiền tố
          setAnh(base64Image); // Không cần thêm 'data:image/jpeg;base64,' nữa
        } catch (error) {
          console.error("Lỗi khi lấy ảnh:", error);
        }
      };
      layAnh();
    }
  }, [id]);

  return (
    <div className={className}>
      {anh && (
        <img
          src={anh} // Sử dụng trực tiếp chuỗi từ DB
          alt="Ảnh đại diện"
          className="h-full w-full object-cover"
        />
      )}
    </div>
  );
}
