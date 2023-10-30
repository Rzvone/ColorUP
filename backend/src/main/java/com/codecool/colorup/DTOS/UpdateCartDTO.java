package com.codecool.colorup.DTOS;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateCartDTO {
    private Long productId;
    private boolean addOrRemove;
}
