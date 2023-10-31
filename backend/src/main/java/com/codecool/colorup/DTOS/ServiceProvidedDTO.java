package com.codecool.colorup.DTOS;

import com.codecool.colorup.enums.ServiceType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ServiceProvidedDTO {
    private Long id;
    private ServiceType serviceType;
    private String firstName;
    private String lastName;
    private int duration;
    private int price;
}
