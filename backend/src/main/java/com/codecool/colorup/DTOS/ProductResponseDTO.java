package com.codecool.colorup.DTOS;

import com.codecool.colorup.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponseDTO {
    private User user;
    private String message;
}
