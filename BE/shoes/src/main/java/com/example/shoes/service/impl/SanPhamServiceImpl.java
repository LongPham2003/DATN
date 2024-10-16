package com.example.shoes.service.impl;


import com.example.shoes.dto.PhanTrangResponse;
import com.example.shoes.dto.sanpham.request.SanPhamRequest;
import com.example.shoes.dto.sanpham.response.SanPhamResponse;
import com.example.shoes.entity.Loai;
import com.example.shoes.entity.SanPham;
import com.example.shoes.exception.AppException;
import com.example.shoes.exception.ErrorCode;
import com.example.shoes.repository.LoaiRepo;
import com.example.shoes.repository.SanPhamChiTietRepo;
import com.example.shoes.repository.SanPhamRepo;
import com.example.shoes.service.SanPhamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SanPhamServiceImpl implements SanPhamService {
    @Autowired
    private SanPhamRepo sanPhamRepo;
    @Autowired
    private LoaiRepo loaiRepo;
    @Autowired
    private SanPhamChiTietRepo sanPhamChiTietRepo;

    private SanPhamResponse convertToSanPhamResponse(SanPham sanPham) {
        SanPhamResponse response = new SanPhamResponse();
        response.setId(sanPham.getId());
        response.setIdLoai(sanPham.getLoai() != null ? sanPham.getLoai().getId() : null);// Tránh lỗi null pointer
     // lay ten loai cho de hieu
        response.setTenLoai(sanPham.getLoai().getTen());
        response.setMa(sanPham.getMa());
        response.setTenSanPham(sanPham.getTenSanPham());
        response.setNgayTao(sanPham.getNgayTao());
        response.setMoTa(sanPham.getMoTa());
        response.setTrangThai(sanPham.getTrangThai());
        // Tính tổng số lượng tồn từ bảng SanPhamChiTiet
        Integer tongSoLuong = sanPhamChiTietRepo.sumSoLuongByIdSanPham(sanPham.getId());
        response.setSoLuongTon(tongSoLuong != null ? tongSoLuong : 0);  // Set tổng số lượng vào DTO
        return response;
    }


    @Override
    public PhanTrangResponse<SanPhamResponse> getSanPham(int pageNumber, int pageSize, String keyword, Integer idLoai, Boolean trangThai) {
        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize);
        Page<SanPham> page = sanPhamRepo.getSanPham(keyword, idLoai, trangThai, pageable);

        List<SanPhamResponse> responses = page.getContent().stream()
                .map(this::convertToSanPhamResponse)
                .collect(Collectors.toList());

        PhanTrangResponse<SanPhamResponse> phanTrangResponse = new PhanTrangResponse<>();
        phanTrangResponse.setPageNumber(page.getNumber() + 1);
        phanTrangResponse.setPageSize(page.getSize());
        phanTrangResponse.setTotalElements(page.getTotalElements());
        phanTrangResponse.setTotalPages(page.getTotalPages());
        phanTrangResponse.setResult(responses);

        return phanTrangResponse;
    }

    @Override
    public SanPhamResponse getById(Integer id) {
        SanPham sanPham = sanPhamRepo.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
        return convertToSanPhamResponse(sanPham);
    }
    // Hàm để sinh mã sản phẩm tự động
    public String generateMaSanPham() {
        // Lấy mã sản phẩm lớn nhất từ database
        String maxMaSanPham = sanPhamRepo.findMaxMaSanPham();

        // Tách số thứ tự từ mã sản phẩm
        if (maxMaSanPham != null) {
            int soThuTu = Integer.parseInt(maxMaSanPham.substring(2)); // Bỏ phần "SP"
            soThuTu++;
            // Trả về mã sản phẩm mới dạng "SP" + số thứ tự (đảm bảo số thứ tự có ít nhất 2 chữ số)
            return String.format("SP%02d", soThuTu);
        } else {
            // Trường hợp chưa có sản phẩm nào, trả về mã sản phẩm đầu tiên là "SP01"
            return "SP01";
        }
    }
    @Override
    public SanPhamResponse create(SanPhamRequest request) {
        // Lấy đối tượng Loai dựa trên idLoai từ request
        Loai loai = loaiRepo.findById(request.getIdLoai())
                .orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_FOUND));

        SanPham sanPham = new SanPham();
        sanPham.setLoai(loai); // Gán đối tượng Loai cho SanPham
        // Gọi hàm generateMaSanPham để tự động sinh mã sản phẩm
        String maSanPham = generateMaSanPham();
        sanPham.setMa(maSanPham);
        sanPham.setTenSanPham(request.getTenSanPham());
        sanPham.setNgayTao(LocalDate.now());
        sanPham.setMoTa(request.getMoTa());
        sanPham.setTrangThai(request.getTrangThai());

        SanPham saved = sanPhamRepo.save(sanPham);
        return convertToSanPhamResponse(saved);
    }

    @Override
    public SanPhamResponse update(Integer id, SanPhamRequest request) {
        SanPham sanPham = sanPhamRepo.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));

        // Lấy đối tượng Loai dựa trên idLoai từ request
        Loai loai = loaiRepo.findById(request.getIdLoai())
                .orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_FOUND));

        sanPham.setLoai(loai); // Gán đối tượng Loai cho SanPham
        sanPham.setTenSanPham(request.getTenSanPham());
        sanPham.setNgayTao(LocalDate.now());
        sanPham.setMoTa(request.getMoTa());
        sanPham.setTrangThai(request.getTrangThai());

        SanPham saved = sanPhamRepo.save(sanPham);
        return convertToSanPhamResponse(saved);
    }

    @Override
    public List<SanPhamResponse> getAll() {
        // Lấy tất cả các ChatLieu từ repository
        List<SanPham> list =sanPhamRepo.getAllTrangThaiTrue();

        // Chuyển đổi từ ChatLieu sang ChatLieuResponse
        return list.stream()
                .map(this::convertToSanPhamResponse)
                .collect(Collectors.toList());
    }

    @Override
    public void updateTheoTrangThai(Integer id) {
        SanPham sanPham=sanPhamRepo.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
        if(sanPham.getTrangThai()==true) {
            sanPham.setTrangThai(false);
        }else {
            sanPham.setTrangThai(true);
        }
        sanPhamRepo.save(sanPham);
    }

}
