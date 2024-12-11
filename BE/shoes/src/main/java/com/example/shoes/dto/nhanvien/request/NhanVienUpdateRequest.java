package com.example.shoes.dto.nhanvien.request;

import com.example.shoes.entity.TaiKhoan;
import com.example.shoes.enums.Roles;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class NhanVienUpdateRequest
{

    private Integer id;

    private String ma;

    @NotBlank(message = "Họ tên không được để trống")
    private String hoTen;

    @NotBlank(message = "Số điện thoại không được để trống")
    @Size(min = 10, max = 10, message = "Số điện thoại phải có đúng 10 chữ số")
    @Pattern(regexp = "0[0-9]{9}", message = "Số điện thoại phải bao gồm 10 chữ số và bắt đầu bằng số 0")
    private String sdt;

    private String gioiTinh;
    @Email(message = "Không đúng định dạng email")
    private String email;
    @NotBlank(message = "Không được để trống địa chỉ")
    private String diaChi;

    @NotNull(message = "Ngày sinh không được để trống")
    @Past(message = "Ngày sinh không được là ngày trong tương lai")
    @Temporal(TemporalType.DATE)
    private Date ngaySinh;

    private String chucVu;
    @Min(value = 8,message = "Mật khẩu lớn hơn hoặc bằng 8 kí tự")
    private String matKhau;

    private Boolean trangThai;

    private TaiKhoan taiKhoan;
}
