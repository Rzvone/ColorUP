package com.codecool.colorup.DTOS;

import com.codecool.colorup.enums.AddressType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddressDTO {
    private String address1;
    private String address2;
    private String city;
    private String state;
    private String zipcode;
    private String country;
    private AddressType addressType;
}
