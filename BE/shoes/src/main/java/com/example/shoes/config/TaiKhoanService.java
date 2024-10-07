package com.example.shoes.config;

import com.example.shoes.entity.TaiKhoan;
import com.example.shoes.repository.TaiKhoanRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


/**
 * @author long
 */

@Service
public class TaiKhoanService implements UserDetailsService {

    @Autowired
    private TaiKhoanRepo taiKhoanRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        TaiKhoan taiKhoan = taiKhoanRepo.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("Tài khoản không tồn tại"));

        return new CustomTaiKhoanDetails(taiKhoan);
    }
}

// khi đăng nhập sẽ gọi loadUserBy => nếu có tk sẽ trả về  CustomTaiKhoanDetails