package com.example.shoes.config;

import com.example.shoes.entity.TaiKhoan;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.Collection;
import java.util.Collections;

public class CustomUserDetails implements UserDetails {
    private TaiKhoan taiKhoan;

    public CustomUserDetails(TaiKhoan taiKhoan) {
        this.taiKhoan = taiKhoan;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Mặc định, chúng ta sẽ sử dụng ROLE_USER.
        return Collections.singleton(new SimpleGrantedAuthority(taiKhoan.getRoles()));
    }

    @Override
    public String getPassword() {
        return taiKhoan.getPassword();
    }

    @Override
    public String getUsername() {
        return taiKhoan.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}