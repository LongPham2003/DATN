package com.example.shoes.controller;

import com.example.shoes.dto.giohangchitiet.request.GioHangChiTietRequest;
import com.example.shoes.dto.giohangchitiet.response.GioHangChiTietResponse;
import com.example.shoes.dto.hoadon.response.HoaDonResponse;
import com.example.shoes.dto.hoadonchitiet.request.HoaDonChiTietRequest;
import com.example.shoes.exception.ApiResponse;
import com.example.shoes.service.GioHangChiTietService;
import com.example.shoes.service.HoaDonChiTietService;
import org.springframework.beans.factory.annotation.Autowired;
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
@RequestMapping("/banhangonline")
public class BanHangOnlineController {
    @Autowired
    private GioHangChiTietService gioHangChiTietService;
    @Autowired
    private GioHangChiTietService hangChiTietService;

    @PostMapping("/themvaogiohangchitiet")
    public ApiResponse<GioHangChiTietResponse> themVaoGioHangChiTiet(@RequestBody GioHangChiTietRequest request) {
        GioHangChiTietResponse response = gioHangChiTietService.themVaoGioHangChiTiet(request);
        return ApiResponse.<GioHangChiTietResponse>builder()
                        .result(response)
                        .message("Thêm sản phẩm vào giỏ hàng thành công")
                        .build();
    }
    // Cập nhật chi tiết giỏ hàng
    @PutMapping("/capnhatgiohangchitiet/{id}")
    public ApiResponse<GioHangChiTietResponse> capNhatGioHangChiTiet(@PathVariable Integer id,
                                                                     @RequestBody GioHangChiTietRequest request) {
        GioHangChiTietResponse response = gioHangChiTietService.updateGioHangChiTiet(id, request);
        return ApiResponse.<GioHangChiTietResponse>builder()
                .result(response)
                .message("Cập nhật sản phẩm trong giỏ hàng thành công")
                .build();
    }

    // Lấy chi tiết giỏ hàng theo ID
    @GetMapping("/laygiohangchitiet/{id}")
    public ApiResponse<GioHangChiTietResponse> layGioHangChiTiet(@PathVariable Integer id) {
        GioHangChiTietResponse response = gioHangChiTietService.findByid(id);
        return ApiResponse.<GioHangChiTietResponse>builder()
                .result(response)
                .build();
    }

    // Xóa chi tiết giỏ hàng
    @DeleteMapping("/xoagiohangchitiet/{id}")
    public ApiResponse<GioHangChiTietResponse> xoaGioHangChiTiet(@PathVariable Integer id) {
        GioHangChiTietResponse response = gioHangChiTietService.deleteGioHangChiTiet(id);
        return ApiResponse.<GioHangChiTietResponse>builder()
                .result(response)
                .message("Xóa sản phẩm khỏi giỏ hàng thành công")
                .build();
    }

    // Lấy tất cả chi tiết giỏ hàng
    @GetMapping("/laytatcagiohangchitiet")
    public ApiResponse<List<GioHangChiTietResponse>> layTatCaGioHangChiTiet() {
        List<GioHangChiTietResponse> responseList = gioHangChiTietService.getAllGioHangChiTiet();
        return ApiResponse.<List<GioHangChiTietResponse>>builder()
                .result(responseList)
                .message("Lấy tất cả chi tiết giỏ hàng thành công")
                .build();
    }
    // Endpoint mua ngay một sản phẩm
    @PostMapping("/muanay/{idSPCT}")
    public ApiResponse<HoaDonResponse> muaNgay(@PathVariable Integer idSPCT,
                                               @RequestBody HoaDonChiTietRequest chiTietRequest) {
        HoaDonResponse response = hangChiTietService.muaNgay(idSPCT, chiTietRequest);
        return ApiResponse.<HoaDonResponse>builder()
                .result(response)
                .build();
    }
    @PostMapping("/muahangtugiohangchitiet")
    public ApiResponse<HoaDonResponse> muahangtugiohangchitiet(
            @RequestBody List<HoaDonChiTietRequest> chiTietRequests) { // Chấp nhận danh sách yêu cầu chi tiết

        // Gọi service để xử lý việc mua hàng
        HoaDonResponse response = hangChiTietService.muaHangTuGioHangChiTiet(chiTietRequests);

        return ApiResponse.<HoaDonResponse>builder()
                .result(response)
                .build();
    }
    @PostMapping("/nhanvienxacnhan/{idHoaDon}")
    public ApiResponse<HoaDonResponse> nhanVienXacNhan(@PathVariable Integer idHoaDon) {
        HoaDonResponse response = hangChiTietService.nhanVienXacNhan(idHoaDon);
        return ApiResponse.<HoaDonResponse>builder()
                .result(response)
                .build();
    }
}
