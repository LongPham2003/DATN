package com.example.shoes.service.impl;

import com.example.shoes.dto.BaoCaoThongKeResponse;
import com.example.shoes.dto.hoadon.response.HoaDonResponse;
import com.example.shoes.dto.hoadon.response.HoaDonTheoIDResponse;
import com.example.shoes.dto.hoadonchitiet.request.HoaDonChiTietRequest;
import com.example.shoes.dto.phuongthucthanhtoan.request.PhuongThucThanhToanRequest;
import com.example.shoes.dto.vnpay.response.TransactionStatus;
import com.example.shoes.entity.HoaDon;
import com.example.shoes.entity.HoaDonChiTiet;
import com.example.shoes.entity.LichSuHoaDon;
import com.example.shoes.entity.NhanVien;
import com.example.shoes.entity.PhieuGiamGia;
import com.example.shoes.entity.PhuongThucThanhToan;
import com.example.shoes.entity.SanPhamChiTiet;
import com.example.shoes.enums.TrangThai;
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
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Random;
import java.util.TimeZone;
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

    public String generateMaHoaDon() {
        // Lấy mã sản phẩm chi tiết lớn nhất từ database
        String maxMaHoaDon = hoaDonRepo.findMaxMaHoaDon();

        // Tách số thứ tự từ mã sản phẩm chi tiết
        int soThuTu = 0;
        if (maxMaHoaDon != null) {
            soThuTu = Integer.parseInt(maxMaHoaDon.substring(2, 5)); // Bỏ phần "HD" và lấy 3 số tiếp theo
            soThuTu++;
        } else {
            soThuTu = 1; // Nếu chưa có mã nào, bắt đầu từ 001
        }

        // Sinh chuỗi 5 ký tự ngẫu nhiên
        String chuoiNgauNhien = generateRandomString(5);

        // Trả về mã sản phẩm chi tiết mới dạng "HD" + số thứ tự (ít nhất 3 chữ số) + 5 ký tự ngẫu nhiên
        return String.format("HD%03d%s", soThuTu, chuoiNgauNhien);
    }

    // Hàm sinh chuỗi ký tự ngẫu nhiên gồm 5 chữ cái
    private String generateRandomString(int length) {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        Random random = new Random();
        StringBuilder stringBuilder = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            int index = random.nextInt(characters.length());
            stringBuilder.append(characters.charAt(index));
        }

        return stringBuilder.toString();
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
        hoaDon.setTrangThai(TrangThai.CHUA_THANH_TOAN); // Chưa thanh toán

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
    public HoaDonResponse updateHoaDon(Integer idHoaDon, HoaDonChiTietRequest chiTietRequest) {
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
                chiTietMoi.setTrangThai(TrangThai.CHUA_THANH_TOAN);
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

        if (hoaDon.getTrangThai().equals(TrangThai.DA_THANH_TOAN)) {
            throw new RuntimeException("Hóa đơn đã thanh toán, không thể hủy!");
        }

        // Lấy danh sách chi tiết hóa đơn
        List<HoaDonChiTiet> chiTietList = hoaDonChiTietRepo.findByIdHoaDon(idHoaDon);

        // Cập nhật lại số lượng của sản phẩm chi tiết
        for (HoaDonChiTiet chiTiet : chiTietList) {
            SanPhamChiTiet spct = chiTiet.getIdSpct();
            spct.setSoLuong(spct.getSoLuong() + chiTiet.getSoLuong());
            sanPhamChiTietRepo.save(spct); // Lưu lại số lượng sản phẩm chi tiết đã cập nhật
            chiTiet.setTrangThai(TrangThai.HUY_DON);
            hoaDonChiTietRepo.save(chiTiet);
        }
        hoaDon.setTrangThai(TrangThai.HUY_DON);
        // Xóa hóa đơn
        hoaDonRepo.save(hoaDon);
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

    private boolean kiemTraTrangThaiThanhToanMoMo(String phuongThuc, Integer idHoaDon) {

        return true;
    }



    private void capNhatTrangThaiHoaDon(HoaDon hoaDon) {
        // Lấy danh sách chi tiết hóa đơn
        List<HoaDonChiTiet> chiTietList = hoaDonChiTietRepo.findByIdHoaDon(hoaDon.getId());
        for (HoaDonChiTiet chiTiet : chiTietList) {
            chiTiet.setTrangThai(TrangThai.DA_THANH_TOAN);  // Cập nhật trạng thái thành true
        }
        hoaDonChiTietRepo.saveAll(chiTietList);

        // Cập nhật trạng thái thanh toán của hóa đơn
        hoaDon.setTrangThai(TrangThai.DA_THANH_TOAN);
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

    private boolean kiemTraTrangThaiThanhToanVNPAY(String phuongThuc, Integer idHoaDon) {
        HoaDon hoaDon = hoaDonRepo.findById(idHoaDon).orElse(null);
        if (hoaDon == null) return false;

        // Tạo URL endpoint "/payment-infor"
        String paymentInfoUrl = "http://localhost:8080/api/paymentvnpay/payment-infor";

        // Tạo các tham số yêu cầu
        Map<String, String> queryParams = new HashMap<>();
        queryParams.put("vnp_Amount", hoaDon.getTienPhaiThanhToan().multiply(BigDecimal.valueOf(100)).toBigInteger().toString());
        queryParams.put("vnp_BankCode", "NCB"); // Giá trị giả lập hoặc lấy từ thông tin thực tế
        queryParams.put("vnp_OrderInfo", String.valueOf(idHoaDon));
        queryParams.put("vnp_ResponseCode", "00"); // Mã này cần lấy từ phản hồi VNPAY thực tế nếu có

        // Tạo URL với các tham số
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(paymentInfoUrl);
        queryParams.forEach((key, value) -> builder.queryParam(key, value));
        String urlWithParams = builder.toUriString(); // Chuyển URL thành chuỗi
        // Sử dụng RestTemplate để gọi API
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<TransactionStatus> response = restTemplate.getForEntity(builder.toUriString(), TransactionStatus.class);

        // Kiểm tra phản hồi để xác định thanh toán có thành công không
        if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
            TransactionStatus transactionStatus = response.getBody();
            return "OK".equals(transactionStatus.getStatus());
        }

        return false;
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
            hoaDon.setPhuongThucThanhToan(tenPhuongThuc);
            hoaDonRepo.save(hoaDon);
            // Nếu khách hàng đã thanh toán, cập nhật trạng thái hóa đơn
            capNhatTrangThaiHoaDon(hoaDon);
        }  else if (tenPhuongThuc.equalsIgnoreCase("VNPAY")) {

                // Lấy trạng thái thanh toán
                boolean daThanhToan = kiemTraTrangThaiThanhToanVNPAY("VNPAY", hoaDon.getId());

                if (daThanhToan) {
                    // Lưu phương thức thanh toán
                    PhuongThucThanhToan phuongThucThanhToan = new PhuongThucThanhToan();
                    phuongThucThanhToan.setIdHoaDon(hoaDon);
                    phuongThucThanhToan.setTenPhuongThuc(phuongThucThanhToanRequest.getTenPhuongThuc());
                    phuongThucThanhToan.setGhiChu("VNPAY " + hoaDon.getId() + " số tiền: " + hoaDon.getTienPhaiThanhToan());
                    phuongThucThanhToanRepo.save(phuongThucThanhToan);
                    hoaDon.setPhuongThucThanhToan(tenPhuongThuc);
                    hoaDonRepo.save(hoaDon);
                    // Cập nhật trạng thái hóa đơn
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
            boolean daThanhToan = kiemTraTrangThaiThanhToanMoMo("MoMo", hoaDon.getId());

            if (daThanhToan==true) {
                // Lưu phương thức thanh toán
                PhuongThucThanhToan phuongThucThanhToan = new PhuongThucThanhToan();
                phuongThucThanhToan.setIdHoaDon(hoaDon);
                phuongThucThanhToan.setTenPhuongThuc(phuongThucThanhToanRequest.getTenPhuongThuc());
                phuongThucThanhToan.setGhiChu("MoMo" +hoaDon.getId() +"sotien" +hoaDon.getTienPhaiThanhToan());
                phuongThucThanhToanRepo.save(phuongThucThanhToan);
                hoaDon.setPhuongThucThanhToan(tenPhuongThuc);
                hoaDonRepo.save(hoaDon);
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
                // Lưu phương thức thanh toán
                PhuongThucThanhToan phuongThucThanhToan = new PhuongThucThanhToan();
                phuongThucThanhToan.setIdHoaDon(hoaDon);
                phuongThucThanhToan.setTenPhuongThuc(phuongThucThanhToanRequest.getTenPhuongThuc());
                phuongThucThanhToan.setGhiChu("ZaloPay" +hoaDon.getId() +"sotien" +hoaDon.getTienPhaiThanhToan());
                phuongThucThanhToanRepo.save(phuongThucThanhToan);
                hoaDon.setPhuongThucThanhToan(tenPhuongThuc);
                hoaDonRepo.save(hoaDon);
                // Nếu khách hàng đã thanh toán, cập nhật trạng thái hóa đơn
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
            hoaDonChiTiet.setTrangThai(TrangThai.CHUA_THANH_TOAN);

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
        String phantram = "%";
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

        // Kiểm tra số lượng phiếu giảm giá còn khả dụng
        if (phieuGiamGia.getSoLuong() <= 0) {
            throw new AppException(ErrorCode.INVALID_QUANTITY_VOUCHER);
        }

        // Tính toán số tiền được giảm
        BigDecimal soTienGiam = apDungVoucher(hoaDon.getTongTien(), phieuGiamGia);

        // Cập nhật số tiền được giảm vào hóa đơn
        hoaDon.setTienDuocGiam(soTienGiam);

        // Lưu thông tin phiếu giảm giá đã áp dụng vào hóa đơn
        hoaDon.setIdPhieuGiamGia(phieuGiamGia);

        // Tính lại tiền phải thanh toán
        hoaDon.setTienPhaiThanhToan(hoaDon.getTongTien().subtract(hoaDon.getTienDuocGiam()));

        // Giảm số lượng phiếu giảm giá
        phieuGiamGia.setSoLuong(phieuGiamGia.getSoLuong() - 1);

        // Lưu thay đổi vào cơ sở dữ liệu
        phieuGiamGiaRepo.save(phieuGiamGia); // Lưu số lượng phiếu giảm giá đã cập nhật
        hoaDonRepo.save(hoaDon); // Lưu hóa đơn đã cập nhật
    }

    @Override
    public List<HoaDonResponse> getAllTrangThaiDaThanhToan() {
        // Lấy tất cả các ChatLieu từ repository
        List<HoaDon> hoaDonList = hoaDonRepo.getAllTrangThaiDaThanhToan();
        // Chuyển đổi từ ChatLieu sang ChatLieuResponse
        return hoaDonList.stream()
                .map(this::converToHoaDonResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<HoaDonResponse> getAllTrangThaiChuaThanhToan() {
        // Lấy tất cả các ChatLieu từ repository
        List<HoaDon> hoaDonList = hoaDonRepo.getAllTrangThaiChuaThanhToan();
        // Chuyển đổi từ ChatLieu sang ChatLieuResponse
        return hoaDonList.stream()
                .map(this::converToHoaDonResponse)
                .collect(Collectors.toList());
    }

    @Override
    public void xoaPhieuGiamGiaHoaDon(Integer idHoaDon, Integer idPhieuGiamGia) {
        // Lấy thông tin hóa đơn từ idHoaDon
        HoaDon hoaDon = hoaDonRepo.findById(idHoaDon)
                .orElseThrow(() -> new AppException(ErrorCode.BILL_NOT_FOUND));

        // Kiểm tra xem hóa đơn có phiếu giảm giá hay không
        if (hoaDon.getIdPhieuGiamGia() == null) {
            throw new AppException(ErrorCode.VOUCHER_NOT_IN_BILL);
        }

        // Kiểm tra phiếu giảm giá trong hóa đơn có khớp với idPhieuGiamGia đã truyền vào không
        if (!hoaDon.getIdPhieuGiamGia().getId().equals(idPhieuGiamGia)) {
            throw new AppException(ErrorCode.VOUCHER_NOT_IN_BILL); // Báo lỗi nếu phiếu giảm giá không khớp
        }
        // Lấy thông tin phiếu giảm giá
        PhieuGiamGia phieuGiamGia = hoaDon.getIdPhieuGiamGia();

        // Xóa thông tin phiếu giảm giá khỏi hóa đơn
        hoaDon.setIdPhieuGiamGia(null);
        hoaDon.setTienDuocGiam(BigDecimal.ZERO);
        // Tính lại tiền phải thanh toán
        hoaDon.setTienPhaiThanhToan(hoaDon.getTongTien().subtract(hoaDon.getTienDuocGiam()));

        // Tăng số lượng phiếu giảm giá thêm 1
        phieuGiamGia.setSoLuong(phieuGiamGia.getSoLuong() + 1);

        // Lưu thay đổi vào cơ sở dữ liệu
        phieuGiamGiaRepo.save(phieuGiamGia); // Lưu số lượng phiếu giảm giá đã cập nhật
        hoaDonRepo.save(hoaDon); // Lưu hóa đơn đã cập nhật
    }

    @Override
    public HoaDonTheoIDResponse getTheoIdHoaDon(Integer idHoaDon) {
        // Lấy tổng hợp hóa đơn từ repository
        List<Object[]> totals = hoaDonRepo.findTotalsByIdHoaDon(idHoaDon);

        if (totals.isEmpty() || totals.get(0).length != 3) {
            throw new AppException(ErrorCode.BILL_NOT_FOUND);
        }
        // Lấy các giá trị từ Object[]
        Object[] result = totals.get(0);
        BigDecimal tongTien = result[0] != null ? (BigDecimal) result[0] : BigDecimal.ZERO;
        BigDecimal tienDuocGiam = result[1] != null ? (BigDecimal) result[1] : BigDecimal.ZERO;
        BigDecimal tienPhaiThanhToan = result[2] != null ? (BigDecimal) result[2] : BigDecimal.ZERO;
        // Chuyển đổi sang HoaDonTheoIDResponse
        HoaDonTheoIDResponse response = new HoaDonTheoIDResponse();
        response.setTongTien(formatCurrency(tongTien));
        response.setTienDuocGiam(formatCurrency(tienDuocGiam));
        response.setTienPhaiThanhToan(formatCurrency(tienPhaiThanhToan));
        return response;
    }

    @Override
    public List<BaoCaoThongKeResponse> layBaoCaoTaiChinhTheoNgay(LocalDate startDate, LocalDate endDate) {
        List<Object[]> results = hoaDonRepo.layBaoCaoTaiChinhTheoNgay(startDate, endDate);
        return convertToResponse(results);
    }

    @Override
    public List<BaoCaoThongKeResponse> layBaoCaoTaiChinhTheoThang(LocalDate startDate, LocalDate endDate) {
        List<Object[]> results = hoaDonRepo.layBaoCaoTaiChinhTheoThang(startDate, endDate);
        return convertToResponse(results);
    }

    @Override
    public List<BaoCaoThongKeResponse> layBaoCaoTaiChinhTheoNam(LocalDate startDate, LocalDate endDate) {
        List<Object[]> results = hoaDonRepo.layBaoCaoTaiChinhTheoNam(startDate, endDate);
        return convertToResponse(results);
    }

    @Override
    public BaoCaoThongKeResponse layBaoCaoTaiChinhTongQuat() {
        List<Object[]> results = hoaDonRepo.layBaoCaoTaiChinhTongQuoc();
        return convertToSingleResponse(results);
    }

    private HoaDonTheoIDResponse convert(HoaDon hoaDon) {
        HoaDonTheoIDResponse response = new HoaDonTheoIDResponse();
        response.setTongTien(formatCurrency(hoaDon.getTongTien()));
        response.setTienDuocGiam(formatCurrency(hoaDon.getTienDuocGiam()));
        response.setTienPhaiThanhToan(formatCurrency(hoaDon.getTienPhaiThanhToan()));
        return response;
    }
    private List<BaoCaoThongKeResponse> convertToResponse(List<Object[]> results) {
        List<BaoCaoThongKeResponse> responses = new ArrayList<>();
        for (Object[] result : results) {
            BaoCaoThongKeResponse response = new BaoCaoThongKeResponse();

            // Định dạng tiền tệ
            response.setTongTienPhaiThanhToan(formatCurrency((BigDecimal) result[0]));
            response.setChiPhi(formatCurrency((BigDecimal) result[1]));
            response.setLoiNhuan(formatCurrency((BigDecimal) result[2]));
            response.setSoLuongHoaDon(((Number) result[3]).intValue());
            response.setTienDuocGiam(formatCurrency((BigDecimal) result[4]));
            response.setSoLuongKhachHang(((Number) result[5]).intValue());

            // Xử lý ngày tạo
            if (result.length >= 7) { // Kiểm tra xem có đủ phần tử không
                if (result.length == 8 && result[6] instanceof Number) {
                    // Trường hợp theo tháng
                    int year = ((Number) result[6]).intValue();
                    int month = ((Number) result[7]).intValue();
                    response.setNgayTao(LocalDate.of(year, month, 1)); // Ngày đầu tiên của tháng
                } else if (result.length == 7 && result[6] instanceof Number) {
                    // Trường hợp theo năm
                    int year = ((Number) result[6]).intValue();
                    response.setNgayTao(LocalDate.of(year, 1, 1)); // Ngày đầu tiên của năm
                } else if (result[6] instanceof LocalDate) {
                    // Trường hợp theo ngày
                    LocalDate date = (LocalDate) result[6];
                    response.setNgayTao(date);
                } else {
                    throw new ClassCastException("Unexpected type at index 6: " + result[6].getClass());
                }
            }

            responses.add(response);
        }
        return responses;
    }


    private BaoCaoThongKeResponse convertToSingleResponse(List<Object[]> results) {
        if (results.isEmpty()) return new BaoCaoThongKeResponse();

        Object[] result = results.get(0);
        BaoCaoThongKeResponse response = new BaoCaoThongKeResponse();
        // Định dạng tiền tệ
        response.setTongTienPhaiThanhToan(formatCurrency((BigDecimal) result[0]));
        response.setChiPhi(formatCurrency((BigDecimal) result[1]));
        response.setLoiNhuan(formatCurrency((BigDecimal) result[2]));
        response.setSoLuongHoaDon(((Number) result[3]).intValue());
        response.setTienDuocGiam(formatCurrency((BigDecimal) result[4]));
        response.setSoLuongKhachHang(((Number) result[5]).intValue());

        // Xử lý ngày tạo
        if (result.length >= 7) { // Kiểm tra xem có đủ phần tử không
            if (result[6] instanceof LocalDate) {
                response.setNgayTao((LocalDate) result[6]);
            } else if (result[6] instanceof Number) {
                // Trường hợp theo tháng
                int year = ((Number) result[6]).intValue();
                int month = ((Number) result[7]).intValue();
                response.setNgayTao(LocalDate.of(year, month, 1));
            } else {
                throw new ClassCastException("Unexpected type at index 6: " + result[6].getClass());
            }
        }

        return response;
    }

    // Phương thức chuyển đổi BigDecimal sang định dạng tiền tệ Việt Nam
    private String formatCurrency(BigDecimal amount) {
        NumberFormat currencyFormat = NumberFormat.getCurrencyInstance(new Locale("vi", "VN"));
        String formatted = currencyFormat.format(amount);
        return formatted.replace("₫", "").trim()+"VNĐ"; // Loại bỏ ký hiệu ₫ và thêm VNĐ
    }

    private HoaDonResponse converToHoaDonResponse(HoaDon hoaDon) {
        HoaDonResponse hoaDonResponse = new HoaDonResponse();
        hoaDonResponse.setId(hoaDon.getId());
        hoaDonResponse.setMa(hoaDon.getMa());
        hoaDonResponse.setTenNhanVien(hoaDon.getIdNhanVien() != null ? hoaDon.getIdNhanVien().getHoTen() : null);
        hoaDonResponse.setTenKhachHang(hoaDon.getIdKhachHang() != null ? hoaDon.getIdKhachHang().getHoTen() : null);
        hoaDonResponse.setSoDienThoai(hoaDon.getSoDienThoai());
        hoaDonResponse.setDiaChiGiaoHang(hoaDon.getDiaChiGiaoHang());
        // Định dạng và lưu trữ giá trị tiền
        hoaDonResponse.setTongTien(formatCurrency(hoaDon.getTongTien()));
        hoaDonResponse.setTienDuocGiam(formatCurrency(hoaDon.getTienDuocGiam()));
        hoaDonResponse.setTienPhaiThanhToan(formatCurrency(hoaDon.getTienPhaiThanhToan()));
        hoaDonResponse.setPhuongThucThanhToan(hoaDon.getPhuongThucThanhToan());
        hoaDonResponse.setPhuongThucGiaoHang(hoaDon.getPhuongThucGiaoHang());
        hoaDonResponse.setNgayTao(hoaDon.getNgayTao());
        hoaDonResponse.setTrangThai(hoaDon.getTrangThai().getMoTa());
        return hoaDonResponse;
    }
}
