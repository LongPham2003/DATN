package com.example.shoes.repository;

import com.example.shoes.entity.Voucher;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VoucherRepository extends JpaRepository<Voucher,Integer> {
}
