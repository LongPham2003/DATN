package com.example.shoes.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "users")

@FieldDefaults(level = AccessLevel.PRIVATE)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;
    String name;
    String password;
    String email;
    String phone;
    String address;
    Date birthday;
    String gender;
    String verificationCode;
    String image;
    boolean enabled;
    @ManyToMany
    private Set<Role> roles;

    //
    // @Override
    // public Collection<? extends GrantedAuthority> getAuthorities() {
    // return List.of();
    // }
    //
    // @Override
    // public String getUsername() {
    // return this.email;
    // }
    //
    // @Override
    // public boolean isAccountNonExpired() {
    // return true; // Xác định xem tài khoản có hết hạn hay không
    // }
    //
    // @Override
    // public boolean isAccountNonLocked() {
    // return true;// Xác định xem tài khoản có bị khóa hay không
    // }
    //
    // @Override
    // public boolean isCredentialsNonExpired() {
    // return true;// Xác định xem chứng chỉ (mật khẩu) có hết hạn hay không
    // }
    //
    // @Override
    // public boolean isEnabled() {
    // return true;// Xác định xem tài khoản có được kích hoạt hay không
    // }
}
