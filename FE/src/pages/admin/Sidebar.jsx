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
  Cog6ToothIcon,
  PowerIcon,
  PercentBadgeIcon,
  BuildingStorefrontIcon,
  ReceiptPercentIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
// import { logoppng } from "./../../../logo";
// Component Sidebar chính
export function Sidebar() {
  const navigate = useNavigate();
  // Khai báo state cho accordion và thuộc tính
  const [open, setOpen] = React.useState(0);
  const [openAttribute, setOpenAttribute] = React.useState(false);

  // Hàm xử lý mở/đóng accordion
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  // Hàm xử lý mở/đóng thuộc tính
  const handleAttributeOpen = () => {
    setOpenAttribute(!openAttribute);
  };

  const handleLogout = () => {
    // Xóa quyền khỏi localStorage
    localStorage.removeItem("userRole");
    localStorage.removeItem("email");
    localStorage.removeItem("authToken");

    // Điều hướng về trang đăng nhập
    navigate("/login");
  };

  // Render component
  return (
    <Card className="scrollbar scrollbar-rounded-full scrollbar-thumb-blue-500 scrollbar-track-blue-100 h-screen w-full max-w-[20rem] overflow-y-auto p-4 shadow-xl shadow-blue-900/5">
      {/* Tiêu đề Sidebar */}
      <div className="mb-2 ml-12 p-4">
        <img src="./../../../logo/logoo.png" alt="Logo" className="h-32" />
      </div>
      <List>
        {/* Phần Thống kê */}

        <Link to="/admin/thongke">
          <ListItem className="ml-3 h-[50px] p-0">
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            <Typography color="blue-gray" className="mr-auto font-normal">
              Thống kê
            </Typography>
          </ListItem>
        </Link>
        <Link to="/admin/hoadon">
          <ListItem className="ml-3 h-[50px] p-0">
            <ListItemPrefix>
              <ReceiptPercentIcon className="h-5 w-5" />
            </ListItemPrefix>
            <Typography color="blue-gray" className="mr-auto font-normal">
              Hóa Đơn
            </Typography>
          </ListItem>
        </Link>
        <Link to="/admin/banhangoff">
          <ListItem className="ml-3 h-[50px] p-0">
            <ListItemPrefix>
              <BuildingStorefrontIcon className="h-5 w-5" />
            </ListItemPrefix>
            <Typography color="blue-gray" className="mr-auto font-normal">
              Bán hàng tại quầy
            </Typography>
          </ListItem>
        </Link>

        {/* Phần Sản phẩm */}
        <Accordion
          open={open === 2}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 2}>
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
              {/* Mục Sản phẩm */}
              <Link to="/admin/sanpham">
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Sản phẩm
                </ListItem>
              </Link>
              <hr />

              <hr />
              {/* Mục Thuộc tính */}
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
                    className={`h-5 w-3 transition-transform ${openAttribute ? "rotate-180" : ""}`}
                  />
                </ListItemSuffix>
              </ListItem>

              {/* Submenu của Thuộc tính */}
              {openAttribute && (
                <>
                  <Link to="/admin/mausac">
                    <ListItem className="pl-8">
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Màu sắc
                    </ListItem>
                  </Link>
                  <Link to="/admin/chatlieu">
                    <ListItem className="pl-8">
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Chất liệu
                    </ListItem>
                  </Link>
                  <Link to="/admin/kichthuoc">
                    <ListItem className="pl-8">
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Kích thước
                    </ListItem>
                  </Link>
                  <Link to="/admin/thuonghieu">
                    <ListItem className="pl-8">
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Thương hiệu
                    </ListItem>
                  </Link>
                  <Link to="/admin/loaigiay">
                    <ListItem className="pl-8">
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Loại giày
                    </ListItem>
                  </Link>
                  <Link to="/admin/degiay">
                    <ListItem className="pl-8">
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Đế giày
                    </ListItem>
                  </Link>
                </>
              )}
            </List>
          </AccordionBody>
        </Accordion>

        {/* Phần Voucher */}
        <hr className="border-blue-gray-50 my-2" />
        <Link to="/admin/phieugiamgia">
          <ListItem>
            <ListItemPrefix>
              <PercentBadgeIcon className="h-5 w-5" />
            </ListItemPrefix>
            Voucher
          </ListItem>
        </Link>

        {/* Phần Profile (Nhân viên) */}
        <Link to="/admin/nhanvien">
          <ListItem>
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            Nhân Viên
          </ListItem>
        </Link>

        {/* Phần Settings (Khách hàng) */}
        <Link to="/admin/khachhang">
          <ListItem>
            <ListItemPrefix>
              <UserIcon className="h-5 w-5" />
            </ListItemPrefix>
            Khách Hàng
          </ListItem>
        </Link>
      </List>

      {/* Phần tên người dùng và Logout */}
      <div className="mt-auto">
        <hr className="border-blue-gray-50 my-2" />
        {/* Tên người dùng */}
        <div className="mb-2 flex items-center gap-4">
          {/* <Avatar
            src="https://docs.material-tailwind.com/img/face-2.jpg"
            alt="avatar"
          /> */}
          <div>
            <Typography className="font-bold" variant="small">
              {localStorage.getItem("email")}
            </Typography>
            <Typography variant="small" color="gray" className="font-normal">
              Web Developer
            </Typography>
          </div>
        </div>
        {/* Phần Log Out */}
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
