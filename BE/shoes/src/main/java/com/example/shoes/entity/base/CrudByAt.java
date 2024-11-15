package com.example.shoes.entity.base;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.time.LocalDateTime;

@Getter
@Setter
@MappedSuperclass
public class CrudByAt {
    @JsonFormat(pattern = "yyyy-MM-dd")
    @Column(name = "create_at")
    private LocalDateTime createdAt;
    @Column(name = "update_at")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDateTime updatedAt;
    @Column(name = "create_by")
    private String createdBy;
    @Column(name = "update_by")
    private String updatedBy;

    @PrePersist
    public void handleBeforCreate() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        createdAt = LocalDateTime.now();
//        updatedAt = LocalDateTime.now();
        createdBy = authentication.getName();
//        updatedBy = authentication.getName();
    }

    @PreUpdate
    public void handleBeforUpdate() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        updatedAt = LocalDateTime.now();
        updatedBy = authentication != null ? authentication.getName() : "system" ;
    }

}
