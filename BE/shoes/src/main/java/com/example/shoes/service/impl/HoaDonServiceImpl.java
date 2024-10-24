package com.example.shoes.service.impl;

import com.example.shoes.dto.hoadon.request.HoaDonRequest;
import com.example.shoes.dto.hoadon.response.HoaDonResponse;
import com.example.shoes.dto.hoadonchitiet.request.HoaDonChiTietRequest;
import com.example.shoes.dto.phuongthucthanhtoan.request.PhuongThucThanhToanRequest;
import com.example.shoes.entity.ChatLieu;
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
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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
    // Hàm để sinh mã hoa don tự động
    public String generateMaHoaDon() {
        // Lấy mã hoa don lớn nhất từ database
        String maxMaHoaDon = hoaDonRepo.findMaxMaHoaDon();

<<<<<<< HEAD
=======
    // Hàm để sinh mã hoa don tự động
    public String generateMaHoaDon() {
        // Lấy mã hoa don lớn nhất từ database
        String maxMaHoaDon = hoaDonRepo.findMaxMaHoaDon();

>>>>>>> bd7a636b62ded312868c21701a87c623a8c11d53
        // Tách số thứ tự từ mã hoa don
        if (maxMaHoaDon != null) {
            int soThuTu = Integer.parseInt(maxMaHoaDon.substring(2)); // Bỏ phần "SP"
            soThuTu++;
            // Trả về mã hoa don mới dạng "HD" + số thứ tự (đảm bảo số thứ tự có ít nhất 2 chữ số)
            return String.format("HD%02d", soThuTu);
        } else {
            // Trường hợp chưa có hoa don nào, trả về mã hoa don đầu tiên là "HD01"
            return "HD01";
        }
    }
    @Override
    public HoaDonResponse createHoaDon() {
        // Lấy nhân viên hiện tại đang đăng nhập
        NhanVien nhanVien = getCurrentNhanVien();

        // Tạo hóa đơn mới
        HoaDon hoaDon = new HoaDon();
        String maHoaDon=generateMaHoaDon();
        hoaDon.setMa(maHoaDon);
        hoaDon.setIdNhanVien(nhanVien);
        hoaDon.setPhuongThucGiaoHang("tại quầy ");
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
        // Tìm hóa đơn theo ID
        HoaDon hoaDon = hoaDonRepo.findById(idHoaDon)
                .orElseThrow(() -> new AppException(ErrorCode.BILL_NOT_FOUND));

        // Lấy thông tin nhân viên hiện tại
        NhanVien nhanVien = getCurrentNhanVien();
        hoaDon.setIdNhanVien(nhanVien); // Cập nhật người cập nhật hóa đơn

        // Tìm sản phẩm chi tiết
        SanPhamChiTiet spct = sanPhamChiTietRepo.findById(chiTietRequest.getIdSpct())
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_DETAIL_NOT_FOUND));

        // Kiểm tra số lượng trong request phải lớn hơn 0
        if (chiTietRequest.getSoLuong() <= 0) {
            throw new AppException(ErrorCode.INVALID_QUANTITY_LONHONO);
        }

        // Tìm chi tiết hóa đơn đã tồn tại
        HoaDonChiTiet existingChiTiet = hoaDonChiTietRepo.findByHoaDonAndSanPhamChiTiet(hoaDon, spct);

        // Tổng tiền hiện tại của hóa đơn
        BigDecimal tongTien = hoaDon.getTongTien();

        // Nếu chi tiết hóa đơn đã tồn tại
        if (existingChiTiet != null) {
            // Lấy số lượng hiện tại của sản phẩm trong hóa đơn
            int soLuongHienTai = existingChiTiet.getSoLuong();
            int soLuongMoi = chiTietRequest.getSoLuong();

            // Tính chênh lệch số lượng
            int soLuongChenhLech = soLuongMoi - soLuongHienTai;

            // Cập nhật số lượng mới và đơn giá
            existingChiTiet.setSoLuong(soLuongMoi);
            existingChiTiet.setDonGia(spct.getDonGia()); // Cập nhật đơn giá nếu cần
            hoaDonChiTietRepo.save(existingChiTiet); // Lưu lại chi tiết đã cập nhật

            // Nếu chênh lệch dương (tăng số lượng)
            if (soLuongChenhLech > 0) {
                BigDecimal tienThem = spct.getDonGia().multiply(BigDecimal.valueOf(soLuongChenhLech));
                tongTien = tongTien.add(tienThem);
                // Trừ số lượng sản phẩm trong SPCT khi tăng số lượng
                spct.setSoLuong(spct.getSoLuong() - soLuongChenhLech);
            }
            // Nếu chênh lệch âm (giảm số lượng)
            else if (soLuongChenhLech < 0) {
                BigDecimal tienGiam = spct.getDonGia().multiply(BigDecimal.valueOf(-soLuongChenhLech));
                tongTien = tongTien.subtract(tienGiam);
                // Cộng lại số lượng sản phẩm vào SPCT khi giảm số lượng
                spct.setSoLuong(spct.getSoLuong() + (-soLuongChenhLech));
            }

            // Lưu lại thay đổi số lượng SPCT
            sanPhamChiTietRepo.save(spct);

        } else {
            // Nếu SPCT chưa tồn tại, thêm mới
            if (chiTietRequest.getSoLuong() <= spct.getSoLuong()) {
                HoaDonChiTiet chiTietMoi = new HoaDonChiTiet();
                chiTietMoi.setIdHoaDon(hoaDon);
                chiTietMoi.setIdSpct(spct);
                chiTietMoi.setSoLuong(chiTietRequest.getSoLuong());
                chiTietMoi.setDonGia(spct.getDonGia());
                chiTietMoi.setTrangThai(false);
                hoaDonChiTietRepo.save(chiTietMoi);

                // Cập nhật tổng tiền cho sản phẩm mới
                BigDecimal tienMoi = spct.getDonGia().multiply(BigDecimal.valueOf(chiTietRequest.getSoLuong()));
                tongTien = tongTien.add(tienMoi);

                // Trừ số lượng sản phẩm chi tiết
                spct.setSoLuong(spct.getSoLuong() - chiTietRequest.getSoLuong());
                sanPhamChiTietRepo.save(spct); // Lưu thay đổi số lượng SPCT
            } else {
                throw new AppException(ErrorCode.INVALID_QUANTITY);
            }
        }
        // Cập nhật tổng tiền và tiền phải thanh toán sau khi điều chỉnh
        hoaDon.setTongTien(tongTien);
        hoaDon.setTienPhaiThanhToan(tongTien.subtract(hoaDon.getTienDuocGiam()));

        // Lưu lại hóa đơn đã cập nhật
        hoaDonRepo.save(hoaDon);
        // Cập nhật số lượng sản phẩm chi tiết
        sanPhamChiTietRepo.save(spct); // Lưu thay đổi số lượng SPCT

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
    public HoaDonResponse deleteHoaDon(Integer idHoaDon) {
        // Lấy hóa đơn theo ID
        HoaDon hoaDon = hoaDonRepo.findById(idHoaDon)
                .orElseThrow(() -> new AppException(ErrorCode.BILL_NOT_FOUND));

        // Kiểm tra trạng thái hóa đơn
        if (hoaDon.getTrangThai()==true) {
            throw new RuntimeException("Hóa đơn đã thanh toán, không thể xóa!");
        }

        // Lấy danh sách chi tiết hóa đơn
        List<HoaDonChiTiet> chiTietList = hoaDonChiTietRepo.findByIdHoaDon(idHoaDon);

        // Cập nhật lại số lượng của sản phẩm chi tiết
        for (HoaDonChiTiet chiTiet : chiTietList) {
            SanPhamChiTiet spct = chiTiet.getIdSpct();
            spct.setSoLuong(spct.getSoLuong() + chiTiet.getSoLuong());
            sanPhamChiTietRepo.save(spct); // Lưu lại số lượng sản phẩm chi tiết đã cập nhật
        }

        // Xóa chi tiết hóa đơn
        hoaDonChiTietRepo.deleteAll(chiTietList);

        // Xóa hóa đơn
        hoaDonRepo.delete(hoaDon);
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

    private boolean kiemTraTrangThaiThanhToanZaloPay(String phuongThuc, Integer idHoaDon) {
        try {
            String appId = "554";
            String key2 = "uUfsWgfLkRLzq6W2uNXTCxrfxs51auny";
            String endpoint = "https://sandbox.zalopay.com.vn/v001/tpe/getstatusbyapptransid";
            String appTransId = String.valueOf(idHoaDon);

            String dataToSign = appId + "|" + appTransId + "|" + key2;

            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(dataToSign.getBytes(StandardCharsets.UTF_8));
            StringBuilder hexString = new StringBuilder();
            for (byte b : hash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) {
                    hexString.append('0');
                }
                hexString.append(hex);
            }
            String mac = hexString.toString();

            HttpHeaders headers = new HttpHeaders();
            headers.set("Content-Type", "application/json");

            Map<String, String> body = new HashMap<>();
            body.put("app_id", appId);
            body.put("app_trans_id", appTransId);
            body.put("mac", mac);

            // Giả lập request HTTP tới API ZaloPay
            HttpEntity<Map<String, String>> requestEntity = new HttpEntity<>(body, headers);
            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<String> response = restTemplate.postForEntity(endpoint, requestEntity, String.class);

            if (response.getStatusCode() == HttpStatus.OK) {
                // Kiểm tra phản hồi và trạng thái thanh toán
                return true;  // Thanh toán thành công
            } else {
                return false; // Thanh toán chưa thành công
            }
        } catch (Exception e) {
            e.printStackTrace();
            return false; // Có lỗi xảy ra khi kiểm tra thanh toán
        }
    }



    private void capNhatTrangThaiHoaDon(HoaDon hoaDon) {
        // Lấy danh sách chi tiết hóa đơn
        List<HoaDonChiTiet> chiTietList = hoaDonChiTietRepo.findByIdHoaDon(hoaDon.getId());
        for (HoaDonChiTiet chiTiet : chiTietList) {
            chiTiet.setTrangThai(true);  // Cập nhật trạng thái thành true
        }
        hoaDonChiTietRepo.saveAll(chiTietList);

        // Cập nhật trạng thái thanh toán của hóa đơn
        hoaDon.setTrangThai(true);
        hoaDonRepo.save(hoaDon);

        // Lưu lịch sử hóa đơn
        NhanVien nhanVien = getCurrentNhanVien();
        LichSuHoaDon lichSuHoaDon = new LichSuHoaDon();
        lichSuHoaDon.setIdHoaDon(hoaDon);
        lichSuHoaDon.setMoTa("Thanh toán thành công "+ "id hóa đon:"+ hoaDon.getId() + "so tien :" +hoaDon.getTienPhaiThanhToan());
        lichSuHoaDon.setThoiGian(LocalDate.now());
        lichSuHoaDon.setNguoiThucHien(nhanVien.getHoTen());
        lichSuHoaDonRepo.save(lichSuHoaDon);
    }
    private String generateZaloPayQR(HoaDon hoaDon) {
        try {
            String appId = "554";
            String key2 = "uUfsWgfLkRLzq6W2uNXTCxrfxs51auny";
            String endpoint = "https://sandbox.zalopay.vn/v001/tpe/createorder";

            String orderId = String.valueOf(hoaDon.getId());
            BigDecimal amount = hoaDon.getTienPhaiThanhToan();

            Map<String, String> data = new HashMap<>();
            data.put("app_id", appId);
            data.put("amount", String.valueOf(amount));
            data.put("app_trans_id", orderId);
            data.put("embed_data", "{}");
            data.put("item", "[]");
            data.put("description", "Thanh toán hóa đơn #" + orderId);

            String dataToSign = data.entrySet()
                    .stream()
                    .map(entry -> entry.getKey() + "=" + entry.getValue())
                    .collect(Collectors.joining("&")) + key2;

            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(dataToSign.getBytes(StandardCharsets.UTF_8));
            StringBuilder hexString = new StringBuilder();
            for (byte b : hash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) {
                    hexString.append('0');
                }
                hexString.append(hex);
            }
            String checksum = hexString.toString();

            data.put("mac", checksum);

            String params = data.entrySet()
                    .stream()
                    .map(entry -> entry.getKey() + "=" + entry.getValue())
                    .collect(Collectors.joining("&"));

            return endpoint + "?" + params;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
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

        String tenPhuongThuc = phuongThucThanhToanRequest.getTenPhuongThuc();

        if (tenPhuongThuc.equalsIgnoreCase("Tiền mặt")) {
            // Lưu phương thức thanh toán
            PhuongThucThanhToan phuongThucThanhToan = new PhuongThucThanhToan();
            phuongThucThanhToan.setIdHoaDon(hoaDon);
            phuongThucThanhToan.setTenPhuongThuc(phuongThucThanhToanRequest.getTenPhuongThuc());
            phuongThucThanhToan.setGhiChu("Tiền mặt" +hoaDon.getId() +"sotien" +hoaDon.getTienPhaiThanhToan());
            phuongThucThanhToanRepo.save(phuongThucThanhToan);

            // Nếu khách hàng đã thanh toán, cập nhật trạng thái hóa đơn
            capNhatTrangThaiHoaDon(hoaDon);
        } else if (tenPhuongThuc.equalsIgnoreCase("Chuyển khoản ngân hàng ")) {
            // Tạo mã QR cho chuyển khoản ngân hàng với id hóa đơn và tổng tiền
            String qrCodeData = "BankTransfer - ID:" + hoaDon.getId() + " - Amount: " + hoaDon.getTienPhaiThanhToan();
            System.out.println("QR Code Chuyen Khoan: " + qrCodeData);
            // Logic tạo mã QR cho khách hàng thanh toán
            // Sau đó, kiểm tra thanh toán
            // Kiểm tra trạng thái thanh toán từ ngân hàng
//            sau chuyển doi de tam de ko bi loi
            boolean daThanhToan = kiemTraTrangThaiThanhToanZaloPay("ChuyenKhoan", hoaDon.getId());

            if (daThanhToan==true) {
                // Nếu khách hàng đã thanh toán, cập nhật trạng thái hóa đơn
                capNhatTrangThaiHoaDon(hoaDon);
            } else {
                System.out.println("Chưa nhận được thanh toán từ ngân hàng.");
            }
        } else if (tenPhuongThuc.equalsIgnoreCase("VNPAY")) {
            // Tạo mã QR cho VNPAY với id hóa đơn và tổng tiền
            String qrCodeData = "VNPAY - ID:" + hoaDon.getId() + " - Amount: " + hoaDon.getTienPhaiThanhToan();
            System.out.println("QR Code VNPAY: " + qrCodeData);
            // Logic tạo mã QR cho khách hàng thanh toán
            // Kiểm tra trạng thái thanh toán từ VNPAY
            boolean daThanhToan = kiemTraTrangThaiThanhToanZaloPay("VNPAY", hoaDon.getId());

            if (daThanhToan==true) {
                // Nếu khách hàng đã thanh toán, cập nhật trạng thái hóa đơn
                capNhatTrangThaiHoaDon(hoaDon);
            } else {
                System.out.println("Chưa nhận được thanh toán từ VNPAY.");
            }
        } else if (tenPhuongThuc.equalsIgnoreCase("MoMo")) {
            // Tạo mã QR cho MoMo với id hóa đơn và tổng tiền
            String qrCodeData = "MoMo - ID:" + hoaDon.getId() + " - Amount: " + hoaDon.getTienPhaiThanhToan();
            System.out.println("QR Code MoMo: " + qrCodeData);
            // Logic tạo mã QR cho khách hàng thanh toán bằng MoMo
            // Kiểm tra trạng thái thanh toán từ MoMo
            boolean daThanhToan = kiemTraTrangThaiThanhToanZaloPay("MoMo", hoaDon.getId());

            if (daThanhToan==true) {
                // Nếu khách hàng đã thanh toán, cập nhật trạng thái hóa đơn
                capNhatTrangThaiHoaDon(hoaDon);
            } else {
                System.out.println("Chưa nhận được thanh toán từ MoMo.");
            }
        } else if (tenPhuongThuc.equalsIgnoreCase("ZaloPay")) {
            /// Tạo mã QR cho ZaloPay
            String qrCodeData = generateZaloPayQR(hoaDon);
            System.out.println("QR Code ZaloPay: " + qrCodeData);

            // Kiểm tra trạng thái thanh toán từ ZaloPay
            boolean daThanhToan = kiemTraTrangThaiThanhToanZaloPay("ZaloPay", hoaDon.getId());

            if (daThanhToan==true) {
                capNhatTrangThaiHoaDon(hoaDon);
            } else {
                System.out.println("Chưa nhận được thanh toán từ ZaloPay.");
            }
        } else {
            throw new IllegalArgumentException("Phương thức thanh toán không hợp lệ.");
        }

    }

    @Override
    public HoaDonResponse addSanPhamChiTietToHoaDon(Integer idHoaDon, HoaDonChiTietRequest chiTietRequest) {
        // Tìm hóa đơn theo ID
        HoaDon hoaDon = hoaDonRepo.findById(idHoaDon)
                .orElseThrow(() -> new AppException(ErrorCode.BILL_NOT_FOUND));

        // Tìm sản phẩm chi tiết
        SanPhamChiTiet spct = sanPhamChiTietRepo.findById(chiTietRequest.getIdSpct())
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_DETAIL_NOT_FOUND));

        // Kiểm tra số lượng có đủ để thêm vào hóa đơn không
        if (chiTietRequest.getSoLuong() > spct.getSoLuong()) {
            throw new AppException(ErrorCode.INSUFFICIENT_STOCK); // Kiểm tra nếu không đủ hàng
        }

        // Tìm chi tiết hóa đơn đã tồn tại
        HoaDonChiTiet existingChiTiet = hoaDonChiTietRepo.findByHoaDonAndSanPhamChiTiet(hoaDon, spct);

        if (existingChiTiet != null) {
            // Nếu chi tiết hóa đơn đã tồn tại, cộng thêm số lượng
            existingChiTiet.setSoLuong(existingChiTiet.getSoLuong() + chiTietRequest.getSoLuong());
            existingChiTiet.setDonGia(spct.getDonGia()); // Cập nhật đơn giá (nếu cần thiết)
            existingChiTiet.setTrangThai(false);
            // Cập nhật số lượng trong SPCT
            spct.setSoLuong(spct.getSoLuong() - chiTietRequest.getSoLuong());

            // Lưu lại chi tiết hóa đơn đã cập nhật
            hoaDonChiTietRepo.save(existingChiTiet);
        } else {
            // Nếu chi tiết hóa đơn chưa tồn tại, tạo mới
            HoaDonChiTiet hoaDonChiTiet = new HoaDonChiTiet();
            hoaDonChiTiet.setIdHoaDon(hoaDon); // Liên kết với hóa đơn
            hoaDonChiTiet.setIdSpct(spct); // Liên kết với sản phẩm

            hoaDonChiTiet.setSoLuong(chiTietRequest.getSoLuong());
            hoaDonChiTiet.setDonGia(chiTietRequest.getDonGia() != null ? chiTietRequest.getDonGia() : spct.getDonGia());
            hoaDonChiTiet.setTrangThai(false);

            // Cập nhật số lượng trong SPCT
            spct.setSoLuong(spct.getSoLuong() - chiTietRequest.getSoLuong());

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
        // Cập nhật số lượng sản phẩm chi tiết
        sanPhamChiTietRepo.save(spct); // Lưu thay đổi số lượng SPCT

        // Trả về kết quả
        return converToHoaDonResponse(hoaDon);
    }
    public BigDecimal apDungVoucher(BigDecimal tongTienDonHang, PhieuGiamGia phieuGiamGia) {
        // Kiểm tra điều kiện áp dụng voucher
        if (tongTienDonHang.compareTo(phieuGiamGia.getDieuKienGiamGia()) < 0) {
            throw new AppException(ErrorCode.INVALID_VOUCHER);
        }

        // Tính toán mức giảm giá
        BigDecimal soTienGiam = BigDecimal.ZERO;
        String phantram = "Phần trăm";
        String tienmat = "Tiền mặt";

        if (phantram.equals(phieuGiamGia.getHinhThucGiam())) {
            // Giảm giá theo phần trăm
            soTienGiam = tongTienDonHang.multiply(phieuGiamGia.getMucGiam()).divide(new BigDecimal(100));
            if (soTienGiam.compareTo(phieuGiamGia.getGiamToiDa()) > 0) {
                soTienGiam = phieuGiamGia.getGiamToiDa(); // Giảm giá tối đa
            }
        } else if (tienmat.equals(phieuGiamGia.getHinhThucGiam())) {
            // Giảm giá tiền mặt
            soTienGiam = phieuGiamGia.getMucGiam();
            if (soTienGiam.compareTo(phieuGiamGia.getGiamToiDa()) > 0) {
                soTienGiam = phieuGiamGia.getGiamToiDa();
            }
        }

        // Trả về số tiền được giảm
        return soTienGiam;
    }

    @Override
    public void apPhieuGiamGiaHoaDon(Integer idHoaDon, Integer idPhieuGiamGia) {
        // Lấy thông tin hóa đơn từ idHoaDon
        HoaDon hoaDon = hoaDonRepo.findById(idHoaDon)
                .orElseThrow(() -> new AppException(ErrorCode.BILL_NOT_FOUND));

        // Lấy thông tin phiếu giảm giá từ idPhieuGiamGia
        PhieuGiamGia phieuGiamGia = phieuGiamGiaRepo.findById(idPhieuGiamGia)
                .orElseThrow(() -> new AppException(ErrorCode.VOUCHER_NOT_FOUND));

        // Kiểm tra xem hóa đơn đã có mã giảm giá hay chưa
        if (hoaDon.getIdPhieuGiamGia() != null) {
            throw new AppException(ErrorCode.VOUCHER_IN_BILL);
        }

        // Tính toán số tiền được giảm
        BigDecimal soTienGiam = apDungVoucher(hoaDon.getTongTien(), phieuGiamGia);

        // Cập nhật số tiền được giảm vào hóa đơn
        hoaDon.setTienDuocGiam(soTienGiam);

        // Lưu thông tin phiếu giảm giá đã áp dụng vào hóa đơn
        hoaDon.setIdPhieuGiamGia(phieuGiamGia);

        // Tính lại tiền phải thanh toán
        hoaDon.setTienPhaiThanhToan(hoaDon.getTongTien().subtract(hoaDon.getTienDuocGiam()));
        // Lưu thay đổi hóa đơn vào cơ sở dữ liệu
        hoaDonRepo.save(hoaDon);
    }

    @Override
    public List<HoaDonResponse> getAllTrangThaiTrue() {
        // Lấy tất cả các ChatLieu từ repository
        List<HoaDon> hoaDonList = hoaDonRepo.getAllTrangThaiTrue();
        // Chuyển đổi từ ChatLieu sang ChatLieuResponse
        return hoaDonList.stream()
                .map(this::converToHoaDonResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<HoaDonResponse> getAllTrangThaiFalse() {
        // Lấy tất cả các ChatLieu từ repository
        List<HoaDon> hoaDonList = hoaDonRepo.getAllTrangThaiFalse();
        // Chuyển đổi từ ChatLieu sang ChatLieuResponse
        return hoaDonList.stream()
                .map(this::converToHoaDonResponse)
                .collect(Collectors.toList());
    }

    private HoaDonResponse converToHoaDonResponse(HoaDon hoaDon) {
        HoaDonResponse hoaDonResponse = new HoaDonResponse();
        hoaDonResponse.setId(hoaDon.getId());
        hoaDonResponse.setMa(hoaDon.getMa());
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
