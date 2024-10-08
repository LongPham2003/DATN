package com.example.shoes.service.impl;

import com.example.shoes.dto.PhanTrangResponse;
import com.example.shoes.dto.nhanvien.request.NhanVienUpdateRequest;
import com.example.shoes.dto.nhanvien.request.NhanvienAddRequest;
import com.example.shoes.entity.NhanVien;
import com.example.shoes.entity.TaiKhoan;
import com.example.shoes.enums.Roles;
import com.example.shoes.exception.AppException;
import com.example.shoes.exception.ErrorCode;
import com.example.shoes.repository.NhanVienRepo;
import com.example.shoes.repository.TaiKhoanRepo;
import com.example.shoes.service.NhanVienService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NhanVienServiceImpl implements NhanVienService {
    private final PasswordEncoder passwordEncoder;
    private final NhanVienRepo nhanVienRepo;
    private final TaiKhoanRepo taiKhoanRepo;


    @Override
    public PhanTrangResponse<NhanVien> getNhanVien(int pageNumber, int pageSize, String keyword) {
        Pageable pageable = PageRequest.of(pageNumber-1,pageSize);

        Page<NhanVien> page = nhanVienRepo.getNhanVien(pageable,keyword);

        PhanTrangResponse<NhanVien> phanTrangResponse = new PhanTrangResponse<>();
        phanTrangResponse.setPageNumber(page.getNumber());
        phanTrangResponse.setPageSize(page.getSize());
        phanTrangResponse.setTotalElements(page.getTotalElements());
        phanTrangResponse.setTotalPages(page.getTotalPages());
        phanTrangResponse.setResult(page.getContent());

        return phanTrangResponse;
    }

    @Override
    public NhanVien addNhanVien(NhanvienAddRequest request) {
        if (nhanVienRepo.existsByEmail(request.getEmail())) {
            throw new AppException(ErrorCode.USER_EXISTED);
        }
        if (nhanVienRepo.existsBySdt(request.getSdt())) {
            throw new AppException(ErrorCode.SDT_EXISTED);
        }

        TaiKhoan taiKhoan = new TaiKhoan();
        taiKhoan.setEmail(request.getEmail());
        taiKhoan.setPassword(passwordEncoder.encode(request.getMatKhau()));
        taiKhoan.setTrangThai(true);
        taiKhoan.setRoles(Roles.ROLE_NHANVIEN.name());

        taiKhoanRepo.save(taiKhoan);

        NhanVien nhanVien = new NhanVien();
        nhanVien.setHoTen(request.getHoTen());
        nhanVien.setEmail(request.getEmail());
        nhanVien.setSdt(request.getSdt());
        nhanVien.setGioiTinh(request.getGioiTinh());
        nhanVien.setDiaChi(request.getDiaChi());
        nhanVien.setNgaySinh(request.getNgaySinh());
        nhanVien.setTaiKhoan(taiKhoan);
        return nhanVienRepo.save(nhanVien);

    }

    @Override
    public NhanVien updateNhanVien(Integer id, NhanVienUpdateRequest request) {
        Optional<NhanVien> nhanVienOptional = nhanVienRepo.findById(id);
        if (!nhanVienOptional.isPresent()) {
            throw new AppException(ErrorCode.USER_NOT_EXISTED);
        }
        if (nhanVienRepo.existsByEmail(request.getEmail()) && !nhanVienOptional.get().getEmail().equals(request.getEmail())) {
            throw new AppException(ErrorCode.USER_EXISTED);
        }
        if (nhanVienRepo.existsBySdt(request.getSdt()) && !nhanVienOptional.get().getSdt().equals(request.getSdt())) {
            throw new AppException(ErrorCode.SDT_EXISTED);
        }
        NhanVien nhanVien = nhanVienOptional.get();
        nhanVien.setHoTen(request.getHoTen());
        nhanVien.setEmail(request.getEmail());
        nhanVien.setSdt(request.getSdt());
        nhanVien.setGioiTinh(request.getGioiTinh());
        nhanVien.setDiaChi(request.getDiaChi());
        nhanVien.setNgaySinh(request.getNgaySinh());


        TaiKhoan taiKhoan = nhanVienOptional.get().getTaiKhoan();
        taiKhoan.setEmail(request.getEmail());
        taiKhoan.setPassword(passwordEncoder.encode(request.getMatKhau()));
        taiKhoan.setTrangThai(request.getTrangThai());
        taiKhoan.setRoles(Roles.ROLE_NHANVIEN.name());
        taiKhoanRepo.save(taiKhoan);
        nhanVien.setTaiKhoan(taiKhoan);

        return nhanVienRepo.save(nhanVien);

    }

    @Override
    public NhanVien deleteNhanVien(Integer id) {
        Optional<NhanVien> optionalNhanVien = nhanVienRepo.findById(id);

        if (optionalNhanVien.isPresent()) {
            NhanVien nhanVien = optionalNhanVien.get();
            TaiKhoan taiKhoan = optionalNhanVien.get().getTaiKhoan();
            taiKhoan.setTrangThai(false);
            nhanVien.setTaiKhoan(taiKhoan);

            return nhanVienRepo.save(nhanVien);
        } else {
            throw new AppException(ErrorCode.USER_NOT_EXISTED);
        }
    }
}
