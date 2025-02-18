package com.example.shoes.controller;

import com.example.shoes.dto.giohang.response.GioHangResponse;
import com.example.shoes.dto.giohangchitiet.request.GioHangChiTietRequest;
import com.example.shoes.dto.giohangchitiet.response.GioHangChiTietResponse;
import com.example.shoes.dto.hoadon.request.HoaDonRequest;
import com.example.shoes.dto.hoadon.response.HoaDonResponse;
import com.example.shoes.dto.hoadonchitiet.request.HoaDonChiTietRequest;
import com.example.shoes.exception.ApiResponse;
import com.example.shoes.service.GioHangChiTietService;
import jakarta.validation.Valid;
import jakarta.validation.ValidationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/giohang")
public class GioHangController
{
    @Autowired
    private GioHangChiTietService gioHangChiTietService;
    @Autowired
    private GioHangChiTietService hangChiTietService;

    //    request co soLuong va lay idspct
    @PostMapping("/themvaogiohangchitiet/{idSPCT}")
    public ApiResponse<GioHangChiTietResponse> themVaoGioHangChiTiet(@PathVariable("idSPCT") Integer idSPCT,
            @RequestBody GioHangChiTietRequest request)
    {
        GioHangChiTietResponse response = gioHangChiTietService.themVaoGioHangChiTiet(idSPCT, request);
        return ApiResponse.<GioHangChiTietResponse>builder()
                .result(response)
                .message("Thêm sản phẩm vào giỏ hàng thành công")
                .build();
    }

    // Cập nhật chi tiết giỏ hàng lấy id gio hang va  requet {
    //  "idSanPhamChiTiet": 3,
    //  "soLuong": 10
    //}
    @PutMapping("/capnhatgiohangchitiet/{idGH}")
    public ApiResponse<GioHangChiTietResponse> capNhatGioHangChiTiet(@PathVariable("idGH") Integer idGH,
            @RequestBody GioHangChiTietRequest request)
    {
        GioHangChiTietResponse response = gioHangChiTietService.updateGioHangChiTiet(idGH, request);
        return ApiResponse.<GioHangChiTietResponse>builder()
                .result(response)
                .message("Cập nhật sản phẩm trong giỏ hàng thành công")
                .build();
    }

    //    lấy gio hang chi tiet theo id gio hang chi tiet
    @GetMapping("/laygiohangchitiettheoid/{idGHCT}")
    public ApiResponse<GioHangChiTietResponse> layGioHangChiTietTheoId(@PathVariable("idGHCT") Integer idGHCT)
    {
        GioHangChiTietResponse response = gioHangChiTietService.findByid(idGHCT);
        return ApiResponse.<GioHangChiTietResponse>builder()
                .result(response)
                .build();
    }

    // Xóa chi tiết giỏ hàng theo id gio hang chi tiet
    @DeleteMapping("/xoagiohangchitiet/{idGHCT}")
    public ApiResponse<GioHangChiTietResponse> xoaGioHangChiTiet(@PathVariable("idGHCT") Integer idGHCT)
    {
        GioHangChiTietResponse response = gioHangChiTietService.deleteGioHangChiTiet(idGHCT);
        return ApiResponse.<GioHangChiTietResponse>builder()
                .result(response)
                .message("Xóa sản phẩm khỏi giỏ hàng thành công")
                .build();
    }

    // Lấy tất cả chi tiết giỏ hàng theo id khach hang
    @GetMapping("/laytatcagiohangchitiet")
    public ApiResponse<List<GioHangChiTietResponse>> layTatCaGioHangChiTiet()
    {
        List<GioHangChiTietResponse> responseList = gioHangChiTietService.getAllGioHangChiTiet();
        return ApiResponse.<List<GioHangChiTietResponse>>builder()
                .result(responseList)
                .message("Lấy tất cả chi tiết giỏ hàng thành công")
                .build();
    }

    //    Lay ra tong san pham cua nguoi dung khi dang nhap he thong
    @GetMapping("/tongsanphamnguoidung")
    public ApiResponse<GioHangResponse> hienThiGioHangNguoiĐangĐangNhapHeThong()
    {
        GioHangResponse response = gioHangChiTietService.layGioHangTheoIdKhachHang();
        return ApiResponse.<GioHangResponse>builder()
                .result(response)
                .build();
    }

    //    request { "idPhieuGiamGia":11,
//    "chiTietSanPhams": [
//        { "idSpct": 11, "soLuong": 2 },
//        { "idSpct": 12, "soLuong": 3 }
//    ]
//} phieu giam gia apcung dc ko ap cung dc
    @PostMapping("/dat-hang")
    public ApiResponse<HoaDonResponse> datHang(
            @Valid @RequestBody HoaDonRequest request, BindingResult bindingResult)
    {
        if (bindingResult.hasErrors()) {
            throw new ValidationException(bindingResult.getFieldError().getDefaultMessage());
        }
        HoaDonResponse response = gioHangChiTietService.datHang(request);
        return ApiResponse.<HoaDonResponse>builder()
                .result(response)
                .build();
    }

    @PostMapping("/dat-hang-vnpay")
    public ApiResponse<HoaDonResponse> datHangVnpay(@RequestBody HoaDonRequest hoaDonRequest)
    {
        HoaDonResponse response = gioHangChiTietService.datHangVNPay(hoaDonRequest);
        return ApiResponse.<HoaDonResponse>builder()
                .result(response)
                .build();
    }

    // Lấy chi tiết giỏ hàng theo ID
    @GetMapping("/laygiohangchitiet/{id}")
    public ApiResponse<GioHangChiTietResponse> layGioHangChiTiet(@PathVariable Integer id)
    {
        GioHangChiTietResponse response = gioHangChiTietService.findByid(id);
        return ApiResponse.<GioHangChiTietResponse>builder()
                .result(response)
                .build();
    }

    @PostMapping("/addspct/{id}")
    public ApiResponse<HoaDonResponse> addSanPhamChiTietToHoaDon(
            @PathVariable Integer id,
            @RequestBody HoaDonChiTietRequest chiTietRequest)
    {
        HoaDonResponse hoaDonResponse = gioHangChiTietService.addSanPhamChiTietToHoaDon(id, chiTietRequest);
        return ApiResponse.<HoaDonResponse>builder()
                .result(hoaDonResponse)
                .build();
    }

    @DeleteMapping("/{idHoaDon}/spct/{idSpct}")
    public ApiResponse<String> deleteHoaDonChiTiet(
            @PathVariable Integer idHoaDon,
            @PathVariable Integer idSpct)
    {
        gioHangChiTietService.deleteByIdHoaDonAndIdSpct(idHoaDon, idSpct);
        return ApiResponse.<String>builder()
                .message("Xóa chi tiết hóa đơn thành công")
                .build();
    }

//    @GetMapping("/findById/{idHDCT}")
//    public ApiResponse<GioHangResponse> findById(@PathVariable("idHDCT") Integer idHDCT) {
//        GioHangChiTietResponse res = gioHangChiTietService.fibindIdGHCT(idHDCT);
//    }
}
