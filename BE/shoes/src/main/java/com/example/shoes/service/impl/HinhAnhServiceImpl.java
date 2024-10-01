package com.example.shoes.service.impl;

import com.example.shoes.dto.hinhanh.repuest.HinhAnhRequest;
import com.example.shoes.dto.hinhanh.response.HinhAnhResponse;
import com.example.shoes.entity.HinhAnh;
import com.example.shoes.exception.AppException;
import com.example.shoes.exception.ErrorCode;
import com.example.shoes.repository.HinhAnhRepo;
import com.example.shoes.service.HinhAnhService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class HinhAnhServiceImpl implements HinhAnhService {
    @Autowired
    private HinhAnhRepo hinhAnhRepo;

    @Override
    public List<HinhAnhResponse> findAll() {
        List<HinhAnh> list =hinhAnhRepo.findAll(Sort.by(Sort.Direction.DESC,"id"));
        return list.stream()
                .map(this::convert)
                .collect(Collectors.toList());
    }

    @Override
    public HinhAnhResponse getById(Integer id) {
        HinhAnh hinhAnh = hinhAnhRepo.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.IMAGE_NOT_FOUND));
        return convert(hinhAnh);
    }

    @Override
    public HinhAnhResponse create(HinhAnhRequest request) {
        HinhAnh hinhAnh = new HinhAnh();
        hinhAnh.setTenAnh(request.getTenAnh());

        String base64Data = request.getDuLieuAnhBase64();
        if (base64Data != null && base64Data.startsWith("data:image/png;base64,")) {
            base64Data = base64Data.substring("data:image/png;base64,".length()); // Loại bỏ phần tiền tố
        }

        hinhAnh.setDuLieuAnh(Base64.getDecoder().decode(base64Data)); // Chuyển đổi Base64 thành byte[]
         hinhAnh.setIdSanPhamChiTiet(hinhAnh.getIdSanPhamChiTiet());
        hinhAnh.setTrangThai(request.getTrangThai());

        HinhAnh saveHinhAnh = hinhAnhRepo.save(hinhAnh);
        return convert(saveHinhAnh);
    }

    @Override
    public HinhAnhResponse update(Integer id, HinhAnhRequest request) {
        HinhAnh hinhAnh = hinhAnhRepo.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.IMAGE_NOT_FOUND));
        hinhAnh.setTenAnh(request.getTenAnh());

        String base64Data = request.getDuLieuAnhBase64();
        if (base64Data != null && base64Data.startsWith("data:image/png;base64,")) {
            base64Data = base64Data.substring("data:image/png;base64,".length()); // Loại bỏ phần tiền tố
        }

        hinhAnh.setDuLieuAnh(Base64.getDecoder().decode(base64Data)); // Chuyển đổi Base64 thành byte[]
         hinhAnh.setIdSanPhamChiTiet(hinhAnh.getIdSanPhamChiTiet());
        hinhAnh.setTrangThai(request.getTrangThai());

        HinhAnh updated = hinhAnhRepo.save(hinhAnh);
        return convert(updated);
    }

    @Override
    public void delete(Integer id) {
        if (!hinhAnhRepo.existsById(id)) {
            throw new AppException(ErrorCode.IMAGE_NOT_FOUND);
        }
        hinhAnhRepo.deleteById(id);
    }

    private HinhAnhResponse convert(HinhAnh hinhAnh) {
        HinhAnhResponse hinhAnhResponse = new HinhAnhResponse();
        hinhAnhResponse.setId(hinhAnh.getId());
        hinhAnhResponse.setTenAnh(hinhAnh.getTenAnh());
        hinhAnhResponse.setDuLieuAnh(hinhAnh.getDuLieuAnh());
        if (hinhAnh.getIdSanPhamChiTiet() != null) {
            hinhAnhResponse.setIdSanPhamChiTiet(hinhAnh.getIdSanPhamChiTiet().getId());
        } else {
            hinhAnhResponse.setIdSanPhamChiTiet(null);
        }
        hinhAnhResponse.setTrangThai(hinhAnh.getTrangThai());
        return hinhAnhResponse;
    }
}
