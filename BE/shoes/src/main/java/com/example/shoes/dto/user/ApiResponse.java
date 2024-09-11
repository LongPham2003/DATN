package com.example.shoes.dto.user;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL) // không có lỗi thì không có message thì không trả về message
public class ApiResponse<T> {
    private int code = 1000;
    private String message;
    private T result;
}
