package com.example.shoes.service.impl;

import com.example.shoes.dto.giohangchitiet.request.GioHangChiTietRequest;
import com.example.shoes.dto.giohangchitiet.response.GioHangChiTietResponse;
import com.example.shoes.dto.hoadon.response.HoaDonResponse;
import com.example.shoes.dto.hoadonchitiet.request.HoaDonChiTietRequest;
import com.example.shoes.entity.DiaChi;
import com.example.shoes.entity.GioHang;
import com.example.shoes.entity.GioHangChiTiet;
import com.example.shoes.entity.HoaDon;
import com.example.shoes.entity.HoaDonChiTiet;
import com.example.shoes.entity.KhachHang;
import com.example.shoes.entity.NhanVien;
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
import com.example.shoes.repository.SanPhamChiTietRepo;
import com.example.shoes.service.GioHangChiTietService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.text.NumberFormat;
import java.time.LocalDate;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.Random;
import java.util.stream.Collectors;

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
        hoaDon.setTrangThai(TrangThai.CHO_XAC_NHAN_DON); // Chưa thanh toán
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
            hoaDonChiTiet.setTrangThai(TrangThai.CHO_XAC_NHAN_DON);

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
    public HoaDonResponse muaHangTuGioHangChiTiet(Integer idGioHangChiTiet, HoaDonChiTietRequest request) {
        // Lấy thông tin khách hàng hiện đang đăng nhập
        KhachHang khachHang = getCurrentKhachHang();

        // Lấy danh sách các chi tiết giỏ hàng của khách hàng hiện tại
        List<GioHangChiTiet> gioHangChiTietList = gioHangChiTietRepo.findByKhachHangId(idGioHangChiTiet);

        if (gioHangChiTietList.isEmpty()) {
            throw new AppException(ErrorCode.EMPTY_CART); // Nếu giỏ hàng rỗng, báo lỗi
        }
        // Kiểm tra và lấy địa chỉ mặc định của khách hàng
        DiaChi diaChi = diaChiRepo.getDiaChiByIdKhachHangAndDiaChiMacDinh(khachHang.getId());

        // Tạo mới HoaDon
        HoaDon hoaDon = new HoaDon();
        String maHoaDon = generateMaHoaDon();
        hoaDon.setMa(maHoaDon);
        hoaDon.setIdKhachHang(khachHang);
        hoaDon.setSoDienThoai(khachHang.getSdt());
//        hoaDon.setDiaChiGiaoHang(diaChi != null ? diaChi.getDiaChiChiTiet() : ""); // Nếu không có địa chỉ mặc định
        hoaDon.setPhuongThucGiaoHang("giao hàng nhanh");
        hoaDon.setNgayTao(LocalDate.now());
        hoaDon.setTrangThai(TrangThai.CHO_XAC_NHAN_DON);

        // Khởi tạo các trường tài chính
        hoaDon.setTongTien(BigDecimal.ZERO);
        hoaDon.setTienDuocGiam(BigDecimal.ZERO);
        hoaDon.setTienPhaiThanhToan(BigDecimal.ZERO);
        hoaDon.setTienKhachDua(BigDecimal.ZERO);
        hoaDon.setTienThua(BigDecimal.ZERO);

        // Lưu HoaDon mới
        hoaDonRepo.save(hoaDon);

        // Duyệt qua từng phần tử trong gioHangChiTietList
        for (GioHangChiTiet gioHangChiTiet : gioHangChiTietList) {
            // Lấy thông tin chi tiết sản phẩm (SanPhamChiTiet) từ GioHangChiTiet
            SanPhamChiTiet spct = gioHangChiTiet.getIdSanPhamChiTiet();

            // Kiểm tra số lượng có đủ hay không
            if (gioHangChiTiet.getSoLuong() > spct.getSoLuong()) {
                throw new AppException(ErrorCode.INSUFFICIENT_STOCK);
            }

            // Tạo mới HoaDonChiTiet cho sản phẩm này
            HoaDonChiTiet hoaDonChiTiet = new HoaDonChiTiet();
            hoaDonChiTiet.setIdHoaDon(hoaDon); // Liên kết với HoaDon
            hoaDonChiTiet.setIdSpct(spct); // Liên kết với SanPhamChiTiet
            hoaDonChiTiet.setSoLuong(gioHangChiTiet.getSoLuong());
            hoaDonChiTiet.setDonGia(spct.getDonGia());
            hoaDonChiTiet.setTrangThai(TrangThai.CHO_XAC_NHAN_DON);

            // Lưu HoaDonChiTiet
            hoaDonChiTietRepo.save(hoaDonChiTiet);

            // Cập nhật tổng tiền của HoaDon
            BigDecimal tongTienChiTiet = spct.getDonGia().multiply(BigDecimal.valueOf(gioHangChiTiet.getSoLuong()));
            hoaDon.setTongTien(hoaDon.getTongTien().add(tongTienChiTiet));

            // Cập nhật số lượng tồn kho trong sản phẩm
            spct.setSoLuong(spct.getSoLuong() - gioHangChiTiet.getSoLuong());
            sanPhamChiTietRepo.save(spct); // Lưu lại sản phẩm đã cập nhật
        }

        // Cập nhật lại tiền phải thanh toán cho HoaDon
        hoaDon.setTienPhaiThanhToan(hoaDon.getTongTien().subtract(hoaDon.getTienDuocGiam()));

        // Lưu lại HoaDon đã cập nhật
        hoaDonRepo.save(hoaDon);

        // Chuyển đổi HoaDon thành HoaDonResponse và trả về
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
