package com.example.shoes.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "vouchers")
public class Voucher {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Size(max = 20)
    @NotNull
    @Column(name = "voucher_code", nullable = false, length = 20)
    private String voucherCode;

    @Size(max = 255)
    @NotNull
    @Column(name = "voucher_name", nullable = false)
    private String voucherName;

    @ColumnDefault("0.00")
    @Column(name = "discount_condition", precision = 10, scale = 2)
    private BigDecimal discountCondition;

    @ColumnDefault("0.00")
    @Column(name = "discount_amount", precision = 10, scale = 2)
    private BigDecimal discountAmount;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

}