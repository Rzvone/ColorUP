package com.codecool.colorup.service;

import com.codecool.colorup.enums.AddressType;

public interface AddressService {
    void addAddress(Long userId, String address1, String address2, String city, String state, String zipcode, String country, AddressType addressType);
}
