package com.example.shoes.service.impl;

import com.example.shoes.dto.PhanTrangResponse;
import com.example.shoes.dto.phieugiamgia.request.PhieuGiamGiaRequest;
import com.example.shoes.dto.phieugiamgia.response.PhieuGiamGiaResponse;
import com.example.shoes.entity.PhieuGiamGia;
import com.example.shoes.exception.AppException;
import com.example.shoes.exception.ErrorCode;
import com.example.shoes.repository.PhieuGiamGiaRepo;
import com.example.shoes.service.PhieuGiamGiaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class PhieuGiamGiaServiceImpl implements PhieuGiamGiaService {

    @Autowired
    private PhieuGiamGiaRepo phieuGiamGiaRepo;

    @Override
    public PhieuGiamGiaResponse getById(Integer id) {
        PhieuGiamGia phieuGiamGia = phieuGiamGiaRepo.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.VOUCHER_NOT_FOUND));
        return convertToResponse(phieuGiamGia);
    }

    @Override
    public PhieuGiamGiaResponse create(PhieuGiamGiaRequest request) {
        PhieuGiamGia phieuGiamGia = new PhieuGiamGia();
        phieuGiamGia.setTenVoucher(request.getTenVoucher());
        phieuGiamGia.setDieuKienGiamGia(request.getDieuKienGiamGia());
        phieuGiamGia.setHinhThucGiam(request.getHinhThucGiam());
        phieuGiamGia.setMucGiam(request.getMucGiam());
        phieuGiamGia.setGiamToiDa(request.getGiamToiDa());
        phieuGiamGia.setSoLuong(request.getSoLuong());
        phieuGiamGia.setNgayBatDau(request.getNgayBatDau());
        phieuGiamGia.setNgayKetThuc(request.getNgayKetThuc());
        phieuGiamGia.setTrangThai(request.getTrangThai());
        PhieuGiamGia saved = phieuGiamGiaRepo.save(phieuGiamGia);
        return convertToResponse(saved);
    }

    @Override
    public PhieuGiamGiaResponse update(Integer id, PhieuGiamGiaRequest request) {
        PhieuGiamGia phieuGiamGia = phieuGiamGiaRepo.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.VOUCHER_NOT_FOUND));
        phieuGiamGia.setTenVoucher(request.getTenVoucher());
        phieuGiamGia.setDieuKienGiamGia(request.getDieuKienGiamGia());
        phieuGiamGia.setHinhThucGiam(request.getHinhThucGiam());
        phieuGiamGia.setMucGiam(request.getMucGiam());
        phieuGiamGia.setGiamToiDa(request.getGiamToiDa());
        phieuGiamGia.setSoLuong(request.getSoLuong());
        phieuGiamGia.setNgayBatDau(request.getNgayBatDau());
        phieuGiamGia.setNgayKetThuc(request.getNgayKetThuc());
        phieuGiamGia.setTrangThai(request.getTrangThai());
        PhieuGiamGia updated = phieuGiamGiaRepo.save(phieuGiamGia);
        return convertToResponse(updated);
    }

    @Override
    public PhieuGiamGiaResponse delete(Integer id, PhieuGiamGiaRequest request) {
        PhieuGiamGia phieuGiamGia = phieuGiamGiaRepo.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.VOUCHER_NOT_FOUND));
        phieuGiamGia.setTrangThai(false);
        PhieuGiamGia updated = phieuGiamGiaRepo.save(phieuGiamGia);
        return convertToResponse(updated);
    }

    @Override
    public PhanTrangResponse<PhieuGiamGia> getPhieuGiamGia(int pageNumber, int pageSize, String keyword,String tenVoucher, Boolean trangThai, LocalDate ngayBatDau, LocalDate ngayKetThuc) {
        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize);
        Page<PhieuGiamGia> page = phieuGiamGiaRepo.searchPhieuGiamGia(pageable, tenVoucher, trangThai, ngayBatDau, ngayKetThuc);

        // Kiểm tra nếu phiếu đã hết hạn và cập nhật trạng thái nếu cần
        page.getContent().forEach(phieuGiamGia -> {
            if (phieuGiamGia.getNgayKetThuc() != null && phieuGiamGia.getNgayKetThuc().isBefore(LocalDate.now()) && phieuGiamGia.getTrangThai()) {
                phieuGiamGia.setTrangThai(false); // Cập nhật trạng thái về false nếu ngayKetThuc đã qua
                phieuGiamGiaRepo.save(phieuGiamGia); // Lưu lại thay đổi
            }
        });

        PhanTrangResponse<PhieuGiamGia> phanTrangResponse = new PhanTrangResponse<>();
        phanTrangResponse.setPageNumber(page.getNumber());
        phanTrangResponse.setPageSize(page.getSize());
        phanTrangResponse.setTotalElements(page.getTotalElements());
        phanTrangResponse.setTotalPages(page.getTotalPages());
        phanTrangResponse.setResult(page.getContent());

        return phanTrangResponse;
    }


    private PhieuGiamGiaResponse convertToResponse(PhieuGiamGia phieuGiamGia) {
        PhieuGiamGiaResponse phieuGiamGiaResponse = new PhieuGiamGiaResponse();
        phieuGiamGiaResponse.setId(phieuGiamGia.getId());
        phieuGiamGiaResponse.setTenVoucher(phieuGiamGia.getTenVoucher());
        phieuGiamGiaResponse.setDieuKienGiamGia(phieuGiamGia.getDieuKienGiamGia());
        phieuGiamGiaResponse.setMucGiam(phieuGiamGia.getMucGiam());
        phieuGiamGiaResponse.setGiamToiDa(phieuGiamGia.getGiamToiDa());
        phieuGiamGiaResponse.setSoLuong(phieuGiamGia.getSoLuong());
        phieuGiamGiaResponse.setNgayBatDau(phieuGiamGia.getNgayBatDau());
        phieuGiamGiaResponse.setNgayKetThuc(phieuGiamGia.getNgayKetThuc());
        phieuGiamGiaResponse.setTrangThai(phieuGiamGia.getTrangThai());
        phieuGiamGiaResponse.setHinhThucGiam(phieuGiamGia.getHinhThucGiam());
        phieuGiamGiaResponse.setNgayTao(phieuGiamGia.getCreatedAt());
        phieuGiamGiaResponse.setNgayCapNhat(phieuGiamGia.getUpdatedAt());
        phieuGiamGiaResponse.setNguoiTao(phieuGiamGia.getCreatedBy());
        phieuGiamGiaResponse.setNguoiCapNhat(phieuGiamGia.getUpdatedBy());
        return phieuGiamGiaResponse;
    }

    @Scheduled(cron = "0 0 0 * * ?") // Chạy hàng ngày lúc 12:00 AM
    public void checkAndUpdateVoucherStatus() {
        // Lấy tất cả các voucher còn active
        List<PhieuGiamGia> phieuGiamGias = phieuGiamGiaRepo.findByTrangThai(true);

        LocalDate today = LocalDate.now();

        for (PhieuGiamGia pgg : phieuGiamGias ) {
            // Kiểm tra nếu ngày kết thúc của voucher đã qua
            if (pgg.getNgayKetThuc().isBefore(today)) {
                // Cập nhật trạng thái voucher thành hết hạn
                pgg.setTrangThai(false);
                phieuGiamGiaRepo.save(pgg);

            }
        }
    }

}
