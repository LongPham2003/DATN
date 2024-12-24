import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  PowerIcon,
  PercentBadgeIcon,
  BuildingStorefrontIcon,
  ReceiptPercentIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";

export function Sidebar() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(0);
  const [openAttribute, setOpenAttribute] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState("");

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const handleAttributeOpen = () => {
    setOpenAttribute(!openAttribute);
  };

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("email");
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  return (
    <Card className="scrollbar scrollbar-rounded-full scrollbar-thumb-blue-500 scrollbar-track-blue-100 h-screen w-full max-w-[20rem] overflow-y-auto p-4 shadow-xl shadow-blue-900/5">
      <div className="mb-2 ml-12 p-4">
        <img src="./../../../logo/logoo.png" alt="Logo" className="h-32" />
      </div>
      <List>
        {/* Thống kê */}
        <Link to="/admin/thongke">
          <ListItem
            className={`ml-3 h-[50px] p-0 ${
              selectedItem === "thongke" ? "bg-blue-100" : ""
            }`}
            onClick={() => handleSelectItem("thongke")}
          >
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            <Typography color="blue-gray" className="mr-auto font-normal">
              Thống kê
            </Typography>
          </ListItem>
        </Link>

        {/* Hóa Đơn */}
        <Link to="/admin/hoadon">
          <ListItem
            className={`ml-3 h-[50px] p-0 ${
              selectedItem === "hoadon" ? "bg-blue-100" : ""
            }`}
            onClick={() => handleSelectItem("hoadon")}
          >
            <ListItemPrefix>
              <ReceiptPercentIcon className="h-5 w-5" />
            </ListItemPrefix>
            <Typography color="blue-gray" className="mr-auto font-normal">
              Hóa Đơn
            </Typography>
          </ListItem>
        </Link>

        {/* Bán hàng tại quầy */}
        <Link to="/admin/banhangoff">
          <ListItem
            className={`ml-3 h-[50px] p-0 ${
              selectedItem === "banhangoff" ? "bg-blue-100" : ""
            }`}
            onClick={() => handleSelectItem("banhangoff")}
          >
            <ListItemPrefix>
              <BuildingStorefrontIcon className="h-5 w-5" />
            </ListItemPrefix>
            <Typography color="blue-gray" className="mr-auto font-normal">
              Bán hàng tại quầy
            </Typography>
          </ListItem>
        </Link>

        {/* Sản phẩm */}
        <Accordion
          open={open === 2}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 2 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem
            className={`p-0 ${selectedItem === "sanpham" ? "bg-blue-100" : ""}`}
            selected={open === 2}
            onClick={() => handleSelectItem("sanpham")}
          >
            <AccordionHeader
              onClick={() => handleOpen(2)}
              className="border-b-0 p-3"
            >
              <ListItemPrefix>
                <ShoppingBagIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Sản phẩm
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <Link to="/admin/sanpham">
                <ListItem
                  className={`${
                    selectedItem === "sanpham-item" ? "bg-blue-100" : ""
                  }`}
                  onClick={() => handleSelectItem("sanpham-item")}
                >
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Sản phẩm
                </ListItem>
              </Link>
              {/* Thuộc tính */}
              <ListItem
                onClick={handleAttributeOpen}
                className="flex items-center justify-between p-2"
              >
                <div className="flex items-center">
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  <Typography className="font-normal">Thuộc tính</Typography>
                </div>
                <ListItemSuffix>
                  <ChevronDownIcon
                    strokeWidth={2.5}
                    className={`h-5 w-3 transition-transform ${
                      openAttribute ? "rotate-180" : ""
                    }`}
                  />
                </ListItemSuffix>
              </ListItem>
              {openAttribute && (
                <>
                  <Link to="/admin/mausac">
                    <ListItem
                      className={`pl-8 ${
                        selectedItem === "mausac" ? "bg-blue-100" : ""
                      }`}
                      onClick={() => handleSelectItem("mausac")}
                    >
                      Màu sắc
                    </ListItem>
                  </Link>
                  <Link to="/admin/chatlieu">
                    <ListItem
                      className={`pl-8 ${
                        selectedItem === "chatlieu" ? "bg-blue-100" : ""
                      }`}
                      onClick={() => handleSelectItem("chatlieu")}
                    >
                      Chất liệu
                    </ListItem>
                  </Link>
                  <Link to="/admin/kichthuoc">
                    <ListItem
                      className={`pl-8 ${
                        selectedItem === "kichthuoc" ? "bg-blue-100" : ""
                      }`}
                      onClick={() => handleSelectItem("kichthuoc")}
                    >
                      Kích thước
                    </ListItem>
                  </Link>
                  <Link to="/admin/thuonghieu">
                    <ListItem
                      className={`pl-8 ${
                        selectedItem === "thuonghieu" ? "bg-blue-100" : ""
                      }`}
                      onClick={() => handleSelectItem("thuonghieu")}
                    >
                      Thương hiệu
                    </ListItem>
                  </Link>
                  <Link to="/admin/loaigiay">
                    <ListItem
                      className={`pl-8 ${
                        selectedItem === "loaigiay" ? "bg-blue-100" : ""
                      }`}
                      onClick={() => handleSelectItem("loaigiay")}
                    >
                      Loại giày
                    </ListItem>
                  </Link>
                  <Link to="/admin/degiay">
                    <ListItem
                      className={`pl-8 ${
                        selectedItem === "degiay" ? "bg-blue-100" : ""
                      }`}
                      onClick={() => handleSelectItem("degiay")}
                    >
                      Đế giày
                    </ListItem>
                  </Link>
                </>
              )}
            </List>
          </AccordionBody>
        </Accordion>

        {/* Phiếu giảm giá */}
        <Link to="/admin/phieugiamgia">
          <ListItem
            className={`${
              selectedItem === "phieugiamgia" ? "bg-blue-100" : ""
            }`}
            onClick={() => handleSelectItem("phieugiamgia")}
          >
            <ListItemPrefix>
              <PercentBadgeIcon className="h-5 w-5" />
            </ListItemPrefix>
            Phiếu giảm giá
          </ListItem>
        </Link>

        {/* Nhân viên */}
        <Link to="/admin/nhanvien">
          <ListItem
            className={`${selectedItem === "nhanvien" ? "bg-blue-100" : ""}`}
            onClick={() => handleSelectItem("nhanvien")}
          >
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            Nhân Viên
          </ListItem>
        </Link>

        {/* Khách hàng */}
        <Link to="/admin/khachhang">
          <ListItem
            className={`${selectedItem === "khachhang" ? "bg-blue-100" : ""}`}
            onClick={() => handleSelectItem("khachhang")}
          >
            <ListItemPrefix>
              <UserIcon className="h-5 w-5" />
            </ListItemPrefix>
            Khách Hàng
          </ListItem>
        </Link>
      </List>

      <div className="mt-auto">
        <hr className="border-blue-gray-50 my-2" />
        <div className="mb-2 flex items-center gap-4">
          <div>
            <Typography className="font-bold" variant="small">
              {localStorage.getItem("email")}
            </Typography>
          </div>
        </div>
        <ListItem onClick={handleLogout}>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </div>
    </Card>
  );
}
