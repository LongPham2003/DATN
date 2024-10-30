package com.example.shoes.service.impl;


import com.example.shoes.dto.hoadonchitiet.response.HoaDonChiTietBHRespose;
import com.example.shoes.dto.hoadonchitiet.response.HoaDonChiTietResponse;
import com.example.shoes.entity.HoaDon;
import com.example.shoes.entity.HoaDonChiTiet;
import com.example.shoes.entity.SanPhamChiTiet;
import com.example.shoes.exception.AppException;
import com.example.shoes.exception.ErrorCode;
import com.example.shoes.repository.HoaDonChiTietRepo;
import com.example.shoes.repository.HoaDonRepo;
import com.example.shoes.repository.SanPhamChiTietRepo;
import com.example.shoes.service.HoaDonChiTietService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.text.NumberFormat;
import java.util.List;
import java.util.Locale;

@Service
public class HoaDonChiTietServiceImpl implements HoaDonChiTietService {
    @Autowired
    private HoaDonChiTietRepo hoaDonChiTietRepo;
    @Autowired
    private HoaDonRepo hoaDonRepo;
    @Autowired
    private SanPhamChiTietRepo sanPhamChiTietRepo;

    @Override
    public List<HoaDonChiTietResponse> getAllHoaDonCT() {
        // Lấy tất cả hóa đơn
        List<HoaDonChiTiet> hoaDonChiTiets = hoaDonChiTietRepo.findAll();

        // Chuyển danh sách hóa đơn thành danh sách response
        List<HoaDonChiTietResponse> hoaDonChiTietResponse = hoaDonChiTiets.stream()
                .map(this::converToHoaDonResponse)
                .toList();

        // Trả về danh sách response
        return hoaDonChiTietResponse;
    }

    @Override
    public List<HoaDonChiTietBHRespose> getSPCTByIdHoaDon(Integer idHoaDon) {
        List<HoaDonChiTietBHRespose> hdbh= hoaDonChiTietRepo.getSPCTByIdHoaDon(idHoaDon);
        return hdbh;
    }


    @Override
    public void deleteByIdHoaDonAndIdSpct(Integer idHoaDon, Integer idSpct) {
        // Kiểm tra tồn tại của hóa đơn
        HoaDon hoaDon = hoaDonRepo.findById(idHoaDon)
                .orElseThrow(() -> new AppException(ErrorCode.BILL_NOT_FOUND));

        // Kiểm tra tồn tại của sản phẩm chi tiết trong hóa đơn chi tiết
        HoaDonChiTiet hoaDonChiTiet = hoaDonChiTietRepo.findByHoaDonAndSanPhamChiTiet(hoaDon, sanPhamChiTietRepo.findById(idSpct)
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_DETAIL_NOT_FOUND)));

        // Lấy thông tin sản phẩm chi tiết để cập nhật lại số lượng
        SanPhamChiTiet sanPhamChiTiet = hoaDonChiTiet.getIdSpct();

        // Cộng lại số lượng sản phẩm chi tiết
        sanPhamChiTiet.setSoLuong(sanPhamChiTiet.getSoLuong() + hoaDonChiTiet.getSoLuong());

        // Trừ số tiền từ hóa đơn dựa trên đơn giá và số lượng của sản phẩm chi tiết
        BigDecimal amountToSubtract = hoaDonChiTiet.getDonGia().multiply(BigDecimal.valueOf(hoaDonChiTiet.getSoLuong()));
        hoaDon.setTongTien(hoaDon.getTongTien().subtract(amountToSubtract));
        // Tính lại tiền phải thanh toán: tổng tiền - tiền được giảm
        hoaDon.setTienPhaiThanhToan(hoaDon.getTongTien().subtract(hoaDon.getTienDuocGiam()));
        // Xóa chi tiết hóa đơn
        hoaDonChiTietRepo.deleteByIdHoaDonAndIdSpct(idHoaDon, idSpct);

        // Lưu các thay đổi vào cơ sở dữ liệu
        sanPhamChiTietRepo.save(sanPhamChiTiet);
        hoaDonRepo.save(hoaDon);
    }
//     public List<HoaDonChiTietBHRespose> getSPCTByIdHoaDon(Integer IdhoaDon) {
//         List<HoaDonChiTietBHRespose> hdbh= hoaDonChiTietRepo.getSPCTByIdHoaDon(IdhoaDon);


//         return hdbh;

//     }

    // Phương thức chuyển đổi BigDecimal sang định dạng tiền tệ Việt Nam
    private String formatCurrency(BigDecimal amount) {
        NumberFormat currencyFormat = NumberFormat.getCurrencyInstance(new Locale("vi", "VN"));
        String formatted = currencyFormat.format(amount);
        return formatted.replace("₫", "").trim()+"VNĐ"; // Loại bỏ ký hiệu ₫ và thêm VNĐ
    }
    private HoaDonChiTietBHRespose convertToHDCTBanHangResponse(HoaDonChiTiet hoaDonChiTiet) {
        HoaDonChiTietBHRespose hdbh = new HoaDonChiTietBHRespose();
        hdbh.setId(hoaDonChiTiet.getId());
        hdbh.setIdHoaDon(hoaDonChiTiet.getIdHoaDon().getId());
        hdbh.setIdSpct(hoaDonChiTiet.getIdSpct().getId());
        hdbh.setTenSanPham(hoaDonChiTiet.getIdSpct().getIdSanPham().getTenSanPham());
        hdbh.setMaSPCT(hoaDonChiTiet.getIdSpct().getMa());
        hdbh.setChatLieu(hoaDonChiTiet.getIdSpct().getIdChatLieu().getTen());
        hdbh.setMauSac(hoaDonChiTiet.getIdSpct().getIdMauSac().getTen());
        hdbh.setKichThuoc(hoaDonChiTiet.getIdSpct().getIdKichThuoc().getKichThuoc());
        hdbh.setThuongHieu(hoaDonChiTiet.getIdSpct().getIdThuongHieu().getTen());
        hdbh.setDeGiay(hoaDonChiTiet.getIdSpct().getIdDeGiay().getTen());
        hdbh.setDonGia(formatCurrency(hoaDonChiTiet.getDonGia()));
        hdbh.setSoLuong(hoaDonChiTiet.getSoLuong());
        return hdbh;
    }

    private HoaDonChiTietResponse converToHoaDonResponse(HoaDonChiTiet hoaDonChiTiet) {
        HoaDonChiTietResponse hoaDonChiTietResponse = new HoaDonChiTietResponse();
        hoaDonChiTietResponse.setId(hoaDonChiTiet.getId());
        hoaDonChiTietResponse.setMaHoaDon(hoaDonChiTiet.getIdHoaDon()!=null ? hoaDonChiTiet.getIdHoaDon().getMa() : null);
        hoaDonChiTietResponse.setMaSPCT(hoaDonChiTiet.getIdSpct()!=null ? hoaDonChiTiet.getIdSpct().getMa() : null);
        hoaDonChiTietResponse.setSoLuong(hoaDonChiTiet.getSoLuong());
        hoaDonChiTietResponse.setDonGia(formatCurrency(hoaDonChiTiet.getDonGia()));
        hoaDonChiTietResponse.setTrangThai(hoaDonChiTiet.getTrangThai().getMoTa());
        return hoaDonChiTietResponse;
    }
}