package com.example.shoes.controller;

import com.example.shoes.dto.PhanTrangResponse;
import com.example.shoes.dto.hoadon.request.DatHangRequest;
import com.example.shoes.dto.hoadon.response.HoaDonResponse;
import com.example.shoes.dto.payment.PaymentRequest;
import com.example.shoes.entity.HoaDon;
import com.example.shoes.exception.ApiResponse;
import com.example.shoes.service.HoaDonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hoadon")
public class HoaDonController {
    @Autowired
    private HoaDonService hoaDonService;


    @GetMapping("/getall")
    public ApiResponse<PhanTrangResponse<HoaDonResponse>> getAllHoaDon(
            @RequestParam(value = "keyword", defaultValue = "") String keyword,
            @RequestParam(value = "pageNumber", defaultValue = "1") int pageNumber,
            @RequestParam(value = "pageSize", defaultValue = "10") int pageSize,
            @RequestParam(value = "phuongThucGiaoHang", required = false) String phuongThucGiaoHang,
            @RequestParam(value = "trangThai", required = false) String trangThai

    ) {
        // Gọi hàm getHoaDon trong service để lấy dữ liệu phân trang
        PhanTrangResponse<HoaDonResponse> hoaDonResponses = hoaDonService.getHoaDon(pageNumber, pageSize, keyword, phuongThucGiaoHang, trangThai);

        // Tạo và trả về đối tượng ApiResponse
        return ApiResponse.<PhanTrangResponse<HoaDonResponse>>builder()
                .result(hoaDonResponses)
                .build();
    }


    @GetMapping("/getall-dathanhtoan")
    public ApiResponse<List<HoaDonResponse>> getAllDaThanhToan() {
        // Gọi hàm getAllChatLieu() để lấy danh sách các ChatLieuResponse
        List<HoaDonResponse> hoaDonResponses = hoaDonService.getAllTrangThaiDaThanhToan();
        // Tạo đối tượng ApiResponse để trả về danh sách ChatLieuResponse
        return ApiResponse.<List<HoaDonResponse>>builder()
                .result(hoaDonResponses)
                .build();
    }

    @GetMapping("/getall-chuathanhtoan")
    public ApiResponse<List<HoaDonResponse>> getAllChuaThanhToan() {
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
    ) {

        return ApiResponse.<HoaDonResponse>builder()
                .result(hoaDonService.addKhachHangHoaDon(idHoaDon, idKhachHang))
                .build();
    }

    @PostMapping("/{idHoaDon}/deletekhachhang/{idKhachHang}")
    public ApiResponse<HoaDonResponse> deleteKhachHang(
            @PathVariable("idHoaDon") Integer idHoaDon,
            @PathVariable("idKhachHang") Integer idKhachHang
    ) {
        HoaDonResponse hoaDonResponse = hoaDonService.xoaKhachHangHoaDon(idHoaDon, idKhachHang);

        return ApiResponse.<HoaDonResponse>builder()
                .result(hoaDonResponse)
                .build();
    }

    @GetMapping("/da-thanh-toan/id-lon-nhat")
    public ApiResponse<Integer> idLonNhat() {
        Integer id = hoaDonService.idHoaDon();
        return ApiResponse.<Integer>builder().result(id).build();
    }

    @GetMapping("/{id}")
    public ApiResponse<HoaDonResponse> HoaDonDetailById(@PathVariable("id") Integer id) {
        return ApiResponse.<HoaDonResponse>builder().result(hoaDonService.findByid(id)).build();
    }

    @PostMapping("/thanh-toan/tc-vnpay/{id}")
    private ApiResponse<Void> tc(@PathVariable Integer id, @RequestBody PaymentRequest paymentRequest) {
        return ApiResponse.<Void>builder().result(hoaDonService.updateHoaDonById(id, paymentRequest)).build();
    }

    @PostMapping("/dathang/{id}")
    private ApiResponse<Void> dathang(@PathVariable Integer id, @RequestBody DatHangRequest request) {
        return ApiResponse.<Void>builder().result(hoaDonService.updateTrangThaiHoaDonById(id, request)).build();
    }
    @PostMapping("/chogiaohang/{id}")
    private ApiResponse<Void> updateChoGiaoHang(@PathVariable Integer id,@RequestBody String moTa) {
        return ApiResponse.<Void>builder().result(hoaDonService.updateTrangThaiHoaDonByIdChoVanChuyen(id,moTa)).build();
    }
    @PostMapping("/danggiao/{id}")
    private ApiResponse<Void> updateDangGiao(@PathVariable Integer id,@RequestBody String moTa) {
        return ApiResponse.<Void>builder().result(hoaDonService.updateTrangThaiHoaDonByIdGiaoHang(id,moTa)).build();
    }
    @PostMapping("/hoanthanh/{id}")
    private ApiResponse<Void> updateHoanThanh(@PathVariable Integer id,@RequestBody String moTa) {
        return ApiResponse.<Void>builder().result(hoaDonService.updateTrangThaiHoaDonByIdThanhCong(id,moTa)).build();
    }

}
