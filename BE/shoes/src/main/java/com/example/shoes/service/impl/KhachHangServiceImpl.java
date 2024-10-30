package com.example.shoes.service.impl;

import com.example.shoes.dto.PhanTrangResponse;
import com.example.shoes.dto.khachhang.request.KhachHangRequest;
import com.example.shoes.dto.khachhang.response.KhachHangResponse;
import com.example.shoes.email.EmailService;
import com.example.shoes.entity.*;
import com.example.shoes.enums.Roles;
import com.example.shoes.exception.AppException;
import com.example.shoes.exception.ErrorCode;
import com.example.shoes.repository.*;
import com.example.shoes.service.GioHangService;
import com.example.shoes.service.KhachHangService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class KhachHangServiceImpl implements KhachHangService {

    private final KhachHangRepo khachHangRepo;
    private final PasswordEncoder passwordEncoder;
    private final TaiKhoanRepo taiKhoanRepo;
    private final EmailService emailService;
    private final DiaChiRepo diaChiRepo;
    private final GioHangRepo gioHangRepo;
    private  final NhanVienRepo nhanVienRepo;

    @Override
    public PhanTrangResponse<KhachHang> getKhachHang(int pageNumber, int pageSize, String keyword,Boolean trangThai) {
        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize);

        Page<KhachHang> page = khachHangRepo.getKhachHang(pageable, keyword,trangThai);

        PhanTrangResponse<KhachHang> phanTrangResponse = new PhanTrangResponse<>();
        phanTrangResponse.setPageNumber(page.getNumber());
        phanTrangResponse.setPageSize(page.getSize());
        phanTrangResponse.setTotalElements(page.getTotalElements());
        phanTrangResponse.setTotalPages(page.getTotalPages());
        phanTrangResponse.setResult(page.getContent());

        return phanTrangResponse;
    }

    @Override
    public List<KhachHangResponse> findAll() {
        List<KhachHang> list = khachHangRepo.findAll();
        List<KhachHangResponse> khachHangResponses = new ArrayList<>();
        for (KhachHang khachHang : list) {
            KhachHangResponse khachHangResponse = new KhachHangResponse();
            khachHangResponse.setId(khachHang.getId());
            khachHangResponse.setHoTen(khachHang.getHoTen());
            khachHangResponse.setSdt(khachHang.getSdt());
            khachHangResponse.setEmail(khachHang.getEmail());
            khachHangResponse.setNgaySinh(khachHang.getNgaySinh());
            khachHangResponse.setGioiTinh(khachHang.getGioiTinh());
            khachHangResponse.setTrangThai(khachHang.getTrangThai());
            khachHangResponse.setDiaChi(khachHang.getDiaChis());
            khachHangResponses.add(khachHangResponse);
        }

        return khachHangResponses;
    }

    @Override
    @Transactional
    public KhachHang add(KhachHangRequest request) {
        if (khachHangRepo.existsByEmail(request.getEmail())) {
            throw new AppException(ErrorCode.USER_EXISTED);
        }
        if (khachHangRepo.existsBySdt(request.getSdt())) {
            throw new AppException(ErrorCode.SDT_EXISTED);
        }
        if(nhanVienRepo.existsByEmail(request.getEmail())) {
            throw new AppException(ErrorCode.USER_EXISTED);
        }
        if(nhanVienRepo.existsBySdt(request.getSdt())) {
            throw new AppException(ErrorCode.SDT_EXISTED);
        }


        TaiKhoan taiKhoan = new TaiKhoan();
        taiKhoan.setEmail(request.getEmail());
        taiKhoan.setTrangThai(true);
        String pass = generatePass();
        taiKhoan.setPassword(passwordEncoder.encode(pass));
        taiKhoan.setRoles(Roles.ROLE_KHACHHANG.name());

        taiKhoanRepo.save(taiKhoan);

        KhachHang khachHang = new KhachHang();
        khachHang.setHoTen(request.getHoTen());
        khachHang.setMa(generateMaKhachHang());
        khachHang.setSdt(request.getSdt());
        khachHang.setEmail(request.getEmail());
        khachHang.setNgaySinh(request.getNgaySinh());
        khachHang.setTrangThai(true);
        khachHang.setGioiTinh(request.getGioiTinh());
        khachHang.setTaiKhoan(taiKhoan);

        var newKhachHang = khachHangRepo.save(khachHang);

        DiaChi diaChi = new DiaChi();
        diaChi.setKhachHang(newKhachHang);
        diaChi.setDiaChiMacDinh(true);
        diaChi.setTinhThanhPho(request.getTinhThanhPho());
        diaChi.setXaPhuong(request.getXaPhuong());
        diaChi.setHuyenQuan(request.getHuyenQuan());
        diaChi.setSoNhaDuongThonXom(request.getSoNhaDuongThonXom());
        diaChi.setDiaChiChiTiet(request.getDiaChiChiTiet());
        diaChiRepo.save(diaChi);

        GioHang gioHang = new GioHang();
        gioHang.setTongSoLuong(0);
        gioHang.setIdKhachHang(newKhachHang);
        gioHangRepo.save(gioHang);


        String subject = "Xin chào";
        emailService.sendEmailPasword(request.getEmail(), subject, pass);

        return newKhachHang;
    }


    @Override
    public KhachHang getById(Integer id) {
        if(khachHangRepo.existsById(id)) {
            return khachHangRepo.findById(id).get();
        }else{
            throw new AppException(ErrorCode.USER_EXISTED);
        }
    }

    @Override
    public KhachHang update(Integer id, KhachHangRequest request) {
        Optional<KhachHang> khachHangOptional = khachHangRepo.findById(id);

        if (!khachHangOptional.isPresent()) {
            throw new AppException(ErrorCode.USER_NOT_EXISTED);
        }
        if (khachHangRepo.existsByEmail(request.getEmail()) && !khachHangOptional.get().getEmail().equals(request.getEmail())) {
            throw new AppException(ErrorCode.USER_EXISTED);
        }
        if (khachHangRepo.existsBySdt(request.getSdt()) && !khachHangOptional.get().getSdt().equals(request.getSdt())) {
            throw new AppException(ErrorCode.SDT_EXISTED);
        }

        KhachHang khachHang = khachHangOptional.get();


        khachHang.setHoTen(request.getHoTen());
        khachHang.setSdt(request.getSdt());
        khachHang.setMa(request.getMa());
        khachHang.setEmail(request.getEmail());
        khachHang.setNgaySinh(request.getNgaySinh());
        khachHang.setTrangThai(request.getTrangThai());
        khachHang.setGioiTinh(request.getGioiTinh());

        khachHangRepo.save(khachHang);

        DiaChi diaChiKhachHang = diaChiRepo.getDiaChiByKhachHangIdAndDiaChiMacDinh(id, true);

        DiaChi diaChi = new DiaChi();

        if (diaChiKhachHang != null) {
            diaChi.setId(diaChiKhachHang.getId());
        }

        diaChi.setDiaChiMacDinh(true);
        diaChi.setTinhThanhPho(request.getTinhThanhPho());
        diaChi.setXaPhuong(request.getXaPhuong());
        diaChi.setHuyenQuan(request.getHuyenQuan());
        diaChi.setDiaChiChiTiet(request.getDiaChiChiTiet());
        diaChi.setSoNhaDuongThonXom(request.getSoNhaDuongThonXom());
        diaChi.setKhachHang(khachHang);
        diaChiRepo.save(diaChi);

        return khachHang;

    }

    public String generatePass() {
        // Các ký tự để tạo mật khẩu
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
        SecureRandom random = new SecureRandom();
        StringBuilder password = new StringBuilder();

        for (int i = 0; i < 9; i++) {
            int index = random.nextInt(chars.length());
            password.append(chars.charAt(index));
        }

        return password.toString();
    }

    public String generateMaKhachHang() {
        // Lấy danh sách mã sản phẩm lớn nhất (SPxx)
        List<String> maKH = khachHangRepo.findTopMaNhanVien();

        // Kiểm tra nếu không có sản phẩm nào thì bắt đầu từ SP01
        if (maKH.isEmpty()) {
            return "KH01";
        }

        // Lấy mã sản phẩm lớn nhất (ví dụ: SP05)
        String maxMaSanPham = maKH.get(0);

        // Tách phần số ra khỏi chuỗi, ví dụ: "SP05" -> "05"
        int maxNumber = Integer.parseInt(maxMaSanPham.substring(2));

        // Tăng giá trị lên 1
        int newNumber = maxNumber + 1;

        // Trả về mã sản phẩm mới theo định dạng "SPxx" (ví dụ: SP06)
        return String.format("KH%02d", newNumber);
    }
}
