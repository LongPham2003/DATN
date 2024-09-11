package com.example.shoes.dto.user.response.global;

import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.time.LocalDateTime;

@Getter
@Setter
public  class CrudAtBy {
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String createdBy;
    private String updatedBy;


    @PrePersist
    private void onCreate(CrudAtBy entity) {
        entity.setCreatedAt(getCreatedAt());
        entity.setUpdatedAt(getUpdatedAt());
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            entity.setUpdatedBy(authentication.getName());
            entity.setCreatedBy(authentication.getName());
        }
    }

    @PreUpdate
    private void onUpdate(CrudAtBy entity) {
        entity.setUpdatedAt(getUpdatedAt());
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            String updatedBy = authentication.getName();
            entity.setUpdatedBy(updatedBy);
        }
    }
}
