package com.example.shoes.service.impl;

import com.example.shoes.dto.PhanTrangResponse;
import com.example.shoes.dto.sanpham.response.SanPhamResponse;
import com.example.shoes.dto.sanphamchitiet.request.SanPhamChiTietRequest;
import com.example.shoes.dto.sanphamchitiet.response.SanPhamChiTietResponse;
import com.example.shoes.entity.ChatLieu;
import com.example.shoes.entity.DeGiay;
import com.example.shoes.entity.KichThuoc;
import com.example.shoes.entity.MauSac;
import com.example.shoes.entity.SanPham;
import com.example.shoes.entity.SanPhamChiTiet;
import com.example.shoes.entity.ThuongHieu;
import com.example.shoes.exception.AppException;
import com.example.shoes.exception.ErrorCode;
import com.example.shoes.repository.ChatLieuRepo;
import com.example.shoes.repository.DeGiayRepo;
import com.example.shoes.repository.KichThuocRepo;
import com.example.shoes.repository.MauSacRepo;
import com.example.shoes.repository.SanPhamChiTietRepo;
import com.example.shoes.repository.SanPhamRepo;
import com.example.shoes.repository.ThuongHieuRepo;
import com.example.shoes.service.SanPhamChiTietService;
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
public class SanPhamChiTietServiceImpl implements SanPhamChiTietService {
    @Autowired
    private SanPhamChiTietRepo sanPhamChiTietRepo;
    @Autowired
    private SanPhamRepo sanPhamRepo;

    @Autowired
    private ChatLieuRepo chatLieuRepo;

    @Autowired
    private MauSacRepo mauSacRepo;

    @Autowired
    private KichThuocRepo kichThuocRepo;

    @Autowired
    private ThuongHieuRepo thuongHieuRepo;

    @Autowired
    private DeGiayRepo deGiayRepo;

    @Override
    public PhanTrangResponse<SanPhamChiTietResponse> getSanPhamChiTiet(int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize); // Chuyển đổi sang zero-based page
        Page<SanPhamChiTiet> page = sanPhamChiTietRepo.getSanPham(pageable);

        List<SanPhamChiTietResponse> sanPhamChiTietResponses = page.getContent().stream()
                .map(this::converToResponse)
                .collect(Collectors.toList());

        PhanTrangResponse<SanPhamChiTietResponse> phanTrangResponse = new PhanTrangResponse<>();
        phanTrangResponse.setPageNumber(page.getNumber() + 1);
        phanTrangResponse.setPageSize(page.getSize());
        phanTrangResponse.setTotalElements(page.getTotalElements());
        phanTrangResponse.setTotalPages(page.getTotalPages());
        phanTrangResponse.setResult(sanPhamChiTietResponses);

        return phanTrangResponse;
    }

    @Override
    public SanPhamChiTietResponse getById(Integer id) {
        SanPhamChiTiet sanPhamChiTiet = sanPhamChiTietRepo.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
        return converToResponse(sanPhamChiTiet);
    }

    @Override
    public SanPhamChiTietResponse create(SanPhamChiTietRequest request) {
        // Lấy đối tượng từ repository dựa trên id
        SanPham sanPham = sanPhamRepo.findById(request.getIdSanPham())
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_DETAIL_NOT_FOUND));

        ChatLieu chatLieu = chatLieuRepo.findById(request.getIdChatLieu())
                .orElseThrow(() -> new AppException(ErrorCode.MATERIAL_NOT_FOUND));

        MauSac mauSac = mauSacRepo.findById(request.getIdMauSac())
                .orElseThrow(() -> new AppException(ErrorCode.COLOR_NOT_FOUND));

        KichThuoc kichThuoc = kichThuocRepo.findById(request.getIdKichThuoc())
                .orElseThrow(() -> new AppException(ErrorCode.SIZE_NOT_FOUND));

        ThuongHieu thuongHieu = thuongHieuRepo.findById(request.getIdThuongHieu())
                .orElseThrow(() -> new AppException(ErrorCode.BRAND_NOT_FOUND));

        DeGiay deGiay = deGiayRepo.findById(request.getIdDeGiay())
                .orElseThrow(() -> new AppException(ErrorCode.SHOE_SOLE_NOT_FOUND));

        SanPhamChiTiet spct = new SanPhamChiTiet();
        spct.setIdSanPham(sanPham);
        spct.setIdChatLieu(chatLieu);
        spct.setIdMauSac(mauSac);
        spct.setIdKichThuoc(kichThuoc);
        spct.setIdThuongHieu(thuongHieu);
        spct.setIdDeGiay(deGiay);
        spct.setNgayTao(LocalDate.now());
        spct.setNgayCapNhat(LocalDate.now());
        spct.setDonGia(request.getDonGia());
        spct.setSoLuong(request.getSoLuong());
        spct.setTrangThai(request.getTrangThai());

        SanPhamChiTiet savedSpct = sanPhamChiTietRepo.save(spct);
        return converToResponse(savedSpct);
    }

    @Override
    public SanPhamChiTietResponse update(Integer id, SanPhamChiTietRequest request) {
        // tim chi tiet san pham theo ID
        SanPhamChiTiet sanPhamChiTiet = sanPhamChiTietRepo.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_DETAIL_NOT_FOUND));

        // Cập nhật thông tin dựa trên request, kiểm tra null để tránh lỗi
        SanPham sanPham = sanPhamRepo.findById(request.getIdSanPham())
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));

        ChatLieu chatLieu = chatLieuRepo.findById(request.getIdChatLieu())
                .orElseThrow(() -> new AppException(ErrorCode.MATERIAL_NOT_FOUND));

        MauSac mauSac = mauSacRepo.findById(request.getIdMauSac())
                .orElseThrow(() -> new AppException(ErrorCode.COLOR_NOT_FOUND));

        KichThuoc kichThuoc = kichThuocRepo.findById(request.getIdKichThuoc())
                .orElseThrow(() -> new AppException(ErrorCode.SIZE_NOT_FOUND));

        ThuongHieu thuongHieu = thuongHieuRepo.findById(request.getIdThuongHieu())
                .orElseThrow(() -> new AppException(ErrorCode.BRAND_NOT_FOUND));

        DeGiay deGiay = deGiayRepo.findById(request.getIdDeGiay())
                .orElseThrow(() -> new AppException(ErrorCode.SHOE_SOLE_NOT_FOUND));

        sanPhamChiTiet.setIdSanPham(sanPham);
        sanPhamChiTiet.setIdChatLieu(chatLieu);
        sanPhamChiTiet.setIdMauSac(mauSac);
        sanPhamChiTiet.setIdKichThuoc(kichThuoc);
        sanPhamChiTiet.setIdThuongHieu(thuongHieu);
        sanPhamChiTiet.setIdDeGiay(deGiay);
        sanPhamChiTiet.setNgayCapNhat(LocalDate.now());
        sanPhamChiTiet.setDonGia(request.getDonGia());
        sanPhamChiTiet.setSoLuong(request.getSoLuong());
        sanPhamChiTiet.setTrangThai(request.getTrangThai());

        SanPhamChiTiet updatedSpct = sanPhamChiTietRepo.save(sanPhamChiTiet);
        return converToResponse(updatedSpct);
    }


    private SanPhamChiTietResponse converToResponse(SanPhamChiTiet sanPhamChiTiet) {
        SanPhamChiTietResponse response = new SanPhamChiTietResponse();
        response.setId(sanPhamChiTiet.getId());
//         convert tat ca cac thuoc tinh theo id de lay ra ten cua tung thuoc tinh
        response.setTenSanPham(sanPhamChiTiet.getIdSanPham() != null ? sanPhamChiTiet.getIdSanPham().getTenSanPham() : null);
        response.setChatLieu(sanPhamChiTiet.getIdChatLieu() != null ? sanPhamChiTiet.getIdChatLieu().getTen() : null);
        response.setMauSac(sanPhamChiTiet.getIdMauSac() != null ? sanPhamChiTiet.getIdMauSac().getTen() : null);
        response.setKichThuoc(sanPhamChiTiet.getIdKichThuoc() != null ? sanPhamChiTiet.getIdKichThuoc().getKichThuoc() : null);
        response.setThuongHieu(sanPhamChiTiet.getIdThuongHieu() != null ? sanPhamChiTiet.getIdThuongHieu().getTen() : null);
        response.setDeGiay(sanPhamChiTiet.getIdDeGiay() != null ? sanPhamChiTiet.getIdDeGiay().getTen() : null);
        response.setDonGia(sanPhamChiTiet.getDonGia());
        response.setSoLuong(sanPhamChiTiet.getSoLuong());
        response.setTrangThai(sanPhamChiTiet.getTrangThai());
        return response;
        }
}
