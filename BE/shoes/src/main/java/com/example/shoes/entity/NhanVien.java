package com.example.shoes.entity;

import com.example.shoes.entity.base.CrudByAt;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;


@Getter
@Setter
@Entity
@Table(name = "nhan_vien")
public class NhanVien extends CrudByAt {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "ma")
    private String ma;


    @Column(name = "ho_ten")
    private String hoTen;

    @Column(name = "email")
    private String email;

    @NotBlank(message = "Số điện thoại không được để trống")
    @Size(min = 10, max = 10, message = "Số điện thoại phải có đúng 10 chữ số")
    @Pattern(regexp = "0[0-9]{9}", message = "Số điện thoại phải bao gồm 10 chữ số và bắt đầu bằng số 0")
    @Column(name = "sdt")
    private String sdt;

    @Column(name = "ngay_sinh")
    @Temporal(TemporalType.DATE)
    Date ngaySinh;

    @Column(name = "gioi_tinh")
    private String gioiTinh;

    @Column(name = "dia_chi")
    private String diaChi;

    @Column(name = "trang_thai")
    Boolean trangThai;

    @OneToOne
    @JoinColumn(name = "id_tai_khoan", referencedColumnName = "id")
    private TaiKhoan taiKhoan;

}