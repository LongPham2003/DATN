package com.example.shoes.controller;

import com.example.shoes.dto.PhanTrangResponse;
import com.example.shoes.dto.hoadon.request.DatHangRequest;
import com.example.shoes.dto.hoadon.request.GhiChu;
import com.example.shoes.dto.hoadon.request.HoaDonUpdateAdmin;
import com.example.shoes.dto.hoadon.request.UpdatePhiVanChuyen;
import com.example.shoes.dto.hoadon.request.XacNhanThanhToan;
import com.example.shoes.dto.hoadon.response.HoaDonKhongThanhCongTheoIdKH;
import com.example.shoes.dto.hoadon.response.HoaDonResponse;
import com.example.shoes.dto.hoadon.response.HoaDonTheoIDKH;
import com.example.shoes.dto.hoadonchitiet.request.HoaDonChiTietRequest;
import com.example.shoes.dto.payment.PaymentRequest;
import com.example.shoes.dto.sanpham.request.SanPhamTraRequest;
import com.example.shoes.entity.HoaDon;
import com.example.shoes.exception.ApiResponse;
import com.example.shoes.repository.HoaDonRepo;
import com.example.shoes.service.HoaDonService;
import com.example.shoes.service.impl.GioHangChiTietServiceImpl;
import com.example.shoes.service.impl.HoaDonServiceImpl;
import jakarta.validation.Valid;
import jakarta.validation.ValidationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hoadon")
public class HoaDonController
{
    @Autowired
    private HoaDonService hoaDonService;
    @Autowired
    private HoaDonRepo hoaDonRepo;
    @Autowired private HoaDonServiceImpl hoaDonServiceImpl;
    @Autowired private GioHangChiTietServiceImpl gioHangChiTietServiceImpl;

    @GetMapping("/getall")
    public ApiResponse<PhanTrangResponse<HoaDonResponse>> getAllHoaDon(
            @RequestParam(value = "keyword", defaultValue = "") String keyword,
            @RequestParam(value = "pageNumber", defaultValue = "1") int pageNumber,
            @RequestParam(value = "pageSize", defaultValue = "10") int pageSize,
            @RequestParam(value = "phuongThucGiaoHang", required = false) String phuongThucGiaoHang,
            @RequestParam(value = "trangThai", required = false) String trangThai

    )
    {
        // Gọi hàm getHoaDon trong service để lấy dữ liệu phân trang
        PhanTrangResponse<HoaDonResponse> hoaDonResponses = hoaDonService.getHoaDon(pageNumber, pageSize, keyword,
                phuongThucGiaoHang, trangThai);

        // Tạo và trả về đối tượng ApiResponse
        return ApiResponse.<PhanTrangResponse<HoaDonResponse>>builder()
                .result(hoaDonResponses)
                .build();
    }

    @GetMapping("/getall-dathanhtoan")
    public ApiResponse<List<HoaDonResponse>> getAllDaThanhToan()
    {
        // Gọi hàm getAllChatLieu() để lấy danh sách các ChatLieuResponse
        List<HoaDonResponse> hoaDonResponses = hoaDonService.getAllTrangThaiDaThanhToan();
        // Tạo đối tượng ApiResponse để trả về danh sách ChatLieuResponse
        return ApiResponse.<List<HoaDonResponse>>builder()
                .result(hoaDonResponses)
                .build();
    }

    @GetMapping("/getall-chuathanhtoan")
    public ApiResponse<List<HoaDonResponse>> getAllChuaThanhToan()
    {
        // Gọi hàm getAllChatLieu() để lấy danh sách các ChatLieuResponse
        List<HoaDonResponse> hoaDonResponses = hoaDonService.getAllTrangThaiChuaThanhToan();
        // Tạo đối tượng ApiResponse để trả về danh sách ChatLieuResponse
        return ApiResponse.<List<HoaDonResponse>>builder()
                .result(hoaDonResponses)
                .build();
    }

    @PostMapping("/{idHoaDon}/addkhachhang/{idKhachHang}")
    public ApiResponse<HoaDonResponse> addKhachHang(
            @PathVariable("idHoaDon") Integer idHoaDon,
            @PathVariable("idKhachHang") Integer idKhachHang
    )
    {

        return ApiResponse.<HoaDonResponse>builder()
                .result(hoaDonService.addKhachHangHoaDon(idHoaDon, idKhachHang))
                .build();
    }

    @PostMapping("/{idHoaDon}/deletekhachhang/{idKhachHang}")
    public ApiResponse<HoaDonResponse> deleteKhachHang(
            @PathVariable("idHoaDon") Integer idHoaDon,
            @PathVariable("idKhachHang") Integer idKhachHang
    )
    {
        HoaDonResponse hoaDonResponse = hoaDonService.xoaKhachHangHoaDon(idHoaDon, idKhachHang);

        return ApiResponse.<HoaDonResponse>builder()
                .result(hoaDonResponse)
                .build();
    }

    @GetMapping("/da-thanh-toan/id-lon-nhat")
    public ApiResponse<Integer> idLonNhat()
    {
        Integer id = hoaDonService.idHoaDon();
        return ApiResponse.<Integer>builder().result(id).build();
    }

    @GetMapping("/{id}")
    public ApiResponse<HoaDonResponse> HoaDonDetailById(@PathVariable("id") Integer id)
    {
        return ApiResponse.<HoaDonResponse>builder().result(hoaDonService.findByid(id)).build();
    }

    @PostMapping("/thanh-toan/tc-vnpay/{id}")
    private ApiResponse<Void> tc(@PathVariable Integer id, @RequestBody PaymentRequest paymentRequest)
    {
        return ApiResponse.<Void>builder().result(hoaDonService.updateHoaDonById(id, paymentRequest)).build();
    }

    @PostMapping("/dathang/{id}")
    private ApiResponse<Void> dathang(@PathVariable Integer id, @RequestBody DatHangRequest request)
    {
        return ApiResponse.<Void>builder().result(hoaDonService.updateTrangThaiHoaDonById(id, request)).build();
    }

    @PostMapping("/xacnhan/{id}")
    private ApiResponse<Void> updateXacNhan(@PathVariable Integer id, @RequestBody GhiChu moTa)
    {
        return ApiResponse.<Void>builder().result(hoaDonService.updateTrangThaiHoaDonByIdXacNhan(id, moTa)).build();
    }

    @PostMapping("/cholayhang/{id}")
    private ApiResponse<Void> updateChoLayHang(@PathVariable Integer id, @RequestBody GhiChu moTa)
    {
        return ApiResponse.<Void>builder().result(hoaDonService.updateTrangThaiHoaDonByIdChoLayHang(id, moTa)).build();
    }

    @PostMapping("/chogiaohang/{id}")
    private ApiResponse<Void> updateChoGiaoHang(@PathVariable Integer id, @RequestBody GhiChu moTa)
    {
        return ApiResponse.<Void>builder().result(
                hoaDonService.updateTrangThaiHoaDonByIdChoVanChuyen(id, moTa)).build();
    }

    @PostMapping("/danggiao/{id}")
    private ApiResponse<Void> updateDangGiao(@PathVariable Integer id, @RequestBody GhiChu moTa)
    {
        return ApiResponse.<Void>builder().result(hoaDonService.updateTrangThaiHoaDonByIdGiaoHang(id, moTa)).build();
    }

    @PostMapping("/huy/{id}")
    private ApiResponse<Void> updateHuy(@PathVariable Integer id, @RequestBody GhiChu moTa)
    {
        return ApiResponse.<Void>builder().result(hoaDonService.updateTrangThaiHoaDonByIdHuy(id, moTa)).build();
    }

    @PostMapping("/hoanhang/{id}")
    private ApiResponse<Void> updateHoanHang(@PathVariable Integer id, @RequestBody GhiChu moTa)
    {
        return ApiResponse.<Void>builder().result(hoaDonService.updateTrangThaiHoaDonByIdHoanHang(id, moTa)).build();
    }

    @PostMapping("/hoanhangtc/{id}")
    private ApiResponse<Void> updateHoanHangTC(@PathVariable Integer id, @RequestBody GhiChu moTa)
    {
        return ApiResponse.<Void>builder().result(
                hoaDonService.updateTrangThaiHoaDonByIdHoanHangThanhCong(id, moTa)).build();
    }

    @PostMapping("/hoanthanh/{id}")
    private ApiResponse<Void> updateHoanThanh(@PathVariable Integer id, @RequestBody GhiChu moTa)
    {
        return ApiResponse.<Void>builder().result(hoaDonService.updateTrangThaiHoaDonByIdThanhCong(id, moTa)).build();
    }

    @PostMapping("/xacnhanthanhtoan/{id}")
    private ApiResponse<Void> xacNhan(@PathVariable Integer id, @RequestBody XacNhanThanhToan xacNhanThanhToan)
    {
        return ApiResponse.<Void>builder().result(hoaDonService.xacNhanThanhToan(id, xacNhanThanhToan)).build();
    }

    @PostMapping("/quaylai/{id}")
    private ApiResponse<Void> xacNhan(@PathVariable Integer id, @RequestBody GhiChu moTa)
    {
        return ApiResponse.<Void>builder().result(hoaDonService.updateQuayLaiTrangThaiTruoc(id, moTa)).build();
    }

    @PostMapping("/updateadmin/{id}")
    private ApiResponse<Void> xacNhan(@PathVariable Integer id, @Valid @RequestBody HoaDonUpdateAdmin request,
            BindingResult bindingResult)
    {
        if (bindingResult.hasErrors()) {
            throw new ValidationException(bindingResult.getFieldError().getDefaultMessage());
        }
        return ApiResponse.<Void>builder().result(hoaDonService.updateHoaDonAdmin(id, request)).build();
    }

    @PostMapping("/updatepvc/{id}")
    private ApiResponse<Void> UpdatePhiVanChuyen(@PathVariable Integer id, @RequestBody UpdatePhiVanChuyen request)
    {
        return ApiResponse.<Void>builder().result(hoaDonService.updatePhiGiaoHang(id, request)).build();
    }

    @GetMapping("/soluong/hoadon")
    private ApiResponse<Integer> soluong()
    {
        return ApiResponse.<Integer>builder().result(hoaDonRepo.getCountHoaDon()).build();
    }

    @GetMapping("/soluong/hoadoncxn")
    private ApiResponse<Integer> soluongcxn()
    {
        return ApiResponse.<Integer>builder().result(hoaDonRepo.getCountHoaDonCXN()).build();
    }

    @GetMapping("/soluong/hoadondxn")
    private ApiResponse<Integer> soluongdxn()
    {
        return ApiResponse.<Integer>builder().result(hoaDonRepo.getCountHoaDonDXN()).build();
    }

    @GetMapping("/soluong/hoadonclh")
    private ApiResponse<Integer> soluongclh()
    {
        return ApiResponse.<Integer>builder().result(hoaDonRepo.getCountHoaDonCLH()).build();
    }

    @GetMapping("/soluong/hoadoncgh")
    private ApiResponse<Integer> soluongcgh()
    {
        return ApiResponse.<Integer>builder().result(hoaDonRepo.getCountHoaDonCGH()).build();
    }

    @GetMapping("/soluong/hoadondg")
    private ApiResponse<Integer> soluongdg()
    {
        return ApiResponse.<Integer>builder().result(hoaDonRepo.getCountHoaDonDG()).build();
    }

    @GetMapping("/soluong/hoadonht")
    private ApiResponse<Integer> soluonght()
    {
        return ApiResponse.<Integer>builder().result(hoaDonRepo.getCountHoaDonHT()).build();
    }

    @GetMapping("/soluong/hoadonhd")
    private ApiResponse<Integer> soluongHuy()
    {
        return ApiResponse.<Integer>builder().result(hoaDonRepo.getCountHoaDonHuy()).build();
    }

    @GetMapping("/soluong/hoadonhh")
    private ApiResponse<Integer> soluongHoanHang()
    {
        return ApiResponse.<Integer>builder().result(hoaDonRepo.getCountHoaDonHoanHang()).build();
    }

    @GetMapping("/soluong/hoadonhhtc")
    private ApiResponse<Integer> soluongHoanHangTC()
    {
        return ApiResponse.<Integer>builder().result(hoaDonRepo.getCountHoaDonHoanHangTC()).build();
    }

    @GetMapping("/getAllHDTheoIDKH")
    public ApiResponse<List<HoaDonTheoIDKH>> getAllHDTheoIDKH(
            @RequestParam(value = "maHD", required = false) String maHD,
            @RequestParam(value = "idKhachHang", required = true) Integer idKhachHang,
            // Chuyển `idKhachHang` thành bắt buộc
            @RequestParam(value = "trangThaiDonHang", required = false) String trangThaiDonHang,
            // Thêm lọc theo trạng thái
            @RequestParam(value = "ngay", required = false) String ngay)
    {
        // Gọi service với các tham số
        List<HoaDonTheoIDKH> hdresq = hoaDonService.getHoaDonTheoKH(idKhachHang, maHD, trangThaiDonHang, ngay);

        // Trả về kết quả dưới dạng ApiResponse
        return ApiResponse.<List<HoaDonTheoIDKH>>builder()
                .result(hdresq)
                .build();
    }

    @GetMapping("/HDkhongthanhcong")
    public ApiResponse<List<HoaDonKhongThanhCongTheoIdKH>> getHDkhongthanhcong(
            @RequestParam(value = "maHD", required = false) String maHD,
            @RequestParam(value = "idKhachHang", required = true) Integer idKhachHang,
            // Chuyển `idKhachHang` thành bắt buộc
            @RequestParam(value = "ngay", required = false) String ngay
    )
    {
        List<HoaDonKhongThanhCongTheoIdKH> list = hoaDonRepo.getHoaDonKhongThanhCongTheoKH(idKhachHang, maHD, ngay);
        return ApiResponse.<List<HoaDonKhongThanhCongTheoIdKH>>builder().result(list).build();
    }

    // Trả hàng
    @PostMapping("/tra-hang")
    public ApiResponse<HoaDonResponse> traHang(
            @RequestParam("idHoaDon") Integer idHoaDon,
            @RequestBody List<SanPhamTraRequest> sanPhamTraList)
    {
        // Gọi phương thức traHang trong service
        HoaDonResponse hoaDonResponse = hoaDonService.traHang(idHoaDon, sanPhamTraList);
        // Trả về kết quả dưới dạng ApiResponse
        return ApiResponse.<HoaDonResponse>builder()
                .result(hoaDonResponse)
                .build();
    }

    @PutMapping("/capnhatsoluongsanphamchitiet/{id}")
    public ApiResponse<HoaDonResponse> updateHoaDon(
            @PathVariable("id") Integer id,
            @RequestBody HoaDonChiTietRequest hoaDonRequest)
    {
        HoaDonResponse updatedHoaDon = gioHangChiTietServiceImpl.chinhSuaSoLuongSanPhamChiTiet(id, hoaDonRequest);
        return ApiResponse.<HoaDonResponse>builder()
                .result(updatedHoaDon)
                .build();
    }

    @PostMapping("/capnhatphieugiamgia/{idhd}/{idpgg}")
    public ApiResponse<HoaDonResponse> updatePhieuGiamGiaHoaDon(
            @PathVariable("idhd") Integer idhd,
            @PathVariable("idpgg") Integer idpgg)
    {
        return ApiResponse.<HoaDonResponse>builder()
                .result(gioHangChiTietServiceImpl.thayDoiPhieuGiamGia(idhd, idpgg))
                .build();
    }
}
