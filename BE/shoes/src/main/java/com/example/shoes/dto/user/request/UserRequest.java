package com.example.shoes.dto.user.request;

import com.example.shoes.entity.Role;
import jakarta.persistence.ManyToMany;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.Set;

@Getter
@Setter
public class UserRequest {
    private String name;
    @Size(min = 8 ,message = "Password phải lớn hơn 8 kí tự")
    private String password;
    private  String email;
    private  String phone;
    private  String address;
    private  Date birthday;
    private  String gender;
    private  boolean enabled;
    private String image;
    @ManyToMany
    private Set<Role> roles;



}
