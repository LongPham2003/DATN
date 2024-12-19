import { Carousel as AntCarousel } from "antd";

const Carousel = () => {
  const images = [
    "https://file.hstatic.net/1000230642/file/banner_running_master.jpg",
    "https://file.hstatic.net/1000230642/file/bannerstreet_master.png",
    "https://file.hstatic.net/1000230642/file/1920x750_56f2f1c3b88b4c5584bb903ec2a69320_master.jpg",
    "https://file.hstatic.net/1000230642/file/banner_running_master.jpg",
    "https://file.hstatic.net/1000230642/file/bannerstreet_master.png",
    "https://file.hstatic.net/1000230642/file/1920x750_56f2f1c3b88b4c5584bb903ec2a69320_master.jpg",
  ];

  return (
    <AntCarousel arrows autoplay autoplaySpeed={2000}>
      {images.map((image, index) => (
        <div key={index}>
          <img
            src={image}
            alt={`Slide ${index + 1}`}
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      ))}
    </AntCarousel>
  );
};

export default Carousel;
