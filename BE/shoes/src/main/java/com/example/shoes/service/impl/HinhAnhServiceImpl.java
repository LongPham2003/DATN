package com.example.shoes.service.impl;

import com.example.shoes.dto.hinhanh.repuest.HinhAnhRequest;
import com.example.shoes.dto.hinhanh.response.HinhAnhResponse;
import com.example.shoes.entity.HinhAnh;
import com.example.shoes.entity.SanPhamChiTiet;
import com.example.shoes.exception.AppException;
import com.example.shoes.exception.ErrorCode;
import com.example.shoes.repository.HinhAnhRepo;
import com.example.shoes.repository.SanPhamChiTietRepo;
import com.example.shoes.service.HinhAnhService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class HinhAnhServiceImpl implements HinhAnhService {
    @Autowired
    private HinhAnhRepo hinhAnhRepo;
    @Autowired
    private SanPhamChiTietRepo sanPhamChiTietRepo;

    @Override
    public List<HinhAnhResponse> findAll() {
        List<HinhAnh> list = hinhAnhRepo.findAll(Sort.by(Sort.Direction.DESC, "id"));
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

//        // Thêm tiền tố vào chuỗi Base64
//        String base64WithPrefix = "data:image/png;base64," + request.getDuLieuAnhBase64();
        hinhAnh.setDuLieuAnh(request.getDuLieuAnhBase64());  // Lưu chuỗi Base64 với tiền tố
        SanPhamChiTiet sanPhamChiTiet=sanPhamChiTietRepo.findById(request.getIdSanPhamChiTiet())
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_DETAIL_NOT_FOUND));
       hinhAnh.setIdSanPhamChiTiet(sanPhamChiTiet);
        hinhAnh.setTrangThai(request.getTrangThai());
        HinhAnh savedHinhAnh = hinhAnhRepo.save(hinhAnh);

        return convert(savedHinhAnh);
    }

    @Override
    public HinhAnhResponse update(Integer id, HinhAnhRequest request) {
        HinhAnh hinhAnh = hinhAnhRepo.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.IMAGE_NOT_FOUND));
        hinhAnh.setTenAnh(request.getTenAnh());

//        // Thêm tiền tố vào chuỗi Base64
//        String base64WithPrefix = "data:image/png;base64," + request.getDuLieuAnhBase64();
//        hinhAnh.setDuLieuAnh(base64WithPrefix);  // Lưu chuỗi Base64 với tiền tố
        hinhAnh.setDuLieuAnh(request.getDuLieuAnhBase64());
        SanPhamChiTiet sanPhamChiTiet=sanPhamChiTietRepo.findById(request.getIdSanPhamChiTiet())
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_DETAIL_NOT_FOUND));
        hinhAnh.setIdSanPhamChiTiet(sanPhamChiTiet);
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

    @Override
    public HinhAnhResponse getFirstBySanPhamChiTietId(Integer idSanPhamChiTiet) {
        // Sử dụng PageRequest để lấy 1 ảnh đầu tiên
        List<HinhAnh> hinhAnhList = hinhAnhRepo.findTopByIdSanPhamChiTiet_IdOrderByIdAsc(idSanPhamChiTiet, PageRequest.of(0, 1));

        if (hinhAnhList.isEmpty()) {
            throw new AppException(ErrorCode.IMAGE_NOT_FOUND);
        }

        HinhAnh hinhAnh = hinhAnhList.get(0); // Lấy ảnh đầu tiên trong danh sách
        return convert(hinhAnh); // Chuyển đổi sang HinhAnhResponse
    }

    @Override
    public List<HinhAnhResponse> getAllHinhAnhTheoIDSPCT(Integer idSanPhamChiTiet) {
        // Lấy danh sách hình ảnh theo ID sản phẩm chi tiết
        List<HinhAnh> hinhAnhList = hinhAnhRepo.findAllHinhAnhTheoIDSPCT(idSanPhamChiTiet)
                .orElseThrow(() -> new AppException(ErrorCode.IMAGE_NOT_FOUND));

        // Chuyển đổi danh sách hình ảnh sang danh sách HinhAnhResponse
        return hinhAnhList.stream()
                .map(this::convert) // Sử dụng hàm convert hiện tại
                .collect(Collectors.toList());
    }



    private HinhAnhResponse convert(HinhAnh hinhAnh) {
        HinhAnhResponse hinhAnhResponse = new HinhAnhResponse();
        hinhAnhResponse.setId(hinhAnh.getId());
        hinhAnhResponse.setTenAnh(hinhAnh.getTenAnh());

        // Trả về chuỗi Base64 với tiền tố đã được lưu sẵn
        hinhAnhResponse.setDuLieuAnhBase64(hinhAnh.getDuLieuAnh());

        if (hinhAnh.getIdSanPhamChiTiet() != null) {
            hinhAnhResponse.setIdSanPhamChiTiet(hinhAnh.getIdSanPhamChiTiet().getId());
        } else {
            hinhAnhResponse.setIdSanPhamChiTiet(null);
        }

        hinhAnhResponse.setTrangThai(hinhAnh.getTrangThai());
        return hinhAnhResponse;
    }
}
