package com.example.shoes.controller;

import com.example.shoes.dto.PhanTrangResponse;
import com.example.shoes.dto.nhanvien.request.NhanVienUpdateRequest;
import com.example.shoes.dto.nhanvien.request.NhanvienAddRequest;
import com.example.shoes.entity.NhanVien;
import com.example.shoes.exception.ApiResponse;
import com.example.shoes.service.NhanVienService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/nhanvien")
@RequiredArgsConstructor
public class NhanVienController {
    private static final Logger log = LoggerFactory.getLogger(NhanVienController.class);
    private final NhanVienService nhanVienService;

    @GetMapping("/search")
    public ApiResponse<PhanTrangResponse<NhanVien>> search(
            @RequestParam(value = "keyword", defaultValue = "") String keyword,
            @RequestParam(value = "pageNumber", defaultValue = "1") int pageNumber,
            @RequestParam(value = "pageSize", defaultValue = "5") int pageSize,
            @RequestParam(value = "trangThai",required = false) Boolean trangThai) {
        System.out.println("long");
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        log.info("username : "+authentication.getName());
        log.info("role : "+authentication.getAuthorities());
        PhanTrangResponse<NhanVien> list = nhanVienService.getNhanVien(pageNumber, pageSize, keyword,trangThai);

        return ApiResponse.<PhanTrangResponse<NhanVien>>builder()
                .result(list).build();

    }

    @PostMapping("/add")
    public ApiResponse<NhanVien> add(@RequestBody NhanvienAddRequest nhanvienAddRequest) {
        return ApiResponse.<NhanVien>builder()
                .result(nhanVienService.addNhanVien(nhanvienAddRequest)).build();
    }

    @GetMapping("/{id}")
    public ApiResponse<NhanVien> getNhanVienId(@PathVariable("id") Integer id) {
        return ApiResponse.<NhanVien>builder()
                .result(nhanVienService.getById(id)).build();
    }

    @PostMapping("/update/{id}")
    public ApiResponse<NhanVien> update(@PathVariable("id") Integer id, @RequestBody NhanVienUpdateRequest request) {
        return ApiResponse.<NhanVien>builder()
                .result(nhanVienService.updateNhanVien(id, request)).build();
    }

    @DeleteMapping("/delete/{id}")
    public ApiResponse<NhanVien> delete(@PathVariable("id") Integer id) {
        return ApiResponse.<NhanVien>builder()
                .result(nhanVienService.deleteNhanVien(id)).build();
    }
}
