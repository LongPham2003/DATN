package com.example.shoes.controller;

import com.example.shoes.entity.Voucher;
import com.example.shoes.service.VoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/voucher")
public class VoucherController {

    private final VoucherService voucherService;

    @Autowired
    public VoucherController(VoucherService voucherService) {
        this.voucherService = voucherService;
    }

    // Get all vouchers
    @GetMapping("/list")
    public ResponseEntity<List<Voucher>> getAllVouchers() {
        List<Voucher> vouchers = voucherService.getAllVouchers();
        return ResponseEntity.ok(vouchers);
    }

    // Get voucher by id
    @GetMapping("/{id}")
    public ResponseEntity<Voucher> getVoucherById(@PathVariable Integer id) {
        Optional<Voucher> voucher = voucherService.getVoucherById(id);
        return voucher.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Create a new voucher
    @PostMapping("/add")
    public ResponseEntity<Voucher> createVoucher(@RequestBody Voucher voucher) {
        Voucher savedVoucher = voucherService.saveVoucher(voucher);
        return ResponseEntity.ok(savedVoucher);
    }

    // Update an existing voucher
    @PutMapping("/update/{id}")
    public ResponseEntity<Voucher> updateVoucher(@PathVariable Integer id, @RequestBody Voucher voucherDetails) {
        Optional<Voucher> existingVoucher = voucherService.getVoucherById(id);
        if (existingVoucher.isPresent()) {
            Voucher voucher = existingVoucher.get();
            voucher.setVoucherCode(voucherDetails.getVoucherCode());
            voucher.setVoucherName(voucherDetails.getVoucherName());
            voucher.setDiscountCondition(voucherDetails.getDiscountCondition());
            voucher.setDiscountAmount(voucherDetails.getDiscountAmount());
            voucher.setStartDate(voucherDetails.getStartDate());
            voucher.setEndDate(voucherDetails.getEndDate());

            Voucher updatedVoucher = voucherService.saveVoucher(voucher);
            return ResponseEntity.ok(updatedVoucher);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete a voucher
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteVoucher(@PathVariable Integer id) {
        voucherService.deleteVoucher(id);
        return ResponseEntity.noContent().build();
    }
}
