package com.codecool.colorup.provider;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProviderDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String image;
}
