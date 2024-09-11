package com.example.shoes.dto.user.request;

import com.example.shoes.enums.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Set;

@Getter
@Setter
public class UserRequest {
    private String fullName;
    @Size(min = 8, message = "Password phải lớn hơn 8 kí tự")
    private String password;
    private String email;
    private String phone;
    private String address;
    @Temporal(TemporalType.DATE)
    private LocalDate birthday;
    private String gender;
    private String image;
    private boolean status;


    @Enumerated(EnumType.STRING)
    private Role roles;


}
