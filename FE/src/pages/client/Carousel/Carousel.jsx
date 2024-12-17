import {
  ArrowRightOutlined,
  CustomerServiceOutlined,
  GiftOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { Carousel as AntCarousel, Col, Row, Typography } from "antd";
import { Link } from "react-router-dom";

const Carousel = () => {
  const images = [
    "https://drake.vn/image/catalog/H%C3%ACnh%20content/hinh-anh-giay-vans/hinh-anh-giay-vans-17.jpg",
    "https://product.hstatic.net/200000142885/product/z4121570251442_1ea4dad0962c57799e2306bf9b6cfe76_90c1420390b94518b2c2b45936bfbb88_master.jpg",
    "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lqpwlqnb93qv55",
    "https://dananglogistics.net/wp-content/uploads/2021/04/giay-dep-2.jpg",
    "https://lh6.googleusercontent.com/lP8g5IYMtFiXMFXIZ97IxWcINmIEihEYV9ajt7MjYmCTd47FeRYPCNVHSH1lTu7r2I2qA7aZ-WSTO5NlS20SPo2-VP3izublwHmy1ESCB4-J1JmseG4VcDpeHm5alzeSYpFkzP-n",
    "https://giaysneaker.store/media/magefan_blog/mot-so-hinh-anh-cua-doi-giay-sneaker-air-jordan-1-elevate-exploration-unit-3.jpg",
    "https://photo.znews.vn/w660/Uploaded/yqdxwpjwq/2021_02_06/sn.jpg",
  ];
  const { Title, Text } = Typography;
  const features = [
    {
      icon: <GiftOutlined style={{ fontSize: "36px", color: "#555" }} />,
      title: "QUÀ TẶNG HẤP DẪN",
      description: "Nhiều quà tặng và chương trình khuyến mãi hấp dẫn",
    },
    {
      icon: <TrophyOutlined style={{ fontSize: "36px", color: "#555" }} />,
      title: "DỊCH VỤ CHUYÊN NGHIỆP",
      description:
        "Chế độ Bảo Hành & Đổi sản phẩm số 1\nDịch vụ chăm sóc khách hàng tận tâm",
    },
    {
      icon: (
        <CustomerServiceOutlined style={{ fontSize: "36px", color: "#555" }} />
      ),
      title: "Hotline: 0939 819 027",
      description: "Dịch vụ hỗ trợ 24/7",
    },
  ];

  return (
    <>
      <div className="flex">
        <div className="flex w-[70%] bg-[#f9ffffb7]">
          <div className="mx-auto my-auto">
            <p className="my-8 font-mono text-[50px] font-bold">
              Tận hưởng sự thoải mái
            </p>
            <p className="my-8 font-mono text-[50px] font-bold">
              cùng BeeShoes - Cửa hàng
            </p>
            <p className="my-8 font-mono text-[50px] font-bold">
              thương mại điện tử trực tuyến
            </p>
            <p className="text-[18px] leading-8">
              Bước vào thế giới của phong cách và sự thoải mái cùng BeeShoes,
              nơi mỗi đôi giày là biểu tượng <br /> của sự khéo léo và sáng tạo.
              Khám phá những bộ sưu tập được tuyển chọn kỹ lưỡng, kết hợp hài
              hòa
              <br /> giữa xu hướng thời trang hiện đại và sự tiện nghi vượt bậc,
              giúp bạn tự tin trên mọi hành trình.
            </p>
          </div>
        </div>
        <div className="w-[30%]">
          <AntCarousel arrows autoplay autoplaySpeed={2000}>
            {images.map((image, index) => (
              <div key={index}>
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  style={{ width: "525px", height: "525px" }}
                />
              </div>
            ))}
          </AntCarousel>
        </div>
      </div>
      <div>
        {" "}
        <Row gutter={[32, 32]} justify="center" style={{ padding: "20px 0" }}>
          {features.map((feature, index) => (
            <Col
              key={index}
              xs={24}
              sm={12}
              md={8}
              style={{ textAlign: "center", padding: "0 15px" }}
            >
              <div>{feature.icon}</div>
              <Title level={5} style={{ margin: "10px 0" }}>
                {feature.title}
              </Title>
              <Text style={{ color: "#666", whiteSpace: "pre-line" }}>
                {feature.description}
              </Text>
            </Col>
          ))}
        </Row>
      </div>
      <div className="flex gap-[40px] py-8">
        <div className="mt-[100px] flex flex-col items-center gap-4">
          <img
            className="h-[200px] w-[250px] rounded-lg object-cover"
            src="https://i.pinimg.com/originals/47/67/b8/4767b82fe7c0743c05a19a77e592550c.jpg"
            alt=""
          />
          <img
            className="h-[200px] w-[250px] rounded-lg object-cover"
            src="https://i.pinimg.com/474x/39/84/ab/3984ab828582eeec81b2d4222c60de08.jpg"
            alt=""
          />
        </div>

        <div className="flex flex-col items-center gap-4">
          <img
            className="h-[200px] w-[250px] rounded-lg object-cover"
            src="https://uploads-ssl.webflow.com/604074212ceaa44112606db5/6159a38d492424203a1a7f1e_giay-air-jordan-1-stewie-griffin-dep-tua-tranh-ve-son-dau.jpg"
            alt=""
          />
          <img
            className="h-[150px] w-[150px] rounded-full border-2 border-gray-300 object-cover shadow-lg"
            src="https://snkrvn.sgp1.digitaloceanspaces.com/wp-content/uploads/2019/07/jordan-1-resell-value-prices-12.jpg"
            alt=""
          />
          <img
            className="h-[200px] w-[250px] rounded-lg object-cover"
            src="https://image.spreadshirtmedia.com/image-server/v1/compositions/T812A231PA4267PT17X69Y74D1034016677W18198H10837CxFFFFFF:x0091D3:x000000/views/1,width=378,height=378,appearanceId=231,backgroundColor=CBCBCB,noPt=true/sneakerlove-jordan-1-retro-high-d.jpg"
            alt=""
          />
        </div>

        <div className="mt-[100px] flex flex-col items-center gap-4">
          <img
            className="h-[200px] w-[250px] rounded-lg object-cover"
            src="https://lh6.googleusercontent.com/lP8g5IYMtFiXMFXIZ97IxWcINmIEihEYV9ajt7MjYmCTd47FeRYPCNVHSH1lTu7r2I2qA7aZ-WSTO5NlS20SPo2-VP3izublwHmy1ESCB4-J1JmseG4VcDpeHm5alzeSYpFkzP-n"
            alt=""
          />
          <img
            className="h-[200px] w-[250px] rounded-lg object-cover"
            src="https://darlinginthefranxx.store/wp-content/uploads/2021/04/nine-alpha-darling-in-the-franxx-jordan-sneakers-anime-shoes-mn10-gearanime-2-400x400.jpg"
            alt=""
          />
        </div>
        <div className="mx-auto flex items-center justify-center">
          <div>
            <h2 className="font-serif text-4xl">Giới thiệu về BeeShoes</h2>
            <h3 className="text-[16px] leading-8">
              Khám phá câu chuyện của BeeShoes. Chúng tôi đam mê tạo ra những
              đôi giày <br /> không chỉ tôn lên phong cách của bạn mà còn ưu
              tiên sự thoải mái và chất lượng.
            </h3>
            <Link to={"/SanPham"}>
              <button
                type="button"
                className="mb-2 me-2 mt-3 rounded-full bg-violet-700 px-5 py-2.5 text-center text-sm font-medium text-white transition duration-300 ease-in-out hover:bg-violet-800 focus:outline-none focus:ring-4 focus:ring-violet-300 dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800"
              >
                {" "}
                Xem sản phẩm của chúng tôi <ArrowRightOutlined />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Carousel;
