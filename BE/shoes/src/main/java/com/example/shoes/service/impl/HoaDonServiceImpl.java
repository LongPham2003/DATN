package com.example.shoes.service.impl;

import com.example.shoes.dto.hoadon.request.HoaDonRequest;
import com.example.shoes.dto.hoadon.response.HoaDonResponse;
import com.example.shoes.dto.hoadonchitiet.request.HoaDonChiTietRequest;
import com.example.shoes.dto.phuongthucthanhtoan.request.PhuongThucThanhToanRequest;
import com.example.shoes.entity.HoaDon;
import com.example.shoes.entity.HoaDonChiTiet;
import com.example.shoes.entity.KhachHang;
import com.example.shoes.entity.LichSuHoaDon;
import com.example.shoes.entity.NhanVien;
import com.example.shoes.entity.PhieuGiamGia;
import com.example.shoes.entity.PhuongThucThanhToan;
import com.example.shoes.entity.SanPhamChiTiet;
import com.example.shoes.exception.AppException;
import com.example.shoes.exception.ErrorCode;
import com.example.shoes.repository.HoaDonChiTietRepo;
import com.example.shoes.repository.HoaDonRepo;
import com.example.shoes.repository.KhachHangRepo;
import com.example.shoes.repository.LichSuHoaDonRepo;
import com.example.shoes.repository.NhanVienRepo;
import com.example.shoes.repository.PhieuGiamGiaRepo;
import com.example.shoes.repository.PhuongThucThanhToanRepo;
import com.example.shoes.repository.SanPhamChiTietRepo;
import com.example.shoes.service.HoaDonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
public class HoaDonServiceImpl implements HoaDonService {
    @Autowired
    private HoaDonRepo hoaDonRepo;
    @Autowired
    private SanPhamChiTietRepo sanPhamChiTietRepo;
    @Autowired
    private LichSuHoaDonRepo lichSuHoaDonRepo;
    @Autowired
    private NhanVienRepo nhanVienRepo;
    @Autowired
    private KhachHangRepo khachHangRepo;

    @Autowired
    private PhuongThucThanhToanRepo phuongThucThanhToanRepo;
    @Autowired
    private PhieuGiamGiaRepo phieuGiamGiaRepo;
    @Autowired
    private HoaDonChiTietRepo hoaDonChiTietRepo;

    private NhanVien getCurrentNhanVien() {
        // Lấy thông tin người dùng hiện tại
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName(); // Tên đăng nhập

        // Tìm nhân viên từ tên đăng nhập
        return nhanVienRepo.findByEmail(username)
                .orElseThrow(() -> new AppException(ErrorCode.STAFF)); // Xử lý nếu không tìm thấy nhân viên
    }

    @Override
    public HoaDonResponse createHoaDon(HoaDonRequest hoaDonRequest) {
        // Lấy nhân viên hiện tại đang đăng nhập
        NhanVien nhanVien = getCurrentNhanVien();

        // Lấy thông tin khách hàng
        KhachHang khachHang = khachHangRepo.findById(hoaDonRequest.getIdKhachHang())
                .orElseThrow(() -> new AppException(ErrorCode.CUSTOMER));

        // Tạo hóa đơn mới
        HoaDon hoaDon = new HoaDon();
        hoaDon.setIdNhanVien(nhanVien);
        hoaDon.setIdKhachHang(khachHang);
        hoaDon.setSoDienThoai(hoaDonRequest.getSoDienThoai());
        hoaDon.setDiaChiGiaoHang(hoaDonRequest.getDiaChiGiaoHang());
        hoaDon.setPhuongThucThanhToan(hoaDonRequest.getPhuongThucThanhToan());
        hoaDon.setPhuongThucGiaoHang(hoaDonRequest.getPhuongThucGiaoHang());
        hoaDon.setNgayTao(LocalDate.now());
        hoaDon.setTrangThai(false); // Chưa thanh toán

        // Khởi tạo tổng tiền, tiền được giảm và tiền phải trả bằng 0
        hoaDon.setTongTien(BigDecimal.ZERO);
        hoaDon.setTienDuocGiam(BigDecimal.ZERO);
        hoaDon.setTienPhaiThanhToan(BigDecimal.ZERO);
        // Lưu hóa đơn
        HoaDon savedHoaDon = hoaDonRepo.save(hoaDon);
        // Trả về kết quả
        return converToHoaDonResponse(savedHoaDon);
    }

    @Override
    public HoaDonResponse updateHoaDon(Integer idHoaDon, HoaDonChiTietRequest chiTietRequest) {  // Tìm hóa đơn theo ID
        HoaDon hoaDon = hoaDonRepo.findById(idHoaDon)
                .orElseThrow(() -> new AppException(ErrorCode.BILL_NOT_FOUND));

        // Lấy thông tin nhân viên hiện tại
        NhanVien nhanVien = getCurrentNhanVien();
        hoaDon.setIdNhanVien(nhanVien); // Cập nhật người cập nhật hóa đơn

        // Tìm sản phẩm chi tiết
        SanPhamChiTiet spct = sanPhamChiTietRepo.findById(chiTietRequest.getIdSpct())
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_DETAIL_NOT_FOUND));
        System.out.println(spct.getSoLuong());
        // Kiểm tra số lượng trong request phải lớn hơn 0
        if (chiTietRequest.getSoLuong() < 0) {
            throw new AppException(ErrorCode.INVALID_QUANTITY_LONHONO);
        }

        // Tìm chi tiết hóa đơn đã tồn tại
        HoaDonChiTiet existingChiTiet = hoaDonChiTietRepo.findByHoaDonAndSanPhamChiTiet(hoaDon, spct);

        // Nếu chi tiết hóa đơn đã tồn tại
        if (existingChiTiet != null) {
            int soLuongMoi = chiTietRequest.getSoLuong();
            // Cập nhật số lượng mới và đơn giá nếu cần
            existingChiTiet.setSoLuong(soLuongMoi);
            existingChiTiet.setDonGia(spct.getDonGia()); // Cập nhật đơn giá nếu cần
            hoaDonChiTietRepo.save(existingChiTiet); // Lưu lại chi tiết đã cập nhật

        } else {
            // Nếu chi tiết chưa tồn tại, thêm mới
            if (chiTietRequest.getSoLuong() > 0 && chiTietRequest.getSoLuong() < spct.getSoLuong()) {
                HoaDonChiTiet chiTietMoi = new HoaDonChiTiet();
                chiTietMoi.setIdHoaDon(hoaDon);
                chiTietMoi.setIdSpct(spct);
                chiTietMoi.setSoLuong(chiTietRequest.getSoLuong());
                chiTietMoi.setDonGia(chiTietRequest.getDonGia() != null ? chiTietRequest.getDonGia() : spct.getDonGia());
                chiTietMoi.setTrangThai(chiTietRequest.getTrangThai());
                hoaDonChiTietRepo.save(chiTietMoi);
            } else {
                throw new AppException(ErrorCode.INVALID_QUANTITY);
            }
        }

        // Cập nhật tổng tiền hóa đơn
        BigDecimal tongTien = hoaDon.getTongTien(); // Lấy tổng tiền hiện tại của hóa đơn
        int soLuongHienTai = existingChiTiet.getSoLuong(); // Số lượng hiện tại của sản phẩm trong hóa đơn
        int soLuongMoi = chiTietRequest.getSoLuong(); // Số lượng mới từ yêu cầu

// Tính chênh lệch số lượng
        int soLuongChenhLech = soLuongMoi - soLuongHienTai;

// Nếu chênh lệch dương (tăng số lượng)
        if (soLuongChenhLech < 0) {
            // Cộng thêm tổng tiền của số lượng chênh lệch
            BigDecimal tienThem = spct.getDonGia().multiply(BigDecimal.valueOf(soLuongChenhLech));
            hoaDon.setTongTien(tongTien.add(tienThem));
        }
// Nếu chênh lệch âm (giảm số lượng)
        else if (soLuongChenhLech > 0) {
            // Trừ đi tổng tiền của số lượng chênh lệch
            BigDecimal tienGiam = spct.getDonGia().multiply(BigDecimal.valueOf(-soLuongChenhLech)); // Sử dụng giá trị tuyệt đối
            hoaDon.setTongTien(tongTien.subtract(tienGiam));
        }

// Cập nhật tiền phải thanh toán sau khi điều chỉnh
        hoaDon.setTienPhaiThanhToan(hoaDon.getTongTien().subtract(hoaDon.getTienDuocGiam()));

// Lưu lại hóa đơn đã cập nhật
        hoaDonRepo.save(hoaDon);

        // Trả về kết quả
        return converToHoaDonResponse(hoaDon);
    }

    @Override
    public HoaDonResponse findByid(Integer id) {
        // Tìm hóa đơn theo ID
        HoaDon hoaDon = hoaDonRepo.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.BILL_NOT_FOUND));

        // Trả về hóa đơn đã tìm thấy
        return converToHoaDonResponse(hoaDon);
    }

    @Override
    public HoaDonResponse deleteHoaDon(Integer id) {
        // Tìm hóa đơn theo ID
        HoaDon hoaDon = hoaDonRepo.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.BILL_NOT_FOUND));

        // Xóa hóa đơn
        hoaDonRepo.delete(hoaDon);

        // Trả về phản hồi sau khi xóa
        return converToHoaDonResponse(hoaDon);
    }

    @Override
    public List<HoaDonResponse> getAllHoaDon() {
        // Lấy tất cả hóa đơn
        List<HoaDon> hoaDonList = hoaDonRepo.findAll();

        // Chuyển danh sách hóa đơn thành danh sách response
        List<HoaDonResponse> hoaDonResponses = hoaDonList.stream()
                .map(this::converToHoaDonResponse)
                .toList();

        // Trả về danh sách response
        return hoaDonResponses;
    }

    @Override
    public void thanhToan(Integer idHoaDon, PhuongThucThanhToanRequest phuongThucThanhToanRequest) {
        // Tìm hóa đơn
        HoaDon hoaDon = hoaDonRepo.findById(idHoaDon)
                .orElseThrow(() -> new IllegalArgumentException("Hóa đơn không tồn tại."));

        // Kiểm tra phương thức thanh toán
        if (phuongThucThanhToanRequest == null || phuongThucThanhToanRequest.getTenPhuongThuc() == null) {
            throw new IllegalArgumentException("Phương thức thanh toán không hợp lệ.");
        }

        // Lưu phương thức thanh toán
        PhuongThucThanhToan phuongThucThanhToan = new PhuongThucThanhToan();
        phuongThucThanhToan.setIdHoaDon(hoaDon);
        phuongThucThanhToan.setTenPhuongThuc(phuongThucThanhToanRequest.getTenPhuongThuc());
        phuongThucThanhToan.setGhiChu(phuongThucThanhToanRequest.getGhiChu());
        phuongThucThanhToanRepo.save(phuongThucThanhToan);

        // Cập nhật trạng thái thanh toán của hóa đơn
        hoaDon.setTrangThai(true);
        hoaDonRepo.save(hoaDon);

        // Trừ số lượng sản phẩm chi tiết
        for (HoaDonChiTiet hoaDonChiTiet : hoaDon.getHoaDonChiTiets()) {
            SanPhamChiTiet sanPhamChiTiet = hoaDonChiTiet.getIdSpct();
            sanPhamChiTiet.setSoLuong(sanPhamChiTiet.getSoLuong() - hoaDonChiTiet.getSoLuong());
            sanPhamChiTietRepo.save(sanPhamChiTiet);
        }

        // Chuyển sang lịch sử hóa đơn
        // Lấy nhân viên từ người dùng hiện tại
        NhanVien nhanVien = getCurrentNhanVien();
        LichSuHoaDon lichSuHoaDon = new LichSuHoaDon();
        lichSuHoaDon.setIdHoaDon(hoaDon);
        lichSuHoaDon.setMoTa("Thanh toán thành công.");
        lichSuHoaDon.setThoiGian(LocalDate.now());
        lichSuHoaDon.setNguoiThucHien(nhanVien.getHoTen());
        lichSuHoaDonRepo.save(lichSuHoaDon);
    }

    @Override
    public HoaDonResponse addSanPhamChiTietToHoaDon(Integer idHoaDon, HoaDonChiTietRequest chiTietRequest) {
        // Tìm hóa đơn theo ID
        HoaDon hoaDon = hoaDonRepo.findById(idHoaDon)
                .orElseThrow(() -> new AppException(ErrorCode.BILL_NOT_FOUND));

        // Tìm sản phẩm chi tiết
        SanPhamChiTiet spct = sanPhamChiTietRepo.findById(chiTietRequest.getIdSpct())
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_DETAIL_NOT_FOUND));

        // Tìm chi tiết hóa đơn đã tồn tại
        HoaDonChiTiet existingChiTiet = hoaDonChiTietRepo.findByHoaDonAndSanPhamChiTiet(hoaDon, spct);

        if (existingChiTiet != null) {
            // Nếu chi tiết hóa đơn đã tồn tại, cộng thêm số lượng
            existingChiTiet.setSoLuong(existingChiTiet.getSoLuong() + chiTietRequest.getSoLuong());
            existingChiTiet.setDonGia(spct.getDonGia()); // Cập nhật đơn giá (nếu cần thiết)

            // Lưu lại chi tiết hóa đơn đã cập nhật
            hoaDonChiTietRepo.save(existingChiTiet);
        } else {
            // Nếu chi tiết hóa đơn chưa tồn tại, tạo mới
            HoaDonChiTiet hoaDonChiTiet = new HoaDonChiTiet();
            hoaDonChiTiet.setIdHoaDon(hoaDon); // Liên kết với hóa đơn
            hoaDonChiTiet.setIdSpct(spct); // Liên kết với sản phẩm
            Integer sl = chiTietRequest.getSoLuong();
            if (sl <= spct.getSoLuong()) {
                hoaDonChiTiet.setSoLuong(sl);
            }
            hoaDonChiTiet.setDonGia(chiTietRequest.getDonGia() != null ? chiTietRequest.getDonGia() : spct.getDonGia());
            // Đơn giá từ sản phẩm chi tiết
            hoaDonChiTiet.setTrangThai(chiTietRequest.getTrangThai());
            // Lưu chi tiết hóa đơn
            hoaDonChiTietRepo.save(hoaDonChiTiet);
        }

        // Cập nhật tổng tiền hóa đơn
        BigDecimal tongTien = hoaDon.getTongTien();
        BigDecimal tongTienChiTiet = spct.getDonGia().multiply(BigDecimal.valueOf(chiTietRequest.getSoLuong()));
        hoaDon.setTongTien(tongTien.add(tongTienChiTiet));

        // Tính lại tiền phải thanh toán
        hoaDon.setTienPhaiThanhToan(hoaDon.getTongTien().subtract(hoaDon.getTienDuocGiam()));

        // Lưu lại hóa đơn đã cập nhật
        hoaDonRepo.save(hoaDon);

        // Trả về kết quả
        return converToHoaDonResponse(hoaDon);
    }


    private HoaDonResponse converToHoaDonResponse(HoaDon hoaDon) {
        HoaDonResponse hoaDonResponse = new HoaDonResponse();
        hoaDonResponse.setId(hoaDon.getId());
        hoaDonResponse.setTenNhanVien(hoaDon.getIdNhanVien() != null ? hoaDon.getIdNhanVien().getHoTen() : null);
        hoaDonResponse.setTenKhachHang(hoaDon.getIdKhachHang() != null ? hoaDon.getIdKhachHang().getHoTen() : null);
        hoaDonResponse.setSoDienThoai(hoaDon.getSoDienThoai());
        hoaDonResponse.setDiaChiGiaoHang(hoaDon.getDiaChiGiaoHang());
        hoaDonResponse.setTongTien(hoaDon.getTongTien());
        hoaDonResponse.setTienDuocGiam(hoaDon.getTienDuocGiam());
        hoaDonResponse.setTienPhaiThanhToan(hoaDon.getTienPhaiThanhToan());
        hoaDonResponse.setPhuongThucThanhToan(hoaDon.getPhuongThucThanhToan());
        hoaDonResponse.setPhuongThucGiaoHang(hoaDon.getPhuongThucGiaoHang());
        hoaDonResponse.setNgayTao(hoaDon.getNgayTao());
        hoaDonResponse.setTrangThai(hoaDon.getTrangThai());
        return hoaDonResponse;
    }
}
