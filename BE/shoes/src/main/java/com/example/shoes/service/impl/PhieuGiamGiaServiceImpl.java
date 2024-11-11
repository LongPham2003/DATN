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

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

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
        if (request.getNgayKetThuc().isBefore(request.getNgayBatDau())) {
            throw new AppException(ErrorCode.VALID_PHIEU_GIAM_GIA);
        }

        PhieuGiamGia phieuGiamGia = new PhieuGiamGia();
        phieuGiamGia.setTenVoucher(request.getTenVoucher());
        phieuGiamGia.setDieuKienGiamGia(request.getDieuKienGiamGia());
        phieuGiamGia.setHinhThucGiam(request.getHinhThucGiam());
        if(request.getHinhThucGiam().equals("%")){
            if(request.getMucGiam().compareTo(BigDecimal.valueOf(100))>0 ||request.getMucGiam().compareTo(BigDecimal.ZERO)<=0){
                throw  new AppException(ErrorCode.VALID_PHIEU_GIAM_GIA_MUC_GIAM);
            }
        }
        if(request.getHinhThucGiam().equals("VND")){
            if(request.getMucGiam().compareTo(BigDecimal.ZERO)<=0){
                throw  new AppException(ErrorCode.VALID_PHIEU_GIAM_GIA_MUC_GIAM);
            }
        }
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

        if (request.getNgayKetThuc().isBefore(request.getNgayBatDau())) {
            throw new AppException(ErrorCode.VALID_PHIEU_GIAM_GIA);
        }
        phieuGiamGia.setTenVoucher(request.getTenVoucher());
        if(request.getDieuKienGiamGia().compareTo(BigDecimal.ZERO)<=0){
            throw  new AppException(ErrorCode.VALID_PHIEU_GIAM_GIA_DK_GIAM);
        }
        phieuGiamGia.setDieuKienGiamGia(request.getDieuKienGiamGia());

        phieuGiamGia.setHinhThucGiam(request.getHinhThucGiam());
        if(request.getHinhThucGiam().equals("%")){
            if(request.getMucGiam().compareTo(BigDecimal.valueOf(100))>0 ||request.getMucGiam().compareTo(BigDecimal.ZERO)<=0){
                throw  new AppException(ErrorCode.VALID_PHIEU_GIAM_GIA_MUC_GIAM);
            }
        }
        if(request.getHinhThucGiam().equals("VND")){
            if(request.getMucGiam().compareTo(BigDecimal.ZERO)<=0){
                throw  new AppException(ErrorCode.VALID_PHIEU_GIAM_GIA_MUC_GIAM);
            }
        }
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
    public List<PhieuGiamGiaResponse> getAllTrangThaiTrue() {
        List<PhieuGiamGia> listTrangThaiTrue= phieuGiamGiaRepo.getAllByTrangThaiTrue();
        return  listTrangThaiTrue.stream().map(this::convertToResponse).collect(Collectors.toList());
    }

    @Override
    public PhanTrangResponse<PhieuGiamGiaResponse> getPhieuGiamGia(int pageNumber, int pageSize, String keyword,String tenVoucher, Boolean trangThai, LocalDateTime ngayBatDau, LocalDateTime ngayKetThuc) {
        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize);
        Page<PhieuGiamGia> page = phieuGiamGiaRepo.searchPhieuGiamGia(pageable, tenVoucher, trangThai, ngayBatDau, ngayKetThuc);
        List<PhieuGiamGia> phieuGiamGias = page.getContent();

        List<PhieuGiamGiaResponse> phieuGiamGiaResponses = new ArrayList<>();
        for (PhieuGiamGia p : phieuGiamGias) {
            phieuGiamGiaResponses.add(convertToResponse(p));
        }

        PhanTrangResponse<PhieuGiamGiaResponse> phanTrangResponse = new PhanTrangResponse<>();
        phanTrangResponse.setPageNumber(page.getNumber());
        phanTrangResponse.setPageSize(page.getSize());
        phanTrangResponse.setTotalElements(page.getTotalElements());
        phanTrangResponse.setTotalPages(page.getTotalPages());
        phanTrangResponse.setResult(phieuGiamGiaResponses);

        return phanTrangResponse;
    }


    private PhieuGiamGiaResponse convertToResponse(PhieuGiamGia phieuGiamGia) {
        PhieuGiamGiaResponse phieuGiamGiaResponse = new PhieuGiamGiaResponse();
        phieuGiamGiaResponse.setId(phieuGiamGia.getId());
        phieuGiamGiaResponse.setTenVoucher(phieuGiamGia.getTenVoucher());
        phieuGiamGiaResponse.setDieuKienGiamGia(formatCurrency(phieuGiamGia.getDieuKienGiamGia()));
        if(phieuGiamGia.getHinhThucGiam().equals("%")){
            phieuGiamGiaResponse.setMucGiam(formatPhanTram(phieuGiamGia.getMucGiam()).toString());
        }else {
            phieuGiamGiaResponse.setMucGiam(formatCurrency(phieuGiamGia.getMucGiam()));
        }

        phieuGiamGiaResponse.setGiamToiDa(formatCurrency(phieuGiamGia.getGiamToiDa()));
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

    @Scheduled(cron = "0 0 * * *  ?") // mỗi giờ chạy 1 lần
    public void checkAndUpdateVoucherStatus() {
        // Lấy tất cả các voucher còn active
        List<PhieuGiamGia> phieuGiamGias = phieuGiamGiaRepo.findByTrangThai(true);

        LocalDateTime today = LocalDateTime.now();

        for (PhieuGiamGia pgg : phieuGiamGias ) {
            // Kiểm tra nếu ngày kết thúc của voucher đã qua
            if (pgg.getNgayKetThuc().isBefore(today)) {
                // Cập nhật trạng thái voucher thành hết hạn
                pgg.setTrangThai(false);
                phieuGiamGiaRepo.save(pgg);

            }
        }
    }

    // Phương thức chuyển đổi BigDecimal sang định dạng tiền tệ Việt Nam
    private String formatCurrency(BigDecimal amount) {
        NumberFormat currencyFormat = NumberFormat.getCurrencyInstance(new Locale("vi", "VN"));
        String formatted = currencyFormat.format(amount);
        return formatted.replace("₫", "").trim() + " VNĐ"; // Loại bỏ ký hiệu ₫ và thêm VNĐ
    }

    private String formatPhanTram(BigDecimal mucGiam) {
        DecimalFormat df = new DecimalFormat("#"); // Định dạng không có số thập phân
        return df.format(mucGiam) + "%"; // Thêm ký hiệu phần trăm
    }

}
