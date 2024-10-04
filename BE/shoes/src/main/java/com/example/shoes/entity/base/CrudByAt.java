package com.example.shoes.entity.base;

import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import lombok.Getter;
import lombok.Setter;
import org.apache.catalina.security.SecurityUtil;

import java.time.Instant;

@Getter
@Setter
public class CrudByAt {
    private Instant createdAt;
    private Instant updatedAt;
    private String createdBy;
    private String updatedBy;

//    @PrePersist
//    public void handleBeforCreate() {
//        createdBy = SecurityUtil.getCurrentUserLogin().isPresent() == true ? SecurityUtil.getCurrentUserLogin().get()
//                : "";
//        createdAt = Instant.now();
//    }
//
//    @PreUpdate
//    public void handleBeforUpdate() {
//        updatedBy = SecurityUtil.getCurrentUserLogin().isPresent() == true ? SecurityUtil.getCurrentUserLogin().get()
//                : "";
//        updatedAt = Instant.now();
// }

}
