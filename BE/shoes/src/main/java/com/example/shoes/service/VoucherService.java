package com.example.shoes.service;

import com.example.shoes.entity.Voucher;

import java.util.List;
import java.util.Optional;


public interface VoucherService {
    List<Voucher> getAllVouchers();

    Optional<Voucher> getVoucherById(Integer id);

    Voucher saveVoucher(Voucher voucher);

    void deleteVoucher(Integer id);
}
