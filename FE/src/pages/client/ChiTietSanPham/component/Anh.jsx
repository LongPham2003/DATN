import React, { useState, useEffect } from "react";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Thêm dòng này để áp dụng CSS mặc định cho Carousel

export default function AnhSP({ id }) {
  const [listAnh, setListAnh] = useState([]);

  const ApiLay5anh = `http://localhost:8080/api/hinhanh/san-pham/${id}/top5`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(ApiLay5anh);
        setListAnh(response.data.result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [ApiLay5anh]);

  return (
    <Carousel
      showArrows={true}
      showIndicators={true}
      showThumbs={true} // Ẩn thumbnail nếu không cần thiết
      dynamicHeight={false} // Đảm bảo chiều cao không thay đổi động
      infiniteLoop={true} // Vòng lặp vô hạn
      autoPlay={true} // Tự động chạy
    >
      {listAnh.map((hinhAnh, index) => (
        <div key={index}>
          <img
            src={hinhAnh.duLieuAnhBase64}
            alt={`Hình ảnh ${index + 1}`}
            style={{ width: "50%", height: "auto" }} // Căn chỉnh hình ảnh
          />
        </div>
      ))}
    </Carousel>
  );
}
