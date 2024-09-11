package com.example.shoes.service.impl;

import com.example.shoes.entity.Voucher;
import com.example.shoes.repository.VoucherRepository;
import com.example.shoes.service.VoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VoucherServiceImpl implements VoucherService {
    private final VoucherRepository voucherRepository;

    @Autowired
    public VoucherServiceImpl(VoucherRepository voucherRepository) {
        this.voucherRepository = voucherRepository;
    }

    @Override
    public List<Voucher> getAllVouchers() {
        return voucherRepository.findAll();
    }

    @Override
    public Optional<Voucher> getVoucherById(Integer id) {
        return voucherRepository.findById(id);
    }

    @Override
    public Voucher saveVoucher(Voucher voucher) {
        return voucherRepository.save(voucher);
    }

    @Override
    public void deleteVoucher(Integer id) {
        voucherRepository.deleteById(id);
    }
}
