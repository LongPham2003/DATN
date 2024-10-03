// Import các thư viện và components cần thiết
import React, { useState } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Avatar,
  IconButton,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
  PercentBadgeIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

// Component Sidebar chính
export function Sidebar() {
  // Khai báo state cho accordion và thuộc tính
  const [open, setOpen] = useState(0);
  const [openAttribute, setOpenAttribute] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Hàm xử lý mở/đóng accordion
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  // Hàm xử lý mở/đóng thuộc tính
  const handleAttributeOpen = () => {
    setOpenAttribute(!openAttribute);
  };

  // Hàm xử lý mở/đóng sidebar trên mobile
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Render component
  return (
    <>
      {/* Nút toggle cho mobile */}
      <IconButton
        variant="text"
        className="md:hidden fixed top-4 left-4 z-50"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? (
          <XMarkIcon className="h-6 w-6" />
        ) : (
          <Bars3Icon className="h-6 w-6" />
        )}
      </IconButton>

      {/* Sidebar */}
      <Card
        className={`scrollbar scrollbar-rounded-full scrollbar-thumb-blue-500 scrollbar-track-blue-100 h-screen w-full max-w-[20rem] overflow-y-auto p-4 shadow-xl shadow-blue-900/5 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 fixed left-0 top-0 z-40 md:relative`}
      >
        {/* Tiêu đề Sidebar */}
        <div className="mb-2 ml-12 p-4">
          <img src="./../../../logo/logoo.png" alt="Logo" className="h-32" />
        </div>
        <List>
          {/* Phần Thống kê */}
          <Accordion
            open={open === 1}
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
              />
            }
          >
            <Link to="/admin/thongke" onClick={() => setIsSidebarOpen(false)}>
              <ListItem className="ml-3 h-[50px] p-0">
                <ListItemPrefix>
                  <PresentationChartBarIcon className="h-5 w-5" />
                </ListItemPrefix>
                <Typography color="blue-gray" className="mr-auto font-normal">
                  Thống kê
                </Typography>
              </ListItem>
            </Link>
          </Accordion>

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
                <Link to="/admin/sanpham" onClick={() => setIsSidebarOpen(false)}>
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Sản phẩm
                  </ListItem>
                </Link>
                <hr />
                {/* Mục Thuộc tính */}
                <ListItem onClick={handleAttributeOpen}>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Thuộc tính
                  <ListItemSuffix className="ml-32">
                    <ChevronDownIcon
                      strokeWidth={2.5}
                      className={`h-3 w-3 transition-transform ${openAttribute ? "rotate-180" : ""}`}
                    />
                  </ListItemSuffix>
                </ListItem>
                {/* Submenu của Thuộc tính */}
                {openAttribute && (
                  <>
                    <Link to="/admin/mausac" onClick={() => setIsSidebarOpen(false)}>
                      <ListItem className="pl-8">
                        <ListItemPrefix>
                          <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                        </ListItemPrefix>
                        Màu sắc
                      </ListItem>
                    </Link>
                    <Link to="/admin/chatlieu" onClick={() => setIsSidebarOpen(false)}>
                      <ListItem className="pl-8">
                        <ListItemPrefix>
                          <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                        </ListItemPrefix>
                        Chất liệu
                      </ListItem>
                    </Link>
                    <Link to="/admin/kichthuoc" onClick={() => setIsSidebarOpen(false)}>
                      <ListItem className="pl-8">
                        <ListItemPrefix>
                          <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                        </ListItemPrefix>
                        Kích thước
                      </ListItem>
                    </Link>
                    <Link to="/admin/thuonghieu" onClick={() => setIsSidebarOpen(false)}>
                      <ListItem className="pl-8">
                        <ListItemPrefix>
                          <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                        </ListItemPrefix>
                        Thương hiệu
                      </ListItem>
                    </Link>
                    <Link to="/admin/loaigiay" onClick={() => setIsSidebarOpen(false)}>
                      <ListItem className="pl-8">
                        <ListItemPrefix>
                          <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                        </ListItemPrefix>
                        Loại giày
                      </ListItem>
                    </Link>
                    <Link to="/admin/degiay" onClick={() => setIsSidebarOpen(false)}>
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
          <hr className="my-2 border-blue-gray-50" />
          <Link to="/admin/voucher" onClick={() => setIsSidebarOpen(false)}>
            <ListItem>
              <ListItemPrefix>
                <PercentBadgeIcon className="h-5 w-5" />
              </ListItemPrefix>
              Voucher
            </ListItem>
          </Link>

          {/* Phần Profile (Nhân viên) */}
          <Link to="/admin/nhanvien" onClick={() => setIsSidebarOpen(false)}>
            <ListItem>
              <ListItemPrefix>
                <UserCircleIcon className="h-5 w-5" />
              </ListItemPrefix>
              Nhan vien
            </ListItem>
          </Link>

          {/* Phần Settings (Khách hàng) */}
          <Link to="/admin/khachhang" onClick={() => setIsSidebarOpen(false)}>
            <ListItem>
              <ListItemPrefix>
                <Cog6ToothIcon className="h-5 w-5" />
              </ListItemPrefix>
              Khach hang
            </ListItem>
          </Link>
        </List>

        {/* Phần tên người dùng và Logout */}
        <div className="mt-auto">
          <hr className="my-2 border-blue-gray-50" />
          {/* Tên người dùng */}
          <div className="mb-2 flex items-center gap-4">
            <Avatar
              src="https://docs.material-tailwind.com/img/face-2.jpg"
              alt="avatar"
            />
            <div>
              <Typography variant="h6">Tania Andrew</Typography>
              <Typography variant="small" color="gray" className="font-normal">
                Web Developer
              </Typography>
            </div>
          </div>
          {/* Phần Log Out */}
          <ListItem>
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </div>
      </Card>
    </>
  );
}
