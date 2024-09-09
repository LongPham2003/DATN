package com.example.shoes.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class User implements UserDetails {
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
    boolean enabled;
    @ManyToMany
    private Set<Role> roles;


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // Xác định xem tài khoản có hết hạn hay không
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;// Xác định xem tài khoản có bị khóa hay không
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;// Xác định xem chứng chỉ (mật khẩu) có hết hạn hay không
    }

    @Override
    public boolean isEnabled() {
        return true;// Xác định xem tài khoản có được kích hoạt hay không
    }
}
