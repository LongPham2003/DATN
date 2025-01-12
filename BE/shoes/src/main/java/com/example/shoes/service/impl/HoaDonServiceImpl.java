package com.example.shoes.service.impl;

import com.example.shoes.dto.BaoCaoThongKeResponse;

import com.example.shoes.dto.PhanTrangResponse;

import com.example.shoes.dto.hoadon.request.DatHangRequest;
import com.example.shoes.dto.hoadon.request.GhiChu;
import com.example.shoes.dto.hoadon.request.HoaDonRequest;
import com.example.shoes.dto.hoadon.request.HoaDonUpdateAdmin;
import com.example.shoes.dto.hoadon.request.UpdatePhiVanChuyen;
import com.example.shoes.dto.hoadon.request.XacNhanThanhToan;
import com.example.shoes.dto.hoadon.response.HoaDonResponse;
import com.example.shoes.dto.hoadon.response.HoaDonTheoIDKH;
import com.example.shoes.dto.hoadon.response.HoaDonTheoIDResponse;
import com.example.shoes.dto.hoadonchitiet.request.HoaDonChiTietRequest;
import com.example.shoes.dto.payment.PaymentRequest;
import com.example.shoes.dto.sanpham.request.SanPhamTraRequest;
import com.example.shoes.dto.vnpay.response.TransactionStatus;
import com.example.shoes.entity.*;
import com.example.shoes.enums.TrangThai;
import com.example.shoes.exception.AppException;
import com.example.shoes.exception.ErrorCode;
import com.example.shoes.repository.*;
//import com.example.shoes.repository.PhuongThucThanhToanRepo;
import com.example.shoes.service.HoaDonService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.text.NumberFormat;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class HoaDonServiceImpl
        implements HoaDonService
{
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
    private GioHangChiTietRepo gioHangChiTietRepo;

    //    @Autowired
//    private PhuongThucThanhToanRepo phuongThucThanhToanRepo;
    @Autowired
    private PhieuGiamGiaRepo phieuGiamGiaRepo;
    @Autowired
    private HoaDonChiTietRepo hoaDonChiTietRepo;

    private NhanVien getCurrentNhanVien()
    {
        // Lấy thông tin người dùng hiện tại
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName(); // Tên đăng nhập

        // Tìm nhân viên từ tên đăng nhập
        return nhanVienRepo.findByEmail(username)
                .orElseThrow(() -> new AppException(ErrorCode.STAFF)); // Xử lý nếu không tìm thấy nhân viên
    }

    public String generateMaHoaDon()
    {
        // Lấy mã sản phẩm chi tiết lớn nhất từ database
        String maxMaHoaDon = hoaDonRepo.findMaxMaHoaDon();

        // Tách số thứ tự từ mã sản phẩm chi tiết
        int soThuTu = 0;
        if (maxMaHoaDon != null) {
            soThuTu = Integer.parseInt(maxMaHoaDon.substring(2, 5)); // Bỏ phần "HD" và lấy 3 số tiếp theo
            soThuTu++;
        }
        else {
            soThuTu = 1; // Nếu chưa có mã nào, bắt đầu từ 001
        }

        // Sinh chuỗi 5 ký tự ngẫu nhiên
        String chuoiNgauNhien = generateRandomString(5);

        // Trả về mã sản phẩm chi tiết mới dạng "HD" + số thứ tự (ít nhất 3 chữ số) + 5
        // ký tự ngẫu nhiên
        return String.format("HD%03d%s", soThuTu, chuoiNgauNhien);
    }

    // Hàm sinh chuỗi ký tự ngẫu nhiên gồm 5 chữ cái
    private String generateRandomString(int length)
    {
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
    public HoaDonResponse createHoaDon()
    {
        // Lấy nhân viên hiện tại đang đăng nhập
        NhanVien nhanVien = getCurrentNhanVien();

        // Tạo hóa đơn mới
        HoaDon hoaDon = new HoaDon();
        String maHoaDon = generateMaHoaDon();
        hoaDon.setMa(maHoaDon);
        hoaDon.setIdNhanVien(nhanVien);
        hoaDon.setPhuongThucGiaoHang("Tại quầy");
        hoaDon.setTrangThaiDonHang(TrangThai.CHO_XAC_NHAN); // Chưa thanh toán
        hoaDon.setTrangThaiThanhToan(false);

        // Khởi tạo tổng tiền, tiền được giảm và tiền phải trả bằng 0
        hoaDon.setTongTien(BigDecimal.ZERO);
        hoaDon.setTienDuocGiam(BigDecimal.ZERO);
        hoaDon.setTienPhaiThanhToan(BigDecimal.ZERO);
//        hoaDon.setTienKhachDua(BigDecimal.ZERO);
//        hoaDon.setTienThua(BigDecimal.ZERO);
        // Lưu hóa đơn
        HoaDon savedHoaDon = hoaDonRepo.save(hoaDon);
        LichSuHoaDon lichSuHoaDon = new LichSuHoaDon();
        lichSuHoaDon.setIdHoaDon(hoaDon);
        lichSuHoaDon.setMoTa("Đơn hàng được tạo");
        lichSuHoaDon.setTrangThai(TrangThai.CHO_XAC_NHAN);
        lichSuHoaDonRepo.save(lichSuHoaDon);
        // Trả về kết quả
        return converToHoaDonResponse(savedHoaDon);
    }

    @Override
    public HoaDonResponse updateHoaDon(Integer idHoaDon, HoaDonChiTietRequest chiTietRequest)
    { // Tìm hóa đơn theo ID
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

        // kiểm tra đơn giá sản phẩm

        // Tìm chi tiết hóa đơn đã tồn tại
        HoaDonChiTiet existingChiTiet = hoaDonChiTietRepo.findByHoaDonAndSanPhamChiTiet(hoaDon, spct);

        // Tổng tiền hiện tại của hóa đơn
        BigDecimal tongTien = hoaDon.getTongTien();

        // Nếu chi tiết hóa đơn đã tồn tại
        if (existingChiTiet != null) {
            if (!Objects.equals(existingChiTiet.getDonGia(), spct.getDonGia())) {
                throw new AppException(ErrorCode.PRODUCT_DETAIL_NOT_FOUND);
            }

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
        }
        else {
            // Nếu SPCT chưa tồn tại, thêm mới
            if (chiTietRequest.getSoLuong() <= spct.getSoLuong()) {
                HoaDonChiTiet chiTietMoi = new HoaDonChiTiet();
                chiTietMoi.setIdHoaDon(hoaDon);
                chiTietMoi.setIdSpct(spct);
                chiTietMoi.setSoLuong(chiTietRequest.getSoLuong());
                chiTietMoi.setDonGia(spct.getDonGia());
                chiTietMoi.setTrangThai(TrangThai.CHO_XAC_NHAN);
                hoaDonChiTietRepo.save(chiTietMoi);

                // Cập nhật tổng tiền cho sản phẩm mới
                BigDecimal tienMoi = spct.getDonGia().multiply(BigDecimal.valueOf(chiTietRequest.getSoLuong()));
                tongTien = tongTien.add(tienMoi);

                // Trừ số lượng sản phẩm chi tiết
                spct.setSoLuong(spct.getSoLuong() - chiTietRequest.getSoLuong());
                sanPhamChiTietRepo.save(spct); // Lưu thay đổi số lượng SPCT
            }
            else {
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
    public HoaDonResponse findByid(Integer id)
    {
        // Tìm hóa đơn theo ID
        HoaDon hoaDon = hoaDonRepo.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.BILL_NOT_FOUND));

        // Trả về hóa đơn đã tìm thấy
        return converToHoaDonResponse(hoaDon);
    }

    @Override
    public HoaDonResponse deleteHoaDon(Integer idHoaDon)
    {
        // Lấy hóa đơn theo ID
        HoaDon hoaDon = hoaDonRepo.findById(idHoaDon)
                .orElseThrow(() -> new AppException(ErrorCode.BILL_NOT_FOUND));

        // Kiểm tra trạng thái hóa đơn

        if (hoaDon.getTrangThaiDonHang().equals(TrangThai.HOAN_THANH)) {

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
        hoaDon.setTongTien(BigDecimal.ZERO);
        hoaDon.setTienDuocGiam(BigDecimal.ZERO);
        hoaDon.setTienPhaiThanhToan(BigDecimal.ZERO);
//        hoaDon.setTienKhachDua(BigDecimal.ZERO);
//        hoaDon.setTienThua(BigDecimal.ZERO);
        hoaDon.setTrangThaiDonHang(TrangThai.HUY_DON);
        // Xóa hóa đơn
        hoaDonRepo.save(hoaDon);
        return converToHoaDonResponse(hoaDon);
    }

    @Override
    public List<HoaDonResponse> getAllHoaDon()
    {
        // Lấy tất cả hóa đơn
        List<HoaDon> hoaDonList = hoaDonRepo.findAll();

        // Chuyển danh sách hóa đơn thành danh sách response
        List<HoaDonResponse> hoaDonResponses = hoaDonList.stream()
                .map(this::converToHoaDonResponse)
                .toList();

        // Trả về danh sách response
        return hoaDonResponses;
    }

    private boolean kiemTraTrangThaiThanhToanZaloPay(String phuongThuc, Integer idHoaDon)
    {
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
                return true; // Thanh toán thành công
            }
            else {
                return false; // Thanh toán chưa thành công
            }
        }
        catch (Exception e) {
            e.printStackTrace();
            return false; // Có lỗi xảy ra khi kiểm tra thanh toán
        }
    }

    private String generateZaloPayQR(HoaDon hoaDon)
    {
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
        }
        catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    private boolean kiemTraTrangThaiThanhToanMoMo(String phuongThuc, Integer idHoaDon)
    {

        return true;
    }

    private void capNhatTrangThaiHoaDon(HoaDon hoaDon)
    {
        // Lấy danh sách chi tiết hóa đơn
        List<HoaDonChiTiet> chiTietList = hoaDonChiTietRepo.findByIdHoaDon(hoaDon.getId());
        for (HoaDonChiTiet chiTiet : chiTietList) {
            chiTiet.setTrangThai(TrangThai.HOAN_THANH); // Cập nhật trạng thái thành true
        }
        hoaDonChiTietRepo.saveAll(chiTietList);

        // Cập nhật trạng thái thanh toán của hóa đơn
        hoaDon.setTrangThaiDonHang(TrangThai.HOAN_THANH);
        hoaDonRepo.save(hoaDon);

        // Lưu lịch sử hóa đơn
        NhanVien nhanVien = getCurrentNhanVien();
        LichSuHoaDon lichSuHoaDon = new LichSuHoaDon();
        lichSuHoaDon.setIdHoaDon(hoaDon);
        lichSuHoaDon.setMoTa("Thanh toán thành công");
        lichSuHoaDon.setNguoiThucHien(nhanVien.getHoTen());
        lichSuHoaDon.setTrangThai(TrangThai.DA_THANH_TOAN);
        lichSuHoaDonRepo.save(lichSuHoaDon);
        LichSuHoaDon lichSuHoaDon1 = new LichSuHoaDon();
        lichSuHoaDon1.setIdHoaDon(hoaDon);
        lichSuHoaDon1.setMoTa("Hoàn thành");
        lichSuHoaDon1.setNguoiThucHien(nhanVien.getHoTen());
        lichSuHoaDon1.setTrangThai(TrangThai.HOAN_THANH);
        lichSuHoaDonRepo.save(lichSuHoaDon1);
    }

    private boolean kiemTraTrangThaiThanhToanVNPAY(String phuongThuc, Integer idHoaDon)
    {
        HoaDon hoaDon = hoaDonRepo.findById(idHoaDon).orElse(null);
        if (hoaDon == null) {
            return false;
        }

        // Tạo URL endpoint "/payment-infor"
        String paymentInfoUrl = "http://localhost:8080/api/paymentvnpay/payment-infor";

        // Tạo các tham số yêu cầu
        Map<String, String> queryParams = new HashMap<>();
        queryParams.put("vnp_Amount",
                hoaDon.getTienPhaiThanhToan().multiply(BigDecimal.valueOf(100)).toBigInteger().toString());
        queryParams.put("vnp_BankCode", "NCB"); // Giá trị giả lập hoặc lấy từ thông tin thực tế
        queryParams.put("vnp_OrderInfo", String.valueOf(idHoaDon));
        queryParams.put("vnp_ResponseCode", "00"); // Mã này cần lấy từ phản hồi VNPAY thực tế nếu có

        // Tạo URL với các tham số
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(paymentInfoUrl);
        queryParams.forEach((key, value) -> builder.queryParam(key, value));
        String urlWithParams = builder.toUriString(); // Chuyển URL thành chuỗi
        // Sử dụng RestTemplate để gọi API
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<TransactionStatus> response = restTemplate.getForEntity(builder.toUriString(),
                TransactionStatus.class);

        // Kiểm tra phản hồi để xác định thanh toán có thành công không
        if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
            TransactionStatus transactionStatus = response.getBody();
            return "OK".equals(transactionStatus.getStatus());
        }

        return false;
    }

    @Override
    public void thanhToan(Integer idHoaDon, HoaDonRequest hoaDonRequest)
    {
        // Tìm hóa đơn
        HoaDon hoaDon = hoaDonRepo.findById(idHoaDon)
                .orElseThrow(() -> new IllegalArgumentException("Hóa đơn không tồn tại."));

        // Kiểm tra phương thức thanh toán
        if (hoaDonRequest == null || hoaDonRequest.getPhuongThucThanhToan() == null) {
            throw new IllegalArgumentException("Phương thức thanh toán không hợp lệ.");
        }
        hoaDon.setTrangThaiDonHang(TrangThai.HOAN_THANH);
        hoaDon.setTrangThaiThanhToan(true);
        hoaDon.setPhuongThucThanhToan("Tiền mặt");
        // Kiểm tra nếu tiền khách đưa lớn hơn hoặc bằng tiền phải thanh toán
        BigDecimal tienKhachDua = hoaDonRequest.getTienKhachDua();
        BigDecimal tienPhaiThanhToan = hoaDon.getTienPhaiThanhToan();

        if (tienKhachDua.compareTo(tienPhaiThanhToan) >= 0) {
            // Thiết lập tiền khách đưa
//            hoaDon.setTienKhachDua(tienKhachDua);
//
//            // Tính toán tiền thừa
//            BigDecimal tienThua = tienKhachDua.subtract(tienPhaiThanhToan);
//            hoaDon.setTienThua(tienThua);

            // Lưu hóa đơn vào cơ sở dữ liệu
            hoaDonRepo.save(hoaDon);
        }
        else {
            // Nếu tiền khách đưa không đủ, ném ra ngoại lệ hoặc xử lý lỗi
            throw new AppException(ErrorCode.INSUFFICIENT_PAYMENT);
        }
        // Nếu khách hàng đã thanh toán, cập nhật trạng thái hóa đơn
        capNhatTrangThaiHoaDon(hoaDon);
        hoaDonRepo.save(hoaDon);
    }

    @Override
    public HoaDonResponse addSanPhamChiTietToHoaDon(Integer idHoaDon, HoaDonChiTietRequest chiTietRequest)
    {
        // Tìm hóa đơn theo ID
        HoaDon hoaDon = hoaDonRepo.findById(idHoaDon)
                .orElseThrow(() -> new AppException(ErrorCode.BILL_NOT_FOUND));

        // Tìm sản phẩm chi tiết
        SanPhamChiTiet spct = sanPhamChiTietRepo.findById(chiTietRequest.getIdSpct())
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_DETAIL_NOT_FOUND));

//        // Kiểm tra số lượng có đủ để thêm vào hóa đơn không
//        if (chiTietRequest.getSoLuong() > spct.getSoLuong()) {
//            throw new AppException(ErrorCode.INSUFFICIENT_STOCK); // Kiểm tra nếu không đủ hàng
//        }

        // Tìm chi tiết hóa đơn đã tồn tại
        HoaDonChiTiet existingChiTiet = hoaDonChiTietRepo.findByHoaDonAndSanPhamChiTiet(hoaDon, spct);

        if (existingChiTiet != null) {
            if (!Objects.equals(chiTietRequest.getDonGia(), existingChiTiet.getDonGia())) {
                throw new AppException(ErrorCode.PRODUCT_DETAIL_NOT_FOUND);
            }
            // Nếu chi tiết hóa đơn đã tồn tại, cộng thêm số lượng
            existingChiTiet.setSoLuong(existingChiTiet.getSoLuong() + chiTietRequest.getSoLuong());
            existingChiTiet.setDonGia(spct.getDonGia()); // Cập nhật đơn giá (nếu cần thiết)
            // Cập nhật số lượng trong SPCT
            spct.setSoLuong(spct.getSoLuong() - chiTietRequest.getSoLuong());
            // kiểm tra đơn giá sản phẩm

            // Lưu lại chi tiết hóa đơn đã cập nhật
            hoaDonChiTietRepo.save(existingChiTiet);
        }
        else {
            // Nếu chi tiết hóa đơn chưa tồn tại, tạo mới
            HoaDonChiTiet hoaDonChiTiet = new HoaDonChiTiet();
            hoaDonChiTiet.setIdHoaDon(hoaDon); // Liên kết với hóa đơn
            hoaDonChiTiet.setIdSpct(spct); // Liên kết với sản phẩm

            hoaDonChiTiet.setSoLuong(chiTietRequest.getSoLuong());
            hoaDonChiTiet.setDonGia(chiTietRequest.getDonGia() != null ? chiTietRequest.getDonGia() : spct.getDonGia());
            hoaDonChiTiet.setTrangThai(TrangThai.CHO_XAC_NHAN);

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

    public BigDecimal apDungVoucher(BigDecimal tongTienDonHang, PhieuGiamGia phieuGiamGia)
    {
        // Kiểm tra điều kiện áp dụng voucher
        if (tongTienDonHang.compareTo(phieuGiamGia.getDieuKienGiamGia()) < 0) {
            throw new AppException(ErrorCode.INVALID_VOUCHER);
        }

        // Tính toán mức giảm giá
        BigDecimal soTienGiam = BigDecimal.ZERO;
        String phantram = "%";
        String tienmat = "VND";

        if (phantram.equals(phieuGiamGia.getHinhThucGiam())) {
            // Giảm giá theo phần trăm
            soTienGiam = tongTienDonHang.multiply(phieuGiamGia.getMucGiam()).divide(new BigDecimal(100));
            if (soTienGiam.compareTo(phieuGiamGia.getGiamToiDa()) > 0) {
                soTienGiam = phieuGiamGia.getGiamToiDa(); // Giảm giá tối đa
            }
        }
        else if (tienmat.equals(phieuGiamGia.getHinhThucGiam())) {
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
    public void apPhieuGiamGiaHoaDon(Integer idHoaDon, Integer idPhieuGiamGia)
    {
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
    public List<HoaDonResponse> getAllTrangThaiDaThanhToan()
    {
        // Lấy tất cả các ChatLieu từ repository
        List<HoaDon> hoaDonList = hoaDonRepo.getAllTrangThaiDaThanhToan();
        // Chuyển đổi từ ChatLieu sang ChatLieuResponse
        return hoaDonList.stream()
                .map(this::converToHoaDonResponse)
                .collect(Collectors.toList());
    }

    @Override
    public PhanTrangResponse<HoaDonResponse> getHoaDon(int pageNumber, int pageSize, String keyword,
            String phuongThucGiaoHang, String trangThai)
    {

        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize);

        // Gọi phương thức trong hoaDonRepo để lấy dữ liệu phân trang
        Page<HoaDon> hoaDonPage = hoaDonRepo.getAll(pageable, keyword, phuongThucGiaoHang, trangThai);

        // Tạo đối tượng PhanTrangResponse và thiết lập các giá trị
        PhanTrangResponse<HoaDonResponse> phanTrangResponse = new PhanTrangResponse<>();
        phanTrangResponse.setPageNumber(hoaDonPage.getNumber());
        phanTrangResponse.setPageSize(pageSize); // Đúng là pageSize, không phải totalPages
        phanTrangResponse.setTotalPages(hoaDonPage.getTotalPages());
        phanTrangResponse.setTotalElements(hoaDonPage.getTotalElements());
        phanTrangResponse.setResult(hoaDonPage.getContent().stream().map(this::converToHoaDonResponse).toList());

        return phanTrangResponse;
    }

    //dat hang tai quay
    @Override
    public Void updateTrangThaiHoaDonById(Integer idHoaDon, DatHangRequest datHangRequest)
    {

        HoaDon hoaDon = hoaDonRepo.findById(idHoaDon).get();
        hoaDon.setTrangThaiDonHang(TrangThai.DA_XAC_NHAN);
        hoaDon.setPhuongThucGiaoHang("Tại quầy");
        hoaDon.setTienPhaiThanhToan(datHangRequest.getTienPhaiThanhToan());
        hoaDon.setPhiVanChuyen(datHangRequest.getPhiVanChuyen());
        hoaDon.setDiaChiGiaoHang(datHangRequest.getDiaChiChiTiet());
        hoaDon.setNgayDuKien(datHangRequest.getNgayDuKien());
        hoaDon.setSoDienThoai(datHangRequest.getSoDienThoai());
        hoaDon.setTenKhachHang(datHangRequest.getTenKhachHang());
        hoaDon.setTrangThaiThanhToan(false);
        LichSuHoaDon lichSuHoaDonXacNhan = new LichSuHoaDon();
        lichSuHoaDonXacNhan.setIdHoaDon(hoaDon);
        lichSuHoaDonXacNhan.setTrangThai(TrangThai.DA_XAC_NHAN);
        lichSuHoaDonXacNhan.setMoTa("Xác nhận");
        lichSuHoaDonRepo.save(lichSuHoaDonXacNhan);
        hoaDonRepo.save(hoaDon);

        List<HoaDonChiTiet> chiTietList = hoaDonChiTietRepo.findByIdHoaDon(hoaDon.getId());
        for (HoaDonChiTiet chiTiet : chiTietList) {
            chiTiet.setTrangThai(TrangThai.DA_XAC_NHAN); // Cập nhật trạng thái thành true
        }
        hoaDonChiTietRepo.saveAll(chiTietList);
        return null;
    }

    @Override
    public Void xacNhanThanhToan(Integer idHoaDon, XacNhanThanhToan xacNhanThanhToan)
    {
        HoaDon hoaDon = hoaDonRepo.findById(idHoaDon).get();
        hoaDon.setTrangThaiThanhToan(true);
        hoaDon.setTienPhaiThanhToan(xacNhanThanhToan.getTienKhachDua());
        //   hoaDon.setTienKhachDua(xacNhanThanhToan.getTienPhaiThanhToan());
        hoaDon.setPhuongThucThanhToan(xacNhanThanhToan.getPhuongThucThanhToan());
        hoaDonRepo.save(hoaDon);
        LichSuHoaDon lichSuHoaDon = new LichSuHoaDon();
        lichSuHoaDon.setIdHoaDon(hoaDon);
        lichSuHoaDon.setNguoiThucHien(getCurrentNhanVien().getHoTen());
        lichSuHoaDon.setTrangThai(TrangThai.DA_THANH_TOAN);
        lichSuHoaDon.setMoTa(xacNhanThanhToan.getMoTa());
        lichSuHoaDonRepo.save(lichSuHoaDon);
//        if (hoaDon.getPhuongThucGiaoHang().equals("Tại quầy")) {
//            LichSuHoaDon lichSuHoaDon1 = new LichSuHoaDon();
//            lichSuHoaDon1.setIdHoaDon(hoaDon);
//            lichSuHoaDon1.setNguoiThucHien(getCurrentNhanVien().getHoTen());
//            lichSuHoaDon1.setTrangThai(TrangThai.HOAN_THANH);
//            lichSuHoaDon1.setMoTa("Hoàn thành");
//            lichSuHoaDonRepo.save(lichSuHoaDon1);
//        }

        return null;
    }

    @Override
    public List<HoaDonResponse> getAllTrangThaiChuaThanhToan()
    {
        // Lấy tất cả các ChatLieu từ repository
        List<HoaDon> hoaDonList = hoaDonRepo.getAllTrangThaiChuaThanhToan();
        // Chuyển đổi từ ChatLieu sang ChatLieuResponse
        return hoaDonList.stream()
                .map(this::converToHoaDonResponse)
                .collect(Collectors.toList());
    }

    @Override
    public void xoaPhieuGiamGiaHoaDon(Integer idHoaDon, Integer idPhieuGiamGia)
    {
        // Lấy thông tin hóa đơn từ idHoaDon
        HoaDon hoaDon = hoaDonRepo.findById(idHoaDon)
                .orElseThrow(() -> new AppException(ErrorCode.BILL_NOT_FOUND));

        // Kiểm tra xem hóa đơn có phiếu giảm giá hay không
        if (hoaDon.getIdPhieuGiamGia() == null) {
            throw new AppException(ErrorCode.VOUCHER_NOT_IN_BILL);
        }

        // Kiểm tra phiếu giảm giá trong hóa đơn có khớp với idPhieuGiamGia đã truyền
        // vào không
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
    public HoaDonTheoIDResponse getTheoIdHoaDon(Integer idHoaDon)
    {
        // Lấy thông tin tổng hợp hóa đơn
        List<Object[]> totals = hoaDonRepo.findTotalsByIdHoaDon(idHoaDon);
        // Kiểm tra nếu không tìm thấy hóa đơn
        if (totals.isEmpty()) {
            throw new AppException(ErrorCode.BILL_NOT_FOUND);
        }

        Object[] result = totals.get(0);

        // Kiểm tra độ dài của kết quả truy vấn để xác định có đủ trường hay không
        if (result.length != 5) {
            throw new AppException(ErrorCode.BILL_NOT_FOUND_h);
        }

        Integer idKhachHang = result[0] != null ? (Integer) result[0] : null;
        Integer idVoucher = result[1] != null ? (Integer) result[1] : null;
        BigDecimal tongTien = result[2] != null ? (BigDecimal) result[2] : BigDecimal.ZERO;
        BigDecimal tienDuocGiam = result[3] != null ? (BigDecimal) result[3] : BigDecimal.ZERO;
        BigDecimal tienPhaiThanhToan = result[4] != null ? (BigDecimal) result[4] : BigDecimal.ZERO;

        // Chuyển đổi sang HoaDonTheoIDResponse
        HoaDonTheoIDResponse response = new HoaDonTheoIDResponse();
        response.setIdKhachHang(idKhachHang);
        response.setIdVoucher(idVoucher);
        response.setTongTien(formatCurrency(tongTien));
        response.setTienDuocGiam(formatCurrency(tienDuocGiam));
        response.setTienPhaiThanhToan(formatCurrency(tienPhaiThanhToan));
        return response;
    }

    private List<BaoCaoThongKeResponse> convertToResponse(List<Object[]> results)
    {
        List<BaoCaoThongKeResponse> responses = new ArrayList<>();
        for (Object[] result : results) {
            BaoCaoThongKeResponse response = new BaoCaoThongKeResponse();

            // Định dạng tiền tệ
            response.setTongDoanhThu(formatCurrency((BigDecimal) result[0]));
            response.setTongTienDaApDungPhieuGiamGia(formatCurrency((BigDecimal) result[1]));
            response.setSoLuongHoaDon(((Number) result[2]).intValue());
            response.setSoLuongKhachHang(((Number) result[3]).intValue());

            // Xử lý ngày tạo
            if (result.length >= 5) { // Kiểm tra xem có đủ phần tử không
                if (result[4] instanceof LocalDate) {
                    // Trường hợp theo ngày
                    response.setNgayTao((LocalDate) result[4]);
                }
                else if (result[4] instanceof Number) {
                    // Trường hợp theo tháng
                    int year = ((Number) result[4]).intValue();
                    int month = ((Number) result[5]).intValue();
                    response.setNgayTao(LocalDate.of(year, month, 1));
                }
            }

            responses.add(response);
        }
        return responses;
    }

    private BaoCaoThongKeResponse convertToSingleResponse(List<Object[]> results)
    {
        if (results.isEmpty()) {
            return new BaoCaoThongKeResponse();
        }

        Object[] result = results.get(0);
        BaoCaoThongKeResponse response = new BaoCaoThongKeResponse();

        // Định dạng tiền tệ
        response.setTongDoanhThu(formatCurrency((BigDecimal) result[0]));
        response.setTongTienDaApDungPhieuGiamGia(formatCurrency((BigDecimal) result[1]));
        response.setSoLuongHoaDon(((Number) result[2]).intValue());
        response.setSoLuongKhachHang(((Number) result[3]).intValue());

        // Xử lý ngày tạo
        if (result.length >= 7) { // Kiểm tra xem có đủ phần tử không
            if (result[6] instanceof LocalDate) {
                response.setNgayTao((LocalDate) result[6]);
            }
            else if (result[6] instanceof Number) {
                // Trường hợp theo tháng
                int year = ((Number) result[6]).intValue();
                int month = ((Number) result[7]).intValue();
                response.setNgayTao(LocalDate.of(year, month, 1));
            }
            else {
                throw new ClassCastException("Unexpected type at index 6: " + result[6].getClass());
            }
        }

        return response;
    }

    // xuat hoa don
    @Transactional
    public String xuatHoaDon(Integer idHoaDon)
    {
        HoaDon hoaDon = hoaDonRepo.findById(idHoaDon)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy hóa đơn với ID: " + idHoaDon));

        StringBuilder builder = new StringBuilder();
        builder.append("HÓA ĐƠN\n");
        builder.append("Mã hóa đơn: ").append(hoaDon.getMa()).append("\n");
        // builder.append("Khách hàng:
        // ").append(hoaDon.getIdKhachHang().getHoTen()).append("\n");
        // builder.append("Số điện thoại:
        // ").append(hoaDon.getSoDienThoai()).append("\n");
        // builder.append("Địa chỉ giao hàng:
        // ").append(hoaDon.getDiaChiGiaoHang()).append("\n");
        // builder.append("Phương thức thanh toán:
        // ").append(hoaDon.getPhuongThucThanhToan()).append("\n");
        builder.append("\nChi tiết sản phẩm:\n");
        BigDecimal tongTien = BigDecimal.ZERO;
        for (HoaDonChiTiet chiTiet : hoaDon.getHoaDonChiTiets()) {
            builder.append("- Sản phẩm: ").append(chiTiet.getIdSpct().getIdSanPham().getTenSanPham()).append("\n");
            builder.append("  Số lượng: ").append(chiTiet.getSoLuong()).append(" x Đơn giá: ")
                    .append(chiTiet.getDonGia()).append(" = ")
                    .append(chiTiet.getDonGia().multiply(BigDecimal.valueOf(chiTiet.getSoLuong()))).append("\n");
            tongTien = tongTien.add(chiTiet.getDonGia().multiply(BigDecimal.valueOf(chiTiet.getSoLuong())));
        }

        builder.append("\nTổng tiền trước giảm giá: ").append(tongTien).append("\n");
        builder.append("Tiền được giảm: ").append(hoaDon.getTienDuocGiam()).append("\n");
        builder.append("Tổng tiền phải thanh toán: ").append(hoaDon.getTienPhaiThanhToan()).append("\n");
        builder.append("Trạng thái: ").append(hoaDon.getTrangThaiDonHang()).append("\n");

        return builder.toString();
    }

    @Override
    public Integer idHoaDon()
    {
        return hoaDonRepo.idHoaDon();
    }

    @Override
    public Void updateHoaDonById(Integer idHoaDon, PaymentRequest paymentRequest)
    {
        HoaDon hoaDon = hoaDonRepo.findById(idHoaDon).get();
        hoaDon.setTrangThaiDonHang(TrangThai.HOAN_THANH);
        hoaDon.setPhuongThucThanhToan(paymentRequest.getPhuongThucThanhToan());
        // hoaDon.setTienKhachDua(paymentRequest.getTienKhachDua());
        hoaDon.setTrangThaiThanhToan(true);
        hoaDon.setPhuongThucGiaoHang("Tại quầy");
        hoaDonRepo.save(hoaDon);
        List<HoaDonChiTiet> chiTietList = hoaDonChiTietRepo.findByIdHoaDon(hoaDon.getId());
        for (HoaDonChiTiet chiTiet : chiTietList) {
            chiTiet.setTrangThai(TrangThai.HOAN_THANH); // Cập nhật trạng thái thành true
        }
        hoaDonChiTietRepo.saveAll(chiTietList);

        NhanVien nhanVien = getCurrentNhanVien();

        LichSuHoaDon lichSuHoaDon = new LichSuHoaDon();
        lichSuHoaDon.setIdHoaDon(hoaDon);
        lichSuHoaDon.setMoTa("Đã thanh toán");
        lichSuHoaDon.setTrangThai(TrangThai.DA_THANH_TOAN);
        lichSuHoaDon.setNguoiThucHien(nhanVien.getHoTen());
        lichSuHoaDonRepo.save(lichSuHoaDon);

        LichSuHoaDon lichSuHoaDon1 = new LichSuHoaDon();
        lichSuHoaDon1.setTrangThai(TrangThai.HOAN_THANH);
        lichSuHoaDon1.setIdHoaDon(hoaDon);
        lichSuHoaDon1.setMoTa("Hoàn thành");

        lichSuHoaDonRepo.save(lichSuHoaDon1);

        return null;
    }

    @Override
    @Transactional
    public Void updateTrangThaiHoaDonByIdXacNhan(Integer idHoaDon, GhiChu moTa)
    {
        // Lấy hóa đơn từ ID
        HoaDon hoaDon = hoaDonRepo.findById(idHoaDon).get();
        // Cập nhật trạng thái hóa đơn
        hoaDon.setTrangThaiDonHang(TrangThai.DA_XAC_NHAN);
        hoaDonRepo.save(hoaDon);
        // Lưu lịch sử hóa đơn
        LichSuHoaDon lichSuHoaDon = new LichSuHoaDon();
        lichSuHoaDon.setIdHoaDon(hoaDon);
        lichSuHoaDon.setTrangThai(TrangThai.DA_XAC_NHAN);
        lichSuHoaDon.setMoTa(moTa.getGhiChu());
        lichSuHoaDonRepo.save(lichSuHoaDon);

        // Lấy danh sách chi tiết hóa đơn
        List<HoaDonChiTiet> chiTietList = hoaDonChiTietRepo.findByIdHoaDon(hoaDon.getId());

        // Lặp qua danh sách chi tiết hóa đơn để cập nhật
        for (HoaDonChiTiet chiTiet : chiTietList) {
            // Lấy sản phẩm chi tiết
            SanPhamChiTiet sanPhamChiTiet = sanPhamChiTietRepo.findById(chiTiet.getIdSpct().getId())
                    .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_DETAIL_NOT_FOUND));

            // Kiểm tra tồn kho
            if (sanPhamChiTiet.getSoLuong() < chiTiet.getSoLuong()) {
                System.out.println("Không đủ tồn kho: " + sanPhamChiTiet.getSoLuong() + " < " + chiTiet.getSoLuong());
                throw new AppException(ErrorCode.INVALID_QUANTITY);
            }

            // Giảm tồn kho
            sanPhamChiTiet.setSoLuong(sanPhamChiTiet.getSoLuong() - chiTiet.getSoLuong());
            sanPhamChiTietRepo.save(sanPhamChiTiet);

            // Cập nhật trạng thái chi tiết hóa đơn
            chiTiet.setTrangThai(TrangThai.DA_XAC_NHAN);
        }
        hoaDonChiTietRepo.saveAll(chiTietList);

        return null;
    }

    @Override
    public Void updateTrangThaiHoaDonByIdHuy(Integer idHoaDon, GhiChu moTa)
    {
        HoaDon hoaDon = hoaDonRepo.findById(idHoaDon).get();
        if (hoaDon.getTrangThaiDonHang().getMoTa().equals("Chờ Xác Nhận")) {
            hoaDon.setTrangThaiDonHang(TrangThai.HUY_DON);
            if(hoaDon.getTrangThaiThanhToan()){
                LichSuHoaDon lichSuHoaDon1 = new LichSuHoaDon();
                lichSuHoaDon1.setMoTa("Đã hoàn tiền");
                lichSuHoaDon1.setTrangThai(TrangThai.HOAN_TIEN);
                lichSuHoaDon1.setIdHoaDon(hoaDon);
                lichSuHoaDon1.setNguoiThucHien(getCurrentNhanVien().getHoTen());
                lichSuHoaDonRepo.save(lichSuHoaDon1);
                hoaDon.setTrangThaiThanhToan(false);
            }
            hoaDonRepo.save(hoaDon);
            LichSuHoaDon lichSuHoaDon = new LichSuHoaDon();
            lichSuHoaDon.setIdHoaDon(hoaDon);
            lichSuHoaDon.setTrangThai(TrangThai.HUY_DON);
            lichSuHoaDon.setMoTa(moTa.getGhiChu());
            lichSuHoaDonRepo.save(lichSuHoaDon);
            List<HoaDonChiTiet> chiTietList = hoaDonChiTietRepo.findByIdHoaDon(hoaDon.getId());
            for (HoaDonChiTiet chiTiet : chiTietList) {
                chiTiet.setTrangThai(TrangThai.HUY_DON); // Cập nhật trạng thái thành true
            }
            if (hoaDon.getIdPhieuGiamGia() != null) {
                Optional<PhieuGiamGia> phieuGiamGia = phieuGiamGiaRepo.findById(hoaDon.getIdPhieuGiamGia().getId());
                if (phieuGiamGia.isPresent()) {
                    xoaPhieuGiamGiaHoaDon(hoaDon.getId(), hoaDon.getIdPhieuGiamGia().getId());
                }
            }

            hoaDonChiTietRepo.saveAll(chiTietList);
        }
        else if (!hoaDon.getTrangThaiDonHang().getMoTa().equals("Chờ Xác Nhận")) {
            hoaDon.setTrangThaiDonHang(TrangThai.HUY_DON);
            if(hoaDon.getTrangThaiThanhToan()){
                LichSuHoaDon lichSuHoaDon1 = new LichSuHoaDon();
                lichSuHoaDon1.setMoTa("Đã hoàn tiền");
                lichSuHoaDon1.setTrangThai(TrangThai.HOAN_TIEN);
                lichSuHoaDon1.setIdHoaDon(hoaDon);
                lichSuHoaDon1.setNguoiThucHien(getCurrentNhanVien().getHoTen());
                lichSuHoaDonRepo.save(lichSuHoaDon1);
                hoaDon.setTrangThaiThanhToan(false);
            }
            hoaDonRepo.save(hoaDon);
            LichSuHoaDon lichSuHoaDon = new LichSuHoaDon();
            lichSuHoaDon.setIdHoaDon(hoaDon);
            lichSuHoaDon.setTrangThai(TrangThai.HUY_DON);
            lichSuHoaDon.setMoTa(moTa.getGhiChu());
            lichSuHoaDonRepo.save(lichSuHoaDon);
            List<HoaDonChiTiet> chiTietList = hoaDonChiTietRepo.findByIdHoaDon(hoaDon.getId());
            for (HoaDonChiTiet chiTiet : chiTietList) {
                chiTiet.setTrangThai(TrangThai.HUY_DON); // Cập nhật trạng thái thành true
                SanPhamChiTiet sanPhamChiTiet = chiTiet.getIdSpct();
                sanPhamChiTiet.setSoLuong(sanPhamChiTiet.getSoLuong() + chiTiet.getSoLuong());
            }
            if (hoaDon.getIdPhieuGiamGia() != null) {
                Optional<PhieuGiamGia> phieuGiamGia = phieuGiamGiaRepo.findById(hoaDon.getIdPhieuGiamGia().getId());
                if (phieuGiamGia.isPresent()) {
                    xoaPhieuGiamGiaHoaDon(hoaDon.getId(), hoaDon.getIdPhieuGiamGia().getId());
                }
            }

            hoaDonChiTietRepo.saveAll(chiTietList);
        }
        else {
            throw new AppException(ErrorCode.HUY_HANG);
        }

        return null;
    }

    @Override
    public Void updateTrangThaiHoaDonByIdHoanHang(Integer idHoaDon, GhiChu moTa)
    {
        HoaDon hoaDon = hoaDonRepo.findById(idHoaDon).get();
        hoaDon.setTrangThaiDonHang(TrangThai.HOAN_HANG);
        hoaDonRepo.save(hoaDon);
        LichSuHoaDon lichSuHoaDon = new LichSuHoaDon();
        lichSuHoaDon.setIdHoaDon(hoaDon);
        lichSuHoaDon.setTrangThai(TrangThai.HOAN_HANG);
        lichSuHoaDon.setMoTa(moTa.getGhiChu());
        lichSuHoaDonRepo.save(lichSuHoaDon);
        List<HoaDonChiTiet> chiTietList = hoaDonChiTietRepo.findByIdHoaDon(idHoaDon);
        for (HoaDonChiTiet chiTiet : chiTietList) {
            chiTiet.setTrangThai(TrangThai.HOAN_HANG); // Cập nhật trạng thái thành true
        }
        hoaDonChiTietRepo.saveAll(chiTietList);
        return null;
    }

    @Override
    public Void updateTrangThaiHoaDonByIdHoanHangThanhCong(Integer idHoaDon, GhiChu moTa)
    {
        HoaDon hoaDon = hoaDonRepo.findById(idHoaDon).get();
        LichSuHoaDon lichSuHoaDon = new LichSuHoaDon();
        if(hoaDon.getTrangThaiThanhToan()){
            LichSuHoaDon lichSuHoaDon1 = new LichSuHoaDon();
            lichSuHoaDon1.setMoTa("Đã hoàn tiền");
            lichSuHoaDon1.setTrangThai(TrangThai.HOAN_TIEN);
            lichSuHoaDon1.setIdHoaDon(hoaDon);
            lichSuHoaDon1.setNguoiThucHien(getCurrentNhanVien().getHoTen());
            lichSuHoaDonRepo.save(lichSuHoaDon1);
            hoaDon.setTrangThaiThanhToan(false);
        }
        hoaDon.setTrangThaiDonHang(TrangThai.HOAN_HANG_THANH_CONG);
        hoaDonRepo.save(hoaDon);
        lichSuHoaDon.setIdHoaDon(hoaDon);
        lichSuHoaDon.setMoTa(moTa.getGhiChu());
        lichSuHoaDon.setTrangThai(TrangThai.HOAN_HANG_THANH_CONG);
        lichSuHoaDon.setNguoiThucHien(getCurrentNhanVien().getHoTen());

        lichSuHoaDonRepo.save(lichSuHoaDon);
        List<HoaDonChiTiet> chiTietList = hoaDonChiTietRepo.findByIdHoaDon(idHoaDon);
        for (HoaDonChiTiet chiTiet : chiTietList) {
            chiTiet.setTrangThai(TrangThai.HOAN_HANG_THANH_CONG); // Cập nhật trạng thái thành true
            SanPhamChiTiet sanPhamChiTiet = chiTiet.getIdSpct();
            sanPhamChiTiet.setSoLuong(sanPhamChiTiet.getSoLuong() + chiTiet.getSoLuong());
        }
        hoaDonChiTietRepo.saveAll(chiTietList);
        return null;
    }

    @Override
    public Void updateTrangThaiHoaDonByIdChoLayHang(Integer idHoaDon, GhiChu moTa)
    {
        HoaDon hoaDon = hoaDonRepo.findById(idHoaDon).get();
        hoaDon.setTrangThaiDonHang(TrangThai.CHO_LAY_HANG);
        hoaDonRepo.save(hoaDon);
        LichSuHoaDon lichSuHoaDon = new LichSuHoaDon();
        lichSuHoaDon.setIdHoaDon(hoaDon);
        lichSuHoaDon.setTrangThai(TrangThai.CHO_LAY_HANG);
        lichSuHoaDon.setMoTa(moTa.getGhiChu());
        lichSuHoaDonRepo.save(lichSuHoaDon);
//        HoaDonChiTiet hoaDonChiTiet = hoaDonChiTietRepo.findById(idHoaDon).get();
//        hoaDonChiTiet.setTrangThai(TrangThai.CHO_LAY_HANG);
        List<HoaDonChiTiet> chiTietList = hoaDonChiTietRepo.findByIdHoaDon(idHoaDon);
        for (HoaDonChiTiet chiTiet : chiTietList) {
            chiTiet.setTrangThai(TrangThai.CHO_LAY_HANG); // Cập nhật trạng thái thành true
        }
        hoaDonChiTietRepo.saveAll(chiTietList);
        return null;
    }

    @Override
    public Void updateTrangThaiHoaDonByIdChoVanChuyen(Integer idHoaDon, GhiChu moTa)
    {
        HoaDon hoaDon = hoaDonRepo.findById(idHoaDon).get();
        hoaDon.setTrangThaiDonHang(TrangThai.CHO_GIAO_HANG);
        hoaDonRepo.save(hoaDon);
        LichSuHoaDon lichSuHoaDon = new LichSuHoaDon();
        lichSuHoaDon.setIdHoaDon(hoaDon);
        lichSuHoaDon.setTrangThai(TrangThai.CHO_GIAO_HANG);
        lichSuHoaDon.setMoTa(moTa.getGhiChu());
        lichSuHoaDonRepo.save(lichSuHoaDon);
//        HoaDonChiTiet hoaDonChiTiet = hoaDonChiTietRepo.findById(idHoaDon).get();
//        hoaDonChiTiet.setTrangThai(TrangThai.CHO_GIAO_HANG);
        List<HoaDonChiTiet> chiTietList = hoaDonChiTietRepo.findByIdHoaDon(idHoaDon);
        for (HoaDonChiTiet chiTiet : chiTietList) {
            chiTiet.setTrangThai(TrangThai.CHO_GIAO_HANG); // Cập nhật trạng thái thành true
        }
        hoaDonChiTietRepo.saveAll(chiTietList);
        return null;
    }

    @Override
    public Void updateTrangThaiHoaDonByIdGiaoHang(Integer idHoaDon, GhiChu moTa)
    {
        HoaDon hoaDon = hoaDonRepo.findById(idHoaDon).get();
        hoaDon.setTrangThaiDonHang(TrangThai.DANG_GIAO);
        hoaDonRepo.save(hoaDon);
        LichSuHoaDon lichSuHoaDon = new LichSuHoaDon();
        lichSuHoaDon.setIdHoaDon(hoaDon);
        lichSuHoaDon.setTrangThai(TrangThai.DANG_GIAO);
        lichSuHoaDon.setMoTa(moTa.getGhiChu());
        lichSuHoaDonRepo.save(lichSuHoaDon);
//        HoaDonChiTiet hoaDonChiTiet = hoaDonChiTietRepo.findById(idHoaDon).get();
//        hoaDonChiTiet.setTrangThai(TrangThai.DANG_GIAO);
        List<HoaDonChiTiet> chiTietList = hoaDonChiTietRepo.findByIdHoaDon(idHoaDon);
        for (HoaDonChiTiet chiTiet : chiTietList) {
            chiTiet.setTrangThai(TrangThai.DANG_GIAO); // Cập nhật trạng thái thành true
        }
        hoaDonChiTietRepo.saveAll(chiTietList);
        return null;
    }

    @Override
    public Void updateTrangThaiHoaDonByIdThanhCong(Integer idHoaDon, GhiChu moTa)
    {
        HoaDon hoaDon = hoaDonRepo.findById(idHoaDon).get();
        if (hoaDon.getTrangThaiThanhToan()) {
            hoaDon.setTrangThaiDonHang(TrangThai.HOAN_THANH);
            hoaDonRepo.save(hoaDon);
            LichSuHoaDon lichSuHoaDon = new LichSuHoaDon();
            lichSuHoaDon.setIdHoaDon(hoaDon);
            lichSuHoaDon.setTrangThai(TrangThai.HOAN_THANH);
            lichSuHoaDon.setMoTa(moTa.getGhiChu());
            lichSuHoaDonRepo.save(lichSuHoaDon);
            List<HoaDonChiTiet> chiTietList = hoaDonChiTietRepo.findByIdHoaDon(idHoaDon);
            for (HoaDonChiTiet chiTiet : chiTietList) {
                chiTiet.setTrangThai(TrangThai.HOAN_THANH); // Cập nhật trạng thái thành true
            }
            hoaDonChiTietRepo.saveAll(chiTietList);
        }
        else {
            throw new AppException(ErrorCode.CHUA_THANH_TOAN);
        }

        return null;
    }

    private HoaDonTheoIDResponse convert(HoaDon hoaDon)
    {
        HoaDonTheoIDResponse response = new HoaDonTheoIDResponse();
        response.setTongTien(formatCurrency(hoaDon.getTongTien()));
        response.setTienDuocGiam(formatCurrency(hoaDon.getTienDuocGiam()));
        response.setTienPhaiThanhToan(formatCurrency(hoaDon.getTienPhaiThanhToan()));
        return response;
    }

    // add khách hàng vào hóa đơn
    @Override
    public HoaDonResponse addKhachHangHoaDon(Integer idHoaDon, Integer idKhachHang)
    {
        // Lấy thông tin hóa đơn từ idHoaDon
        HoaDon hoaDon = hoaDonRepo.findById(idHoaDon)
                .orElseThrow(() -> new AppException(ErrorCode.BILL_NOT_FOUND));

        // Lấy thông tin phiếu giảm giá từ idPhieuGiamGia
        KhachHang khachHang = khachHangRepo.findById(idKhachHang)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        // Lưu thông tin khach hang vao hoa don
        hoaDon.setIdKhachHang(khachHang);

        return converToHoaDonResponse(hoaDonRepo.save(hoaDon)); // Lưu hóa đơn đã cập nhật
    }

    @Override
    public HoaDonResponse xoaKhachHangHoaDon(Integer idHoaDon, Integer idKhachHang)
    {

        HoaDon hoaDon = hoaDonRepo.findById(idHoaDon)
                .orElseThrow(() -> new AppException(ErrorCode.BILL_NOT_FOUND));

        hoaDon.setIdKhachHang(null);

        return converToHoaDonResponse(hoaDonRepo.save(hoaDon)); // Lưu hóa đơn đã cập nhật
    }

    // Phương thức chuyển đổi BigDecimal sang định dạng tiền tệ Việt Nam
    private String formatCurrency(Object value)
    {
        if (value == null) {
            return "0 VNĐ"; // Trả về "0 VNĐ" nếu giá trị là null
        }

        if (value instanceof Number) {
            // Chuyển đổi value thành BigDecimal để đảm bảo độ chính xác khi định dạng tiền
            // tệ
            BigDecimal amount = new BigDecimal(((Number) value).toString());

            // Sử dụng NumberFormat để định dạng tiền tệ Việt Nam
            NumberFormat currencyFormat = NumberFormat.getCurrencyInstance(new Locale("vi", "VN"));
            String formatted = currencyFormat.format(amount);

            // Loại bỏ ký hiệu ₫ và thêm VNĐ
            return formatted.replace("₫", "").trim() + " VNĐ";
        }
        else {
            throw new IllegalArgumentException("Provided value is not a number: " + value);
        }
    }

    private HoaDonResponse converToHoaDonResponse(HoaDon hoaDon)
    {
        HoaDonResponse hoaDonResponse = new HoaDonResponse();
        hoaDonResponse.setId(hoaDon.getId());
        hoaDonResponse.setMa(hoaDon.getMa());
        hoaDonResponse.setTenNhanVien(hoaDon.getIdNhanVien() != null ? hoaDon.getIdNhanVien().getHoTen() : null);
        hoaDonResponse
                .setTenKhachHang(hoaDon.getIdKhachHang() != null ? hoaDon.getTenKhachHang() : "Khách lẻ");

        hoaDonResponse.setSoDienThoai(hoaDon.getIdKhachHang() != null ? hoaDon.getSoDienThoai() : "Không có");

        hoaDonResponse.setDiaChiGiaoHang(hoaDon.getDiaChiGiaoHang());
        // Định dạng và lưu trữ giá trị tiền
        hoaDonResponse.setTongTien(formatCurrency(hoaDon.getTongTien()));
        hoaDonResponse.setTienDuocGiam(formatCurrency(hoaDon.getTienDuocGiam()));
        hoaDonResponse.setTienPhaiThanhToan(formatCurrency(hoaDon.getTienPhaiThanhToan()));
        //  hoaDonResponse.setTienKhachDua(formatCurrency(hoaDon.getTienKhachDua()));
        //  hoaDonResponse.setTienThua(formatCurrency(hoaDon.getTienThua()));
        hoaDonResponse.setPhuongThucThanhToan(hoaDon.getPhuongThucThanhToan());
        hoaDonResponse.setPhuongThucGiaoHang(hoaDon.getPhuongThucGiaoHang());
        hoaDonResponse.setNgayTao(hoaDon.getCreatedAt());
        hoaDonResponse.setTrangThaiDonHang(hoaDon.getTrangThaiDonHang().getMoTa());
        hoaDonResponse.setTrangThaiThanhToan(hoaDon.getTrangThaiThanhToan() ? "Đã thanh toán" : "Chưa thanh toán");
        hoaDonResponse.setTienShip(formatCurrency(hoaDon.getPhiVanChuyen()));
        hoaDonResponse.setIdPhieuGiamGia(
                hoaDon.getIdPhieuGiamGia() != null ? hoaDon.getIdPhieuGiamGia().getId() : null);
        hoaDonResponse.setPhieuGiamGia(
                hoaDon.getIdPhieuGiamGia() != null ? hoaDon.getIdPhieuGiamGia().getMa() : "Không có");
        return hoaDonResponse;
    }

    @Override
    public List<HoaDonTheoIDKH> getHoaDonTheoKH(Integer idKhachHang, String maHD, String trangThaiDonHang, String ngay)
    {
        List<HoaDonTheoIDKH> list = hoaDonRepo.getHoaDonTheoKH(idKhachHang, maHD, trangThaiDonHang, ngay);
        return list;
    }

    @Override
    public HoaDonResponse traHang(Integer idHoaDon, List<SanPhamTraRequest> sanPhamTraList)
    {
        // Tìm hóa đơn
        HoaDon hoaDon = hoaDonRepo.findById(idHoaDon)
                .orElseThrow(() -> new RuntimeException("Hóa đơn không tồn tại"));

        // Chỉ cho phép trả hàng nếu hóa đơn có trạng thái hoàn thành
        if (!hoaDon.getTrangThaiDonHang().equals(TrangThai.HOAN_THANH)) {
            throw new RuntimeException("Chỉ có thể trả hàng cho hóa đơn đã hoàn thành");
        }

        // Biến lưu tổng tiền hoàn trả
        BigDecimal tongTienTraLai = BigDecimal.ZERO;

        // Duyệt qua từng sản phẩm trong danh sách trả hàng
        for (SanPhamTraRequest sanPhamTra : sanPhamTraList) {
            Integer idSpct = sanPhamTra.getIdSpct();
            Integer soLuongTra = sanPhamTra.getSoLuongTra();

            // Tìm chi tiết hóa đơn tương ứng với sản phẩm
            List<HoaDonChiTiet> chiTietList = hoaDonChiTietRepo.findByIdHoaDon_IdAndIdSpct_Id(idHoaDon, idSpct);

            // Kiểm tra danh sách rỗng
            if (chiTietList.isEmpty()) {
                throw new RuntimeException("Sản phẩm không tồn tại trong hóa đơn");
            }

            // Lấy phần tử đầu tiên từ danh sách
            HoaDonChiTiet chiTiet = chiTietList.get(0);

            // Kiểm tra nếu số lượng trả lớn hơn số lượng đã mua
            if (soLuongTra > chiTiet.getSoLuong()) {
                throw new RuntimeException("Số lượng trả hàng vượt quá số lượng đã mua cho sản phẩm ID: " + idSpct);
            }

            // Cập nhật số lượng sản phẩm trong kho
            SanPhamChiTiet sanPhamChiTiet = sanPhamChiTietRepo.findById(idSpct)
                    .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_DETAIL_NOT_FOUND));
            sanPhamChiTiet.setSoLuong(sanPhamChiTiet.getSoLuong() + soLuongTra);
            sanPhamChiTietRepo.save(sanPhamChiTiet);

            // Cập nhật số lượng trong chi tiết hóa đơn
            chiTiet.setSoLuong(chiTiet.getSoLuong() - soLuongTra);

            if (chiTiet.getSoLuong() == 0) {
                hoaDonChiTietRepo.delete(chiTiet); // Xóa nếu số lượng bằng 0
            }
            else {
                hoaDonChiTietRepo.save(chiTiet); // Cập nhật số lượng mới
            }

            // Tính tiền hoàn trả cho sản phẩm
            BigDecimal tienTraLai = chiTiet.getDonGia().multiply(new BigDecimal(soLuongTra));
            tongTienTraLai = tongTienTraLai.add(tienTraLai);
        }

        // Cập nhật tổng tiền hóa đơn
        hoaDon.setTongTien(hoaDon.getTongTien().subtract(tongTienTraLai));
        hoaDon.setTienPhaiThanhToan(hoaDon.getTienPhaiThanhToan().subtract(tongTienTraLai));

        // Cập nhật trạng thái hóa đơn
        if (hoaDonChiTietRepo.findByIdHoaDon(hoaDon.getId()).isEmpty()) {
            hoaDon.setTrangThaiDonHang(TrangThai.HOAN_TRA); // Trả hết sản phẩm
        }
        else {
            hoaDon.setTrangThaiDonHang(TrangThai.TRA_HANG); // Trả một phần
        }

        // Lưu hóa đơn
        HoaDon hoaDonUpdated = hoaDonRepo.save(hoaDon);
        return converToHoaDonResponse(hoaDonUpdated);
    }

    // cập nhật tổng tiền khi thay đổi thông tin khách hàng
    @Override
    public Void updateHoaDonAdmin(Integer id, HoaDonUpdateAdmin hoaDonUpdateAdmin)
    {
        HoaDon hoaDon = hoaDonRepo.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.BILL_NOT_FOUND));
        hoaDon.setTenKhachHang(hoaDonUpdateAdmin.getTenKhachHang());
        hoaDon.setSoDienThoai(hoaDonUpdateAdmin.getSoDienThoai());
        hoaDon.setDiaChiGiaoHang(hoaDonUpdateAdmin.getDiaChiGiaoHang());
        hoaDon.setPhiVanChuyen(hoaDonUpdateAdmin.getPhiVanChuyen());
        hoaDon.setNgayDuKien(hoaDonUpdateAdmin.getNgayDuKien());
        hoaDon.setTienPhaiThanhToan(
                hoaDon.getTongTien().add(hoaDonUpdateAdmin.getPhiVanChuyen()).subtract(hoaDon.getTienDuocGiam()));
        hoaDonRepo.save(hoaDon);

        return null;
    }

    //cập nhật lại tiền ship và tiền thanh toán khi thay đổi số lượng sản phẩm
    @Override
    public Void updatePhiGiaoHang(Integer id, UpdatePhiVanChuyen request)
    {
        HoaDon hoaDon = hoaDonRepo.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.BILL_NOT_FOUND));
        hoaDon.setPhiVanChuyen(request.getPhiVanChuyen());
        hoaDon.setTienPhaiThanhToan(
                hoaDon.getTongTien().subtract(hoaDon.getTienDuocGiam()).add(request.getPhiVanChuyen()));
        hoaDonRepo.save(hoaDon);
        return null;
    }

    @Override
    public Void updateQuayLaiTrangThaiTruoc(Integer id, GhiChu moTa)
    {
        HoaDon hoaDon = hoaDonRepo.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.BILL_NOT_FOUND));
        if (hoaDon.getTrangThaiDonHang().getMoTa().equals("Đã xác nhận đơn")) {
            hoaDon.setTrangThaiDonHang(TrangThai.CHO_XAC_NHAN);
            LichSuHoaDon lichSuHoaDon = new LichSuHoaDon();
            lichSuHoaDon.setIdHoaDon(hoaDon);
            lichSuHoaDon.setTrangThai(TrangThai.CHO_XAC_NHAN);
            lichSuHoaDon.setMoTa(moTa.getGhiChu());
            lichSuHoaDonRepo.save(lichSuHoaDon);
            List<HoaDonChiTiet> chiTietList = hoaDonChiTietRepo.findByIdHoaDon(hoaDon.getId());
            for (HoaDonChiTiet chiTiet : chiTietList) {
                chiTiet.setTrangThai(TrangThai.HUY_DON); // Cập nhật trạng thái thành true
                SanPhamChiTiet sanPhamChiTiet = chiTiet.getIdSpct();
                sanPhamChiTiet.setSoLuong(sanPhamChiTiet.getSoLuong() + chiTiet.getSoLuong());
            }
            hoaDonChiTietRepo.saveAll(chiTietList);
        }
        else if (hoaDon.getTrangThaiDonHang().getMoTa().equals("Chờ lấy hàng")) {
            hoaDon.setTrangThaiDonHang(TrangThai.DA_XAC_NHAN);
            LichSuHoaDon lichSuHoaDon = new LichSuHoaDon();
            lichSuHoaDon.setIdHoaDon(hoaDon);
            lichSuHoaDon.setTrangThai(TrangThai.DA_XAC_NHAN);
            lichSuHoaDon.setMoTa(moTa.getGhiChu());
            lichSuHoaDonRepo.save(lichSuHoaDon);
        }
        else if (hoaDon.getTrangThaiDonHang().getMoTa().equals("Chờ đơn vị vẫn chuyển")) {
            hoaDon.setTrangThaiDonHang(TrangThai.CHO_LAY_HANG);
            LichSuHoaDon lichSuHoaDon = new LichSuHoaDon();
            lichSuHoaDon.setIdHoaDon(hoaDon);
            lichSuHoaDon.setTrangThai(TrangThai.CHO_LAY_HANG);
            lichSuHoaDon.setMoTa(moTa.getGhiChu());
            lichSuHoaDonRepo.save(lichSuHoaDon);
        }
        else if (hoaDon.getTrangThaiDonHang().getMoTa().equals("Đơn đang trên đường giao hàng")) {
            hoaDon.setTrangThaiDonHang(TrangThai.CHO_GIAO_HANG);
            LichSuHoaDon lichSuHoaDon = new LichSuHoaDon();
            lichSuHoaDon.setIdHoaDon(hoaDon);
            lichSuHoaDon.setTrangThai(TrangThai.CHO_GIAO_HANG);
            lichSuHoaDon.setMoTa(moTa.getGhiChu());
            lichSuHoaDonRepo.save(lichSuHoaDon);
        }
        else if (hoaDon.getTrangThaiDonHang().getMoTa().equals("Chờ xác nhận thanh toán")) {
            hoaDon.setTrangThaiDonHang(TrangThai.DANG_GIAO);
            LichSuHoaDon lichSuHoaDon = new LichSuHoaDon();
            lichSuHoaDon.setIdHoaDon(hoaDon);
            lichSuHoaDon.setTrangThai(TrangThai.DANG_GIAO);
            lichSuHoaDon.setMoTa(moTa.getGhiChu());
            lichSuHoaDonRepo.save(lichSuHoaDon);
        }
        else if (hoaDon.getTrangThaiDonHang().getMoTa().equals("Đã thanh toán")) {
            hoaDon.setTrangThaiDonHang(TrangThai.XAC_NHAN_THANH_TOAN);
            LichSuHoaDon lichSuHoaDon = new LichSuHoaDon();
            lichSuHoaDon.setIdHoaDon(hoaDon);
            lichSuHoaDon.setTrangThai(TrangThai.XAC_NHAN_THANH_TOAN);
            lichSuHoaDon.setMoTa(moTa.getGhiChu());
            lichSuHoaDonRepo.save(lichSuHoaDon);
        }
        else if (hoaDon.getTrangThaiDonHang().getMoTa().equals("Hoàn thành")) {
            hoaDon.setTrangThaiDonHang(TrangThai.DA_THANH_TOAN);
            LichSuHoaDon lichSuHoaDon = new LichSuHoaDon();
            lichSuHoaDon.setIdHoaDon(hoaDon);
            lichSuHoaDon.setTrangThai(TrangThai.DA_THANH_TOAN);
            lichSuHoaDon.setMoTa(moTa.getGhiChu());
            lichSuHoaDonRepo.save(lichSuHoaDon);
        }
        else if (hoaDon.getTrangThaiDonHang().getMoTa().equals("Hoàn hàng")) {
            hoaDon.setTrangThaiDonHang(TrangThai.DANG_GIAO);
            LichSuHoaDon lichSuHoaDon = new LichSuHoaDon();
            lichSuHoaDon.setIdHoaDon(hoaDon);
            lichSuHoaDon.setTrangThai(TrangThai.DANG_GIAO);
            lichSuHoaDon.setMoTa(moTa.getGhiChu());
            lichSuHoaDonRepo.save(lichSuHoaDon);
        }
        else {
            throw new AppException(ErrorCode.QUAY_LAI);
        }

        return null;
    }

    @Transactional
    void deleteAtNight()
    {
        hoaDonRepo.deleteByLichSuHoaDon();
        hoaDonRepo.deleteByHoaDonChiTiet();
        hoaDonRepo.deleteByHoaDonTaiQuay();
    }

    // Gọi hàm deleteByHoaDonTaiQuay() vào lúc 12h đêm mỗi ngày
    @Scheduled(cron = "0 0 0 * * ?")
    public void deleteHoaDonAtMidnight()
    {
        deleteAtNight();
    }
}