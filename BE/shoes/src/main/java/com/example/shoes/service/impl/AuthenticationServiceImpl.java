package com.example.shoes.service.impl;

import com.example.shoes.dto.authentication.request.DoiMatKhauRequest;
import com.example.shoes.dto.authentication.request.LoginRequest;
import com.example.shoes.dto.authentication.request.ResetPass;
import com.example.shoes.dto.authentication.request.SignUpRequest;
import com.example.shoes.email.EmailService;
import com.example.shoes.entity.DiaChi;
import com.example.shoes.entity.GioHang;
import com.example.shoes.entity.KhachHang;
import com.example.shoes.entity.TaiKhoan;
import com.example.shoes.enums.Roles;
import com.example.shoes.exception.AppException;
import com.example.shoes.exception.ErrorCode;
import com.example.shoes.repository.DiaChiRepo;
import com.example.shoes.repository.GioHangRepo;
import com.example.shoes.repository.KhachHangRepo;
import com.example.shoes.repository.TaiKhoanRepo;
import com.example.shoes.service.AuthenticationService;
import jakarta.validation.ValidationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.List;


@Service
public class AuthenticationServiceImpl implements AuthenticationService {
    @Autowired
    private TaiKhoanRepo taiKhoanRepo;

    @Autowired
    private KhachHangRepo khachHangRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

    @Autowired
    private  DiaChiRepo diaChiRepo;

    @Autowired
    private  GioHangRepo gioHangRepo;


    @Override
    public String signUp(SignUpRequest signUpRequest) {
        if (taiKhoanRepo.existsByEmail(signUpRequest.getEmail())) {
            throw new AppException(ErrorCode.USER_EXISTED);
        }
        if (signUpRequest.getPassword().length() < 8) {
            throw new ValidationException("Mật khẩu phải có ít nhất 8 ký tự");
        }


        TaiKhoan taiKhoan = new TaiKhoan();
        taiKhoan.setEmail(signUpRequest.getEmail());
        taiKhoan.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
        taiKhoan.setTrangThai(true);
        taiKhoan.setRoles(Roles.ROLE_KHACHHANG.name());
        String subject = "Xin chào, bạn đã đăng ký thành công tài khoản. ";
        emailService.sendEmailPasword(taiKhoan.getEmail(), subject, signUpRequest.getPassword());
        taiKhoanRepo.save(taiKhoan);

        DiaChi diaChi = DiaChi.builder()
                .xaPhuong(signUpRequest.getXaPhuong())
                .huyenQuan(signUpRequest.getHuyenQuan())
                .tinhThanhPho(signUpRequest.getTinhThanhPho())
                .build();

        diaChiRepo.save(diaChi);


        KhachHang khachHang = new KhachHang();
        khachHang.setMa(generateMaKhachHang());
        khachHang.setEmail(signUpRequest.getEmail());
        khachHang.setHoTen(signUpRequest.getHoTen());
        khachHang.setTaiKhoan(taiKhoan);
        khachHang.setDiaChis(List.of(diaChi));
        khachHang.setTrangThai(true);

        diaChi.setKhachHang(khachHang);
        diaChi.setDiaChiMacDinh(true);
        
        khachHangRepo.save(khachHang);

        GioHang gioHang = new GioHang();
        gioHang.setTongSoLuong(0);
        gioHang.setIdKhachHang(khachHang);
        gioHangRepo.save(gioHang);


        return "Đăng ký thành công";
    }

    @Override
    public TaiKhoan singIn(LoginRequest loginRequest) {
        TaiKhoan taiKhoan = taiKhoanRepo.findByEmail(loginRequest.getEmail()).get();
        if (taiKhoan == null) {
            throw new AppException(ErrorCode.PASSWORD_OR_EMAIL_FALSE);
        }
        if(!taiKhoan.getEmail().equals(loginRequest.getEmail())&&taiKhoan==null){
            throw new AppException(ErrorCode.PASSWORD_OR_EMAIL_FALSE);
        }
        if (!passwordEncoder.matches(loginRequest.getPassword(), taiKhoan.getPassword()) && taiKhoan != null) {
            throw new AppException(ErrorCode.PASSWORD_OR_EMAIL_FALSE);
        }
        if(!taiKhoan.getTrangThai()){
            throw new AppException(ErrorCode.PASSWORD_OR_EMAIL_FALSE);
        }
        return taiKhoan;
    }

    @Override
    public String resetPass(ResetPass resetPass) {
        TaiKhoan taiKhoan = taiKhoanRepo.findByEmail(resetPass.getEmail()).get();
        if (taiKhoan == null) {
            throw new AppException(ErrorCode.USER_NOT_EXISTED);
        }
        String password = generatePass();

        taiKhoan.setPassword(passwordEncoder.encode(password));

        String subject = "Mật khẩu của bạn là . ";
        emailService.sendEmailPasword(resetPass.getEmail(), subject, password);
        taiKhoanRepo.save(taiKhoan);
        return "Thành công";
    }

    @Override
    public String doiMatKhau(DoiMatKhauRequest doiMatKhauRequest) {
        TaiKhoan taiKhoan = taiKhoanRepo.findByEmail(doiMatKhauRequest.getEmail()).get();
        if (taiKhoan == null) {
            throw new AppException(ErrorCode.USER_NOT_EXISTED);
        }
        if (passwordEncoder.matches(doiMatKhauRequest.getPassword(), taiKhoan.getPassword()) && taiKhoan != null) {
            taiKhoan.setPassword(passwordEncoder.encode(doiMatKhauRequest.getNewPassword()));
            taiKhoanRepo.save(taiKhoan);
        } else {
            throw new AppException(ErrorCode.PASSWORD_OR_EMAIL_FALSE);
        }

        return "Thành công";
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
