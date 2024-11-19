package com.example.shoes.service.impl;

import com.example.shoes.dto.giohangchitiet.request.GioHangChiTietRequest;
import com.example.shoes.dto.giohangchitiet.response.GioHangChiTietResponse;
import com.example.shoes.dto.hoadon.request.HoaDonRequest;
import com.example.shoes.dto.hoadon.response.HoaDonResponse;
import com.example.shoes.dto.hoadonchitiet.request.HoaDonChiTietRequest;
import com.example.shoes.dto.vnpay.response.TransactionStatus;
import com.example.shoes.entity.DiaChi;
import com.example.shoes.entity.GioHang;
import com.example.shoes.entity.GioHangChiTiet;
import com.example.shoes.entity.HoaDon;
import com.example.shoes.entity.HoaDonChiTiet;
import com.example.shoes.entity.KhachHang;
import com.example.shoes.entity.NhanVien;
import com.example.shoes.entity.PhuongThucThanhToan;
import com.example.shoes.entity.SanPhamChiTiet;
import com.example.shoes.enums.TrangThai;
import com.example.shoes.exception.AppException;
import com.example.shoes.exception.ErrorCode;
import com.example.shoes.repository.DiaChiRepo;
import com.example.shoes.repository.GioHangChiTietRepo;
import com.example.shoes.repository.GioHangRepo;
import com.example.shoes.repository.HoaDonChiTietRepo;
import com.example.shoes.repository.HoaDonRepo;
import com.example.shoes.repository.KhachHangRepo;
import com.example.shoes.repository.NhanVienRepo;
import com.example.shoes.repository.PhuongThucThanhToanRepo;
import com.example.shoes.repository.SanPhamChiTietRepo;
import com.example.shoes.service.GioHangChiTietService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.math.BigDecimal;
import java.text.NumberFormat;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

@Service
public class GioHangChiTietServiceImpl implements GioHangChiTietService {
    @Autowired
    private GioHangRepo gioHangRepo;
    @Autowired
    private KhachHangRepo khachHangRepo;
    @Autowired
    private GioHangChiTietRepo gioHangChiTietRepo;
    @Autowired
    private SanPhamChiTietRepo sanPhamChiTietRepo;
    @Autowired
    private HoaDonRepo hoaDonRepo;
    @Autowired
    private HoaDonChiTietRepo hoaDonChiTietRepo;
    @Autowired
    private DiaChiRepo diaChiRepo;
    @Autowired
    private PhuongThucThanhToanRepo phuongThucThanhToanRepo;
    @Autowired
    private NhanVienRepo nhanVienRepo;
    private KhachHang getCurrentKhachHang() {
        // Lấy thông tin người dùng hiện tại
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName(); // Tên đăng nhập

        // Tìm nhân viên từ tên đăng nhập
        return khachHangRepo.findByEmail(username)
                .orElseThrow(() -> new AppException(ErrorCode.STAFF)); // Xử lý nếu không tìm thấy nhân viên
    }
    @Override
    @Transactional
    public GioHangChiTietResponse themVaoGioHangChiTiet(GioHangChiTietRequest request) {
        // Lấy thông tin khách hàng hiện tại
        KhachHang khachHang = getCurrentKhachHang();

        // Kiểm tra nếu khách hàng đã có giỏ hàng hay chưa
        GioHang gioHang = gioHangRepo.findByIdKhachHang(khachHang)
                .orElseGet(() -> {
                    // Tạo giỏ hàng mới nếu chưa có
                    GioHang newGioHang = new GioHang();
                    newGioHang.setIdKhachHang(khachHang);
                    newGioHang.setTongSoLuong(0);
                    return gioHangRepo.save(newGioHang);
                });

        // Lấy thông tin chi tiết sản phẩm (SanPhamChiTiet)
        SanPhamChiTiet sanPhamChiTiet = sanPhamChiTietRepo.findById(request.getIdSanPhamChiTiet())
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));

        // Kiểm tra số lượng yêu cầu có hợp lệ không
        if (request.getSoLuong() > sanPhamChiTiet.getSoLuong()) {
            throw new AppException(ErrorCode.INVALID_QUANTITY);
        }

        // Kiểm tra nếu `SanPhamChiTiet` đã tồn tại trong `GioHangChiTiet`
        Optional<GioHangChiTiet> existingGioHangChiTietOpt = gioHangChiTietRepo
                .findByIdGioHangAndIdSanPhamChiTiet(gioHang, sanPhamChiTiet);

        GioHangChiTiet gioHangChiTiet;

        if (existingGioHangChiTietOpt.isPresent()) {
            // Nếu đã tồn tại, tăng số lượng
            gioHangChiTiet = existingGioHangChiTietOpt.get();
            gioHangChiTiet.setSoLuong(gioHangChiTiet.getSoLuong() + request.getSoLuong());
        } else {
            // Nếu chưa tồn tại, tạo mới
            gioHangChiTiet = new GioHangChiTiet();
            gioHangChiTiet.setIdGioHang(gioHang);
            gioHangChiTiet.setIdSanPhamChiTiet(sanPhamChiTiet);
            gioHangChiTiet.setSoLuong(request.getSoLuong());
            gioHangChiTiet.setDonGia(sanPhamChiTiet.getDonGia());
        }

        // Lưu chi tiết giỏ hàng
        gioHangChiTietRepo.save(gioHangChiTiet);

        // Cập nhật tổng số lượng trong giỏ hàng
        gioHang.setTongSoLuong(gioHang.getTongSoLuong() + request.getSoLuong());
        gioHangRepo.save(gioHang);

        // Chuyển đổi thành DTO phản hồi và trả về
        return convertToGioHangChiTietResponse(gioHangChiTiet);
    }

    @Override
    public GioHangChiTietResponse updateGioHangChiTiet(Integer id, GioHangChiTietRequest request) {
        // Tìm chi tiết giỏ hàng theo ID
        GioHangChiTiet gioHangChiTiet = gioHangChiTietRepo.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.CART_DETAIL_NOT_FOUND));

        // Lấy chi tiết sản phẩm
        SanPhamChiTiet sanPhamChiTiet = sanPhamChiTietRepo.findById(request.getIdSanPhamChiTiet())
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));

        // Kiểm tra số lượng yêu cầu
        if (request.getSoLuong() > sanPhamChiTiet.getSoLuong()) {
            throw new AppException(ErrorCode.INVALID_QUANTITY);
        }

        // Cập nhật thông tin chi tiết giỏ hàng
        gioHangChiTiet.setSoLuong(request.getSoLuong());
        gioHangChiTiet.setDonGia(sanPhamChiTiet.getDonGia());

        // Lưu chi tiết giỏ hàng
        gioHangChiTietRepo.save(gioHangChiTiet);

        // Trả về phản hồi
        return convertToGioHangChiTietResponse(gioHangChiTiet);
    }

    @Override
    public GioHangChiTietResponse findByid(Integer id) {
        // Tìm chi tiết giỏ hàng theo ID
        GioHangChiTiet gioHangChiTiet = gioHangChiTietRepo.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.CART_DETAIL_NOT_FOUND));

        // Chuyển đổi và trả về phản hồi
        return convertToGioHangChiTietResponse(gioHangChiTiet);
    }

    @Override
    @Transactional
    public GioHangChiTietResponse deleteGioHangChiTiet(Integer idgiohangchitiet) {
        // Tìm chi tiết giỏ hàng theo ID
        GioHangChiTiet gioHangChiTiet = gioHangChiTietRepo.findById(idgiohangchitiet)
                .orElseThrow(() -> new AppException(ErrorCode.CART_DETAIL_NOT_FOUND));

        // Lấy giỏ hàng tương ứng và cập nhật tổng số lượng
        GioHang gioHang = gioHangChiTiet.getIdGioHang();
        gioHang.setTongSoLuong(gioHang.getTongSoLuong() - gioHangChiTiet.getSoLuong());

        // Xóa chi tiết giỏ hàng
        gioHangChiTietRepo.delete(gioHangChiTiet);
        gioHangRepo.save(gioHang);

        // Trả về phản hồi đã xóa
        return convertToGioHangChiTietResponse(gioHangChiTiet);
    }

    @Override
    public List<GioHangChiTietResponse> getAllGioHangChiTiet() {
        // Lấy tất cả chi tiết giỏ hàng và chuyển đổi thành danh sách phản hồi
        List<GioHangChiTiet> gioHangChiTietList = gioHangChiTietRepo.findAll();
        return gioHangChiTietList.stream()
                .map(this::convertToGioHangChiTietResponse)
                .toList();
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
    public HoaDonResponse muaNgay(Integer idSPCT, HoaDonChiTietRequest chiTietRequest) {
       SanPhamChiTiet spct=sanPhamChiTietRepo.findById(idSPCT).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_DETAIL_NOT_FOUND));
        // Lấy khách hang hiện tại đang đăng nhập
     KhachHang khachHang=getCurrentKhachHang();
        // Tạo hóa đơn mới
        DiaChi diaChi=diaChiRepo.getDiaChiByIdKhachHangAndDiaChiMacDinh(khachHang.getId());
        HoaDon hoaDon = new HoaDon();
        String maHoaDon=generateMaHoaDon();
        hoaDon.setMa(maHoaDon);
        hoaDon.setIdKhachHang(khachHang);
        hoaDon.setSoDienThoai(khachHang.getSdt());
        hoaDon.setDiaChiGiaoHang(diaChi.getDiaChiChiTiet());
        hoaDon.setPhuongThucGiaoHang("giao hang nhanh");
        hoaDon.setNgayTao(LocalDate.now());
        hoaDon.setTrangThai(TrangThai.TAO_MOI); // Chưa thanh toán
        // Khởi tạo tổng tiền, tiền được giảm và tiền phải trả bằng 0
        hoaDon.setTongTien(BigDecimal.ZERO);
        hoaDon.setTienDuocGiam(BigDecimal.ZERO);
        hoaDon.setTienPhaiThanhToan(BigDecimal.ZERO);
        hoaDon.setTienKhachDua(BigDecimal.ZERO);
        hoaDon.setTienThua(BigDecimal.ZERO);
        // Lưu hóa đơn
       hoaDonRepo.save(hoaDon);
        // Kiểm tra số lượng có đủ để thêm vào hóa đơn không
        if (chiTietRequest.getSoLuong() > spct.getSoLuong()) {
            throw new AppException(ErrorCode.INSUFFICIENT_STOCK); // Kiểm tra nếu không đủ hàng
        }
            // tao hoa don chi tiet moi
            HoaDonChiTiet hoaDonChiTiet = new HoaDonChiTiet();
            hoaDonChiTiet.setIdHoaDon(hoaDon); // Liên kết với hóa đơn
            hoaDonChiTiet.setIdSpct(spct); // Liên kết với sản phẩm
            hoaDonChiTiet.setSoLuong(chiTietRequest.getSoLuong());
            hoaDonChiTiet.setDonGia(spct.getDonGia());
            hoaDonChiTiet.setTrangThai(TrangThai.TAO_MOI);

            // Lưu chi tiết hóa đơn
            hoaDonChiTietRepo.save(hoaDonChiTiet);

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

    @Override
    public HoaDonResponse muaHangTuGioHangChiTiet(List<HoaDonChiTietRequest> chiTietRequests) {
        // Lấy thông tin khách hàng hiện đang đăng nhập
        KhachHang khachHang = getCurrentKhachHang();

        // Lấy địa chỉ giao hàng mặc định của khách hàng
        DiaChi diaChi = diaChiRepo.getDiaChiByIdKhachHangAndDiaChiMacDinh(khachHang.getId());

        // Tạo mới HoaDon
        HoaDon hoaDon = new HoaDon();
        hoaDon.setMa(generateMaHoaDon());
        hoaDon.setIdKhachHang(khachHang);
        hoaDon.setSoDienThoai(khachHang.getSdt());
        hoaDon.setDiaChiGiaoHang(diaChi.getDiaChiChiTiet());
        hoaDon.setPhuongThucGiaoHang("giao hàng nhanh");
        hoaDon.setNgayTao(LocalDate.now());
        hoaDon.setTrangThai(TrangThai.TAO_MOI);
        hoaDon.setTongTien(BigDecimal.ZERO);
        hoaDon.setTienDuocGiam(BigDecimal.ZERO);
        hoaDon.setTienPhaiThanhToan(BigDecimal.ZERO);
        hoaDon.setTienKhachDua(BigDecimal.ZERO);
        hoaDon.setTienThua(BigDecimal.ZERO);

        // Lưu HoaDon mới
        hoaDonRepo.save(hoaDon);

        // Khởi tạo tổng tiền
        BigDecimal tongTienHoaDon = BigDecimal.ZERO;

        // Duyệt qua từng chi tiết yêu cầu
        for (HoaDonChiTietRequest request : chiTietRequests) {
            // Kiểm tra sản phẩm chi tiết trong giỏ hàng của khách hàng
            GioHangChiTiet gioHangChiTiet = gioHangChiTietRepo.findByIdGioHang_IdKhachHang_IdAndIdSanPhamChiTiet_Id(
                    khachHang.getId(), request.getIdSpct() // ID sản phẩm chi tiết từ yêu cầu
            ).orElseThrow(() -> new AppException(ErrorCode.ITEM_NOT_FOUND_IN_CART));

            // Lấy thông tin chi tiết sản phẩm (SanPhamChiTiet)
            SanPhamChiTiet spct = gioHangChiTiet.getIdSanPhamChiTiet();

            // Kiểm tra số lượng có đủ hay không
            if (request.getSoLuong() > spct.getSoLuong()) {
                throw new AppException(ErrorCode.INSUFFICIENT_STOCK);
            }

            // Tạo mới HoaDonChiTiet cho sản phẩm này
            HoaDonChiTiet hoaDonChiTiet = new HoaDonChiTiet();
            hoaDonChiTiet.setIdHoaDon(hoaDon);
            hoaDonChiTiet.setIdSpct(spct);
            hoaDonChiTiet.setSoLuong(request.getSoLuong());
            hoaDonChiTiet.setDonGia(spct.getDonGia());
            hoaDonChiTiet.setTrangThai(TrangThai.TAO_MOI);

            // Lưu HoaDonChiTiet
            hoaDonChiTietRepo.save(hoaDonChiTiet);

            // Tính tổng tiền chi tiết và cộng vào tổng tiền của hóa đơn
            BigDecimal tongTienChiTiet = spct.getDonGia().multiply(BigDecimal.valueOf(request.getSoLuong()));
            tongTienHoaDon = tongTienHoaDon.add(tongTienChiTiet);
        }

        // Cập nhật tổng tiền và tiền phải thanh toán cho HoaDon
        hoaDon.setTongTien(tongTienHoaDon);
        hoaDon.setTienPhaiThanhToan(tongTienHoaDon.subtract(hoaDon.getTienDuocGiam()));

        // Lưu lại HoaDon đã cập nhật
        hoaDonRepo.save(hoaDon);

        // Chuyển đổi HoaDon thành HoaDonResponse và trả về
        return converToHoaDonResponse(hoaDon);
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
    public void thanhToan(Integer idHoaDon, HoaDonRequest hoaDonRequest) {
// Tìm hóa đơn
        HoaDon hoaDon = hoaDonRepo.findById(idHoaDon)
                .orElseThrow(() -> new IllegalArgumentException("Hóa đơn không tồn tại."));

        // Kiểm tra phương thức thanh toán
        if (hoaDonRequest == null || hoaDonRequest.getPhuongThucThanhToan() == null) {
            throw new IllegalArgumentException("Phương thức thanh toán không hợp lệ.");
        }

        String tenPhuongThuc = hoaDonRequest.getPhuongThucThanhToan();

        if (tenPhuongThuc.equalsIgnoreCase("Tiền mặt")) {
            // Lưu phương thức thanh toán
            PhuongThucThanhToan phuongThucThanhToan = new PhuongThucThanhToan();
            phuongThucThanhToan.setIdHoaDon(hoaDon);
            phuongThucThanhToan.setTenPhuongThuc(hoaDonRequest.getPhuongThucThanhToan());
            phuongThucThanhToan.setGhiChu("Tiền mặt" + hoaDon.getId() + "sotien" + hoaDon.getTienPhaiThanhToan());
            phuongThucThanhToanRepo.save(phuongThucThanhToan);
            hoaDon.setPhuongThucThanhToan(tenPhuongThuc);
            // Kiểm tra nếu tiền khách đưa lớn hơn hoặc bằng tiền phải thanh toán
            BigDecimal tienKhachDua = hoaDonRequest.getTienKhachDua();
            BigDecimal tienPhaiThanhToan = hoaDon.getTienPhaiThanhToan();

            if (tienKhachDua.compareTo(tienPhaiThanhToan) >= 0) {
                // Thiết lập tiền khách đưa
                hoaDon.setTienKhachDua(tienKhachDua);

                // Tính toán tiền thừa
                BigDecimal tienThua = tienKhachDua.subtract(tienPhaiThanhToan);
                hoaDon.setTienThua(tienThua);
                hoaDon.setTrangThai(TrangThai.CHO_XAC_NHAN_DON);
                // Lưu hóa đơn vào cơ sở dữ liệu
                hoaDonRepo.save(hoaDon);
            } else {
                // Nếu tiền khách đưa không đủ, ném ra ngoại lệ hoặc xử lý lỗi
                throw new AppException(ErrorCode.INSUFFICIENT_PAYMENT);
            }
            // Nếu khách hàng đã thanh toán, cập nhật trạng thái hóa đơn
//            capNhatTrangThaiHoaDon(hoaDon);
        } else if (tenPhuongThuc.equalsIgnoreCase("VNPAY")) {

            // Lấy trạng thái thanh toán
            boolean daThanhToan = kiemTraTrangThaiThanhToanVNPAY("VNPAY", hoaDon.getId());

            if (daThanhToan) {
                // Lưu phương thức thanh toán
                PhuongThucThanhToan phuongThucThanhToan = new PhuongThucThanhToan();
                phuongThucThanhToan.setIdHoaDon(hoaDon);
                phuongThucThanhToan.setTenPhuongThuc(hoaDonRequest.getPhuongThucThanhToan());
                phuongThucThanhToan.setGhiChu("VNPAY " + hoaDon.getId() + " số tiền: " + hoaDon.getTienPhaiThanhToan());
                phuongThucThanhToanRepo.save(phuongThucThanhToan);
                hoaDon.setPhuongThucThanhToan(tenPhuongThuc);
                hoaDonRepo.save(hoaDon);
                // Cập nhật trạng thái hóa đơn
//                capNhatTrangThaiHoaDon(hoaDon);
            } else {
                System.out.println("Chưa nhận được thanh toán từ VNPAY.");
            }

        }  else {
                System.out.println("Chưa nhận được thanh toán từ ZaloPay.");
            }

        }

    @Override
    public HoaDonResponse datHang(Integer idHoaDon, HoaDonRequest hoaDonRequest) {
        return null;
    }
    private NhanVien getCurrentNhanVien() {
        // Lấy thông tin người dùng hiện tại
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName(); // Tên đăng nhập

        // Tìm nhân viên từ tên đăng nhập
        return nhanVienRepo.findByEmail(username)
                .orElseThrow(() -> new AppException(ErrorCode.STAFF)); // Xử lý nếu không tìm thấy nhân viên
    }
    @Override
    public HoaDonResponse nhanVienXacNhan(Integer idHoaDon) {
        HoaDon hoaDon = hoaDonRepo.findById(idHoaDon) .orElseThrow(() -> new AppException(ErrorCode.BILL_NOT_FOUND));
        NhanVien nhanVien=getCurrentNhanVien();
        hoaDon.setIdNhanVien(nhanVien);
        if(!hoaDon.getTrangThai().equals(TrangThai.CHO_XAC_NHAN_DON)){
          throw new AppException(ErrorCode.BILL_NOT_FOUND_h);
        }
        // Lấy danh sách chi tiết hóa đơn
        List<HoaDonChiTiet> chiTietList = hoaDonChiTietRepo.findByIdHoaDon(hoaDon.getId());
        for (HoaDonChiTiet chiTiet : chiTietList) {
            chiTiet.setTrangThai(TrangThai.DA_XAC_NHAN_DON);  // Cập nhật trạng thái thành true
        }
        hoaDonChiTietRepo.saveAll(chiTietList);

        // Cập nhật trạng thái thanh toán của hóa đơn
        hoaDon.setTrangThai(TrangThai.DA_XAC_NHAN_DON);
        hoaDonRepo.save(hoaDon);
        return converToHoaDonResponse(hoaDon);
    }

    private GioHangChiTietResponse convertToGioHangChiTietResponse(GioHangChiTiet gioHangChiTiet) {
        GioHangChiTietResponse response = new GioHangChiTietResponse();
        response.setId(gioHangChiTiet.getId());
        response.setIdGioHang(gioHangChiTiet.getIdGioHang().getId());
        response.setIdSanPhamChiTiet(gioHangChiTiet.getIdSanPhamChiTiet().getId());
        response.setSoLuong(gioHangChiTiet.getSoLuong());
        response.setDonGia(formatCurrency(gioHangChiTiet.getDonGia()));
        return response;
    }
    // Phương thức chuyển đổi BigDecimal sang định dạng tiền tệ Việt Nam
    private String formatCurrency(Object value) {
        if (value == null) return "0 VNĐ"; // Trả về "0 VNĐ" nếu giá trị là null

        if (value instanceof Number) {
            // Chuyển đổi value thành BigDecimal để đảm bảo độ chính xác khi định dạng tiền tệ
            BigDecimal amount = new BigDecimal(((Number) value).toString());

            // Sử dụng NumberFormat để định dạng tiền tệ Việt Nam
            NumberFormat currencyFormat = NumberFormat.getCurrencyInstance(new Locale("vi", "VN"));
            String formatted = currencyFormat.format(amount);

            // Loại bỏ ký hiệu ₫ và thêm VNĐ
            return formatted.replace("₫", "").trim() + " VNĐ";
        } else {
            throw new IllegalArgumentException("Provided value is not a number: " + value);
        }
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
        hoaDonResponse.setTienKhachDua(formatCurrency(hoaDon.getTienKhachDua()));
        hoaDonResponse.setTienThua(formatCurrency(hoaDon.getTienThua()));
        hoaDonResponse.setPhuongThucThanhToan(hoaDon.getPhuongThucThanhToan());
        hoaDonResponse.setPhuongThucGiaoHang(hoaDon.getPhuongThucGiaoHang());
        hoaDonResponse.setNgayTao(hoaDon.getNgayTao());
        hoaDonResponse.setTrangThai(hoaDon.getTrangThai().getMoTa());
        return hoaDonResponse;
    }
}
